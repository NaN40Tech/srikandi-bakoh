"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { products } from "@/app/products/data";

export default function HomePage() {
  /* =====================================================
     WHY CHOOSE US
     ===================================================== */

  const whyTrackRef = useRef<HTMLDivElement>(null);

  const [
    showLeftArrow,
    setShowLeftArrow,
  ] = useState(false);

  const [
    showRightArrow,
    setShowRightArrow,
  ] = useState(true);


  /* =====================================================
     FEATURED PRODUCTS
     ===================================================== */

  const productTrackRef =
    useRef<HTMLDivElement>(null);

  const [
    showProductLeft,
    setShowProductLeft,
  ] = useState(false);

  const [
    showProductRight,
    setShowProductRight,
  ] = useState(true);


  /* =====================================================
     CHECK WHY SCROLL
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
     CHECK PRODUCT SCROLL
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
     WHY SCROLL LISTENER
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

    track.addEventListener(
      "scroll",
      handleScroll
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      track.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);


  /* =====================================================
     PRODUCT SCROLL LISTENER
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

    track.addEventListener(
      "scroll",
      handleScroll
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      track.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
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
      track.querySelectorAll<HTMLElement>(
        selector
      );

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
      track.scrollWidth -
      track.clientWidth;

    const currentScroll =
      track.scrollLeft;

    const cardDistance =
      getCardDistance(
        track,
        selector
      );

    let targetScroll = currentScroll;

    if (direction === "right") {
      targetScroll =
        currentScroll + cardDistance;

      if (
        maxScroll - targetScroll <=
        cardDistance
      ) {
        targetScroll = maxScroll;
      }
    }

    if (direction === "left") {
      targetScroll =
        currentScroll - cardDistance;

      if (targetScroll <= cardDistance) {
        targetScroll = 0;
      }
    }

    targetScroll = Math.max(
      0,
      Math.min(
        targetScroll,
        maxScroll
      )
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

      alt: "Product requirements",

      title: "Buyer Requirements",

      desc:
        "We review product specifications, quantity, packing, and destination needs before preparing an offer.",
    },

    {
      src: "/assets/icon-trace.webp",

      alt: "Supply coordination",

      title: "Supply Coordination",

      desc:
        "We coordinate sourcing and product preparation according to the requirements discussed with each buyer.",
    },

    {
      src: "/assets/icon-global.webp",

      alt: "Domestic and international buyers",

      title: "Flexible Supply",

      desc:
        "We serve domestic and international buyers looking for Indonesian spices and agricultural products.",
    },

    {
      src: "/assets/icon-sustain.webp",

      alt: "Supplier partnerships",

      title: "Supplier Network",

      desc:
        "We work with suppliers and sourcing partners to support product availability and preparation.",
    },

    {
      src: "/assets/icon-support.webp",

      alt: "Buyer communication",

      title: "Clear Communication",

      desc:
        "We keep product information, quotations, availability, and order requirements clear throughout the process.",
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
      img:
        "/assets/article-turmeric1.webp",

      alt:
        "Dried sliced turmeric from Indonesia",

      title:
        "Dried Sliced Turmeric from Indonesia: What Buyers Should Know",

      date:
        "Jan 2025",

      desc:
        "A practical overview of dried sliced turmeric, product form, sourcing considerations, and what buyers should check before requesting a quotation.",

      link:
        "/articles/turmeric-origin",
    },

    {
      img:
        "/assets/article-turmeric2.webp",

      alt:
        "Dried sliced turmeric processing",

      title:
        "How Dried Sliced Turmeric Is Processed in Indonesia",

      date:
        "Jan 2025",

      desc:
        "Learn about the main stages involved in preparing dried sliced turmeric, from raw material handling to slicing, drying, and packing.",

      link:
        "/articles/turmeric-plantations",
    },

    {
      img:
        "/assets/article-ginger1.webp",

      alt:
        "Emprit ginger from Indonesia",

      title:
        "Emprit Ginger from Indonesia: A Short Buyer Guide",

      date:
        "Jan 2025",

      desc:
        "A short introduction to Indonesian emprit ginger and several points buyers may consider when sourcing dried ginger products.",

      link:
        "/articles/ginger-origin",
    },
  ];


  return (
    <>
      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="home-hero">
        <div className="hero-content">
          <h1>
            Trusted Indonesian Spices
            & Agricultural Products Supplier
          </h1>

          <p>
            Reliable sourcing, flexible supply,
            and clear communication for domestic
            and international buyers.
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
            Request a Quote
          </Link>
        </div>
      </section>


      {/* =====================================================
          WHY CHOOSE US
          ===================================================== */}

      <section className="why">
        <h2>
          Why Work With Us
        </h2>

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
            {whyFeatures.map(
              (feature, index) => (
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

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.desc}
                  </p>
                </div>
              )
            )}
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
        <h2>
          Featured Products
        </h2>

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
            {featuredProducts.map(
              (product) => (
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

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>

                  <div className="product-overlay">
                    <Link
                      href={`/products/${product.slug}`}
                      className="btn-detail"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              )
            )}
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
        <h2>
          Latest Insights
        </h2>

        <div className="article-grid">
          {articles.map(
            (article, index) => (
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
                  <h3>
                    {article.title}
                  </h3>

                  <time
                    className="date"
                    dateTime="2025-01"
                  >
                    Published: {article.date}
                  </time>

                  <p>
                    {article.desc}
                  </p>

                  <Link
                    href={article.link}
                    className="btn btn-secondary"
                  >
                    Read Article
                  </Link>
                </div>
              </article>
            )
          )}
        </div>

        <div className="see-more">
          <Link
            href="/articles"
            className="btn btn-primary"
          >
            View All Articles
          </Link>
        </div>
      </section>
    </>
  );
}