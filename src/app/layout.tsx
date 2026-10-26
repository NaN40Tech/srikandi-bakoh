import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Playfair_Display, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import "./styles.css";

/* ========================================
   FONTS
======================================== */

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-playfair",
});

/* ========================================
   METADATA
======================================== */

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://ptsrikandibakoh.com"
  ),

  title: {
    default:
      "Indonesian Spices Supplier | PT Dwi Srikandi Bakoh",
    template:
      "%s | PT Dwi Srikandi Bakoh",
  },

  description:
    "PT Dwi Srikandi Bakoh is an Indonesian supplier of spices and agricultural products, serving domestic and international buyers with reliable sourcing and clear communication.",

  applicationName:
    "PT Dwi Srikandi Bakoh",
  creator:
    "PT Dwi Srikandi Bakoh",
  publisher:
    "PT Dwi Srikandi Bakoh",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName:
      "PT Dwi Srikandi Bakoh",

    title:
      "Indonesian Spices Supplier | PT Dwi Srikandi Bakoh",

    description:
      "Reliable sourcing of Indonesian spices and agricultural products for domestic and international buyers.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Indonesian Spices Supplier | PT Dwi Srikandi Bakoh",

    description:
      "Reliable sourcing of Indonesian spices and agricultural products for domestic and international buyers.",
  },
};

/* ========================================
   ORGANIZATION SCHEMA
======================================== */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id":
    "https://ptsrikandibakoh.com/#organization",

  name:
    "PT Dwi Srikandi Bakoh",

  url:
    "https://ptsrikandibakoh.com",

  logo: {
    "@type": "ImageObject",

    url:
      "https://ptsrikandibakoh.com/assets/logo.webp",
  },

  description:
    "PT Dwi Srikandi Bakoh is an Indonesian supplier of spices and agricultural products serving domestic and international buyers.",

  email:
    "ptdwisrikandibakoh@gmail.com",

  address: {
    "@type":
      "PostalAddress",

    streetAddress:
      "Jl. Raya Jenangan No. 109",

    addressLocality:
      "Ponorogo",

    addressRegion:
      "Jawa Timur",

    postalCode:
      "63492",

    addressCountry:
      "ID",
  },

  sameAs: [
    "https://www.tiktok.com/@dwisrikandibakoh",
    "https://www.facebook.com/profile.php?id=61590384339444",
    "https://www.threads.com/@ptdwisrikandi",
    "https://www.instagram.com/ptdwisrikandi/",
    "https://www.linkedin.com/company/ptdwisrikandibakoh",
  ],
};

/* ========================================
   ICONS
======================================== */

function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M14 3v10.1a4.1 4.1 0 1 1-3.5-4.05v2.15a2.1 2.1 0 1 0 1.5 2V3h2Zm0 0c.3 2.2 1.55 3.5 3.5 4.1V9.3A7.05 7.05 0 0 1 14 7.7V3Z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M13.5 22v-9h3l.45-3h-3.45V8.08c0-.87.24-1.46 1.52-1.46H17V3.94c-.34-.05-1.5-.14-2.85-.14-2.82 0-4.75 1.72-4.75 4.88V10H6.2v3h3.2v9h4.1Z"
      />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2C6.49 2 3 5.62 3 11.79 3 18.35 6.8 22 12.25 22c4.37 0 7.63-2.32 8.38-5.91.55-2.66-.32-4.7-2.47-5.84-.16-4.04-2.42-6.45-6.12-6.45-2.46 0-4.36.96-5.63 2.86l1.63 1.22c.92-1.34 2.2-2 3.95-2 2.43 0 3.83 1.37 4.06 3.84a9.6 9.6 0 0 0-3.56-.66c-3.18 0-5.22 1.55-5.22 3.94 0 2.15 1.77 3.63 4.31 3.63 2.88 0 5.02-1.66 6.05-4.62 1.05.76 1.37 1.9 1.06 3.39-.53 2.58-2.93 4.3-6.07 4.3-4.33 0-7.19-2.94-7.19-7.91 0-4.94 2.66-7.68 6.56-7.68 3.9 0 6.52 2.55 6.95 6.81l2.08-.2C20.5 4.83 17.22 2 12 2Zm-.34 12.57c-1.32 0-2.18-.62-2.18-1.57 0-1.12 1.12-1.81 2.94-1.81 1.22 0 2.38.25 3.43.74-.72 1.78-2.14 2.64-4.19 2.64Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11.5 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M5.4 7.7H2.2V22h3.2V7.7ZM3.8 2A1.9 1.9 0 1 0 3.8 5.8 1.9 1.9 0 0 0 3.8 2ZM22 13.8c0-4.3-2.3-6.3-5.35-6.3-2.47 0-3.57 1.36-4.19 2.31V7.7H9.25V22h3.21v-7.08c0-1.87.35-3.68 2.67-3.68 2.29 0 2.32 2.14 2.32 3.8V22H22v-8.2Z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18v12H3V6Zm0 1 9 6 9-6"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12.05 2A9.83 9.83 0 0 0 3.6 16.83L2 22l5.3-1.54A9.93 9.93 0 1 0 12.05 2Zm0 17.86a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-3.14.91.94-3.06-.19-.31A7.76 7.76 0 1 1 12.05 19.86Zm4.27-5.82c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.52.12-.16.23-.6.76-.74.92-.14.15-.27.17-.5.05-.23-.12-.98-.36-1.87-1.15a7.04 7.04 0 0 1-1.29-1.6c-.14-.23-.01-.36.1-.48.1-.1.23-.27.35-.4.11-.14.15-.24.23-.4.08-.15.04-.29-.02-.4-.06-.12-.52-1.26-.72-1.73-.19-.45-.38-.39-.52-.4h-.45c-.16 0-.41.06-.62.29-.22.23-.82.8-.82 1.95 0 1.14.84 2.25.95 2.4.12.16 1.65 2.52 4 3.54.56.24 1 .39 1.34.5.56.18 1.07.15 1.47.09.45-.07 1.38-.57 1.58-1.11.19-.55.19-1.02.13-1.12-.05-.1-.21-.16-.44-.27Z"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
    </svg>
  );
}

/* ========================================
   ROOT LAYOUT
======================================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                organizationSchema
              ),
          }}
        />

        {/* HEADER */}
        <header>
          <Link
            href="/"
            className="logo"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Image
              src="/assets/logo.webp"
              alt="PT Dwi Srikandi Bakoh"
              width={50}
              height={50}
              sizes="50px"
              style={{
                marginRight: "8px",
              }}
            />

            <strong>
              PT Dwi Srikandi Bakoh
            </strong>
          </Link>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle Menu"
            aria-expanded="false"
          >
            &#9776;
          </button>

          <nav aria-label="Main navigation">
            <Link href="/">
              Home
            </Link>

            <Link href="/about">
              About
            </Link>

            <Link href="/products">
              Products
            </Link>

            <Link href="/contact">
              Contact
            </Link>
          </nav>
        </header>

        <main>
          {children}
        </main>

        {/* FOOTER */}
        <footer>
          <div className="footer-container">
            <div className="footer-brand">
              <Image
                src="/assets/logo.webp"
                alt="PT Dwi Srikandi Bakoh"
                width={70}
                height={70}
                className="footer-logo"
                sizes="70px"
              />

              <h3>
                PT Dwi Srikandi Bakoh
              </h3>

              <p>
                Rooted in Indonesia,
                Trusted Worldwide.
              </p>

              <div className="social-icons">
                <a
                  href="https://www.tiktok.com/@dwisrikandibakoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61590384339444"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://www.threads.com/@ptdwisrikandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                >
                  <ThreadsIcon />
                </a>

                <a
                  href="https://www.instagram.com/ptdwisrikandi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.linkedin.com/company/ptdwisrikandibakoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h3>
                Quick Links
              </h3>

              <Link href="/">
                Home
              </Link>

              <Link href="/about">
                About
              </Link>

              <Link href="/products">
                Products
              </Link>

              <Link href="/articles">
                Articles
              </Link>

              <Link href="/contact">
                Contact
              </Link>
            </div>

            <div className="footer-contact">
              <h3>
                Contact
              </h3>

              <p>
                <span
                  className="footer-contact-icon"
                  aria-hidden="true"
                >
                  <MailIcon />
                </span>

                <a
                  href="mailto:ptdwisrikandibakoh@gmail.com"
                >
                  ptdwisrikandibakoh@gmail.com
                </a>
              </p>

              <p>
                <span
                  className="footer-contact-icon"
                  aria-hidden="true"
                >
                  <WhatsAppIcon />
                </span>

                <a
                  href="https://wa.me/6281232366354"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 812-3236-6354 (Admin 1)
                </a>
              </p>

              <p>
                <span
                  className="footer-contact-icon"
                  aria-hidden="true"
                >
                  <WhatsAppIcon />
                </span>

                <a
                  href="https://wa.me/6282232294053"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 822-3229-4053 (Admin 2)
                </a>
              </p>

              <p>
                <span
                  className="footer-contact-icon"
                  aria-hidden="true"
                >
                  <WhatsAppIcon />
                </span>

                <a
                  href="https://wa.me/6285159017001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 851-5901-7001 (Admin 3)
                </a>
              </p>

              <p>
                <span
                  className="footer-contact-icon"
                  aria-hidden="true"
                >
                  <LocationIcon />
                </span>

                <span>
                  Ponorogo, Jawa Timur,
                  Indonesia
                </span>
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © 2026 PT Dwi Srikandi
              Bakoh. All rights reserved.
            </p>
          </div>
        </footer>

        <Script
          src="/script.js"
          strategy="afterInteractive"
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}