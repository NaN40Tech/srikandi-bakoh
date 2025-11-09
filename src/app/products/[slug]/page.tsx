import Image from "next/image";
import Link from "next/link";
import { products } from "../data"; // pastikan path sesuai struktur project
import { notFound } from "next/navigation";
import "./product-detail.css";

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  return (
    <section className="pn-hero">
      <div className="pn-hero-content">
        <h1>{product.name}</h1>
        <p className="pn-subtitle">{product.usage}</p>

        {/* DETAIL BOX */}
        <div className="pn-detail">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            style={{ borderRadius: "12px" }}
            priority
          />
          <div className="pn-info">
            <h2>Product Details</h2>
            <p>
              <strong>Origin:</strong> {product.origin}
            </p>
            <p>
              <strong>Grade:</strong> {product.grade}
            </p>
            <p>
              <strong>Usage:</strong> {product.usage}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>

            <div className="pn-actions">
              <Link
                href={`/contact?product=${product.name}`}
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
