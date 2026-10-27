import { NextResponse } from "next/server";

import {
  sheets,
  spreadsheetId,
} from "@/lib/googleSheets";

import {
  findChildFolder,
  findDriveChildByName,
  getGoogleDriveRootFolderId,
  getOrCreateSupplierFolder,
  getTemporaryRegistrationFolder,
  moveDriveFile,
  verifyDriveFile,
} from "@/lib/googleDrive";

export const runtime = "nodejs";

/* ========================================
   CONSTANTS
======================================== */

const ABSOLUTE_MAX_COMMODITIES = 5;
const DEFAULT_MAX_SUBMISSIONS = 2;
const DEFAULT_MAX_COMMODITIES = 1;
const MIN_SPECIFICATION_WORDS = 2;

const MAX_IMAGE_FILE_SIZE =
  5 * 1024 * 1024;

const MAX_VIDEO_FILE_SIZE =
  30 * 1024 * 1024;

const ALLOWED_SUPPLIER_TYPES =
  new Set([
    "petani",
    "produsen-pengolah",
    "pengepul",
    "distributor",
  ]);

const ALLOWED_REGENCIES =
  new Set([
    "Kabupaten Ponorogo",
    "Kabupaten Madiun",
    "Kota Madiun",
    "Kabupaten Magetan",
  ]);

const ALLOWED_COMMODITIES =
  new Set([
    "kunyit",
    "laos",
  ]);

const ALLOWED_PRODUCT_FORMS:
  Record<string, Set<string>> = {
    kunyit: new Set([
      "segar",
    ]),
    laos: new Set([
      "segar",
    ]),
  };

const ALLOWED_CERTIFICATIONS =
  new Set([
    "halal",
    "organic",
    "gmp",
    "haccp",
    "lainnya",
    "belum-ada",
  ]);

const ALLOWED_SAMPLE_VALUES =
  new Set([
    "ya",
    "tidak",
  ]);

const ALLOWED_IMAGE_TYPES =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);

const ALLOWED_VIDEO_TYPES =
  new Set([
    "video/mp4",
    "video/quicktime",
    "video/webm",
  ]);

const PRODUCT_PHOTO_NAMES = [
  "foto-produk.jpg",
  "foto-produk.jpeg",
  "foto-produk.png",
  "foto-produk.webp",
];

const STOCK_PHOTO_NAMES = [
  "foto-stok.jpg",
  "foto-stok.jpeg",
  "foto-stok.png",
  "foto-stok.webp",
];

const PRODUCT_VIDEO_NAMES = [
  "video-produk.mp4",
  "video-produk.mov",
  "video-produk.webm",
];

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

type ProductRequest = {
  commodity?: string;
  productForm?: string;

  currentStockKg?:
    | string
    | number;

  monthlyCapacityKg?:
    | string
    | number;

  minimumOrderKg?:
    | string
    | number
    | null;

  offerPriceIdrKg?:
    | string
    | number;

  specification?: string;
  certifications?: string[];
  otherCertification?: string;
  sampleAvailable?: string;
};

type SubmitRequest = {
  website?: string;
  registrationToken?: string;

  fullName?: string;
  businessName?: string;
  whatsapp?: string;
  email?: string;
  supplierType?: string;

  province?: string;
  regency?: string;
  district?: string;
  village?: string;
  fullAddress?: string;

  declaration?:
    | boolean
    | string;

  products?: ProductRequest[];
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
};

type ExistingSupplier = {
  supplierId: string;
  submissionCount: number;
};

type VerifiedProduct = {
  product: ProductInput;
  productPhotoId: string;
  stockPhotoId: string;
  productVideoId: string;
};

/* ========================================
   STRING HELPERS
======================================== */

function getString(
  value: unknown
) {
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
    /^[=+\-@]/.test(
      trimmed
    )
  ) {
    return `'${trimmed}`;
  }

  return trimmed;
}

function getDriveViewUrl(
  fileId: string
) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

/* ========================================
   NUMBER HELPERS
======================================== */

function parseRequiredPositiveNumber(
  value: unknown,
  label: string
) {
  const normalized =
    String(
      value ?? ""
    ).replace(/\./g, "");

  if (
    !/^\d+$/.test(
      normalized
    )
  ) {
    throw new Error(
      `${label} tidak valid.`
    );
  }

  const number =
    Number(normalized);

  if (
    !Number.isSafeInteger(
      number
    ) ||
    number <= 0
  ) {
    throw new Error(
      `${label} harus lebih dari 0.`
    );
  }

  return number;
}

function parseOptionalPositiveNumber(
  value: unknown,
  label: string
) {
  if (
    value === null ||
    value === undefined ||
    String(value).trim() === ""
  ) {
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
   DATE TIME
======================================== */

function getJakartaDateTime() {
  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone:
          "Asia/Jakarta",

        year: "numeric",
        month: "2-digit",
        day: "2-digit",

        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",

        hourCycle: "h23",
      }
    ).formatToParts(
      new Date()
    );

  const values =
    Object.fromEntries(
      parts.map(
        ({ type, value }) => [
          type,
          value,
        ]
      )
    );

  return `${values.year}-${values.month}-${values.day} ${values.hour}:${values.minute}:${values.second}`;
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

  if (
    missing.length > 0
  ) {
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
      Object.entries(
        values
      ).map(
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
    dataRows.filter(
      (row) => {
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
      }
    );

  if (
    matchingRows.length === 0
  ) {
    return null;
  }

  const supplierIds =
    matchingRows
      .map(
        (row) =>
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
    const row of
    matchingRows
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
    const row of
    dataRows
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
   MEDIA
======================================== */

async function findMediaFile({
  folderId,
  fileNames,
  allowedMimeTypes,
  maximumSize,
  label,
}: {
  folderId: string;
  fileNames: string[];
  allowedMimeTypes: Set<string>;
  maximumSize: number;
  label: string;
}) {
  const matches = [];

  for (
    const fileName of
    fileNames
  ) {
    const file =
      await findDriveChildByName(
        fileName,
        folderId
      );

    if (file) {
      matches.push(file);
    }
  }

  if (
    matches.length === 0
  ) {
    throw new Error(
      `${label} belum ditemukan. Pastikan file sudah selesai diunggah.`
    );
  }

  if (
    matches.length > 1
  ) {
    throw new Error(
      `${label} ditemukan lebih dari satu file.`
    );
  }

  const file =
    matches[0];

  if (!file) {
    throw new Error(
      `${label} tidak ditemukan.`
    );
  }

  await verifyDriveFile({
    fileId:
      file.id,

    folderId,

    allowedMimeTypes,

    maximumSize,

    expectedFileName:
      file.name,
  });

  return file;
}

/* ========================================
   PRODUCTS
======================================== */

function parseProducts(
  productsValue: unknown,
  maximumProducts: number
): ProductInput[] {
  if (
    !Array.isArray(
      productsValue
    ) ||
    productsValue.length < 1 ||
    productsValue.length >
      maximumProducts ||
    productsValue.length >
      ABSOLUTE_MAX_COMMODITIES
  ) {
    throw new Error(
      "Jumlah produk tidak sesuai."
    );
  }

  const products:
    ProductInput[] = [];

  const usedProductVariants =
    new Set<string>();

  for (
    let index = 0;
    index <
    productsValue.length;
    index += 1
  ) {
    const productNumber =
      index + 1;

    const rawProduct =
      productsValue[index];

    if (
      !rawProduct ||
      typeof rawProduct !==
        "object"
    ) {
      throw new Error(
        `Data Produk ${productNumber} tidak valid.`
      );
    }

    const product =
      rawProduct as ProductRequest;

    const commodity =
      getString(
        product.commodity
      );

    const productForm =
      getString(
        product.productForm
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
        product.currentStockKg,
        `Stok Produk ${productNumber}`
      );

    const monthlyCapacityKg =
      parseRequiredPositiveNumber(
        product.monthlyCapacityKg,
        `Kapasitas Produk ${productNumber}`
      );

    const minimumOrderKg =
      parseOptionalPositiveNumber(
        product.minimumOrderKg,
        `Minimum Pembelian Produk ${productNumber}`
      );

    const offerPriceIdrKg =
      parseRequiredPositiveNumber(
        product.offerPriceIdrKg,
        `Harga Produk ${productNumber}`
      );

    const specification =
      normalizeText(
        getString(
          product.specification
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
      Array.isArray(
        product.certifications
      )
        ? product.certifications
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
            .filter(Boolean)
        : [];

    const uniqueCertifications =
      [
        ...new Set(
          certifications
        ),
      ];

    if (
      uniqueCertifications.length ===
      0
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
          product.otherCertification
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
        product.sampleAvailable
      );

    if (
      !ALLOWED_SAMPLE_VALUES.has(
        sampleAvailable
      )
    ) {
      throw new Error(
        `Pilihan sampel Produk ${productNumber} belum sesuai.`
      );
    }

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
    });
  }

  return products;
}

/* ========================================
   POST
======================================== */

export async function POST(
  request: Request
) {
  try {
    /* ========================================
       REQUEST
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
          "application/json"
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

    let body: SubmitRequest;

    try {
      body =
        (await request.json()) as
          SubmitRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data pendaftaran tidak dapat dibaca.",
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
        body.website
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
       REGISTRATION TOKEN
    ======================================== */

    const registrationToken =
      getString(
        body.registrationToken
      );

    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        registrationToken
      )
    ) {
      throw new Error(
        "Token upload tidak valid."
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
          body.fullName
        )
      );

    const businessName =
      normalizeText(
        getString(
          body.businessName
        )
      );

    const whatsapp =
      normalizeWhatsApp(
        getString(
          body.whatsapp
        )
      );

    const email =
      getString(
        body.email
      );

    const supplierType =
      getString(
        body.supplierType
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
      businessName.length >
      200
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
        body.province
      );

    const regency =
      getString(
        body.regency
      );

    const district =
      normalizeText(
        getString(
          body.district
        )
      );

    const village =
      normalizeText(
        getString(
          body.village
        )
      );

    const fullAddress =
      normalizeText(
        getString(
          body.fullAddress
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

    if (
      !fullAddress
    ) {
      throw new Error(
        "Alamat lengkap wajib diisi."
      );
    }

    if (
      fullAddress.length >
      1000
    ) {
      throw new Error(
        "Alamat lengkap maksimal 1000 karakter."
      );
    }

    /* ========================================
       DECLARATION
    ======================================== */

    const declaration =
      body.declaration;

    if (
      declaration !== true &&
      declaration !== "true"
    ) {
      throw new Error(
        "Pernyataan konfirmasi belum disetujui."
      );
    }

    /* ========================================
       PRODUCTS
    ======================================== */

    const products =
      parseProducts(
        body.products,
        settings.maxCommodities
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

    if (
      existingSupplier
    ) {
      supplierId =
        existingSupplier
          .supplierId;

      submissionNo =
        existingSupplier
          .submissionCount +
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
        "Product Video",
      ],
      "Products"
    );

    /* ========================================
       TEMP REGISTRATION FOLDER
    ======================================== */

    const temporaryRegistrationFolder =
      await getTemporaryRegistrationFolder(
        registrationToken
      );

    if (
      !temporaryRegistrationFolder
    ) {
      throw new Error(
        "Folder upload sementara belum ditemukan. Pastikan seluruh media selesai diunggah."
      );
    }

    if (
      temporaryRegistrationFolder
        .trashed
    ) {
      throw new Error(
        "Folder upload sementara sudah tidak tersedia."
      );
    }

    if (
      temporaryRegistrationFolder
        .name !==
      `TEMP-${registrationToken}`
    ) {
      throw new Error(
        "Folder upload sementara tidak sesuai."
      );
    }

    if (
      temporaryRegistrationFolder
        .appProperties
        .registrationToken &&
      temporaryRegistrationFolder
        .appProperties
        .registrationToken !==
        registrationToken
    ) {
      throw new Error(
        "Token folder upload tidak sesuai."
      );
    }

    /* ========================================
       VERIFY MEDIA
    ======================================== */

    const verifiedProducts:
      VerifiedProduct[] = [];

    for (
      let index = 0;
      index <
      products.length;
      index += 1
    ) {
      const product =
        products[index];

      if (!product) {
        throw new Error(
          `Data Produk ${index + 1} tidak ditemukan.`
        );
      }

      const productNumber =
        index + 1;

      const productFolder =
        await findChildFolder(
          `Produk-${productNumber}`,
          temporaryRegistrationFolder.id
        );

      if (
        !productFolder
      ) {
        throw new Error(
          `Folder Produk ${productNumber} belum ditemukan.`
        );
      }

      if (
        productFolder.trashed
      ) {
        throw new Error(
          `Folder Produk ${productNumber} sudah tidak tersedia.`
        );
      }

      const productPhoto =
        await findMediaFile({
          folderId:
            productFolder.id,

          fileNames:
            PRODUCT_PHOTO_NAMES,

          allowedMimeTypes:
            ALLOWED_IMAGE_TYPES,

          maximumSize:
            MAX_IMAGE_FILE_SIZE,

          label:
            `Foto produk ${productNumber}`,
        });

      const stockPhoto =
        await findMediaFile({
          folderId:
            productFolder.id,

          fileNames:
            STOCK_PHOTO_NAMES,

          allowedMimeTypes:
            ALLOWED_IMAGE_TYPES,

          maximumSize:
            MAX_IMAGE_FILE_SIZE,

          label:
            `Foto stok Produk ${productNumber}`,
        });

      const productVideo =
        await findMediaFile({
          folderId:
            productFolder.id,

          fileNames:
            PRODUCT_VIDEO_NAMES,

          allowedMimeTypes:
            ALLOWED_VIDEO_TYPES,

          maximumSize:
            MAX_VIDEO_FILE_SIZE,

          label:
            `Video detail Produk ${productNumber}`,
        });

      verifiedProducts.push({
        product,

        productPhotoId:
          productPhoto.id,

        stockPhotoId:
          stockPhoto.id,

        productVideoId:
          productVideo.id,
      });
    }

    /* ========================================
       FINAL DRIVE FOLDER
    ======================================== */

    const driveRootFolderId =
      getGoogleDriveRootFolderId();

    const supplierFolderId =
      await getOrCreateSupplierFolder(
        supplierId
      );

    await moveDriveFile({
      fileId:
        temporaryRegistrationFolder.id,

      fromFolderId:
        driveRootFolderId,

      toFolderId:
        supplierFolderId,

      fileName:
        `Submission-${submissionNo}`,
    });

    /* ========================================
       SUPPLIER ROW
    ======================================== */

    const submittedAt =
      getJakartaDateTime();

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
      verifiedProducts.map(
        (
          {
            product,
            productPhotoId,
            stockPhotoId,
            productVideoId,
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

              "Product Video":
                getDriveViewUrl(
                  productVideoId
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