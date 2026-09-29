"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

import { products } from "@/app/products/data";

export default function HomePage() {
  /* =====================================================
     WHY CHOOSE US
     ===================================================== */

  const whyTrackRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  /* =====================================================
     FEATURED PRODUCTS
     ===================================================== */

  const productTrackRef = useRef<HTMLDivElement>(null);

  const [showProductLeft, setShowProductLeft] = useState(false);
  const [showProductRight, setShowProductRight] = useState(true);

  /* =====================================================
     CHECK WHY CHOOSE US SCROLL
     ===================================================== */

  const checkScroll = () => {
    const track = whyTrackRef.current;

    if (!track) return;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    const currentScroll = track.scrollLeft;

    setShowLeftArrow(currentScroll > 5);

    setShowRightArrow(
      maxScroll - currentScroll > 5
    );
  };

  /* =====================================================
     CHECK FEATURED PRODUCTS SCROLL
     ===================================================== */

  const checkProductScroll = () => {
    const track = productTrackRef.current;

    if (!track) return;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    const currentScroll = track.scrollLeft;

    setShowProductLeft(currentScroll > 5);

    setShowProductRight(
      maxScroll - currentScroll > 5
    );
  };

  /* =====================================================
     WHY CHOOSE US SCROLL LISTENER
     ===================================================== */

  useEffect(() => {
    const track = whyTrackRef.current;

    if (!track) return;

    const handleScroll = () => {
      checkScroll();
    };

    const handleResize = () => {
      checkScroll();
    };

    handleScroll();

    track.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =====================================================
     FEATURED PRODUCTS SCROLL LISTENER
     ===================================================== */

  useEffect(() => {
    const track = productTrackRef.current;

    if (!track) return;

    const handleScroll = () => {
      checkProductScroll();
    };

    const handleResize = () => {
      checkProductScroll();
    };

    handleScroll();

    track.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* =====================================================
     GET CARD DISTANCE
     ===================================================== */

  const getCardDistance = (
    track: HTMLDivElement,
    selector: string
  ) => {
    const cards =
      track.querySelectorAll<HTMLElement>(selector);

    if (cards.length === 0) {
      return track.clientWidth;
    }

    if (cards.length === 1) {
      return cards[0].offsetWidth;
    }

    const firstCard = cards[0];
    const secondCard = cards[1];

    return (
      secondCard.offsetLeft -
      firstCard.offsetLeft
    );
  };

  /* =====================================================
     SCROLL SLIDER
     ===================================================== */

  const scrollSlider = (
    ref: {
      current: HTMLDivElement | null;
    },
    direction: "left" | "right",
    selector: string
  ) => {
    const track = ref.current;

    if (!track) return;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    const currentScroll = track.scrollLeft;

    const cardDistance = getCardDistance(
      track,
      selector
    );

    let targetScroll = currentScroll;

    /* -----------------------------
       RIGHT
       ----------------------------- */

    if (direction === "right") {
      targetScroll =
        currentScroll + cardDistance;

      /*
       * Jika sisa scroll kurang dari satu
       * card, langsung menuju ujung.
       */
      if (
        maxScroll - targetScroll <=
        cardDistance
      ) {
        targetScroll = maxScroll;
      }
    }

    /* -----------------------------
       LEFT
       ----------------------------- */

    if (direction === "left") {
      targetScroll =
        currentScroll - cardDistance;

      /*
       * Jika sudah dekat dengan awal,
       * langsung kembali ke posisi 0.
       */
      if (targetScroll <= cardDistance) {
        targetScroll = 0;
      }
    }

    /* -----------------------------
       SAFETY BOUNDARY
       ----------------------------- */

    targetScroll = Math.max(
      0,
      Math.min(targetScroll, maxScroll)
    );

    track.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  /* =====================================================
     WHY CHOOSE US DATA
     ===================================================== */

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

  /* =====================================================
     FEATURED PRODUCTS
     ===================================================== */

  const featuredProducts = products;

  /* =====================================================
     ARTICLES
     ===================================================== */

  const articles = [
    {
      img: "/assets/article-turmeric1.webp",
      alt: "Turmeric origin in Indonesia",
      title: "The Origin of Turmeric",
      date: "Jan 2025",
      desc: "Discover the origin of turmeric and how it is cultivated as one of Indonesia's important agricultural commodities.",
      link: "/articles/turmeric-origin",
    },
    {
      img: "/assets/article-ginger1.webp",
      alt: "Ginger cultivated in Ponorogo, East Java",
      title: "Ginger from Ponorogo, East Java",
      date: "Jan 2025",
      desc: "Ginger cultivated in Ponorogo, East Java, particularly in the Jenangan area, where agricultural land supports the cultivation of quality crops.",
      link: "/articles/ginger-origin",
    },
    {
      img: "/assets/article-ginger2.webp",
      alt: "Ginger plantation in Ponorogo",
      title: "Ginger Cultivation in Ponorogo",
      date: "Jan 2025",
      desc: "Ginger is cultivated in partnership with local farmers in Jenangan, with attention to responsible farming practices and maintaining soil quality.",
      link: "/articles/ginger-plantations",
    },
  ];

  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="home-hero">
        <div className="hero-content">
          <h1>Where Indonesian Flavors Meet the World</h1>

          <p>
            Delivering premium spices and herbs with
            international standards.
          </p>

          <Link
            href="/products"
            className="btn btn-primary"
          >
            Explore Products
          </Link>

          <Link
            href="/contact"
            className="btn btn-secondary"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
          ===================================================== */}

      <section className="why">
        <h2>Why Choose Us</h2>

        <div className="why-slider">
          {showLeftArrow && (
            <button
              type="button"
              className="arrow left"
              onClick={() =>
                scrollSlider(
                  whyTrackRef,
                  "left",
                  ".feature-box"
                )
              }
              aria-label="Scroll left"
            >
              &#10094;
            </button>
          )}

          <div
            className="why-track"
            ref={whyTrackRef}
          >
            {whyFeatures.map((feature, index) => (
              <div
                className="feature-box"
                key={index}
              >
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
              onClick={() =>
                scrollSlider(
                  whyTrackRef,
                  "right",
                  ".feature-box"
                )
              }
              aria-label="Scroll right"
            >
              &#10095;
            </button>
          )}
        </div>
      </section>

      {/* =====================================================
          FEATURED PRODUCTS
          ===================================================== */}

      <section className="featured">
        <h2>Featured Products</h2>

        <div className="product-slider">
          {showProductLeft && (
            <button
              type="button"
              className="arrow left"
              onClick={() =>
                scrollSlider(
                  productTrackRef,
                  "left",
                  ".product-card"
                )
              }
              aria-label="Scroll left"
            >
              &#10094;
            </button>
          )}

          <div
            className="product-track"
            ref={productTrackRef}
          >
            {featuredProducts.map((product) => (
              <div
                className="product-card"
                key={product.slug}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={200}
                  loading="lazy"
                />

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="product-overlay">
                  <Link
                    href={`/products/${product.slug}`}
                    className="btn-detail"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {showProductRight && (
            <button
              type="button"
              className="arrow right"
              onClick={() =>
                scrollSlider(
                  productTrackRef,
                  "right",
                  ".product-card"
                )
              }
              aria-label="Scroll right"
            >
              &#10095;
            </button>
          )}
        </div>
      </section>

      {/* =====================================================
          ARTICLES
          ===================================================== */}

      <section className="articles">
        <h2>Articles</h2>

        <div className="article-grid">
          {articles.map((article, index) => (
            <article
              className="article-card"
              key={index}
            >
              <Image
                src={article.img}
                alt={article.alt}
                width={400}
                height={260}
                loading="lazy"
              />

              <div className="article-content">
                <h3>{article.title}</h3>

                <time
                  className="date"
                  dateTime="2025-01"
                >
                  Published: {article.date}
                </time>

                <p>{article.desc}</p>

                <Link
                  href={article.link}
                  className="btn btn-secondary"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="see-more">
          <Link
            href="/articles"
            className="btn btn-primary"
          >
            See More Articles
          </Link>
        </div>
      </section>
    </>
  );
}