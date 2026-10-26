import { NextRequest, NextResponse } from "next/server";
import { sheets, spreadsheetId } from "@/lib/googleSheets";

export const runtime = "nodejs";

function normalizeWhatsApp(value: string) {
  let phone = value.replace(/\D/g, "");

  if (phone.startsWith("0")) {
    phone = `62${phone.slice(1)}`;
  } else if (phone.startsWith("8")) {
    phone = `62${phone}`;
  }

  return phone;
}

function isValidWhatsApp(value: string) {
  return /^628[0-9]{7,11}$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (typeof body.whatsapp !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Nomor WhatsApp wajib diisi.",
        },
        { status: 400 }
      );
    }

    const whatsapp = normalizeWhatsApp(body.whatsapp);

    if (!isValidWhatsApp(whatsapp)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Format nomor WhatsApp tidak valid. Gunakan format 628xxxxxxxxxx.",
        },
        { status: 400 }
      );
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Suppliers!A:P",
    });

    const rows = response.data.values ?? [];

    if (rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Header tab Suppliers belum tersedia.",
        },
        { status: 500 }
      );
    }

    const headers = rows[0].map((header) =>
      String(header).trim()
    );

    const whatsappColumnIndex = headers.indexOf("WhatsApp");

    if (whatsappColumnIndex === -1) {
      console.error(
        'Kolom "WhatsApp" tidak ditemukan pada tab Suppliers.'
      );

      return NextResponse.json(
        {
          success: false,
          message: "Konfigurasi database supplier belum sesuai.",
        },
        { status: 500 }
      );
    }

    const submissionCount = rows
      .slice(1)
      .filter((row) => {
        const storedWhatsApp = normalizeWhatsApp(
          String(row[whatsappColumnIndex] ?? "")
        );

        return storedWhatsApp === whatsapp;
      }).length;

    if (submissionCount >= 2) {
      return NextResponse.json(
        {
          success: false,
          allowed: false,
          message:
            "Nomor WhatsApp ini telah mencapai batas maksimal pendaftaran.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      allowed: true,
      submissionNo: submissionCount + 1,
      whatsapp,
    });
  } catch (error) {
    console.error("Supplier registration check error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Terjadi kesalahan saat memeriksa pendaftaran. Silakan coba kembali.",
      },
      { status: 500 }
    );
  }
}