import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { products, type Product } from "../data";
import ProductDetailGallery from "./ProductDetailGallery";

import "./product-detail.css";

const SITE_URL = "https://ptsrikandibakoh.com";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* ========================================
   GET PRODUCT
======================================== */

function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/* ========================================
   STATIC PARAMS
======================================== */

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/* ========================================
   METADATA
======================================== */

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | PT Dwi Srikandi Bakoh",
      description: "The requested product could not be found.",
    };
  }

  const canonical = `${SITE_URL}/products/${product.slug}`;

  return {
    title: `${product.name} Supplier from Indonesia | PT Dwi Srikandi Bakoh`,
    description: product.description,

    alternates: {
      canonical,
    },

    openGraph: {
      title: `${product.name} Supplier from Indonesia`,
      description: product.description,
      url: canonical,
      siteName: "PT Dwi Srikandi Bakoh",
      type: "website",

      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} Supplier from Indonesia`,
      description: product.description,
      images: [product.image],
    },
  };
}

/* ========================================
   PRODUCT DETAIL
======================================== */

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const specifications = [
    {
      label: "Origin",
      value: product.origin,
    },
    {
      label: "Product Form",
      value: product.type,
    },
    {
      label: "Grade / Slicing",
      value: product.grade,
    },
    {
      label: "Processing",
      value: product.processing,
    },
    {
      label: "Color",
      value: product.color,
    },
    {
      label: "Aroma",
      value: product.aroma,
    },
    {
      label: "Moisture",
      value: product.moisture,
    },
    {
      label: "Ash Content",
      value: product.ash,
    },
    {
      label: "Supply Capacity",
      value: product.supplyCapacity,
    },
    {
      label: "Packing",
      value: product.packing,
    },
  ].filter(
    (
      item
    ): item is {
      label: string;
      value: string;
    } => Boolean(item.value)
  );

  const quickInfo = [
    {
      label: "Origin",
      value: product.origin,
    },
    {
      label: "Product Form",
      value: product.type,
    },
    {
      label: "Packing",
      value: product.packing,
    },
  ].filter(
    (
      item
    ): item is {
      label: string;
      value: string;
    } => Boolean(item.value)
  );

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,
    description: product.description,

    image: galleryImages.map((image) => `${SITE_URL}${image}`),

    url: `${SITE_URL}/products/${product.slug}`,

    brand: {
      "@type": "Brand",
      name: "PT Dwi Srikandi Bakoh",
    },

    countryOfOrigin: {
      "@type": "Country",
      name: product.origin,
    },

    additionalProperty: specifications.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <main className="product-detail-page">
      {/* STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      {/* PRODUCT INTRO */}

      <section className="product-detail-hero">
        <div className="product-detail-container">
          <div className="product-detail-hero-grid">
            {/* GALLERY */}

            <div className="product-detail-gallery-column">
              <ProductDetailGallery
                images={galleryImages}
                productName={product.name}
                origin={product.origin}
              />
            </div>

            {/* PRODUCT INFORMATION */}

            <div className="product-detail-info">
              <span className="product-detail-label">
                Indonesian Agricultural Product
              </span>

              <h1>{product.name}</h1>

              <p className="product-detail-intro">
                {product.description}
              </p>

              {/* QUICK INFORMATION */}

              <div className="product-detail-quick-info">
                {quickInfo.map((item) => (
                  <div
                    className="product-detail-quick-item"
                    key={item.label}
                  >
                    <span>{item.label}</span>

                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              {/* USAGE */}

              {product.usage && (
                <div className="product-detail-usage">
                  <span className="product-detail-usage-label">
                    Suitable For
                  </span>

                  <p>{product.usage}</p>
                </div>
              )}

              {/* ACTIONS */}

              <div className="product-detail-actions">
                <Link
                  href={`/contact?product=${encodeURIComponent(
                    product.name
                  )}`}
                  className="product-detail-primary-btn"
                >
                  Request a Quote

                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/products"
                  className="product-detail-secondary-btn"
                >
                  View All Products
                </Link>
              </div>

              <p className="product-detail-note">
                Product specifications, quantity, packing, and
                delivery requirements can be discussed according to
                buyer needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SPECIFICATIONS */}

      <section className="product-detail-spec-section">
        <div className="product-detail-container">
          <div className="product-detail-section-heading">
            <span>Product Information</span>

            <h2>Product Specifications</h2>

            <p>
              Key product information for sourcing and buyer
              evaluation.
            </p>
          </div>

          <div className="product-detail-spec-card">
            {specifications.map((specification, index) => (
              <div
                className="product-detail-spec-item"
                key={specification.label}
              >
                <span className="product-detail-spec-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="product-detail-spec-content">
                  <span className="product-detail-spec-label">
                    {specification.label}
                  </span>

                  <strong>{specification.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PRODUCT */}

      <section className="product-detail-about">
        <div className="product-detail-about-container">
          <div className="product-detail-section-heading product-detail-about-heading">
            <span>Product Overview</span>

            <h2>About {product.name}</h2>
          </div>

          <div className="product-detail-description">
            {product.longDescription.map((paragraph, index) => (
              <p
                key={`${product.slug}-description-${index}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY CTA */}

      <section className="product-detail-cta">
        <div className="product-detail-cta-inner">
          <span className="product-detail-cta-label">
            Buyer Inquiry
          </span>

          <h2>Looking for {product.name}?</h2>

          <p>
            Send us your required specification, quantity, packing,
            and delivery destination. Our team will review your
            requirements before preparing an offer.
          </p>

          <div className="product-detail-cta-actions">
            <Link
              href={`/contact?product=${encodeURIComponent(
                product.name
              )}`}
              className="product-detail-cta-primary"
            >
              Request Product Information

              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/products"
              className="product-detail-cta-secondary"
            >
              Explore Other Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}