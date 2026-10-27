import "server-only";

import { Readable } from "stream";
import { google } from "googleapis";

/* ========================================
   CONSTANTS
======================================== */

const DRIVE_FOLDER_MIME =
  "application/vnd.google-apps.folder";

/* ========================================
   ENV
======================================== */

function getRequiredEnv(
  name: string
) {
  const value =
    process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `${name} belum diatur.`
    );
  }

  return value;
}

function getDriveRootFolderId() {
  return getRequiredEnv(
    "GOOGLE_DRIVE_FOLDER_ID"
  );
}

/* ========================================
   GOOGLE DRIVE CLIENT
======================================== */

function getDriveClient() {
  const clientId =
    getRequiredEnv(
      "GOOGLE_DRIVE_CLIENT_ID"
    );

  const clientSecret =
    getRequiredEnv(
      "GOOGLE_DRIVE_CLIENT_SECRET"
    );

  const refreshToken =
    getRequiredEnv(
      "GOOGLE_DRIVE_REFRESH_TOKEN"
    );

  const oauth2Client =
    new google.auth.OAuth2(
      clientId,
      clientSecret
    );

  oauth2Client.setCredentials({
    refresh_token:
      refreshToken,
  });

  return google.drive({
    version: "v3",
    auth: oauth2Client,
  });
}

/* ========================================
   QUERY
======================================== */

function escapeDriveQueryValue(
  value: string
) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

/* ========================================
   TYPES
======================================== */

export type DriveItem = {
  id: string;
  name: string;
  mimeType: string;
  size: number | null;
  parents: string[];
  trashed: boolean;
  webViewLink: string;
  appProperties: Record<
    string,
    string
  >;
};

type CreateDriveFolderOptions = {
  appProperties?: Record<
    string,
    string
  >;
};

type CreateResumableUploadSessionOptions = {
  fileName: string;
  mimeType: string;
  fileSize: number;
  folderId: string;
  appProperties?: Record<
    string,
    string
  >;
};

type UploadDriveFileOptions = {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  folderId: string;
};

type VerifyDriveFileOptions = {
  fileId: string;
  folderId: string;
  allowedMimeTypes:
    | Set<string>
    | string[];
  maximumSize: number;
  expectedFileName?: string;
};

type MoveDriveFileOptions = {
  fileId: string;
  fromFolderId: string;
  toFolderId: string;
  fileName?: string;
};

/* ========================================
   NORMALIZE DRIVE ITEM
======================================== */

function normalizeDriveItem(
  file: {
    id?: string | null;
    name?: string | null;
    mimeType?: string | null;
    size?: string | null;
    parents?: string[] | null;
    trashed?: boolean | null;
    webViewLink?: string | null;
    appProperties?: {
      [key: string]:
        string | null;
    } | null;
  }
): DriveItem {
  const id =
    file.id?.trim();

  if (!id) {
    throw new Error(
      "Google Drive tidak mengembalikan ID file."
    );
  }

  const size =
    file.size &&
    /^\d+$/.test(file.size)
      ? Number(file.size)
      : null;

  return {
    id,

    name:
      file.name?.trim() ??
      "",

    mimeType:
      file.mimeType?.trim() ??
      "",

    size:
      size !== null &&
      Number.isSafeInteger(size)
        ? size
        : null,

    parents:
      Array.isArray(
        file.parents
      )
        ? file.parents
        : [],

    trashed:
      file.trashed === true,

    webViewLink:
      file.webViewLink?.trim() ??
      "",

    appProperties:
      Object.fromEntries(
        Object.entries(
          file.appProperties ??
            {}
        ).flatMap(
          ([key, value]) =>
            typeof value ===
            "string"
              ? [[key, value]]
              : []
        )
      ),
  };
}

/* ========================================
   FIND CHILD
======================================== */

export async function findDriveChildByName(
  name: string,
  parentFolderId: string,
  mimeType?: string
) {
  const drive =
    getDriveClient();

  const escapedName =
    escapeDriveQueryValue(
      name
    );

  const escapedParent =
    escapeDriveQueryValue(
      parentFolderId
    );

  const queryParts = [
    `name = '${escapedName}'`,
    `'${escapedParent}' in parents`,
    "trashed = false",
  ];

  if (mimeType) {
    queryParts.push(
      `mimeType = '${escapeDriveQueryValue(
        mimeType
      )}'`
    );
  }

  const response =
    await drive.files.list({
      q: queryParts.join(
        " and "
      ),

      spaces: "drive",

      fields:
        "files(id,name,mimeType,size,parents,trashed,webViewLink,appProperties)",

      pageSize: 10,
    });

  const files =
    response.data.files ??
    [];

  if (
    files.length === 0
  ) {
    return null;
  }

  return normalizeDriveItem(
    files[0]
  );
}

/* ========================================
   FIND CHILD FOLDER
======================================== */

export async function findChildFolder(
  name: string,
  parentFolderId: string
) {
  return findDriveChildByName(
    name,
    parentFolderId,
    DRIVE_FOLDER_MIME
  );
}

/* ========================================
   GET DRIVE ITEM
======================================== */

export async function getDriveFile(
  fileId: string
) {
  const normalizedFileId =
    fileId.trim();

  if (
    !normalizedFileId
  ) {
    throw new Error(
      "Google Drive file ID tidak valid."
    );
  }

  const drive =
    getDriveClient();

  try {
    const response =
      await drive.files.get({
        fileId:
          normalizedFileId,

        fields:
          "id,name,mimeType,size,parents,trashed,webViewLink,appProperties",
      });

    return normalizeDriveItem(
      response.data
    );
  } catch (error) {
    const status =
      (
        error as {
          code?: number;
          response?: {
            status?: number;
          };
        }
      )?.response
        ?.status ??
      (
        error as {
          code?: number;
        }
      )?.code;

    if (
      status === 404
    ) {
      return null;
    }

    throw error;
  }
}

/* ========================================
   CREATE FOLDER
======================================== */

export async function createDriveFolder(
  name: string,
  parentFolderId: string,
  options: CreateDriveFolderOptions = {}
) {
  const normalizedName =
    name.trim();

  const normalizedParent =
    parentFolderId.trim();

  if (
    !normalizedName ||
    !normalizedParent
  ) {
    throw new Error(
      "Nama atau parent folder Google Drive tidak valid."
    );
  }

  const drive =
    getDriveClient();

  const response =
    await drive.files.create({
      requestBody: {
        name:
          normalizedName,

        mimeType:
          DRIVE_FOLDER_MIME,

        parents: [
          normalizedParent,
        ],

        ...(options.appProperties
          ? {
              appProperties:
                options.appProperties,
            }
          : {}),
      },

      fields:
        "id,name,mimeType,size,parents,trashed,webViewLink,appProperties",
    });

  return normalizeDriveItem(
    response.data
  ).id;
}

/* ========================================
   GET OR CREATE FOLDER
======================================== */

export async function getOrCreateDriveFolder(
  name: string,
  parentFolderId: string
) {
  const existing =
    await findChildFolder(
      name,
      parentFolderId
    );

  if (existing) {
    return existing.id;
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
  const rootFolderId =
    getDriveRootFolderId();

  return getOrCreateDriveFolder(
    supplierId,
    rootFolderId
  );
}

export async function createSupplierFolder(
  supplierId: string
) {
  const rootFolderId =
    getDriveRootFolderId();

  return createDriveFolder(
    supplierId,
    rootFolderId
  );
}

/* ========================================
   SUBMISSION FOLDER
======================================== */

export async function createSubmissionFolder(
  supplierFolderId: string,
  submissionNo: number
) {
  if (
    !Number.isInteger(
      submissionNo
    ) ||
    submissionNo < 1
  ) {
    throw new Error(
      "Nomor submission tidak valid."
    );
  }

  return createDriveFolder(
    `Submission-${submissionNo}`,
    supplierFolderId
  );
}

/* ========================================
   PRODUCT FOLDER
======================================== */

export async function createProductFolder(
  submissionFolderId: string,
  productNumber: number
) {
  if (
    !Number.isInteger(
      productNumber
    ) ||
    productNumber < 1
  ) {
    throw new Error(
      "Nomor produk tidak valid."
    );
  }

  return createDriveFolder(
    `Produk-${productNumber}`,
    submissionFolderId
  );
}

/* ========================================
   TEMP REGISTRATION FOLDER
======================================== */

export async function createTemporaryRegistrationFolder(
  registrationToken: string,
  whatsapp?: string
) {
  const rootFolderId =
    getDriveRootFolderId();

  const normalizedToken =
    registrationToken.trim();

  if (
    !normalizedToken
  ) {
    throw new Error(
      "Registration token tidak valid."
    );
  }

  const appProperties: Record<
    string,
    string
  > = {
    registrationToken:
      normalizedToken,
  };

  if (whatsapp?.trim()) {
    appProperties.whatsapp =
      whatsapp.trim();
  }

  return createDriveFolder(
    `TEMP-${normalizedToken}`,
    rootFolderId,
    {
      appProperties,
    }
  );
}

export async function getTemporaryRegistrationFolder(
  registrationToken: string
) {
  const rootFolderId =
    getDriveRootFolderId();

  const normalizedToken =
    registrationToken.trim();

  if (
    !normalizedToken
  ) {
    return null;
  }

  return findChildFolder(
    `TEMP-${normalizedToken}`,
    rootFolderId
  );
}

/* ========================================
   UPLOAD FILE
======================================== */

export async function uploadDriveFile({
  buffer,
  fileName,
  mimeType,
  folderId,
}: UploadDriveFileOptions) {
  if (
    !Buffer.isBuffer(
      buffer
    ) ||
    buffer.length === 0
  ) {
    throw new Error(
      "Buffer file Google Drive tidak valid."
    );
  }

  const normalizedFileName =
    fileName.trim();

  const normalizedMimeType =
    mimeType.trim();

  const normalizedFolderId =
    folderId.trim();

  if (
    !normalizedFileName ||
    !normalizedMimeType ||
    !normalizedFolderId
  ) {
    throw new Error(
      "Data upload Google Drive tidak lengkap."
    );
  }

  const drive =
    getDriveClient();

  const response =
    await drive.files.create({
      requestBody: {
        name:
          normalizedFileName,

        parents: [
          normalizedFolderId,
        ],
      },

      media: {
        mimeType:
          normalizedMimeType,

        body:
          Readable.from(
            buffer
          ),
      },

      fields:
        "id,name,mimeType,size,parents,trashed,webViewLink,appProperties",
    });

  return normalizeDriveItem(
    response.data
  );
}

/* ========================================
   RESUMABLE SESSION
======================================== */

export async function createResumableUploadSession({
  fileName,
  mimeType,
  fileSize,
  folderId,
  appProperties,
}: CreateResumableUploadSessionOptions) {
  const normalizedFileName =
    fileName.trim();

  const normalizedMimeType =
    mimeType.trim();

  const normalizedFolderId =
    folderId.trim();

  if (
    !normalizedFileName ||
    !normalizedMimeType ||
    !normalizedFolderId
  ) {
    throw new Error(
      "Data resumable upload Google Drive tidak lengkap."
    );
  }

  if (
    !Number.isSafeInteger(
      fileSize
    ) ||
    fileSize <= 0
  ) {
    throw new Error(
      "Ukuran file resumable upload tidak valid."
    );
  }

  const drive =
    getDriveClient();

  const auth =
    drive.context
      ._options.auth;

  if (
    !auth ||
    typeof auth ===
      "string"
  ) {
    throw new Error(
      "Google Drive OAuth client tidak tersedia."
    );
  }

  const authClient =
    auth as {
      getAccessToken: () =>
        Promise<{
          token?: string | null;
        }>;
    };

  const accessTokenResponse =
    await authClient.getAccessToken();

  const accessToken =
    accessTokenResponse
      ?.token;

  if (!accessToken) {
    throw new Error(
      "Google Drive access token tidak tersedia."
    );
  }

  const response =
    await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,mimeType,size,parents,webViewLink",
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json; charset=UTF-8",

          "X-Upload-Content-Type":
            normalizedMimeType,

          "X-Upload-Content-Length":
            String(fileSize),
        },

        body: JSON.stringify({
          name:
            normalizedFileName,

          parents: [
            normalizedFolderId,
          ],

          ...(appProperties
            ? {
                appProperties,
              }
            : {}),
        }),
      }
    );

  if (!response.ok) {
    const responseText =
      await response.text();

    throw new Error(
      `Google Drive gagal membuat resumable upload session. ${response.status} ${responseText}`
    );
  }

  const uploadUrl =
    response.headers.get(
      "location"
    );

  if (!uploadUrl) {
    throw new Error(
      "Google Drive tidak mengembalikan resumable upload URL."
    );
  }

  return uploadUrl;
}

/* ========================================
   UPLOAD RESUMABLE CHUNK
======================================== */

export async function uploadResumableChunk({
  uploadUrl,
  buffer,
  start,
  end,
  total,
  mimeType,
}: {
  uploadUrl: string;
  buffer: Buffer;
  start: number;
  end: number;
  total: number;
  mimeType: string;
}) {
  if (
    !uploadUrl.startsWith(
      "https://www.googleapis.com/"
    )
  ) {
    throw new Error(
      "Google Drive upload URL tidak valid."
    );
  }

  if (
    !Buffer.isBuffer(buffer) ||
    buffer.length === 0
  ) {
    throw new Error(
      "Chunk upload tidak valid."
    );
  }

  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    !Number.isSafeInteger(total) ||
    start < 0 ||
    end < start ||
    total <= 0 ||
    end >= total ||
    buffer.length !==
      end - start + 1
  ) {
    throw new Error(
      "Rentang chunk upload tidak valid."
    );
  }

  const response =
    await fetch(
      uploadUrl,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            mimeType,

          "Content-Length":
            String(
              buffer.length
            ),

          "Content-Range":
            `bytes ${start}-${end}/${total}`,
        },

        body:
          new Uint8Array(
            buffer
          ),
      }
    );

  if (
    response.status === 308
  ) {
    return {
      complete: false,
    };
  }

  if (!response.ok) {
    const responseText =
      await response.text();

    throw new Error(
      `Google Drive gagal menerima chunk upload. ${response.status} ${responseText}`
    );
  }

  return {
    complete: true,
  };
}

/* ========================================
   VERIFY FILE
======================================== */

export async function verifyDriveFile({
  fileId,
  folderId,
  allowedMimeTypes,
  maximumSize,
  expectedFileName,
}: VerifyDriveFileOptions) {
  const file =
    await getDriveFile(
      fileId
    );

  if (!file) {
    throw new Error(
      "File Google Drive tidak ditemukan."
    );
  }

  if (file.trashed) {
    throw new Error(
      "File Google Drive sudah berada di trash."
    );
  }

  if (
    !file.parents.includes(
      folderId
    )
  ) {
    throw new Error(
      "Lokasi file Google Drive tidak sesuai."
    );
  }

  const allowedTypes =
    allowedMimeTypes instanceof
    Set
      ? allowedMimeTypes
      : new Set(
          allowedMimeTypes
        );

  if (
    !allowedTypes.has(
      file.mimeType
    )
  ) {
    throw new Error(
      "Format file Google Drive tidak sesuai."
    );
  }

  if (
    file.size === null ||
    !Number.isSafeInteger(
      file.size
    ) ||
    file.size <= 0
  ) {
    throw new Error(
      "Ukuran file Google Drive tidak valid."
    );
  }

  if (
    file.size >
    maximumSize
  ) {
    throw new Error(
      "Ukuran file Google Drive melebihi batas."
    );
  }

  if (
    expectedFileName &&
    file.name !==
      expectedFileName
  ) {
    throw new Error(
      "Nama file Google Drive tidak sesuai."
    );
  }

  return file;
}

/* ========================================
   MOVE / RENAME ITEM
======================================== */

export async function moveDriveFile({
  fileId,
  fromFolderId,
  toFolderId,
  fileName,
}: MoveDriveFileOptions) {
  const normalizedFileId =
    fileId.trim();

  const normalizedFrom =
    fromFolderId.trim();

  const normalizedTo =
    toFolderId.trim();

  if (
    !normalizedFileId ||
    !normalizedFrom ||
    !normalizedTo
  ) {
    throw new Error(
      "Data pemindahan Google Drive tidak lengkap."
    );
  }

  const existing =
    await getDriveFile(
      normalizedFileId
    );

  if (!existing) {
    throw new Error(
      "File atau folder Google Drive tidak ditemukan."
    );
  }

  if (
    !existing.parents.includes(
      normalizedFrom
    )
  ) {
    throw new Error(
      "Parent Google Drive asal tidak sesuai."
    );
  }

  const drive =
    getDriveClient();

  const response =
    await drive.files.update({
      fileId:
        normalizedFileId,

      addParents:
        normalizedTo,

      removeParents:
        normalizedFrom,

      requestBody:
        fileName?.trim()
          ? {
              name:
                fileName.trim(),
            }
          : undefined,

      fields:
        "id,name,mimeType,size,parents,trashed,webViewLink,appProperties",
    });

  return normalizeDriveItem(
    response.data
  );
}

/* ========================================
   MOVE / RENAME ITEM ALIAS
======================================== */

export async function moveAndRenameDriveItem({
  itemId,
  fromFolderId,
  toFolderId,
  newName,
}: {
  itemId: string;
  fromFolderId: string;
  toFolderId: string;
  newName?: string;
}) {
  return moveDriveFile({
    fileId:
      itemId,

    fromFolderId,

    toFolderId,

    fileName:
      newName,
  });
}

/* ========================================
   DELETE ITEM
======================================== */

export async function deleteDriveFile(
  fileId: string
) {
  const normalizedFileId =
    fileId.trim();

  if (
    !normalizedFileId
  ) {
    throw new Error(
      "Google Drive file ID tidak valid."
    );
  }

  const drive =
    getDriveClient();

  await drive.files.delete({
    fileId:
      normalizedFileId,
  });
}

export async function deleteDriveItem(
  itemId: string
) {
  return deleteDriveFile(
    itemId
  );
}

/* ========================================
   DRIVE ROOT
======================================== */

export function getGoogleDriveRootFolderId() {
  return getDriveRootFolderId();
}