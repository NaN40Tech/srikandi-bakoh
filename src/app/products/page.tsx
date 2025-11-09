import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Nutmeg",
    img: "/assets/nutmeg.webp",
    specs: ["Origin: Indonesia", "Moisture: 10–12%", "Packaging: 25kg bag"],
  },
  {
    name: "Clove",
    img: "/assets/clove.webp",
    specs: ["Origin: Indonesia", "Size: 5–7 mm", "Packaging: 20kg bag"],
  },
  {
    name: "Cinnamon",
    img: "/assets/cinnamon.webp",
    specs: ["Origin: Indonesia", "Form: Powder", "Packaging: 25kg carton"],
  },
  {
    name: "Ginger",
    img: "/assets/ginger.webp",
    specs: ["Origin: Ponorogo", "Form: Dried", "Packaging: 20kg sack"],
  },
  {
    name: "Turmeric",
    img: "/assets/turmeric.webp",
    specs: ["Origin: Indonesia", "Form: Dried", "Packaging: 25kg bag"],
  },
  {
    name: "Cardamom",
    img: "/assets/cardamom.webp",
    specs: ["Origin: Indonesia", "Form: Whole", "Packaging: 25kg sack"],
  },
  {
    name: "Black Pepper",
    img: "/assets/blackpepper.webp",
    specs: ["Origin: Indonesia", "Form: Whole", "Packaging: 25kg bag"],
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
            Premium Indonesian spices exported worldwide with trusted quality
            standards.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-center text-2xl font-bold text-green-800 mb-10 font-serif">
          Spice Collection
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
                  {product.specs.map((s, i) => (
                    <li key={i}>{s}</li>
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
    We provide premium Indonesian spices with consistent quality and
    reliable global shipping. Contact us today to get your quotation.
  </p>
  <a href="/contact" className="btn btn-primary">
    Contact Us
  </a>
</section>
    </>
  );
}
