"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function HomePage() {
  const whyTrackRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (whyTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = whyTrackRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const trackElement = whyTrackRef.current;
    if (trackElement) {
      trackElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        trackElement.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 300;
      const newScrollLeft = ref.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
      ref.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  const whyFeatures = [
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
  ];

  const featuredProducts = [
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
  ];

  const articles = [
  {
    img: "/assets/article-rice1.webp",
    alt: "Premium rice selection East Java",
    title: "Carefully Selected in Every Grain, Excellence Served in Every Meal",
    date: "Jan 2025",
    desc: "Premium rice sourced from selected local farmers in East Java, processed with modern technology to preserve purity, taste, and consistent quality from harvest to table.",
    link: "/articles/premium-rice",
  },
  {
    img: "/assets/article-ginger1.webp",
    alt: "Ginger origin Ponorogo",
    title: "The Origin of Ginger",
    date: "Jan 2025",
    desc: "Our ginger is cultivated in Ponorogo, East Java—specifically the Jenangan area, known for its fertile volcanic soil and premium crop quality.",
    link: "/articles/ginger-origin",
  },
  {
    img: "/assets/article-ginger2.webp",
    alt: "Ginger plantation Ponorogo",
    title: "Ginger Plantations",
    date: "Jan 2025",
    desc: "Our ginger plantations are managed together with local farmers in Jenangan, using eco-friendly farming methods to preserve soil fertility.",
    link: "/articles/ginger-plantations", 
  },
];

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
          {showLeftArrow && (
            <button
              type="button"
              className="arrow left"
              onClick={() => scroll(whyTrackRef, "left")}
              aria-label="Scroll left"
            >
              &#10094;
            </button>
          )}
          <div className="why-track" ref={whyTrackRef}>
            {whyFeatures.map((feature, index) => (
              <div className="feature-box" key={index}>
                <Image
                  src={feature.src}
                  alt={feature.alt}
                  width={60}
                  height={60}
                  loading="lazy"
                />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
          {showRightArrow && (
            <button
              type="button"
              className="arrow right"
              onClick={() => scroll(whyTrackRef, "right")}
              aria-label="Scroll right"
            >
              &#10095;
            </button>
          )}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid-center">
          {featuredProducts.map((product) => (
            <div className="product-card" key={product.slug}>
              <Image
                src={product.img}
                alt={product.name}
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>{product.name}</h3>
              <p>{product.desc}</p>
              <div className="product-overlay">
                <Link href={`/products/${product.slug}`} className="btn-detail">
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLES */}
      <section className="articles">
        <h2>Articles</h2>
        <div className="article-grid">
          {articles.map((article, index) => (
            <article className="article-card" key={index}>
              <Image
                src={article.img}
                alt={article.alt}
                width={400}
                height={260}
                loading="lazy"
              />
              <div className="article-content">
                <h3>{article.title}</h3>
                <time className="date" dateTime="2025-01">
                  Published: {article.date}
                </time>
                <p>{article.desc}</p>
                <Link href={article.link} className="btn btn-secondary">
                  Read More
                </Link>
              </div>
            </article>
          ))}
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