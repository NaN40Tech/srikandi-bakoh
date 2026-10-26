import { NextResponse } from "next/server";

import {
  sheets,
  spreadsheetId,
} from "@/lib/googleSheets";

import {
  createProductFolder,
  createSubmissionFolder,
  getOrCreateSupplierFolder,
  uploadDriveFile,
} from "@/lib/googleDrive";

import {
  optimizeSupplierImage,
} from "@/lib/optimizeSupplierImage";

export const runtime = "nodejs";

/* ========================================
   CONSTANTS
======================================== */

const ABSOLUTE_MAX_COMMODITIES = 5;
const DEFAULT_MAX_SUBMISSIONS = 2;
const DEFAULT_MAX_COMMODITIES = 1;
const MIN_SPECIFICATION_WORDS = 2;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_SUPPLIER_TYPES = new Set([
  "petani",
  "produsen-pengolah",
  "pengepul",
  "distributor",
]);

const ALLOWED_REGENCIES = new Set([
  "Kabupaten Ponorogo",
  "Kabupaten Madiun",
  "Kota Madiun",
  "Kabupaten Magetan",
]);

const ALLOWED_COMMODITIES = new Set([
  "kunyit",
  "laos"
]);

const ALLOWED_PRODUCT_FORMS: Record<
  string,
  Set<string>
> = {
  kunyit: new Set([
    "segar",
    "iris-kering",
  ]),
    laos: new Set([
    "segar",
  ]),
};

const ALLOWED_CERTIFICATIONS = new Set([
  "halal",
  "organic",
  "gmp",
  "haccp",
  "lainnya",
  "belum-ada",
]);

const ALLOWED_SAMPLE_VALUES = new Set([
  "ya",
  "tidak",
]);

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

/* ========================================
   TYPES
======================================== */

type Settings = {
  registrationStatus:
    | "OPEN"
    | "CLOSED";
  maxSubmissions: number;
  maxCommodities: number;
};

type ProductInput = {
  commodity: string;
  productForm: string;
  currentStockKg: number;
  monthlyCapacityKg: number;
  minimumOrderKg:
    | number
    | null;
  offerPriceIdrKg: number;
  specification: string;
  certifications: string[];
  otherCertification: string;
  sampleAvailable:
    | "ya"
    | "tidak";
  productPhoto: File;
  stockPhoto: File;
};

type ExistingSupplier = {
  supplierId: string;
  submissionCount: number;
};

/* ========================================
   STRING HELPERS
======================================== */

function getString(
  formData: FormData,
  key: string
) {
  const value =
    formData.get(key);

  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value.trim();
}

function normalizeText(
  value: string
) {
  return value
    .trim()
    .replace(/\s+/g, " ");
}

function countWords(
  value: string
) {
  const normalized =
    normalizeText(value);

  if (!normalized) {
    return 0;
  }

  return normalized
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function normalizeWhatsApp(
  value: string
) {
  let digits =
    value.replace(/\D/g, "");

  if (
    digits.startsWith("0")
  ) {
    digits =
      `62${digits.slice(1)}`;
  } else if (
    digits.startsWith("8")
  ) {
    digits =
      `62${digits}`;
  }

  return digits;
}

function sanitizeSheetText(
  value: string
) {
  const trimmed =
    normalizeText(value);

  if (
    /^[=+\-@]/.test(trimmed)
  ) {
    return `'${trimmed}`;
  }

  return trimmed;
}

/* ========================================
   NUMBER HELPERS
======================================== */

function parseRequiredPositiveNumber(
  value: string,
  label: string
) {
  const normalized =
    value.replace(/\./g, "");

  if (
    !/^\d+$/.test(normalized)
  ) {
    throw new Error(
      `${label} tidak valid.`
    );
  }

  const number =
    Number(normalized);

  if (
    !Number.isSafeInteger(number) ||
    number <= 0
  ) {
    throw new Error(
      `${label} harus lebih dari 0.`
    );
  }

  return number;
}

function parseOptionalPositiveNumber(
  value: string,
  label: string
) {
  if (!value.trim()) {
    return null;
  }

  return parseRequiredPositiveNumber(
    value,
    label
  );
}

function clampInteger(
  value: number,
  minimum: number,
  maximum: number,
  fallback: number
) {
  if (
    !Number.isFinite(value)
  ) {
    return fallback;
  }

  const integer =
    Math.floor(value);

  return Math.min(
    maximum,
    Math.max(
      minimum,
      integer
    )
  );
}

/* ========================================
   SETTINGS
======================================== */

async function getSettings():
  Promise<Settings> {
  const response =
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Settings!A:B",
    });

  const rows =
    response.data.values ?? [];

  const settings =
    new Map<string, string>();

  for (const row of rows) {
    const key =
      String(
        row?.[0] ?? ""
      )
        .trim()
        .toLowerCase();

    const value =
      String(
        row?.[1] ?? ""
      ).trim();

    if (key) {
      settings.set(
        key,
        value
      );
    }
  }

  const statusRaw =
    (
      settings.get(
        "supplier_registration"
      ) ?? "CLOSED"
    ).toUpperCase();

  const registrationStatus:
    "OPEN" | "CLOSED" =
    statusRaw === "OPEN"
      ? "OPEN"
      : "CLOSED";

  const maxSubmissions =
    clampInteger(
      Number(
        settings.get(
          "max_submissions"
        ) ??
          DEFAULT_MAX_SUBMISSIONS
      ),
      1,
      10,
      DEFAULT_MAX_SUBMISSIONS
    );

  const maxCommodities =
    clampInteger(
      Number(
        settings.get(
          "max_commodities"
        ) ??
          DEFAULT_MAX_COMMODITIES
      ),
      1,
      ABSOLUTE_MAX_COMMODITIES,
      DEFAULT_MAX_COMMODITIES
    );

  return {
    registrationStatus,
    maxSubmissions,
    maxCommodities,
  };
}

/* ========================================
   SHEET HELPERS
======================================== */

async function getSuppliersSheet() {
  const response =
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Suppliers!A:Z",
    });

  const rows =
    response.data.values ?? [];

  return {
    headers:
      (rows[0] ?? []).map(
        (value) =>
          String(value).trim()
      ),
    dataRows:
      rows.slice(1),
  };
}

async function getProductsHeaders() {
  const response =
    await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Products!1:1",
    });

  return (
    response.data.values?.[0] ??
    []
  ).map(
    (value) =>
      String(value).trim()
  );
}

function getHeaderIndex(
  headers: string[],
  headerName: string
) {
  return headers.findIndex(
    (header) =>
      header
        .trim()
        .toLowerCase() ===
      headerName
        .trim()
        .toLowerCase()
  );
}

function assertRequiredHeaders(
  headers: string[],
  requiredHeaders: string[],
  sheetName: string
) {
  const missing =
    requiredHeaders.filter(
      (header) =>
        getHeaderIndex(
          headers,
          header
        ) === -1
    );

  if (missing.length > 0) {
    throw new Error(
      `Struktur database ${sheetName} belum sesuai.`
    );
  }
}

function buildRowByHeaders(
  headers: string[],
  values: Record<
    string,
    string | number | boolean
  >
) {
  const normalizedValues =
    new Map(
      Object.entries(values).map(
        ([key, value]) => [
          key
            .trim()
            .toLowerCase(),
          value,
        ]
      )
    );

  return headers.map(
    (header) =>
      normalizedValues.get(
        header
          .trim()
          .toLowerCase()
      ) ?? ""
  );
}

/* ========================================
   SUPPLIER ID
======================================== */

function findExistingSupplier(
  headers: string[],
  dataRows: unknown[][],
  normalizedWhatsApp: string
): ExistingSupplier | null {
  const supplierIdIndex =
    getHeaderIndex(
      headers,
      "Supplier ID"
    );

  const whatsappIndex =
    getHeaderIndex(
      headers,
      "WhatsApp"
    );

  const submissionNoIndex =
    getHeaderIndex(
      headers,
      "Submission No"
    );

  if (
    supplierIdIndex === -1 ||
    whatsappIndex === -1 ||
    submissionNoIndex === -1
  ) {
    throw new Error(
      "Struktur database Suppliers belum sesuai."
    );
  }

  const matchingRows =
    dataRows.filter((row) => {
      const rowWhatsApp =
        normalizeWhatsApp(
          String(
            row?.[
              whatsappIndex
            ] ?? ""
          )
        );

      return (
        rowWhatsApp ===
        normalizedWhatsApp
      );
    });

  if (
    matchingRows.length === 0
  ) {
    return null;
  }

  const supplierIds =
    matchingRows
      .map((row) =>
        String(
          row?.[
            supplierIdIndex
          ] ?? ""
        ).trim()
      )
      .filter(
        (supplierId) =>
          /^SUP-\d+$/.test(
            supplierId
          )
      );

  if (
    supplierIds.length === 0
  ) {
    throw new Error(
      "Supplier ID sebelumnya tidak valid."
    );
  }

  const supplierId =
    supplierIds[0];

  let highestSubmissionNo = 0;

  for (
    const row of matchingRows
  ) {
    const rowSupplierId =
      String(
        row?.[
          supplierIdIndex
        ] ?? ""
      ).trim();

    if (
      rowSupplierId !==
      supplierId
    ) {
      continue;
    }

    const submissionNo =
      Number(
        row?.[
          submissionNoIndex
        ] ?? 0
      );

    if (
      Number.isInteger(
        submissionNo
      ) &&
      submissionNo >
        highestSubmissionNo
    ) {
      highestSubmissionNo =
        submissionNo;
    }
  }

  return {
    supplierId,
    submissionCount:
      highestSubmissionNo > 0
        ? highestSubmissionNo
        : matchingRows.length,
  };
}

function generateNextSupplierId(
  headers: string[],
  dataRows: unknown[][]
) {
  const supplierIdIndex =
    getHeaderIndex(
      headers,
      "Supplier ID"
    );

  if (
    supplierIdIndex === -1
  ) {
    throw new Error(
      "Struktur database Suppliers belum sesuai."
    );
  }

  let highestNumber = 0;

  for (
    const row of dataRows
  ) {
    const supplierId =
      String(
        row?.[
          supplierIdIndex
        ] ?? ""
      ).trim();

    const match =
      /^SUP-(\d+)$/.exec(
        supplierId
      );

    if (!match) {
      continue;
    }

    const number =
      Number(match[1]);

    if (
      Number.isSafeInteger(
        number
      ) &&
      number >
        highestNumber
    ) {
      highestNumber =
        number;
    }
  }

  return `SUP-${String(
    highestNumber + 1
  ).padStart(4, "0")}`;
}

/* ========================================
   FILE VALIDATION
======================================== */

function validateImageFile(
  file: File,
  label: string
) {
  if (
    file.size <= 0
  ) {
    throw new Error(
      `${label} belum tersedia.`
    );
  }

  if (
    file.size > MAX_FILE_SIZE
  ) {
    throw new Error(
      `${label} maksimal 5 MB.`
    );
  }

  if (
    !ALLOWED_IMAGE_TYPES.has(
      file.type
    )
  ) {
    throw new Error(
      `${label} harus menggunakan format JPG, PNG, atau WEBP.`
    );
  }
}

/* ========================================
   PRODUCT PARSER
======================================== */

function parseProducts(
  formData: FormData,
  productCount: number
): ProductInput[] {
  const products:
    ProductInput[] = [];

  const usedProductVariants =
    new Set<string>();

  for (
    let index = 0;
    index < productCount;
    index += 1
  ) {
    const productNumber =
      index + 1;

    const prefix =
      `products[${index}]`;

    const commodity =
      getString(
        formData,
        `${prefix}[commodity]`
      );

    const productForm =
      getString(
        formData,
        `${prefix}[productForm]`
      );

    if (
      !ALLOWED_COMMODITIES.has(
        commodity
      )
    ) {
      throw new Error(
        `Komoditas Produk ${productNumber} tidak valid.`
      );
    }

    const allowedForms =
      ALLOWED_PRODUCT_FORMS[
        commodity
      ];

    if (
      !allowedForms ||
      !allowedForms.has(
        productForm
      )
    ) {
      throw new Error(
        `Bentuk Produk ${productNumber} tidak valid.`
      );
    }

    const productVariantKey =
      `${commodity}:${productForm}`;

    if (
      usedProductVariants.has(
        productVariantKey
      )
    ) {
      throw new Error(
        `Produk ${productNumber} memiliki komoditas dan bentuk produk yang sama dengan produk sebelumnya.`
      );
    }

    usedProductVariants.add(
      productVariantKey
    );

    const currentStockKg =
      parseRequiredPositiveNumber(
        getString(
          formData,
          `${prefix}[currentStockKg]`
        ),
        `Stok Produk ${productNumber}`
      );

    const monthlyCapacityKg =
      parseRequiredPositiveNumber(
        getString(
          formData,
          `${prefix}[monthlyCapacityKg]`
        ),
        `Kapasitas Produk ${productNumber}`
      );

    const minimumOrderKg =
      parseOptionalPositiveNumber(
        getString(
          formData,
          `${prefix}[minimumOrderKg]`
        ),
        `Minimum Pembelian Produk ${productNumber}`
      );

    const offerPriceIdrKg =
      parseRequiredPositiveNumber(
        getString(
          formData,
          `${prefix}[offerPriceIdrKg]`
        ),
        `Harga Produk ${productNumber}`
      );

    const specification =
      normalizeText(
        getString(
          formData,
          `${prefix}[specification]`
        )
      );

    if (
      countWords(
        specification
      ) <
      MIN_SPECIFICATION_WORDS
    ) {
      throw new Error(
        `Spesifikasi / keterangan Produk ${productNumber} minimal ${MIN_SPECIFICATION_WORDS} kata.`
      );
    }

    if (
      specification.length >
      3000
    ) {
      throw new Error(
        `Spesifikasi / keterangan Produk ${productNumber} maksimal 3000 karakter.`
      );
    }

    const certifications =
      formData
        .getAll(
          `${prefix}[certifications]`
        )
        .filter(
          (
            value
          ): value is string =>
            typeof value ===
            "string"
        )
        .map(
          (value) =>
            value.trim()
        )
        .filter(Boolean);

    const uniqueCertifications =
      [
        ...new Set(
          certifications
        ),
      ];

    if (
      uniqueCertifications.length === 0
    ) {
      throw new Error(
        `Status sertifikasi Produk ${productNumber} wajib dipilih. Jika belum memiliki sertifikasi, pilih "Belum Memiliki Sertifikasi".`
      );
    }

    for (
      const certification of
      uniqueCertifications
    ) {
      if (
        !ALLOWED_CERTIFICATIONS.has(
          certification
        )
      ) {
        throw new Error(
          `Sertifikasi Produk ${productNumber} tidak valid.`
        );
      }
    }

    if (
      uniqueCertifications.includes(
        "belum-ada"
      ) &&
      uniqueCertifications.length >
        1
    ) {
      throw new Error(
        `"Belum Memiliki Sertifikasi" tidak dapat dipilih bersama sertifikasi lain pada Produk ${productNumber}.`
      );
    }

    const otherCertification =
      normalizeText(
        getString(
          formData,
          `${prefix}[otherCertification]`
        )
      );

    if (
      uniqueCertifications.includes(
        "lainnya"
      )
    ) {
      if (
        !otherCertification
      ) {
        throw new Error(
          `Nama sertifikasi lainnya pada Produk ${productNumber} wajib diisi.`
        );
      }

      if (
        otherCertification.length >
        200
      ) {
        throw new Error(
          `Nama sertifikasi lainnya pada Produk ${productNumber} maksimal 200 karakter.`
        );
      }
    }

    if (
      !uniqueCertifications.includes(
        "lainnya"
      ) &&
      otherCertification
    ) {
      throw new Error(
        `Sertifikasi lainnya pada Produk ${productNumber} tidak sesuai.`
      );
    }

    const sampleAvailable =
      getString(
        formData,
        `${prefix}[sampleAvailable]`
      );

    if (
      !ALLOWED_SAMPLE_VALUES.has(
        sampleAvailable
      )
    ) {
      throw new Error(
        `Pilihan sample Produk ${productNumber} belum sesuai.`
      );
    }

    const productPhoto =
      formData.get(
        `${prefix}[productPhoto]`
      );

    const stockPhoto =
      formData.get(
        `${prefix}[stockPhoto]`
      );

    if (
      !(
        productPhoto instanceof
        File
      )
    ) {
      throw new Error(
        `Foto produk ${productNumber} belum tersedia.`
      );
    }

    if (
      !(
        stockPhoto instanceof
        File
      )
    ) {
      throw new Error(
        `Foto stok Produk ${productNumber} belum tersedia.`
      );
    }

    validateImageFile(
      productPhoto,
      `Foto produk ${productNumber}`
    );

    validateImageFile(
      stockPhoto,
      `Foto stok Produk ${productNumber}`
    );

    products.push({
      commodity,
      productForm,
      currentStockKg,
      monthlyCapacityKg,
      minimumOrderKg,
      offerPriceIdrKg,
      specification,
      certifications:
        uniqueCertifications,
      otherCertification,
      sampleAvailable:
        sampleAvailable as
          | "ya"
          | "tidak",
      productPhoto,
      stockPhoto,
    });
  }

  return products;
}

/* ========================================
   DRIVE
======================================== */

function getDriveViewUrl(
  fileId: string
) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

/* ========================================
   POST
======================================== */

export async function POST(
  request: Request
) {
  try {
    /* ========================================
       REQUEST VALIDATION
    ======================================== */

    const contentType =
      request.headers.get(
        "content-type"
      );

    if (
      !contentType ||
      !contentType
        .toLowerCase()
        .includes(
          "multipart/form-data"
        )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Format data pendaftaran tidak sesuai.",
        },
        {
          status: 415,
        }
      );
    }

    if (
      !contentType
        .toLowerCase()
        .includes(
          "boundary="
        )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data formulir tidak dapat dibaca karena format multipart tidak lengkap.",
        },
        {
          status: 400,
        }
      );
    }

    let formData: FormData;

    try {
      formData =
        await request.formData();
    } catch (error) {
      console.error(
        "Supplier multipart parsing error:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Data formulir tidak dapat dibaca. Silakan pilih ulang foto dan kirim kembali.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================
       HONEYPOT
    ======================================== */

    const website =
      getString(
        formData,
        "website"
      );

    if (website) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pendaftaran tidak dapat diproses.",
        },
        {
          status: 400,
        }
      );
    }

    /* ========================================
       SETTINGS
    ======================================== */

    const settings =
      await getSettings();

    if (
      settings.registrationStatus !==
      "OPEN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pendaftaran supplier sedang ditutup.",
        },
        {
          status: 403,
        }
      );
    }

    /* ========================================
       SUPPLIER
    ======================================== */

    const fullName =
      normalizeText(
        getString(
          formData,
          "fullName"
        )
      );

    const businessName =
      normalizeText(
        getString(
          formData,
          "businessName"
        )
      );

    const whatsapp =
      normalizeWhatsApp(
        getString(
          formData,
          "whatsapp"
        )
      );

    const email =
      getString(
        formData,
        "email"
      );

    const supplierType =
      getString(
        formData,
        "supplierType"
      );

    if (
      fullName.length < 2 ||
      fullName.length > 150
    ) {
      throw new Error(
        "Nama lengkap belum sesuai."
      );
    }

    if (
      businessName.length > 200
    ) {
      throw new Error(
        "Nama usaha maksimal 200 karakter."
      );
    }

    if (
      !/^628[0-9]{7,11}$/.test(
        whatsapp
      )
    ) {
      throw new Error(
        "Nomor WhatsApp belum sesuai."
      );
    }

    if (
      email.length > 254
    ) {
      throw new Error(
        "Alamat email terlalu panjang."
      );
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      throw new Error(
        "Alamat email belum sesuai."
      );
    }

    if (
      !ALLOWED_SUPPLIER_TYPES.has(
        supplierType
      )
    ) {
      throw new Error(
        "Jenis supplier belum sesuai."
      );
    }

    /* ========================================
       LOCATION
    ======================================== */

    const province =
      getString(
        formData,
        "province"
      );

    const regency =
      getString(
        formData,
        "regency"
      );

    const district =
      normalizeText(
        getString(
          formData,
          "district"
        )
      );

    const village =
      normalizeText(
        getString(
          formData,
          "village"
        )
      );

    const fullAddress =
      normalizeText(
        getString(
          formData,
          "fullAddress"
        )
      );

    if (
      province !==
      "Jawa Timur"
    ) {
      throw new Error(
        "Provinsi belum sesuai."
      );
    }

    if (
      !ALLOWED_REGENCIES.has(
        regency
      )
    ) {
      throw new Error(
        "Kabupaten / Kota belum sesuai."
      );
    }

    if (
      district.length < 2 ||
      district.length > 100
    ) {
      throw new Error(
        "Kecamatan minimal 2 karakter dan maksimal 100 karakter."
      );
    }

    if (
      village.length < 2 ||
      village.length > 100
    ) {
      throw new Error(
        "Desa / Kelurahan minimal 2 karakter dan maksimal 100 karakter."
      );
    }

    if (!fullAddress) {
      throw new Error(
        "Alamat lengkap wajib diisi."
      );
    }

    if (
      fullAddress.length > 1000
    ) {
      throw new Error(
        "Alamat lengkap maksimal 1000 karakter."
      );
    }

    /* ========================================
       DECLARATION
    ======================================== */

    const declaration =
      getString(
        formData,
        "declaration"
      );

    if (
      declaration !== "true"
    ) {
      throw new Error(
        "Pernyataan konfirmasi belum disetujui."
      );
    }

    /* ========================================
       PRODUCTS
    ======================================== */

    const productCount =
      Number(
        getString(
          formData,
          "productCount"
        )
      );

    if (
      !Number.isInteger(
        productCount
      ) ||
      productCount < 1 ||
      productCount >
        settings.maxCommodities ||
      productCount >
        ABSOLUTE_MAX_COMMODITIES
    ) {
      throw new Error(
        "Jumlah produk tidak sesuai."
      );
    }

    const products =
      parseProducts(
        formData,
        productCount
      );

    /* ========================================
       SUPPLIERS SHEET
    ======================================== */

    const {
      headers:
        supplierHeaders,
      dataRows:
        supplierRows,
    } =
      await getSuppliersSheet();

    assertRequiredHeaders(
      supplierHeaders,
      [
        "Supplier ID",
        "Submission No",
        "Submitted At",
        "Full Name",
        "Business Name",
        "WhatsApp",
        "Email",
        "Supplier Type",
        "Province",
        "Regency",
        "District",
        "Village",
        "Full Address",
        "Declaration",
        "Status",
      ],
      "Suppliers"
    );

    const existingSupplier =
      findExistingSupplier(
        supplierHeaders,
        supplierRows,
        whatsapp
      );

    let supplierId: string;
    let submissionNo: number;

    if (existingSupplier) {
      supplierId =
        existingSupplier.supplierId;

      submissionNo =
        existingSupplier.submissionCount +
        1;

      if (
        submissionNo >
        settings.maxSubmissions
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              `Nomor WhatsApp ini telah mencapai batas maksimal ${settings.maxSubmissions} pendaftaran.`,
          },
          {
            status: 409,
          }
        );
      }
    } else {
      supplierId =
        generateNextSupplierId(
          supplierHeaders,
          supplierRows
        );

      submissionNo = 1;
    }

    /* ========================================
       PRODUCTS SHEET
    ======================================== */

    const productHeaders =
      await getProductsHeaders();

    assertRequiredHeaders(
      productHeaders,
      [
        "Supplier ID",
        "Submission No",
        "Product No",
        "Commodity",
        "Product Form",
        "Current Stock KG",
        "Monthly Capacity KG",
        "Minimum Order KG",
        "Offer Price IDR KG",
        "Specification",
        "Certifications",
        "Other Certification",
        "Sample Available",
        "Product Photo",
        "Stock Photo",
      ],
      "Products"
    );

    /* ========================================
       DRIVE
    ======================================== */

    const supplierFolderId =
      await getOrCreateSupplierFolder(
        supplierId
      );

    const submissionFolderId =
      await createSubmissionFolder(
        supplierFolderId,
        submissionNo
      );

    const uploadedProducts: {
      product: ProductInput;
      productPhotoId: string;
      stockPhotoId: string;
    }[] = [];

    for (
      let index = 0;
      index < products.length;
      index += 1
    ) {
      const product =
        products[index];

      const productFolderId =
        await createProductFolder(
          submissionFolderId,
          index + 1
        );

      const optimizedProductPhoto =
        await optimizeSupplierImage(
          product.productPhoto
        );

      const optimizedStockPhoto =
        await optimizeSupplierImage(
          product.stockPhoto
        );

      const uploadedProductPhoto =
        await uploadDriveFile({
          buffer:
            optimizedProductPhoto.buffer,
          fileName:
            "foto-produk.webp",
          mimeType:
            optimizedProductPhoto.mimeType,
          folderId:
            productFolderId,
        });

      const uploadedStockPhoto =
        await uploadDriveFile({
          buffer:
            optimizedStockPhoto.buffer,
          fileName:
            "foto-stok.webp",
          mimeType:
            optimizedStockPhoto.mimeType,
          folderId:
            productFolderId,
        });

      uploadedProducts.push({
        product,
        productPhotoId:
          uploadedProductPhoto.id,
        stockPhotoId:
          uploadedStockPhoto.id,
      });
    }

    /* ========================================
       SUPPLIER ROW
    ======================================== */

    const submittedAt =
      new Date().toISOString();

    const supplierRow =
      buildRowByHeaders(
        supplierHeaders,
        {
          "Supplier ID":
            supplierId,

          "Submission No":
            submissionNo,

          "Submitted At":
            submittedAt,

          "Full Name":
            sanitizeSheetText(
              fullName
            ),

          "Business Name":
            sanitizeSheetText(
              businessName
            ),

          WhatsApp:
            whatsapp,

          Email:
            sanitizeSheetText(
              email
            ),

          "Supplier Type":
            supplierType,

          Province:
            province,

          Regency:
            regency,

          District:
            sanitizeSheetText(
              district
            ),

          Village:
            sanitizeSheetText(
              village
            ),

          "Full Address":
            sanitizeSheetText(
              fullAddress
            ),

          Declaration:
            "Yes",

          Status:
            "New",
        }
      );

    /* ========================================
       PRODUCT ROWS
    ======================================== */

    const productRows =
      uploadedProducts.map(
        (
          {
            product,
            productPhotoId,
            stockPhotoId,
          },
          index
        ) =>
          buildRowByHeaders(
            productHeaders,
            {
              "Supplier ID":
                supplierId,

              "Submission No":
                submissionNo,

              "Product No":
                index + 1,

              Commodity:
                product.commodity,

              "Product Form":
                product.productForm,

              "Current Stock KG":
                product.currentStockKg,

              "Monthly Capacity KG":
                product.monthlyCapacityKg,

              "Minimum Order KG":
                product.minimumOrderKg ??
                "",

              "Offer Price IDR KG":
                product.offerPriceIdrKg,

              Specification:
                sanitizeSheetText(
                  product.specification
                ),

              Certifications:
                product.certifications.join(
                  ", "
                ),

              "Other Certification":
                sanitizeSheetText(
                  product.otherCertification
                ),

              "Sample Available":
                product.sampleAvailable ===
                "ya"
                  ? "Yes"
                  : "No",

              "Product Photo":
                getDriveViewUrl(
                  productPhotoId
                ),

              "Stock Photo":
                getDriveViewUrl(
                  stockPhotoId
                ),
            }
          )
      );

    /* ========================================
       WRITE SHEETS
    ======================================== */

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range:
        "Suppliers!A:Z",
      valueInputOption:
        "RAW",
      insertDataOption:
        "INSERT_ROWS",
      requestBody: {
        values: [
          supplierRow,
        ],
      },
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range:
        "Products!A:Z",
      valueInputOption:
        "RAW",
      insertDataOption:
        "INSERT_ROWS",
      requestBody: {
        values:
          productRows,
      },
    });

    /* ========================================
       SUCCESS
    ======================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Pendaftaran supplier berhasil dikirim.",
        supplierId,
        submissionNo,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Supplier registration submit error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Pendaftaran belum berhasil diproses.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 400,
      }
    );
  }
}