import Image from "next/image";
import Link from "next/link";

import { products } from "./data";


export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <section className="products-hero">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>
            Indonesian agricultural products prepared for food, spice, and
            ingredient applications.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="products-section">
        <div className="products-container">
          <h2>Product Collection</h2>

          <div className="products-grid">
            {products.map((product) => (
              <div key={product.slug} className="product-card">
                {/* PRODUCT IMAGE */}
                <div className="product-card-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* PRODUCT CONTENT */}
                <div className="product-card-content">
                  <h3>{product.name}</h3>

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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Request a Quote</h2>

        <p>
          Looking for a specific product or specification? Contact us to
          discuss your requirements and receive a quotation.
        </p>

        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </section>
    </>
  );
}