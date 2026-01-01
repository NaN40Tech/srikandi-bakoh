import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Indonesian Spices for the World</h1>
          <p>Delivering premium spices and herbs with international standards.</p>
          <Link href="/products" className="btn btn-primary">
            Explore Products
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Get a Quote
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <h2>Why Choose Us</h2>
        <div className="why-slider">
          <button className="arrow left" aria-label="Scroll left" suppressHydrationWarning>
            &#10094;
          </button>
          <div className="why-track">
            {[
              {
                src: "/assets/icon-quality.webp",
                alt: "Premium Quality",
                title: "Premium Quality",
                desc: "Carefully selected spices with international standards.",
              },
              {
                src: "/assets/icon-trace.webp",
                alt: "Traceability",
                title: "Traceability",
                desc: "Full transparency from farm to export packaging.",
              },
              {
                src: "/assets/icon-global.webp",
                alt: "Global Export",
                title: "Global Export",
                desc: "Supplying partners worldwide with trust and consistency.",
              },
              {
                src: "/assets/icon-sustain.webp",
                alt: "Sustainability",
                title: "Sustainability",
                desc: "Working with farmers to ensure eco-friendly and ethical sourcing.",
              },
              {
                src: "/assets/icon-support.webp",
                alt: "Customer Support",
                title: "Customer Support",
                desc: "Dedicated team to assist with inquiries and international trade needs.",
              },
            ].map((f, i) => (
              <div className="feature-box" key={i}>
                <Image src={f.src} alt={f.alt} width={60} height={60} loading="lazy" />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
          <button className="arrow right" aria-label="Scroll right" suppressHydrationWarning>
            &#10095;
          </button>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-slider">
          <button className="arrow left" aria-label="Scroll left" suppressHydrationWarning>
            &#10094;
          </button>
          <div className="product-track">
            {[
            {
              name: "Rice",
              slug: "rice",
              img: "/assets/rice.webp",
              desc: "High-quality Indonesian rice cultivated with sustainable farming practices.",
            },
            {
              name: "Ginger",
              slug: "ginger",
              img: "/assets/ginger.webp",
              desc: "Fresh and dried ginger with strong aroma and premium quality.",
            },
            {
              name: "Turmeric",
              slug: "turmeric",
              img: "/assets/turmeric.webp",
              desc: "Natural turmeric with bright color and rich curcumin content.",
            },
          ].map((p) => (
            <div className="product-card" key={p.slug}>
              <Image src={p.img} alt={p.name} width={250} height={200} loading="lazy" />
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <div className="product-overlay">
                <Link href={`/products/${p.slug}`} className="btn-detail">
                  See Details
                </Link>
              </div>
            </div>
          ))}

          </div>
          <button className="arrow right" aria-label="Scroll right" suppressHydrationWarning>
            &#10095;
          </button>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="articles">
        <h2>Articles</h2>
        <div className="article-grid">
          
          <div className="article-card">
          <Image
            src="/assets/article-rice1.webp"
            alt="Premium rice selection East Java"
            width={400}
            height={260}
            loading="lazy"
          />
          <div className="article-content">
            <h3>Carefully Selected in Every Grain, Excellence Served in Every Meal</h3>
            <span className="date">Published: Jan 2025</span>
            <p>
              Premium rice sourced from selected local farmers in East Java, processed
              with modern technology to preserve purity, taste, and consistent quality
              from harvest to table.
            </p>
            <Link href="/articles/premium-rice" className="btn btn-secondary">
              Read More
            </Link>
          </div>
        </div>

          <div className="article-card">
            <Image
              src="/assets/article-ginger1.webp"
              alt="Ginger origin Ponorogo"
              width={400}
              height={260}
              loading="lazy"
            />
            <div className="article-content">
              <h3>The Origin of Ginger</h3>
              <span className="date">Published: Jan 2025</span>
              <p>
                Our ginger is cultivated in Ponorogo, East Java—specifically the Jenangan area,
                known for its fertile volcanic soil and premium crop quality.
              </p>
              <Link href="/articles/ginger-origin" className="btn btn-secondary">
                Read More
              </Link>
            </div>
          </div>

          <div className="article-card">
            <Image
              src="/assets/article-ginger2.webp"
              alt="Ginger plantation Ponorogo"
              width={400}
              height={260}
              loading="lazy"
            />
            <div className="article-content">
              <h3>Ginger Plantations</h3>
              <span className="date">Published: Jan 2025</span>
              <p>
                Our ginger plantations are managed together with local farmers in Jenangan,
                using eco-friendly farming methods to preserve soil fertility.
              </p>
              <Link href="/article-ginger" className="btn btn-secondary">
                Read More
              </Link>
            </div>
          </div>

          <div className="article-card">
            <Image
              src="/assets/article-turmeric1.webp"
              alt="Turmeric origin Ponorogo"
              width={400}
              height={260}
              loading="lazy"
            />
            <div className="article-content">
              <h3>The Origin of Turmeric</h3>
              <span className="date">Published: Jan 2025</span>
              <p>
                Our turmeric comes from Ponorogo Jenangan, a region rich in natural minerals that
                produce bright-colored turmeric with strong flavor and aroma.
              </p>
              <Link href="/article-turmeric" className="btn btn-secondary">
                Read More
              </Link>
            </div>
          </div>
        </div>

        <div className="see-more">
          <Link href="/articles" className="btn btn-primary">
            See More Articles
          </Link>
        </div>
      </section>
    </>
  );
}
