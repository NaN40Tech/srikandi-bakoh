import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Rice",
    img: "/assets/rice.webp",
    specs: [
      "Origin: East Java, Indonesia",
      "Grades: Premium, Medium, Broken (Menir)",
      "Packaging: Bulk & Retail Options",
    ],
  },
  {
    name: "Ginger",
    img: "/assets/ginger.webp",
    specs: [
      "Origin: Ponorogo, East Java",
      "Form: Fresh, Dried, Sliced, Powder",
      "Packaging: 20–25 kg sack",
    ],
  },
  {
    name: "Turmeric",
    img: "/assets/turmeric.webp",
    specs: [
      "Origin: East Java, Indonesia",
      "Form: Fresh, Dried, Powder",
      "Packaging: 20–25 kg bag",
    ],
  },
];

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
              key={product.name}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <Image
                src={product.img}
                alt={product.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  {product.name}
                </h3>

                <ul className="text-sm text-gray-600 flex-1 mb-4 space-y-1">
                  {product.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>

                <Link
                  href={`/contact?product=${product.name}`}
                  className="btn-primary mt-auto"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Request Export Quote</h2>
        <p>
          We supply rice, ginger, and turmeric with consistent quality,
          flexible specifications, and reliable global shipping.
          Contact us today to receive your quotation.
        </p>
        <Link href="/contact" className="btn btn-primary">
          Contact Us
        </Link>
      </section>
    </>
  );
}
