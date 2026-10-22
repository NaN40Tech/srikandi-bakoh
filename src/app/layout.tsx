import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ptsrikandibakoh.com"),

  title: {
    default:
      "Indonesian Spices & Agricultural Products Supplier | PT Dwi Srikandi Bakoh",
    template: "%s | PT Dwi Srikandi Bakoh",
  },

  description:
    "PT Dwi Srikandi Bakoh is an Indonesian supplier of spices and agricultural products, serving domestic and international buyers with reliable sourcing and clear communication.",

  applicationName: "PT Dwi Srikandi Bakoh",

  creator: "PT Dwi Srikandi Bakoh",

  publisher: "PT Dwi Srikandi Bakoh",

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

    siteName: "PT Dwi Srikandi Bakoh",

    title:
      "Indonesian Spices & Agricultural Products Supplier | PT Dwi Srikandi Bakoh",

    description:
      "Reliable sourcing of Indonesian spices and agricultural products for domestic and international buyers.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Indonesian Spices & Agricultural Products Supplier | PT Dwi Srikandi Bakoh",

    description:
      "Reliable sourcing of Indonesian spices and agricultural products for domestic and international buyers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="/styles.css"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>

      <body>
        {/* ========================================
            HEADER
        ======================================== */}

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
              priority
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


        {/* ========================================
            MAIN
        ======================================== */}

        <main>
          {children}
        </main>


        {/* ========================================
            FOOTER
        ======================================== */}

        <footer>
          <div className="footer-container">
            {/* BRAND */}

            <div className="footer-brand">
              <Image
                src="/assets/logo.webp"
                alt="PT Dwi Srikandi Bakoh"
                width={70}
                height={70}
                className="footer-logo"
              />

              <h3>
                PT Dwi Srikandi Bakoh
              </h3>

              <p>
                Rooted in Indonesia, Trusted Worldwide.
              </p>

              <div className="social-icons">
                <a
                  href="https://www.tiktok.com/@dwisrikandibakoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <i
                    className="fa-brands fa-tiktok"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61590384339444"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <i
                    className="fa-brands fa-facebook-f"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.threads.com/@ptdwisrikandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                >
                  <i
                    className="fa-brands fa-threads"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.instagram.com/ptdwisrikandi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i
                    className="fa-brands fa-instagram"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/company/ptdwisrikandibakoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i
                    className="fa-brands fa-linkedin-in"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>


            {/* QUICK LINKS */}

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


            {/* CONTACT */}

            <div className="footer-contact">
              <h3>
                Contact
              </h3>

              <p>
                <i
                  className="fa-solid fa-envelope"
                  aria-hidden="true"
                />

                <a href="mailto:ptdwisrikandibakoh@gmail.com">
                  ptdwisrikandibakoh@gmail.com
                </a>
              </p>

              <p>
                <i
                  className="fa-brands fa-whatsapp"
                  aria-hidden="true"
                />

                <a
                  href="https://wa.me/6281232366354"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 812-3236-6354
                </a>
              </p>

              <p>
                <i
                  className="fa-brands fa-whatsapp"
                  aria-hidden="true"
                />

                <a
                  href="https://wa.me/6282232294053"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 822-3229-4053
                </a>
              </p>

              <p>
                <i
                  className="fa-brands fa-whatsapp"
                  aria-hidden="true"
                />

                <a
                  href="https://wa.me/6285159017001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 851-5901-7001
                </a>
              </p>

              <p>
                <i
                  className="fa-solid fa-location-dot"
                  aria-hidden="true"
                />

                <span>
                  Ponorogo, Jawa Timur, Indonesia
                </span>
              </p>
            </div>
          </div>


          {/* FOOTER BOTTOM */}

          <div className="footer-bottom">
            <p>
              &copy; 2026 PT Dwi Srikandi Bakoh. All rights reserved.
            </p>
          </div>
        </footer>


        {/* ========================================
            LEGACY MENU SCRIPT
        ======================================== */}

        <script
          src="/script.js"
          async
        />
      </body>
    </html>
  );
}