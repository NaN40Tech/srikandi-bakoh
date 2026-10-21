import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "../data";
import "./product-detail.css";

interface Props {
  params: Promise<{ slug: string }>;
}

/* Generate static paths for all products */
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/* Generate metadata for SEO */
export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = products.find((product) => product.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `/products/${product.slug}`;

  return {
    title: product.name,

    description: product.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      type: "website",
      url: productUrl,
      title: `${product.name} | PT Dwi Srikandi Bakoh`,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: `${product.name} from Indonesia`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | PT Dwi Srikandi Bakoh`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="pn-hero">
      <div className="pn-hero-content">
        <h1>{product.name}</h1>

        <p className="pn-subtitle">{product.usage}</p>

        <div className="pn-detail">
          <Image
            src={product.image}
            alt={`${product.name} from Indonesia`}
            width={400}
            height={300}
            priority
          />

          <div className="pn-info">
            <h2>Product Details</h2>

            <p>
              <strong>Origin:</strong> {product.origin}
            </p>

            {product.type && (
              <p>
                <strong>Type:</strong> {product.type}
              </p>
            )}

            {product.grade && (
              <p>
                <strong>Grade:</strong> {product.grade}
              </p>
            )}

            <p>
              <strong>Usage:</strong> {product.usage}
            </p>

            {product.moisture && (
              <p>
                <strong>Moisture:</strong> {product.moisture}
              </p>
            )}

            {product.ash && (
              <p>
                <strong>Ash:</strong> {product.ash}
              </p>
            )}

            {product.packing && (
              <p>
                <strong>Packing:</strong> {product.packing}
              </p>
            )}

            <p className="pn-description">{product.description}</p>

            <div className="pn-actions">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="pn-btn primary"
              >
                Request Quote
              </Link>

              <Link href="/products" className="pn-btn secondary">
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}