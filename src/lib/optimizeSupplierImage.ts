import "server-only";

import sharp from "sharp";

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function optimizeSupplierImage(
  file: File
) {
  if (
    !ALLOWED_IMAGE_TYPES.has(
      file.type
    )
  ) {
    throw new Error(
      "Format foto tidak didukung."
    );
  }

  if (
    file.size <= 0 ||
    file.size > MAX_FILE_SIZE
  ) {
    throw new Error(
      "Ukuran foto maksimal 5 MB."
    );
  }

  const arrayBuffer =
    await file.arrayBuffer();

  const inputBuffer =
    Buffer.from(arrayBuffer);

  try {
    const optimizedBuffer =
      await sharp(inputBuffer)
        .rotate()
        .resize({
          width: 1600,
          height: 1600,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 82,
          effort: 4,
        })
        .toBuffer();

    return {
      buffer:
        optimizedBuffer,
      mimeType:
        "image/webp",
      extension:
        "webp",
      originalSize:
        file.size,
      optimizedSize:
        optimizedBuffer.length,
    };
  } catch {
    throw new Error(
      "Foto tidak dapat diproses. Pastikan file merupakan gambar yang valid."
    );
  }
}