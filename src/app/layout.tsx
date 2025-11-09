import type { Metadata } from "next";
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
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        {/* HEADER */}
        <header>
          <a href="/" className="logo">
            <img
              src="/assets/logo.webp"
              alt="PT Srikandi Barokah Logo"
              width="50"
              height="50"
            />
            <strong>PT Srikandi Barokah</strong>
          </a>
          <button className="menu-toggle" aria-label="Toggle Menu">
            &#9776;
          </button>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/products">Products</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main>{children}</main>

        {/* FOOTER */}
        <footer>
          <div className="footer-container">
            <div className="footer-brand">
              <img src="/assets/logo.webp" alt="Logo" className="footer-logo" />
              <h3>PT Srikandi Bakoh</h3>
              <p>Bringing Indonesia’s finest spices to the global stage.</p>
              <div className="social-icons">
                <a href="https://instagram.com/..." target="_blank">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com/company/..." target="_blank">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/products">Products</a>
              <a href="/contact">Contact</a>
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

        {/* SCRIPT */}
        <script src="/script.js"></script>
      </body>
    </html>
  );
}
