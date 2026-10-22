import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { articles } from "@/data/articles";
import "./article-detail.css";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: article.title,
    description: article.description,

    alternates: {
      canonical: `/articles/${article.slug}`,
    },

    openGraph: {
      title: `${article.title} | PT Dwi Srikandi Bakoh`,
      description: article.description,
      url: `/articles/${article.slug}`,
      type: "article",
      images: [
        {
          url: article.heroImage || article.image,
          alt: article.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${article.title} | PT Dwi Srikandi Bakoh`,
      description: article.description,
      images: [article.heroImage || article.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug)
    .slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section
        className="article-detail-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(17, 71, 34, 0.76),
            rgba(17, 71, 34, 0.76)
          ), url(${article.heroImage || article.image})`,
        }}
      >
        <div className="article-detail-hero-inner">

          <span className="article-detail-category">
            Insights & Resources
          </span>

          <h1>{article.title}</h1>

          <p className="article-detail-date">
            Published: {article.date}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="article-detail-layout">
        <article
          className="article-detail-content"
          dangerouslySetInnerHTML={{
            __html: article.content || "",
          }}
        />

        {/* SIDEBAR */}
        <aside className="article-detail-sidebar">
          <section className="article-detail-related">
            <span className="article-detail-sidebar-label">
              Explore More
            </span>

            <h2>Related Articles</h2>

            <ul>
              {relatedArticles.map((item) => (
                <li key={item.slug}>
                  <Link href={`/articles/${item.slug}`}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="article-detail-product-card">
            <span className="article-detail-product-label">
              Indonesian Spices
            </span>

            <h2>Explore Our Products</h2>

            <p>
              View available Indonesian spices, product specifications,
              and packing information.
            </p>

            <Link
              href="/products"
              className="article-detail-product-link"
            >
              View Products
            </Link>
          </section>
        </aside>
      </main>

      {/* CTA */}
      <section className="article-detail-cta">
        <div className="article-detail-cta-inner">
          <span className="article-detail-cta-label">
            Product Inquiry
          </span>

          <h2>
            Looking for Indonesian Spices or Agricultural Products?
          </h2>

          <p>
            Tell us the product, specification, quantity, and destination
            you require.
          </p>

          <Link
            href="/contact"
            className="article-detail-cta-link"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}