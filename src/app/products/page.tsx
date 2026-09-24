import Image from "next/image";
import Link from "next/link";
import { products } from "./data";
import "./[slug]/product-detail.css";

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <section className="products-hero">
        <div className="hero-content">
          <h1>Our Products</h1>
          <p>
            Premium agricultural products from Indonesia, processed with
            international quality standards for global markets.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-center text-2xl font-bold text-green-800 mb-10 font-serif">
          Product Collection
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.slug}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-3 text-center">
                  {product.name}
                </h3>

                <ul className="text-sm text-gray-600 flex-1 mb-4 space-y-1">
                <li><strong>Origin:</strong> {product.origin}</li>
                {product.type && (
                  <li><strong>Type:</strong> {product.type}</li>
                )}
                {product.grade && (
                  <li><strong>Grade:</strong> {product.grade}</li>
                )}
                <li><strong>Usage:</strong> {product.usage}</li>
              </ul>

                <div className="flex gap-2 mt-auto justify-center">
                  <Link
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                    className="btn-primary"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Request Export Quote</h2>
        <p>
          We supply premium agricultural products with consistent quality,
          flexible specifications, and reliable global shipping.
          Contact us today to receive your quotation.
        </p>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </section>
    </>
  );
}