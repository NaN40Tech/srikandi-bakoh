import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "../data";
import "./product-detail.css";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}


/* ========================================
   GENERATE STATIC PRODUCT ROUTES
======================================== */

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}


/* ========================================
   PRODUCT METADATA
======================================== */

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find(
    (product) =>
      product.slug === slug
  );

  if (!product) {
    return {
      title: "Product Not Found",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl =
    `/products/${product.slug}`;

  return {
    title: product.name,

    description:
      product.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",

      url: productUrl,

      title:
        `${product.name} | PT Dwi Srikandi Bakoh`,

      description:
        product.description,

      images: [
        {
          url: product.image,

          alt:
            `${product.name} from Indonesia`,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        `${product.name} | PT Dwi Srikandi Bakoh`,

      description:
        product.description,

      images: [
        product.image,
      ],
    },
  };
}


/* ========================================
   PRODUCT PAGE
======================================== */

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = products.find(
    (product) =>
      product.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <section className="pn-hero">
      <div className="pn-hero-content">

        {/* ========================================
            PAGE HEADING
        ======================================== */}

        <div className="pn-hero-heading">
          <span className="pn-eyebrow">
            Indonesian Product
          </span>

          <h1>
            {product.name}
          </h1>

          <p className="pn-subtitle">
            {product.usage}
          </p>
        </div>


        {/* ========================================
            PRODUCT DETAIL
        ======================================== */}

        <div className="pn-detail">

          {/* PRODUCT IMAGE */}

          <div className="pn-image-panel">
            <Image
              src={product.image}
              alt={`${product.name} from Indonesia`}
              width={600}
              height={650}
              priority
              className="pn-image"
            />
          </div>


          {/* PRODUCT INFORMATION */}

          <div className="pn-info">
            <div className="pn-info-header">
              <span className="pn-info-label">
                Product Information
              </span>

              <h2>
                Product Details
              </h2>
            </div>


            {/* SPECIFICATIONS */}

            <div className="pn-specs">
              <div className="pn-spec-item">
                <span className="pn-spec-label">
                  Origin
                </span>

                <span className="pn-spec-value">
                  {product.origin}
                </span>
              </div>


              {product.type && (
                <div className="pn-spec-item">
                  <span className="pn-spec-label">
                    Type
                  </span>

                  <span className="pn-spec-value">
                    {product.type}
                  </span>
                </div>
              )}


              {product.grade && (
                <div className="pn-spec-item">
                  <span className="pn-spec-label">
                    Grade
                  </span>

                  <span className="pn-spec-value">
                    {product.grade}
                  </span>
                </div>
              )}


              <div className="pn-spec-item">
                <span className="pn-spec-label">
                  Usage
                </span>

                <span className="pn-spec-value">
                  {product.usage}
                </span>
              </div>


              {product.moisture && (
                <div className="pn-spec-item">
                  <span className="pn-spec-label">
                    Moisture
                  </span>

                  <span className="pn-spec-value">
                    {product.moisture}
                  </span>
                </div>
              )}


              {product.ash && (
                <div className="pn-spec-item">
                  <span className="pn-spec-label">
                    Ash
                  </span>

                  <span className="pn-spec-value">
                    {product.ash}
                  </span>
                </div>
              )}


              {product.packing && (
                <div className="pn-spec-item">
                  <span className="pn-spec-label">
                    Packing
                  </span>

                  <span className="pn-spec-value">
                    {product.packing}
                  </span>
                </div>
              )}
            </div>


            {/* DESCRIPTION */}

            <div className="pn-description-wrap">
              <p className="pn-description">
                {product.description}
              </p>
            </div>


            {/* ACTIONS */}

            <div className="pn-actions">
              <Link
                href={`/contact?product=${encodeURIComponent(
                  product.name
                )}`}
                className="pn-btn primary"
              >
                Request Quote
              </Link>

              <Link
                href="/products"
                className="pn-btn secondary"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}