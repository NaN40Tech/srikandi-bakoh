import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ptsrikandibakoh.com"),

  title: {
    default: "Indonesian Spices Supplier | PT Dwi Srikandi Bakoh",
    template: "%s | PT Dwi Srikandi Bakoh",
  },

  description:
    "PT Dwi Srikandi Bakoh supplies Indonesian spices and agricultural commodities for domestic and international buyers.",

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
    siteName: "PT Dwi Srikandi Bakoh",
    title: "Indonesian Spices Supplier | PT Dwi Srikandi Bakoh",
    description:
      "PT Dwi Srikandi Bakoh supplies Indonesian spices and agricultural commodities for domestic and international buyers.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Indonesian Spices Supplier | PT Dwi Srikandi Bakoh",
    description:
      "PT Dwi Srikandi Bakoh supplies Indonesian spices and agricultural commodities for domestic and international buyers.",
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
        {/* External Styles */}
        <link rel="stylesheet" href="/styles.css" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
      </head>

      <body>
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
              alt="PT Dwi Srikandi Bakoh Logo"
              width={50}
              height={50}
              priority
              style={{ marginRight: "8px" }}
            />

            <strong>PT Dwi Srikandi Bakoh</strong>
          </Link>

          <button className="menu-toggle" aria-label="Toggle Menu">
            &#9776;
          </button>

          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer>
          <div className="footer-container">
            {/* BRAND */}
            <div className="footer-brand">
              <Image
                src="/assets/logo.webp"
                alt="PT Dwi Srikandi Bakoh Logo"
                className="footer-logo"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />

              <h3>PT Dwi Srikandi Bakoh</h3>

              <p>Rooted in Indonesia, Trusted Worldwide.</p>

              <div className="social-icons">
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@dwisrikandibakoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PT Dwi Srikandi Bakoh on TikTok"
                >
                  <i className="fab fa-tiktok"></i>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61590384339444"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PT Dwi Srikandi Bakoh on Facebook"
                >
                  <i className="fab fa-facebook"></i>
                </a>

                {/* Threads */}
                <a
                  href="https://www.threads.com/@ptdwisrikandi"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PT Dwi Srikandi Bakoh on Threads"
                >
                  <i className="fab fa-threads"></i>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ptdwisrikandi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PT Dwi Srikandi Bakoh on Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/ptdwisrikandibakoh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="PT Dwi Srikandi Bakoh on LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="footer-links">
              <h4>Quick Links</h4>

              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/products">Products</Link>
              <Link href="/contact">Contact</Link>
            </div>

            {/* CONTACT */}
            <div className="footer-contact">
              <h4>Contact</h4>

              <p>
                <i className="fas fa-envelope"></i>{" "}
                <a href="mailto:ptdwisrikandibakoh@gmail.com">
                  ptdwisrikandibakoh@gmail.com
                </a>
              </p>

              <p>
                <i className="fas fa-phone"></i>{" "}
                <a
                  href="https://wa.me/6281232366354"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 812-3236-6354 (Admin 1)
                </a>
              </p>

              <p>
                <i className="fas fa-phone"></i>{" "}
                <a
                  href="https://wa.me/6282232294053"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 822-3229-4053 (Admin 2)
                </a>
              </p>

              <p>
                <i className="fas fa-phone"></i>{" "}
                <a
                  href="https://wa.me/6285159017001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +62 851-5901-7001 (Admin 3)
                </a>
              </p>

              <p>
                <i className="fas fa-map-marker-alt"></i> Ponorogo, Jawa Timur
              </p>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="footer-bottom">
            <p>
              &copy; 2026 PT Dwi Srikandi Bakoh. All rights reserved.
            </p>
          </div>
        </footer>

        {/* SCRIPT */}
        <script src="/script.js" async></script>
      </body>
    </html>
  );
}