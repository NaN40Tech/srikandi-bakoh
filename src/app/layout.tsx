import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT Dwi Srikandi Bakoh",
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
        <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
  />
      </head>
      <body>
        {/* HEADER */}
        <header>
          <Link href="/" className="logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
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
            <div className="footer-brand">
              <Image
                src="/assets/logo.webp"
                alt="Logo"
                className="footer-logo"
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
              <h3>PT Dwi Srikandi Bakoh</h3>
              <p>Rooted in Indonesia, Trusted Worldwide.</p>
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
              <i className="fas fa-envelope"></i> ptdwisrikandibakoh@gmail.com
            </p>
            <p>
              <i className="fas fa-phone"></i>{" "}
              <a href="https://wa.me/6281232366354" target="_blank" rel="noopener noreferrer">
                +62 812-3236-6354 (Admin 1)
              </a>
            </p>
            <p>
              <i className="fas fa-phone"></i>{" "}
              <a href="https://wa.me/6285604950653" target="_blank" rel="noopener noreferrer">
                +62 856-0495-0653 (Admin 2)
              </a>
            </p>
            <p>
              <i className="fas fa-phone"></i>{" "}
              <a href="https://wa.me/6285159017001" target="_blank" rel="noopener noreferrer">
                +62 851-5901-7001 (Admin 3)
              </a>
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i> Ponorogo, Jawa Timur
            </p>
          </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 PT Dwi Srikandi Bakoh. All rights reserved.</p>
          </div>
        </footer>

        {/* async */}
        <script src="/script.js" async></script>
      </body>
    </html>
  );
}
