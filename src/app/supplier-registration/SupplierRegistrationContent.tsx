"use client";

import { useEffect, useState } from "react";
import SupplierForm from "./SupplierForm";

type SettingsResponse = {
  success?: boolean;
  registrationStatus?: "OPEN" | "CLOSED";
  maxCommodities?: number;
  message?: string;
};

const ABSOLUTE_MAX_COMMODITIES = 5;

export default function SupplierRegistrationContent() {
  const [registrationStatus, setRegistrationStatus] =
    useState<"OPEN" | "CLOSED" | null>(null);

  const [maxCommodities, setMaxCommodities] =
    useState(1);

  const [settingsLoaded, setSettingsLoaded] =
    useState(false);

  /* ========================================
     LOAD SETTINGS
  ======================================== */

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch(
          "/api/supplier-registration/settings",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data =
          (await response.json()) as SettingsResponse;

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Pengaturan pendaftaran tidak dapat dimuat."
          );
        }

        setRegistrationStatus(
          data.registrationStatus === "OPEN"
            ? "OPEN"
            : "CLOSED"
        );

        if (
          typeof data.maxCommodities === "number"
        ) {
          setMaxCommodities(
            Math.max(
              1,
              Math.min(
                data.maxCommodities,
                ABSOLUTE_MAX_COMMODITIES
              )
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to load supplier settings:",
          error
        );

        setRegistrationStatus("CLOSED");
      } finally {
        setSettingsLoaded(true);
      }
    };

    loadSettings();
  }, []);

  /* ========================================
     LOADING
  ======================================== */

  if (!settingsLoaded) {
    return (
      <section className="supplier-loading-page">
        <div
          className="supplier-loading-card"
          role="status"
          aria-live="polite"
        >
          <div className="supplier-loading-visual">
            <div className="supplier-loading-ring" />

            <div className="supplier-loading-icon">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M19.5 4.5C14 4.7 9.8 6.3 7.2 9.2C5 11.6 4.5 14.4 5.1 17.1C7.8 17.7 10.6 17 12.8 14.9C15.5 12.4 17.2 8.6 19.5 4.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M5.2 19.5C7.2 15.2 10.6 11.8 15.3 8.9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <span className="supplier-loading-eyebrow">
            Supplier Registration
          </span>

          <h2>
            Menyiapkan Formulir
            <br />
            Pendaftaran
          </h2>

          <p>
            Mohon tunggu sebentar. Kami sedang
            menyiapkan informasi dan formulir
            pendaftaran supplier untuk Anda.
          </p>

          <div
            className="supplier-loading-dots"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <div className="supplier-loading-brand">
            PT Dwi Srikandi Bakoh
          </div>
        </div>
      </section>
    );
  }

/* ========================================
   CLOSED
======================================== */

if (registrationStatus !== "OPEN") {
  return (
    <section className="supplier-closed-page">
      <div className="supplier-closed-card">
        <div className="supplier-closed-icon">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M7 10V7a5 5 0 0 1 10 0v3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />

            <rect
              x="5"
              y="10"
              width="14"
              height="10"
              rx="2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />

            <path
              d="M12 14v2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <span className="supplier-closed-eyebrow">
          Supplier Registration
        </span>

        <h1>
          Pendaftaran Supplier
          <br />
          Sedang Ditutup
        </h1>

        <p className="supplier-closed-description">
          Saat ini PT Dwi Srikandi Bakoh belum
          membuka pendaftaran supplier baru.
          Pendaftaran akan dibuka kembali sesuai
          kebutuhan pengadaan kami.
        </p>

        <div className="supplier-closed-divider" />

        <p className="supplier-closed-note">
          Silakan kunjungi halaman ini kembali
          untuk mengetahui pembukaan pendaftaran
          berikutnya.
        </p>

        <a
          href="/"
          className="supplier-closed-button"
        >
          Kembali ke Website
        </a>

        <span className="supplier-closed-brand">
          PT Dwi Srikandi Bakoh
        </span>
      </div>
    </section>
  );
}

  /* ========================================
     OPEN
  ======================================== */

  return (
    <>
      <section className="supplier-hero">
        <div className="supplier-hero-inner">
          <span className="supplier-eyebrow">
            Supplier Registration
          </span>

          <h1>
            Daftar Sebagai Calon Supplier
          </h1>

          <p>
            PT Dwi Srikandi Bakoh membuka kesempatan
            bagi petani, produsen, pengolah, pengepul,
            dan distributor untuk menawarkan produk
            sesuai kebutuhan pengadaan kami.
          </p>
        </div>
      </section>

      <section className="supplier-content">
        <div className="supplier-form-container">
          <div className="supplier-intro">
            <span>
              Supplier Partnership
            </span>

            <h2>
              Informasi Calon Supplier
            </h2>

            <p>
              Lengkapi informasi berikut dengan data
              yang benar dan sesuai dengan produk yang
              Anda tawarkan. Setiap pendaftaran akan
              melalui proses review terlebih dahulu.
            </p>
          </div>

          <SupplierForm
            maxCommodities={maxCommodities}
          />
        </div>
      </section>
    </>
  );
}