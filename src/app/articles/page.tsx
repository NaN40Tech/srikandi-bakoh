import Link from 'next/link';
import { articles } from '../../data/articles';
import './articles.css';

export default function ArticlesPage() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Our Articles</h1>
          <p>Discover the story behind our spices — from fertile soil in Indonesia to global markets worldwide.</p>
        </div>
      </section>

      <main className="grid">
        {articles.map(article => (
          <div key={article.slug} className="card">
            <img src={article.image} alt={article.title} />
            <div className="content">
              <h3>{article.title}</h3>
              <span className="date">Published: {article.date}</span>
              <p>{article.description}</p>
              <Link href={`/articles/${article.slug}`} className="btn">Read More</Link>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
