import { NextResponse } from "next/server";

import {
  uploadResumableChunk,
} from "@/lib/googleDrive";

export const runtime = "nodejs";

/* ========================================
   CONSTANTS
======================================== */

const MAX_CHUNK_SIZE =
  4 * 1024 * 1024;

const MAX_FILE_SIZE =
  30 * 1024 * 1024;

const ALLOWED_MIME_TYPES =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "video/mp4",
    "video/quicktime",
    "video/webm",
  ]);

/* ========================================
   HELPERS
======================================== */

function getRequiredHeader(
  request: Request,
  name: string
) {
  return (
    request.headers
      .get(name)
      ?.trim() ?? ""
  );
}

function parseSafeInteger(
  value: string,
  label: string
) {
  if (
    !/^\d+$/.test(value)
  ) {
    throw new Error(
      `${label} tidak valid.`
    );
  }

  const number =
    Number(value);

  if (
    !Number.isSafeInteger(
      number
    )
  ) {
    throw new Error(
      `${label} tidak valid.`
    );
  }

  return number;
}

/* ========================================
   POST
======================================== */

export async function POST(
  request: Request
) {
  try {
    /* ========================================
       HEADERS
    ======================================== */

    const uploadUrl =
      getRequiredHeader(
        request,
        "x-upload-url"
      );

    const mimeType =
      getRequiredHeader(
        request,
        "x-file-type"
      );

    const start =
      parseSafeInteger(
        getRequiredHeader(
          request,
          "x-chunk-start"
        ),
        "Posisi awal chunk"
      );

    const end =
      parseSafeInteger(
        getRequiredHeader(
          request,
          "x-chunk-end"
        ),
        "Posisi akhir chunk"
      );

    const total =
      parseSafeInteger(
        getRequiredHeader(
          request,
          "x-file-size"
        ),
        "Ukuran file"
      );

    /* ========================================
       VALIDATE URL
    ======================================== */

    let parsedUploadUrl: URL;

    try {
      parsedUploadUrl =
        new URL(uploadUrl);
    } catch {
      throw new Error(
        "Upload URL tidak valid."
      );
    }

    if (
      parsedUploadUrl.protocol !==
        "https:" ||
      parsedUploadUrl.hostname !==
        "www.googleapis.com" ||
      !parsedUploadUrl.pathname.startsWith(
        "/upload/drive/v3/files"
      )
    ) {
      throw new Error(
        "Upload URL tidak valid."
      );
    }

    /* ========================================
       VALIDATE MIME
    ======================================== */

    if (
      !ALLOWED_MIME_TYPES.has(
        mimeType
      )
    ) {
      throw new Error(
        "Format file tidak didukung."
      );
    }

    /* ========================================
       VALIDATE RANGE
    ======================================== */

    if (
      total <= 0 ||
      total >
        MAX_FILE_SIZE
    ) {
      throw new Error(
        "Ukuran file tidak valid."
      );
    }

    if (
      start < 0 ||
      end < start ||
      end >= total
    ) {
      throw new Error(
        "Rentang chunk tidak valid."
      );
    }

    const expectedChunkSize =
      end - start + 1;

    if (
      expectedChunkSize >
      MAX_CHUNK_SIZE
    ) {
      throw new Error(
        "Ukuran chunk terlalu besar."
      );
    }

    /* ========================================
       BODY
    ======================================== */

    const arrayBuffer =
      await request.arrayBuffer();

    const buffer =
      Buffer.from(
        arrayBuffer
      );

    if (
      buffer.length !==
      expectedChunkSize
    ) {
      throw new Error(
        "Ukuran chunk tidak sesuai."
      );
    }

    /* ========================================
       GOOGLE DRIVE
    ======================================== */

    const result =
      await uploadResumableChunk({
        uploadUrl,
        buffer,
        start,
        end,
        total,
        mimeType,
      });

    /* ========================================
       RESPONSE
    ======================================== */

    return NextResponse.json(
      {
        success: true,
        complete:
          result.complete,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Supplier registration upload error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Upload file gagal.";

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