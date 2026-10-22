import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { articles } from "@/data/articles";
import "./articles.css";

export const metadata: Metadata = {
  title: "Indonesian Spices Articles & Sourcing Insights",

  description:
    "Explore practical articles about Indonesian spices, agricultural products, sourcing, processing, and ingredient applications from PT Dwi Srikandi Bakoh.",

  alternates: {
    canonical: "/articles",
  },

  openGraph: {
    title:
      "Indonesian Spices Articles & Sourcing Insights | PT Dwi Srikandi Bakoh",
    description:
      "Practical information about Indonesian spices, sourcing, processing, and agricultural products.",
    url: "/articles",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Indonesian Spices Articles & Sourcing Insights | PT Dwi Srikandi Bakoh",
    description:
      "Practical information about Indonesian spices, sourcing, processing, and agricultural products.",
  },
};

export default function ArticlesPage() {
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="articles-page-hero">
        <div className="articles-page-hero-content">
          <span className="articles-page-hero-label">
            Insights & Resources
          </span>

          <h1>Indonesian Spices & Sourcing Insights</h1>

          <p>
            Practical information about Indonesian spices, product processing,
            sourcing, and ingredient requirements.
          </p>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {featuredArticle && (
        <section className="articles-page-featured">
          <div className="articles-page-container">
            <div className="articles-page-heading">
              <span>Featured Article</span>

              <h2>Recommended Reading</h2>
            </div>

            <article className="articles-page-featured-card">
              <Link
                href={`/articles/${featuredArticle.slug}`}
                className="articles-page-featured-image-wrapper"
                aria-label={`Read ${featuredArticle.title}`}
              >
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  width={720}
                  height={480}
                  priority
                  className="articles-page-featured-image"
                />
              </Link>

              <div className="articles-page-featured-copy">
                <span className="articles-page-date">
                  {featuredArticle.date}
                </span>

                <h2>
                  <Link href={`/articles/${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p>{featuredArticle.description}</p>

                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="articles-page-read-link"
                >
                  Read Article
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* LATEST ARTICLES */}
      {otherArticles.length > 0 && (
        <section className="articles-page-latest">
          <div className="articles-page-container">
            <div className="articles-page-heading">
              <span>Latest Articles</span>

              <h2>Explore More Insights</h2>

              <p>
                Learn more about Indonesian spices, processing methods,
                product specifications, and sourcing considerations.
              </p>
            </div>

            <div className="articles-page-grid">
              {otherArticles.map((article) => (
                <article
                  key={article.slug}
                  className="articles-page-card"
                >
                  <Link
                    href={`/articles/${article.slug}`}
                    className="articles-page-card-image-wrapper"
                    aria-label={`Read ${article.title}`}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={720}
                      height={440}
                      className="articles-page-card-image"
                    />
                  </Link>

                  <div className="articles-page-card-copy">
                    <span className="articles-page-date">
                      {article.date}
                    </span>

                    <h2>
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    <p>{article.description}</p>

                    <Link
                      href={`/articles/${article.slug}`}
                      className="articles-page-read-link"
                    >
                      Read Article
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}