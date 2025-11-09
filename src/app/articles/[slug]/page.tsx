import { notFound } from 'next/navigation';
import { articles } from '../../../data/articles';
import './article-detail.css';

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = params;
  const article = articles.find(a => a.slug === slug);
  if (!article) return notFound();


  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(26,98,50,0), rgba(26,98,50,0)), url(${article.heroImage || article.image})`,
        }}
      >
        <div>
          <h1>{article.title}</h1>
        </div>
      </section>

      <main className="detail">
        <article className="body" dangerouslySetInnerHTML={{ __html: article.content || '' }} />
        <aside className="sidebar">
          <h3>More Export Articles</h3>
          <ul>
            {articles
              .filter(a => a.slug !== article.slug)
              .map(a => (
                <li key={a.slug}>
                  <a href={`/articles/${a.slug}`}>{a.title}</a>
                </li>
              ))}
          </ul>
        </aside>
      </main>
    </>
  );
}
