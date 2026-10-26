import { NextResponse } from "next/server";
import {
  sheets,
  spreadsheetId,
} from "@/lib/googleSheets";

export const runtime = "nodejs";

const ABSOLUTE_MAX_COMMODITIES = 5;

export async function GET() {
  try {
    const response =
      await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Settings!A:B",
      });

    const rows = response.data.values ?? [];

    const settings = new Map<string, string>();

    for (const row of rows.slice(1)) {
      const key = String(row[0] ?? "")
        .trim()
        .toLowerCase();

      const value = String(row[1] ?? "").trim();

      if (key) {
        settings.set(key, value);
      }
    }

    const registrationStatus =
    settings
      .get("supplier_registration")
      ?.toUpperCase() === "OPEN"
      ? "OPEN"
      : "CLOSED";

    const parsedMaxCommodities = Number.parseInt(
      settings.get("max_commodities") ?? "1",
      10
    );

    const maxCommodities =
      Number.isFinite(parsedMaxCommodities) &&
      parsedMaxCommodities >= 1
        ? Math.min(
            parsedMaxCommodities,
            ABSOLUTE_MAX_COMMODITIES
          )
        : 1;

    return NextResponse.json({
      success: true,
      registrationStatus,
      maxCommodities,
    });
  } catch (error) {
    console.error(
      "Supplier settings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Konfigurasi pendaftaran supplier tidak dapat dibaca.",
      },
      {
        status: 500,
      }
    );
  }
}