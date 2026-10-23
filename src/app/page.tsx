"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { products } from "@/app/products/data";
import { articles as articleData } from "@/data/articles";
import ThreadsSection from "@/app/components/ThreadsSection";
import TikTokSection from "@/app/components/TikTokSection";


export default function HomePage() {
  const whyTrackRef =
    useRef<HTMLDivElement>(null);

  const productTrackRef =
    useRef<HTMLDivElement>(null);

  const [
    showWhyLeft,
    setShowWhyLeft,
  ] = useState(false);

  const [
    showWhyRight,
    setShowWhyRight,
  ] = useState(true);

  const [
    showProductLeft,
    setShowProductLeft,
  ] = useState(false);

  const [
    showProductRight,
    setShowProductRight,
  ] = useState(true);


  /* ========================================
     SCROLL CHECK
  ======================================== */

  const checkScroll = (
    track: HTMLDivElement | null,
    setLeft: (
      value: boolean
    ) => void,
    setRight: (
      value: boolean
    ) => void
  ) => {
    if (!track) return;

    const maxScroll =
      Math.max(
        0,
        track.scrollWidth -
          track.clientWidth
      );

    const currentScroll =
      Math.max(
        0,
        track.scrollLeft
      );

    /*
      Browser kadang menghasilkan nilai scrollLeft
      beberapa pixel walaupun secara visual sudah
      mentok.

      Tolerance ini mencegah arrow tetap muncul
      karena rounding / subpixel.
    */
    const edgeTolerance = 12;

    setLeft(
      currentScroll >
        edgeTolerance
    );

    setRight(
      maxScroll -
        currentScroll >
        edgeTolerance
    );
  };


  /* ========================================
     WHY LISTENER
  ======================================== */

  useEffect(() => {
    const track =
      whyTrackRef.current;

    if (!track) return;

    const update = () => {
      checkScroll(
        track,
        setShowWhyLeft,
        setShowWhyRight
      );
    };

    /*
      Check langsung setelah render.
    */
    update();

    /*
      Check lagi setelah browser selesai
      menghitung layout card/image.
    */
    const frame =
      requestAnimationFrame(
        update
      );

    track.addEventListener(
      "scroll",
      update,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      cancelAnimationFrame(
        frame
      );

      track.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );
    };
  }, []);


  /* ========================================
     PRODUCT LISTENER
  ======================================== */

  useEffect(() => {
    const track =
      productTrackRef.current;

    if (!track) return;

    const update = () => {
      checkScroll(
        track,
        setShowProductLeft,
        setShowProductRight
      );
    };

    update();

    const frame =
      requestAnimationFrame(
        update
      );

    track.addEventListener(
      "scroll",
      update,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      cancelAnimationFrame(
        frame
      );

      track.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );
    };
  }, []);


  /* ========================================
     CARD DISTANCE
  ======================================== */

  const getCardDistance = (
    track: HTMLDivElement,
    selector: string
  ) => {
    const cards =
      track.querySelectorAll<HTMLElement>(
        selector
      );

    if (
      cards.length === 0
    ) {
      return track.clientWidth;
    }

    if (
      cards.length === 1
    ) {
      return cards[0].offsetWidth;
    }

    return (
      cards[1].offsetLeft -
      cards[0].offsetLeft
    );
  };


  /* ========================================
     SLIDER
  ======================================== */

  const scrollSlider = (
    ref: {
      current:
        HTMLDivElement |
        null;
    },
    direction:
      "left" |
      "right",
    selector: string
  ) => {
    const track =
      ref.current;

    if (!track) return;

    const distance =
      getCardDistance(
        track,
        selector
      );

    const maxScroll =
      Math.max(
        0,
        track.scrollWidth -
          track.clientWidth
      );

    const currentScroll =
      Math.max(
        0,
        track.scrollLeft
      );

    let target =
      currentScroll;

    if (
      direction ===
      "right"
    ) {
      target += distance;
    } else {
      target -= distance;
    }

    target =
      Math.max(
        0,
        Math.min(
          target,
          maxScroll
        )
      );


    /*
      Kalau target sangat dekat ke ujung,
      paksa jadi benar-benar 0 atau maxScroll.
    */
    const edgeTolerance = 12;

    if (
      target <
      edgeTolerance
    ) {
      target = 0;
    }

    if (
      maxScroll -
        target <
      edgeTolerance
    ) {
      target =
        maxScroll;
    }


    track.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };


  /* ========================================
     WHY DATA
  ======================================== */

  const whyFeatures = [
    {
      src:
        "/assets/icon-quality.webp",

      alt:
        "Product requirements",

      title:
        "Buyer Requirements",

      desc:
        "We review product specifications, quantity, packing, and destination needs before preparing an offer.",
    },

    {
      src:
        "/assets/icon-trace.webp",

      alt:
        "Supply coordination",

      title:
        "Supply Coordination",

      desc:
        "We coordinate sourcing and product preparation according to the requirements discussed with each buyer.",
    },

    {
      src:
        "/assets/icon-global.webp",

      alt:
        "Domestic and international buyers",

      title:
        "Flexible Supply",

      desc:
        "We serve domestic and international buyers looking for Indonesian spices and agricultural products.",
    },

    {
      src:
        "/assets/icon-sustain.webp",

      alt:
        "Supplier partnerships",

      title:
        "Supplier Network",

      desc:
        "We work with suppliers and sourcing partners to support product availability and preparation.",
    },

    {
      src:
        "/assets/icon-support.webp",

      alt:
        "Buyer communication",

      title:
        "Clear Communication",

      desc:
        "We keep product information, quotations, availability, and order requirements clear throughout the process.",
    },
  ];


  /* ========================================
     ARTICLES
  ======================================== */

  const formatArticleDate = (
  date: string
) => {
  const parsed =
    new Date(
      `${date}T00:00:00`
    );

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return date;
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(parsed);
};


const latestArticles =
  [...articleData]
    .sort(
      (a, b) =>
        Date.parse(
          b.date
        ) -
        Date.parse(
          a.date
        )
    )
    .slice(
      0,
      3
    );


  return (
    <>
      {/* ========================================
          HERO
      ======================================== */}

      <section className="home-hero">
        <Image
          src="/assets/spices.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          className="home-hero-image"
          aria-hidden="true"
        />

        <div
          className="home-hero-overlay"
          aria-hidden="true"
        />

        <div className="home-hero-content">
          <span className="home-hero-label">
            Indonesian Supplier
          </span>

          <h1>
            Trusted Indonesian
            Spices &amp;
            Agricultural Products
            Supplier
          </h1>

          <p>
            Reliable sourcing,
            flexible supply, and
            clear communication for
            domestic and
            international buyers.
          </p>

          <div className="home-hero-actions">
            <Link
              href="/products"
              className="home-btn home-btn-primary"
            >
              Explore Products
            </Link>

            <Link
              href="/contact"
              className="home-btn home-btn-secondary"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>


      {/* ========================================
          WHY WORK WITH US
      ======================================== */}

      <section className="why">
        <div className="home-section-heading">
          <span>
            Our Approach
          </span>

          <h2>
            Why Work With Us
          </h2>

          <p>
            A practical approach to
            product sourcing,
            preparation, and buyer
            communication.
          </p>
        </div>

        <div className="why-slider">
          {showWhyLeft && (
            <button
              type="button"
              className="arrow left"
              aria-label="Scroll left"
              onClick={() =>
                scrollSlider(
                  whyTrackRef,
                  "left",
                  ".feature-box"
                )
              }
            >
              &#10094;
            </button>
          )}

          <div
            className="why-track"
            ref={whyTrackRef}
          >
            {whyFeatures.map(
              (feature) => (
                <article
                  className="feature-box"
                  key={
                    feature.title
                  }
                >
                  <div className="feature-icon-wrap">
                    <Image
                      src={
                        feature.src
                      }
                      alt={
                        feature.alt
                      }
                      width={60}
                      height={60}
                      sizes="60px"
                      quality={70}
                    />
                  </div>

                  <h3>
                    {
                      feature.title
                    }
                  </h3>

                  <p>
                    {
                      feature.desc
                    }
                  </p>
                </article>
              )
            )}
          </div>

          {showWhyRight && (
            <button
              type="button"
              className="arrow right"
              aria-label="Scroll right"
              onClick={() =>
                scrollSlider(
                  whyTrackRef,
                  "right",
                  ".feature-box"
                )
              }
            >
              &#10095;
            </button>
          )}
        </div>
      </section>


      {/* ========================================
          FEATURED PRODUCTS
      ======================================== */}

      <section className="featured">
        <div className="home-section-heading">
          <span>
            Product Selection
          </span>

          <h2>
            Featured Products
          </h2>

          <p>
            Selected Indonesian spices
            and agricultural products
            available for buyer
            inquiries.
          </p>
        </div>

        <div className="product-slider">
          {showProductLeft && (
            <button
              type="button"
              className="arrow left"
              aria-label="Scroll products left"
              onClick={() =>
                scrollSlider(
                  productTrackRef,
                  "left",
                  ".product-card"
                )
              }
            >
              &#10094;
            </button>
          )}

          <div
            className="product-track"
            ref={
              productTrackRef
            }
          >
            {products.map(
              (product) => (
                <article
                  className="product-card"
                  key={
                    product.slug
                  }
                >
                  <div className="product-card-image">
                    <Image
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      width={300}
                      height={220}
                      quality={62}
                      sizes="
                        (max-width: 480px) calc(100vw - 3rem),
                        (max-width: 768px) 82vw,
                        (max-width: 1100px) 31vw,
                        280px
                      "
                    />

                    <span className="product-card-tag">
                      Indonesian Product
                    </span>
                  </div>

                  <div className="product-card-content">
                    <h3>
                      {
                        product.name
                      }
                    </h3>

                    <p>
                      {
                        product.description
                      }
                    </p>

                    <Link
                      href={`/products/${product.slug}`}
                      className="product-card-link"
                    >
                      View Product

                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>

          {showProductRight && (
            <button
              type="button"
              className="arrow right"
              aria-label="Scroll products right"
              onClick={() =>
                scrollSlider(
                  productTrackRef,
                  "right",
                  ".product-card"
                )
              }
            >
              &#10095;
            </button>
          )}
        </div>

        <div className="home-section-action">
          <Link
            href="/products"
            className="home-outline-link"
          >
            View All Products
          </Link>
        </div>
      </section>


            {/* ========================================
          ARTICLES
      ======================================== */}

      <section className="articles">
        <div className="home-section-heading">
          <span>
            Buyer Resources
          </span>

          <h2>
            Latest Insights
          </h2>

          <p>
            Practical information
            about Indonesian spices,
            sourcing, and product
            preparation.
          </p>
        </div>


        <div className="article-grid">
          {latestArticles.map(
            (article) => (
              <article
                className="article-card"
                key={article.slug}
              >
                <div className="article-card-image">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={260}
                    quality={62}
                    sizes="
                      (max-width: 768px) calc(100vw - 2rem),
                      (max-width: 1200px) 33vw,
                      380px
                    "
                  />
                </div>


                <div className="article-content">

                  <time
                    className="date"
                    dateTime={article.date}
                  >
                    {formatArticleDate(
                      article.date
                    )}
                  </time>


                  <h3>
                    {article.title}
                  </h3>


                  <p>
                    {article.description}
                  </p>


                  <Link
                    href={`/articles/${article.slug}`}
                    className="article-link"
                  >
                    Read Article

                    <span
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>

                </div>
              </article>
            )
          )}
        </div>


        <div className="home-section-action">
          <Link
            href="/articles"
            className="home-outline-link"
          >
            View All Articles
          </Link>
        </div>
      </section>

{/* ========================================
    TIKTOK
======================================== */}

<TikTokSection />


{/* ========================================
    THREADS
======================================== */}

<ThreadsSection />

    </>
  );
}