import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../data";
import "./product-detail.css";

// Generate static paths for all products
export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>; // Next.js 15+ uses Promise
}

export default async function ProductPage({ params }: Props) {
  // Await params in Next.js 15+
  const { slug } = await params;
  
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return notFound();
  }

  return (
    <section className="pn-hero">
      <div className="pn-hero-content">
        <h1>{product.name}</h1>
        <p className="pn-subtitle">{product.usage}</p>

        <div className="pn-detail">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            priority
          />

          <div className="pn-info">
            <h2>Product Details</h2>
            <p><strong>Origin:</strong> {product.origin}</p>
            <p><strong>Grade:</strong> {product.grade}</p>
            <p><strong>Usage:</strong> {product.usage}</p>
            <p>{product.description}</p>

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

// Generate metadata for SEO
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - Indonesian Spices`,
    description: product.description,
  };
}