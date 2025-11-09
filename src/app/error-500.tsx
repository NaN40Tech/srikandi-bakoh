'use client';
import Link from 'next/link';
import './error.css';

export default function InternalServerErrorPage() {
  return (
    <main className="error-page">
      <div className="container">
        <h1>500</h1>
        <h2>Something Went Wrong</h2>
        <p>Our server had a problem processing your request. Please try again later.</p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
