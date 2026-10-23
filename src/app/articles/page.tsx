import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { articles } from "@/data/articles";

import "./articles.css";


/* ========================================
   CONFIG
======================================== */

const ARTICLES_PER_PAGE = 6;


type ArticlesPageProps = {
  searchParams: Promise<{
    page?: string | string[];
  }>;
};


/* ========================================
   DATE HELPERS
======================================== */

function getDateValue(
  date: string
) {
  const parsed =
    Date.parse(date);

  return Number.isNaN(
    parsed
  )
    ? 0
    : parsed;
}


function formatArticleDate(
  date: string
) {
  /*
    Tambahkan T00:00:00 agar tanggal
    tidak bergeser karena timezone.
  */
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
      day:
        "numeric",

      month:
        "short",

      year:
        "numeric",
    }
  ).format(parsed);
}


/* ========================================
   PAGE URL
======================================== */

function getPageUrl(
  page: number
) {
  if (page <= 1) {
    return "/articles";
  }

  return `/articles?page=${page}`;
}


/* ========================================
   METADATA
======================================== */

export async function generateMetadata({
  searchParams,
}: ArticlesPageProps): Promise<Metadata> {
  const params =
    await searchParams;


  const rawPage =
    Array.isArray(
      params.page
    )
      ? params.page[0]
      : params.page;


  const parsedPage =
    Number.parseInt(
      rawPage ?? "1",
      10
    );


  const currentPage =
    Number.isFinite(
      parsedPage
    ) &&
    parsedPage > 1
      ? parsedPage
      : 1;


  const canonical =
    getPageUrl(
      currentPage
    );


  const title =
    currentPage > 1
      ? `Articles & Insights - Page ${currentPage}`
      : "Articles & Insights";


  const description =
    "Explore practical articles about Indonesian spices, agricultural products, sourcing, processing, and buyer considerations.";


  return {
    title,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type:
        "website",

      url:
        canonical,

      title:
        currentPage > 1
          ? `Articles & Insights - Page ${currentPage} | PT Dwi Srikandi Bakoh`
          : "Articles & Insights | PT Dwi Srikandi Bakoh",

      description,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        currentPage > 1
          ? `Articles & Insights - Page ${currentPage} | PT Dwi Srikandi Bakoh`
          : "Articles & Insights | PT Dwi Srikandi Bakoh",

      description,
    },
  };
}


/* ========================================
   PAGE
======================================== */

export default async function ArticlesPage({
  searchParams,
}: ArticlesPageProps) {
  const params =
    await searchParams;


  /* ========================================
     CURRENT PAGE
  ======================================== */

  const rawPage =
    Array.isArray(
      params.page
    )
      ? params.page[0]
      : params.page;


  const parsedPage =
    Number.parseInt(
      rawPage ?? "1",
      10
    );


  const requestedPage =
    Number.isFinite(
      parsedPage
    ) &&
    parsedPage > 0
      ? parsedPage
      : 1;


  /* ========================================
     SORT ARTICLES
  ======================================== */

  const sortedArticles =
    [...articles].sort(
      (a, b) =>
        getDateValue(
          b.date
        ) -
        getDateValue(
          a.date
        )
    );


  /* ========================================
     FEATURED ARTICLE
  ======================================== */

  const featuredArticle =
    sortedArticles[0];


  /*
    Featured dipisahkan dari artikel biasa
    supaya tidak muncul dua kali.
  */
  const regularArticles =
    sortedArticles.slice(1);


  /* ========================================
     PAGINATION
  ======================================== */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        regularArticles.length /
          ARTICLES_PER_PAGE
      )
    );


  const currentPage =
    Math.min(
      requestedPage,
      totalPages
    );


  const startIndex =
    (
      currentPage - 1
    ) *
    ARTICLES_PER_PAGE;


  const visibleArticles =
    regularArticles.slice(
      startIndex,
      startIndex +
        ARTICLES_PER_PAGE
    );


  /* ========================================
     PAGE NUMBERS
  ======================================== */

  const pageNumbers =
    Array.from(
      {
        length:
          totalPages,
      },
      (
        _,
        index
      ) =>
        index + 1
    );


  return (
    <>
      {/* ========================================
          HERO
      ======================================== */}

      <section className="articles-page-hero">
        <Image
          src="/assets/Article/articles-hero.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={68}
          sizes="100vw"
          className="articles-page-hero-image"
          aria-hidden="true"
        />

        <div
          className="articles-page-hero-overlay"
          aria-hidden="true"
        />

        <div className="articles-page-hero-inner">
          <span className="articles-page-eyebrow">
            Buyer Resources
          </span>

          <h1>
            Articles &amp; Insights
          </h1>

          <p>
            Practical information about Indonesian spices,
            agricultural products, sourcing, processing,
            and buyer considerations.
          </p>
        </div>
      </section>


      {/* ========================================
          FEATURED ARTICLE

          Featured hanya muncul pada page 1.
      ======================================== */}

      {currentPage === 1 &&
        featuredArticle && (
        <section className="articles-featured">
          <div className="articles-page-container">

            <div className="articles-section-heading">
              <span>
                Featured Insight
              </span>

              <h2>
                Latest Article
              </h2>
            </div>


            <article className="articles-featured-card">

              {/* IMAGE */}

              <Link
                href={`/articles/${featuredArticle.slug}`}
                className="articles-featured-image-link"
                aria-label={`Read ${featuredArticle.title}`}
              >
                <div className="articles-featured-image">
                  <Image
                    src={
                      featuredArticle.image
                    }
                    alt={
                      featuredArticle.title
                    }
                    fill
                    quality={68}
                    sizes="
                      (max-width: 700px) calc(100vw - 2rem),
                      540px
                    "
                  />

                  <span className="articles-featured-badge">
                    Latest
                  </span>
                </div>
              </Link>


              {/* CONTENT */}

              <div className="articles-featured-content">

                <time
                  className="articles-featured-date"
                  dateTime={
                    featuredArticle.date
                  }
                >
                  {
                    formatArticleDate(
                      featuredArticle.date
                    )
                  }
                </time>


                <h2>
                  <Link
                    href={`/articles/${featuredArticle.slug}`}
                  >
                    {
                      featuredArticle.title
                    }
                  </Link>
                </h2>


                <p>
                  {
                    featuredArticle.description
                  }
                </p>


                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="articles-read-more"
                >
                  Read Article

                  <span aria-hidden="true">
                    →
                  </span>
                </Link>

              </div>

            </article>

          </div>
        </section>
      )}


      {/* ========================================
          ARTICLES LIST
      ======================================== */}

      <section className="articles-list-section">
        <div className="articles-page-container">

          <div className="articles-list-heading">
            <span>
              Knowledge &amp; Insights
            </span>

            <h2>
              {currentPage === 1
                ? "More Articles"
                : "Articles & Insights"}
            </h2>

            <p>
              Explore practical information about Indonesian agricultural
              products, sourcing, processing, and buyer requirements.
            </p>
          </div>


          {/* ========================================
              ARTICLE GRID
          ======================================== */}

          {visibleArticles.length >
          0 ? (
            <div className="articles-page-grid">

              {visibleArticles.map(
                (
                  article
                ) => (
                  <article
                    key={
                      article.slug
                    }
                    className="articles-page-card"
                  >

                    {/* IMAGE */}

                    <Link
                      href={`/articles/${article.slug}`}
                      className="articles-page-card-image-link"
                      aria-label={`Read ${article.title}`}
                    >
                      <div className="articles-page-card-image">
                        <Image
                          src={
                            article.image
                          }
                          alt={
                            article.title
                          }
                          fill
                          quality={62}
                          sizes="
                            (max-width: 620px) calc(100vw - 2rem),
                            (max-width: 900px) 50vw,
                            350px
                          "
                        />
                      </div>
                    </Link>


                    {/* CONTENT */}

                    <div className="articles-page-card-content">

                      <time
                        className="articles-page-date"
                        dateTime={
                          article.date
                        }
                      >
                        {
                          formatArticleDate(
                            article.date
                          )
                        }
                      </time>


                      <h3>
                        <Link
                          href={`/articles/${article.slug}`}
                        >
                          {
                            article.title
                          }
                        </Link>
                      </h3>


                      <p>
                        {
                          article.description
                        }
                      </p>


                      <Link
                        href={`/articles/${article.slug}`}
                        className="articles-page-card-link"
                      >
                        Read Article

                        <span aria-hidden="true">
                          →
                        </span>
                      </Link>

                    </div>

                  </article>
                )
              )}

            </div>
          ) : (
            <div className="articles-empty">
              <p>
                No articles available.
              </p>
            </div>
          )}


          {/* ========================================
              PAGINATION
          ======================================== */}

          {totalPages > 1 && (
            <nav
              className="articles-pagination"
              aria-label="Article pagination"
            >

              {/* PREVIOUS */}

              {currentPage > 1 ? (
                <Link
                  href={
                    getPageUrl(
                      currentPage - 1
                    )
                  }
                  className="articles-pagination-nav"
                >
                  <span aria-hidden="true">
                    ←
                  </span>

                  Previous
                </Link>
              ) : (
                <span
                  className="articles-pagination-nav disabled"
                  aria-disabled="true"
                >
                  <span aria-hidden="true">
                    ←
                  </span>

                  Previous
                </span>
              )}


              {/* PAGE NUMBERS */}

              <div className="articles-pagination-pages">
                {pageNumbers.map(
                  (
                    pageNumber
                  ) => (
                    <Link
                      key={
                        pageNumber
                      }
                      href={
                        getPageUrl(
                          pageNumber
                        )
                      }
                      className={`articles-pagination-number ${
                        pageNumber ===
                        currentPage
                          ? "active"
                          : ""
                      }`}
                      aria-current={
                        pageNumber ===
                        currentPage
                          ? "page"
                          : undefined
                      }
                    >
                      {
                        pageNumber
                      }
                    </Link>
                  )
                )}
              </div>


              {/* NEXT */}

              {currentPage <
              totalPages ? (
                <Link
                  href={
                    getPageUrl(
                      currentPage + 1
                    )
                  }
                  className="articles-pagination-nav"
                >
                  Next

                  <span aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : (
                <span
                  className="articles-pagination-nav disabled"
                  aria-disabled="true"
                >
                  Next

                  <span aria-hidden="true">
                    →
                  </span>
                </span>
              )}

            </nav>
          )}

        </div>
      </section>


      {/* ========================================
          CTA
      ======================================== */}

      <section className="articles-page-cta">
        <div className="articles-page-cta-inner">

          <span className="articles-page-cta-label">
            Product Inquiry
          </span>

          <h2>
            Looking for Indonesian Agricultural Products?
          </h2>

          <p>
            Explore our available products or contact us to discuss
            specifications, quantity, packing, and delivery requirements.
          </p>


          <div className="articles-page-cta-actions">

            <Link
              href="/products"
              className="articles-page-cta-primary"
            >
              View Products
            </Link>


            <Link
              href="/contact"
              className="articles-page-cta-secondary"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}