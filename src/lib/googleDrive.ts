import "server-only";

import { Readable } from "stream";
import { google } from "googleapis";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} belum diatur.`);
  }

  return value;
}

const clientId = getRequiredEnv(
  "GOOGLE_DRIVE_CLIENT_ID"
);

const clientSecret = getRequiredEnv(
  "GOOGLE_DRIVE_CLIENT_SECRET"
);

const refreshToken = getRequiredEnv(
  "GOOGLE_DRIVE_REFRESH_TOKEN"
);

const driveFolderId = getRequiredEnv(
  "GOOGLE_DRIVE_FOLDER_ID"
);

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret
);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

/* ========================================
   ESCAPE DRIVE QUERY
======================================== */

function escapeDriveQueryValue(
  value: string
) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

/* ========================================
   FIND CHILD FOLDER
======================================== */

async function findChildFolder(
  name: string,
  parentFolderId: string
): Promise<string | null> {
  const escapedName =
    escapeDriveQueryValue(name);

  const escapedParent =
    escapeDriveQueryValue(
      parentFolderId
    );

  const response =
    await drive.files.list({
      q: [
        `'${escapedParent}' in parents`,
        `name = '${escapedName}'`,
        `mimeType = 'application/vnd.google-apps.folder'`,
        "trashed = false",
      ].join(" and "),
      fields: "files(id,name)",
      pageSize: 10,
    });

  const folder =
    response.data.files?.[0];

  return folder?.id ?? null;
}

/* ========================================
   CREATE DRIVE FOLDER
======================================== */

export async function createDriveFolder(
  name: string,
  parentFolderId: string
) {
  const response =
    await drive.files.create({
      requestBody: {
        name,
        mimeType:
          "application/vnd.google-apps.folder",
        parents: [
          parentFolderId,
        ],
      },
      fields: "id,name",
    });

  const folderId =
    response.data.id;

  if (!folderId) {
    throw new Error(
      `Gagal membuat folder ${name}.`
    );
  }

  return folderId;
}

/* ========================================
   GET OR CREATE FOLDER
======================================== */

export async function getOrCreateDriveFolder(
  name: string,
  parentFolderId: string
) {
  const existingFolderId =
    await findChildFolder(
      name,
      parentFolderId
    );

  if (existingFolderId) {
    return existingFolderId;
  }

  return createDriveFolder(
    name,
    parentFolderId
  );
}

/* ========================================
   SUPPLIER FOLDER
======================================== */
export async function getOrCreateSupplierFolder(
  supplierId: string
) {
  return getOrCreateDriveFolder(
    supplierId,
    driveFolderId
  );
}

export async function createSupplierFolder(
  supplierId: string
) {
  return getOrCreateSupplierFolder(
    supplierId
  );
}

/* ========================================
   SUBMISSION FOLDER
======================================== */

/*
 * Contoh:
 *
 * SUP-0001/
 * ├── Submission-1/
 * └── Submission-2/
 */
export async function createSubmissionFolder(
  supplierFolderId: string,
  submissionNo: number
) {
  return createDriveFolder(
    `Submission-${submissionNo}`,
    supplierFolderId
  );
}

/* ========================================
   PRODUCT FOLDER
======================================== */

/*
 * Contoh:
 *
 * Submission-1/
 * └── Produk-1/
 */
export async function createProductFolder(
  submissionFolderId: string,
  productNumber: number
) {
  return createDriveFolder(
    `Produk-${productNumber}`,
    submissionFolderId
  );
}

/* ========================================
   UPLOAD FILE
======================================== */

type UploadDriveFileOptions = {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  folderId: string;
};

export async function uploadDriveFile({
  buffer,
  fileName,
  mimeType,
  folderId,
}: UploadDriveFileOptions) {
  const response =
    await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [
          folderId,
        ],
      },

      media: {
        mimeType,
        body: Readable.from(
          buffer
        ),
      },

      fields:
        "id,name,mimeType,size,webViewLink",
    });

  const fileId =
    response.data.id;

  if (!fileId) {
    throw new Error(
      `Gagal mengupload ${fileName}.`
    );
  }

  return {
    id: fileId,

    name:
      response.data.name ??
      fileName,

    mimeType:
      response.data.mimeType ??
      mimeType,

    size:
      response.data.size ??
      null,

    webViewLink:
      response.data.webViewLink ??
      null,
  };
}