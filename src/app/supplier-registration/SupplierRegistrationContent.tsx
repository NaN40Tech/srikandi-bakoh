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
      <section className="supplier-content">
        <div className="supplier-form-container">
          <div className="supplier-form-message">
            Memuat formulir pendaftaran...
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
      <section className="supplier-content">
        <div className="supplier-form-container">
          <section className="supplier-closed">
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
                    strokeWidth="1.8"
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
                    strokeWidth="1.8"
                  />

                  <path
                    d="M12 14v2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <span className="supplier-closed-eyebrow">
                Pendaftaran Supplier
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

              <div className="supplier-closed-status">
                <div>
                  <span>Status Pendaftaran</span>
                  <strong>
                    Supplier Registration
                  </strong>
                </div>

                <div className="supplier-closed-badge">
                  <span />
                  Ditutup
                </div>
              </div>

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

              <div className="supplier-closed-footer">
                PT Dwi Srikandi Bakoh
              </div>
            </div>
          </section>
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

          <h1>Daftar Sebagai Calon Supplier</h1>

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
            <span>Supplier Partnership</span>

            <h2>Informasi Calon Supplier</h2>

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