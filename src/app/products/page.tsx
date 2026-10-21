import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { products } from "./data";

export const metadata: Metadata = {
  title: "Indonesian Spices & Agricultural Products",

  description:
    "Explore Indonesian spices and agricultural products supplied by PT Dwi Srikandi Bakoh, including dried sliced turmeric and other selected commodities.",

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title:
      "Indonesian Spices & Agricultural Products | PT Dwi Srikandi Bakoh",
    description:
      "Explore Indonesian spices and agricultural products supplied by PT Dwi Srikandi Bakoh, including dried sliced turmeric and other selected commodities.",
    url: "/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <section className="products-hero">
        <div className="hero-content">
          <h1>Indonesian Spices & Agricultural Products</h1>

          <p>
            Explore our selection of Indonesian spices and agricultural
            commodities for food, spice, and ingredient applications.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-section">
        <div className="products-container">
          <h2>Our Product Collection</h2>

          <div className="products-grid">
            {products.map((product) => (
              <article key={product.slug} className="product-card">
                {/* PRODUCT IMAGE */}
                <div className="product-card-image">
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} from Indonesia`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </Link>
                </div>

                {/* PRODUCT CONTENT */}
                <div className="product-card-content">
                  <h3>
                    <Link
                      href={`/products/${product.slug}`}
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  {/* PRODUCT SPECIFICATIONS */}
                  <div className="product-specs">
                    <div>
                      <span>Origin</span>
                      <strong>{product.origin}</strong>
                    </div>

                    {product.grade && (
                      <div>
                        <span>Grade</span>
                        <strong>{product.grade}</strong>
                      </div>
                    )}

                    <div>
                      <span>Usage</span>
                      <strong>{product.usage}</strong>
                    </div>

                    {product.moisture && (
                      <div>
                        <span>Moisture</span>
                        <strong>{product.moisture}</strong>
                      </div>
                    )}

                    {product.ash && (
                      <div>
                        <span>Ash</span>
                        <strong>{product.ash}</strong>
                      </div>
                    )}

                    {product.packing && (
                      <div className="product-spec-full">
                        <span>Packing</span>
                        <strong>{product.packing}</strong>
                      </div>
                    )}
                  </div>

                  {/* REQUEST QUOTE */}
                  <Link
                    href={`/contact?product=${encodeURIComponent(
                      product.name
                    )}`}
                    className="product-quote-btn"
                  >
                    Request Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Looking for Indonesian Spices?</h2>

        <p>
          Tell us the product, specification, and quantity you require. Our
          team will review your requirements and provide further information
          and a quotation.
        </p>

        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </section>
    </>
  );
}