import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { products } from "./data";
import ProductImageSlider from "./ProductImageSlider";

import "./products.css";


export const metadata: Metadata = {
  title:
    "Indonesian Spices & Agricultural Products",

  description:
    "Explore Indonesian spices and agricultural products supplied by PT Dwi Srikandi Bakoh for domestic and international buyers.",

  alternates: {
    canonical:
      "/products",
  },

  openGraph: {
    type:
      "website",

    url:
      "/products",

    title:
      "Indonesian Spices & Agricultural Products | PT Dwi Srikandi Bakoh",

    description:
      "Explore Indonesian spices and agricultural products available for domestic and international buyer inquiries.",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Indonesian Spices & Agricultural Products | PT Dwi Srikandi Bakoh",

    description:
      "Explore Indonesian spices and agricultural products available for domestic and international buyer inquiries.",
  },
};


export default function ProductsPage() {
  return (
    <>
      {/* ========================================
          HERO
      ======================================== */}

      <section className="products-page-hero">
        <Image
          src="/assets/product-detail.webp"
          alt="Indonesian spices and agricultural products"
          fill
          priority
          fetchPriority="high"
          quality={68}
          sizes="100vw"
          className="products-page-hero-image"
          aria-hidden="true"
        />

        <div
          className="products-page-hero-overlay"
          aria-hidden="true"
        />

        <div className="products-page-hero-inner">
          <span className="products-page-eyebrow">
            Indonesian Products
          </span>

          <h1>
            Indonesian Spices &amp;
            Agricultural Products
          </h1>

          <p>
            Review available products,
            specifications, and packing
            information for your sourcing
            requirements.
          </p>
        </div>
      </section>


      {/* ========================================
          PRODUCT CATALOG
      ======================================== */}

      <section className="products-catalog">
        <div className="products-page-container">

          <div className="products-catalog-heading">
            <span className="products-page-label">
              Product Catalog
            </span>

            <h2>
              Our Products
            </h2>

            <p>
              Product information is shown
              directly so you can quickly
              review the specifications
              relevant to your inquiry.
            </p>
          </div>


          <div className="products-catalog-list">
            {products.map(
              (product) => {
                /*
                  Kalau images ada,
                  gunakan semua images.

                  Kalau belum ada,
                  gunakan primary image.
                */
                const gallery =
                  product.images &&
                  product.images.length >
                    0
                    ? product.images
                    : [
                        product.image,
                      ];


                const specs = [
                  {
                    label:
                      "Origin",

                    value:
                      product.origin,
                  },

                  {
                    label:
                      "Type",

                    value:
                      product.type,
                  },

                  {
                    label:
                      "Grade",

                    value:
                      product.grade,
                  },

                  {
                    label:
                      "Moisture",

                    value:
                      product.moisture,
                  },

                  {
                    label:
                      "Ash",

                    value:
                      product.ash,
                  },

                  {
                    label:
                      "Packing",

                    value:
                      product.packing,
                  },
                ].filter(
                  (
                    spec
                  ): spec is {
                    label: string;
                    value: string;
                  } =>
                    Boolean(
                      spec.value
                    )
                );


                return (
                  <article
                    key={
                      product.slug
                    }
                    className="products-catalog-card"
                  >
                    {/* ==============================
                        IMAGE CAROUSEL
                    ============================== */}

                    <div className="products-catalog-media">
                      <ProductImageSlider
                        images={
                          gallery
                        }
                        productName={
                          product.name
                        }
                      />

                      <span className="products-catalog-badge">
                        Indonesian Product
                      </span>
                    </div>


                    {/* ==============================
                        PRODUCT INFO
                    ============================== */}

                    <div className="products-catalog-content">

                      <div className="products-catalog-top">
                        {product.usage && (
                          <span className="products-catalog-usage">
                            {
                              product.usage
                            }
                          </span>
                        )}

                        <h2>
                          <Link
                            href={`/products/${product.slug}`}
                          >
                            {
                              product.name
                            }
                          </Link>
                        </h2>

                        <p>
                          {
                            product.description
                          }
                        </p>
                      </div>


                      {/* ==============================
                          SPECIFICATIONS
                      ============================== */}

                      {specs.length >
                        0 && (
                        <div className="products-catalog-specs">
                          {specs.map(
                            (
                              spec
                            ) => (
                              <div
                                key={
                                  spec.label
                                }
                                className="products-catalog-spec-row"
                              >
                                <span className="products-catalog-spec-label">
                                  {
                                    spec.label
                                  }
                                </span>

                                <span className="products-catalog-spec-value">
                                  {
                                    spec.value
                                  }
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}


                      {/* ==============================
                          ACTIONS
                      ============================== */}

                      <div className="products-catalog-actions">
                        <Link
                          href={`/products/${product.slug}`}
                          className="products-catalog-details"
                        >
                          View Details

                          <span
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </Link>

                        <Link
                          href={`/contact?product=${encodeURIComponent(
                            product.name
                          )}`}
                          className="products-catalog-quote"
                        >
                          Request Quote
                        </Link>
                      </div>

                    </div>
                  </article>
                );
              }
            )}
          </div>

        </div>
      </section>


      {/* ========================================
          CTA
      ======================================== */}

      <section className="products-page-cta">
        <div className="products-page-cta-inner">

          <span className="products-page-cta-label">
            Buyer Inquiry
          </span>

          <h2>
            Need a Specific Product Requirement?
          </h2>

          <p>
            Send us your required product,
            specification, quantity, packing,
            and delivery destination so we can
            review your inquiry.
          </p>

          <div className="products-page-cta-actions">
            <Link
              href="/contact"
              className="products-page-cta-primary"
            >
              Send Product Inquiry
            </Link>

            <Link
              href="/about"
              className="products-page-cta-secondary"
            >
              About Our Company
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}