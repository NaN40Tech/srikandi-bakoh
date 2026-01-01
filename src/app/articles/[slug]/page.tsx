import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import Link from "next/link";
import "./article-detail.css";

// Generate static params
export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>; // ✅ Changed to Promise
}

export default async function ArticlePage({ params }: Props) {
  // ✅ Await the params
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  
  if (!article) {
    return notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(26,98,50,0.6), rgba(26,98,50,0.6)), url(${
            article.heroImage || article.image
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {article.title}
          </h1>
          <p style={{ fontSize: '1rem', opacity: 0.9 }}>
            Published: {article.date}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="detail">
        <article
          className="body"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />
        
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>More Export Articles</h3>
          <ul>
            {articles
              .filter((a) => a.slug !== article.slug)
              .map((a) => (
                <li key={a.slug}>
                  <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                </li>
              ))}
          </ul>
        </aside>
      </main>
    </>
  );
}