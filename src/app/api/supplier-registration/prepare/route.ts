import { NextResponse } from "next/server";

import {
  createDriveFolder,
  createResumableUploadSession,
} from "@/lib/googleDrive";

export const runtime = "nodejs";

/* ========================================
   CONSTANTS
======================================== */

const ABSOLUTE_MAX_PRODUCTS = 5;

const MAX_IMAGE_FILE_SIZE =
  5 * 1024 * 1024;

const MAX_VIDEO_FILE_SIZE =
  30 * 1024 * 1024;

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

/* ========================================
   TYPES
======================================== */

type MediaType =
  | "productPhoto"
  | "stockPhoto"
  | "productVideo";

type MediaInput = {
  mediaType?: string;
  mimeType?: string;
  fileSize?: number;
};

type ProductInput = {
  productNumber?: number;
  media?: MediaInput[];
};

type PrepareRequest = {
  products?: ProductInput[];
};

type PreparedMedia = {
  mediaType: MediaType;
  mimeType: string;
  fileSize: number;
  fileName: string;
  uploadUrl: string;
};

type PreparedProduct = {
  productNumber: number;
  temporaryProductFolderId: string;
  media: PreparedMedia[];
};

/* ========================================
   HELPERS
======================================== */

function getFileExtension(
  mimeType: string
) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";

    case "image/png":
      return "png";

    case "image/webp":
      return "webp";

    case "video/mp4":
      return "mp4";

    case "video/quicktime":
      return "mov";

    case "video/webm":
      return "webm";

    default:
      throw new Error(
        "Format file tidak didukung."
      );
  }
}

function getFileName(
  mediaType: MediaType,
  mimeType: string
) {
  const extension =
    getFileExtension(
      mimeType
    );

  switch (mediaType) {
    case "productPhoto":
      return `foto-produk.${extension}`;

    case "stockPhoto":
      return `foto-stok.${extension}`;

    case "productVideo":
      return `video-produk.${extension}`;
  }
}

function parseMediaType(
  value: unknown
): MediaType {
  if (
    value ===
      "productPhoto" ||
    value ===
      "stockPhoto" ||
    value ===
      "productVideo"
  ) {
    return value;
  }

  throw new Error(
    "Jenis media tidak valid."
  );
}

function validateMedia(
  media: MediaInput,
  productNumber: number
) {
  const mediaType =
    parseMediaType(
      media.mediaType
    );

  const mimeType =
    typeof media.mimeType ===
    "string"
      ? media.mimeType.trim()
      : "";

  const fileSize =
    Number(
      media.fileSize
    );

  if (!mimeType) {
    throw new Error(
      `Format media Produk ${productNumber} tidak ditemukan.`
    );
  }

  if (
    !Number.isSafeInteger(
      fileSize
    ) ||
    fileSize <= 0
  ) {
    throw new Error(
      `Ukuran media Produk ${productNumber} tidak valid.`
    );
  }

  if (
    mediaType ===
      "productPhoto" ||
    mediaType ===
      "stockPhoto"
  ) {
    if (
      !ALLOWED_IMAGE_TYPES.has(
        mimeType
      )
    ) {
      throw new Error(
        `Foto Produk ${productNumber} harus menggunakan format JPG, PNG, atau WEBP.`
      );
    }

    if (
      fileSize >
      MAX_IMAGE_FILE_SIZE
    ) {
      throw new Error(
        `Foto Produk ${productNumber} maksimal 5 MB.`
      );
    }
  }

  if (
    mediaType ===
    "productVideo"
  ) {
    if (
      !ALLOWED_VIDEO_TYPES.has(
        mimeType
      )
    ) {
      throw new Error(
        `Video detail Produk ${productNumber} harus menggunakan format MP4, MOV, atau WEBM.`
      );
    }

    if (
      fileSize >
      MAX_VIDEO_FILE_SIZE
    ) {
      throw new Error(
        `Video detail Produk ${productNumber} maksimal 30 MB.`
      );
    }
  }

  return {
    mediaType,
    mimeType,
    fileSize,
  };
}

function validateProductMedia(
  media: MediaInput[],
  productNumber: number
) {
  if (
    media.length !== 3
  ) {
    throw new Error(
      `Media Produk ${productNumber} belum lengkap.`
    );
  }

  const validated =
    media.map(
      (item) =>
        validateMedia(
          item,
          productNumber
        )
    );

  const mediaTypes =
    validated.map(
      (item) =>
        item.mediaType
    );

  const uniqueMediaTypes =
    new Set(
      mediaTypes
    );

  if (
    uniqueMediaTypes.size !==
    3
  ) {
    throw new Error(
      `Media Produk ${productNumber} tidak valid.`
    );
  }

  if (
    !uniqueMediaTypes.has(
      "productPhoto"
    ) ||
    !uniqueMediaTypes.has(
      "stockPhoto"
    ) ||
    !uniqueMediaTypes.has(
      "productVideo"
    )
  ) {
    throw new Error(
      `Foto produk, foto stok, dan video detail Produk ${productNumber} wajib tersedia.`
    );
  }

  return validated;
}

/* ========================================
   POST
======================================== */

export async function POST(
  request: Request
) {
  try {
    /* ========================================
       CONTENT TYPE
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
            "Format permintaan upload tidak sesuai.",
        },
        {
          status: 415,
        }
      );
    }

    /* ========================================
       REQUEST BODY
    ======================================== */

    let body: PrepareRequest;

    try {
      body =
        (await request.json()) as
          PrepareRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data upload tidak dapat dibaca.",
        },
        {
          status: 400,
        }
      );
    }

    const products =
      body.products;

    /* ========================================
       PRODUCT COUNT
    ======================================== */

    if (
      !Array.isArray(
        products
      ) ||
      products.length < 1 ||
      products.length >
        ABSOLUTE_MAX_PRODUCTS
    ) {
      throw new Error(
        "Jumlah produk tidak valid."
      );
    }

    /* ========================================
       VALIDATE PRODUCTS
    ======================================== */

    const validatedProducts =
      products.map(
        (
          product,
          index
        ) => {
          const expectedProductNumber =
            index + 1;

          const productNumber =
            Number(
              product.productNumber
            );

          if (
            !Number.isInteger(
              productNumber
            ) ||
            productNumber !==
              expectedProductNumber
          ) {
            throw new Error(
              `Nomor Produk ${expectedProductNumber} tidak valid.`
            );
          }

          if (
            !Array.isArray(
              product.media
            )
          ) {
            throw new Error(
              `Media Produk ${productNumber} tidak valid.`
            );
          }

          const media =
            validateProductMedia(
              product.media,
              productNumber
            );

          return {
            productNumber,
            media,
          };
        }
      );

    /* ========================================
       ROOT FOLDER
    ======================================== */

    const rootFolderId =
      process.env
        .GOOGLE_DRIVE_FOLDER_ID
        ?.trim();

    if (!rootFolderId) {
      throw new Error(
        "GOOGLE_DRIVE_FOLDER_ID belum diatur."
      );
    }

    /* ========================================
       REGISTRATION TOKEN
    ======================================== */

    const registrationToken =
      crypto.randomUUID();

    /* ========================================
       TEMP REGISTRATION FOLDER
    ======================================== */

    const temporaryRegistrationFolderId =
      await createDriveFolder(
        `TEMP-${registrationToken}`,
        rootFolderId
      );

    /* ========================================
       PREPARE PRODUCTS
    ======================================== */

    const preparedProducts:
      PreparedProduct[] = [];

    for (
      const product of
      validatedProducts
    ) {
      /* ========================================
         PRODUCT FOLDER
      ======================================== */

      const temporaryProductFolderId =
        await createDriveFolder(
          `Produk-${product.productNumber}`,
          temporaryRegistrationFolderId
        );

      const preparedMedia:
        PreparedMedia[] = [];

      /* ========================================
         MEDIA SESSIONS
      ======================================== */

      for (
        const media of
        product.media
      ) {
        const fileName =
          getFileName(
            media.mediaType,
            media.mimeType
          );

        const uploadUrl =
        await createResumableUploadSession({
            fileName,

            mimeType:
            media.mimeType,

            fileSize:
            media.fileSize,

            folderId:
            temporaryProductFolderId,
        });

        preparedMedia.push({
          mediaType:
            media.mediaType,

          mimeType:
            media.mimeType,

          fileSize:
            media.fileSize,

          fileName,

          uploadUrl,
        });
      }

      preparedProducts.push({
        productNumber:
          product.productNumber,

        temporaryProductFolderId,

        media:
          preparedMedia,
      });
    }

    /* ========================================
       RESPONSE
    ======================================== */

    return NextResponse.json(
      {
        success: true,

        registrationToken,

        products:
          preparedProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Supplier registration prepare error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Upload tidak dapat disiapkan.";

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