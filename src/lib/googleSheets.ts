import "server-only";

import { google } from "googleapis";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} belum diatur.`);
  }

  return value;
}

const spreadsheetId = getRequiredEnv("GOOGLE_SHEET_ID");
const clientEmail = getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");

const privateKey = getRequiredEnv(
  "GOOGLE_PRIVATE_KEY"
).replace(/\\n/g, "\n");

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export const sheets = google.sheets({
  version: "v4",
  auth,
});

export { spreadsheetId };