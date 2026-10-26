import type { Metadata } from "next";
import Link from "next/link";

import "../supplier-registration.css";

export const metadata: Metadata = {
  title: "Pendaftaran Supplier Berhasil | PT Dwi Srikandi Bakoh",
  description:
    "Pendaftaran calon supplier PT Dwi Srikandi Bakoh berhasil dikirim.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupplierThankYouPage() {
  return (
    <main className="supplier-page">
      <section className="supplier-thank-you">
        <div className="supplier-thank-you-container">
          <div className="supplier-thank-you-card">
            <div
              className="supplier-success-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="supplier-success-check"
                  d="M5 12.5L9.25 16.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="supplier-thank-you-content">
              <span className="supplier-thank-you-label">
                Pendaftaran Terkirim
              </span>

              <h1>Terima Kasih</h1>

              <p className="supplier-thank-you-lead">
                Pendaftaran Anda sebagai calon supplier PT Dwi
                Srikandi Bakoh telah berhasil kami terima.
              </p>

              <div
                className="supplier-thank-you-divider"
                aria-hidden="true"
              />

              <div className="supplier-thank-you-info">
                <h2>Apa yang terjadi selanjutnya?</h2>

                <p>
                  Tim kami akan meninjau informasi, produk, dan
                  penawaran yang telah Anda kirimkan. Apabila sesuai
                  dengan kebutuhan pengadaan kami, tim PT Dwi Srikandi
                  Bakoh akan menghubungi Anda melalui kontak yang telah
                  didaftarkan.
                </p>

                <div className="supplier-thank-you-note">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M12 10.5V16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="7.5"
                      r="1"
                      fill="currentColor"
                    />
                  </svg>

                  <p>
                    Tidak diperlukan pengiriman ulang formulir untuk
                    pendaftaran yang sama.
                  </p>
                </div>
              </div>

              <Link
                href="/"
                className="supplier-thank-you-button"
              >
                <span>Kembali ke Website</span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <p className="supplier-thank-you-company">
                PT Dwi Srikandi Bakoh
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}