import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Srikandi Barokah",
  description: "Export Indonesian spices worldwide",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Styles tetap pakai CSS eksternal */}
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        {/* HEADER */}
        <header>
          <Link href="/" className="logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Image
              src="/assets/logo.webp"
              alt="PT Srikandi Barokah Logo"
              width={50}
              height={50}
              priority
              style={{ marginRight: "8px" }}
            />
            <strong>PT Srikandi Barokah</strong>
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
            <div className="footer-brand">
              <Image
                src="/assets/logo.webp"
                alt="Logo"
                className="footer-logo"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
              <h3>PT Srikandi Bakoh</h3>
              <p>Bringing Indonesia’s finest spices to the global stage.</p>
              <div className="social-icons">
                <a href="https://instagram.com/..." target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com/company/..." target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/products">Products</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className="footer-contact">
              <h4>Contact</h4>
              <p>
                <i className="fas fa-envelope"></i> info@srikandibarokah.com
              </p>
              <p>
                <i className="fas fa-phone"></i> +62 812 3456 7890
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> Ponorogo, Jawa Timur
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 PT Srikandi Bakoh. All rights reserved.</p>
          </div>
        </footer>

        {/* async */}
        <script src="/script.js" async></script>
      </body>
    </html>
  );
}
