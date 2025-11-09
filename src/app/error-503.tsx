'use client';
import Link from 'next/link';
import './error.css';

export default function ServiceUnavailable() {
  return (
    <main className="error-page">
      <div className="container"></div>
      <h1>503</h1>
      <h2>Service Unavailable</h2>
      <p>Our server is taking a short break. Please check back later.</p>
      <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
    </main>
  );
}

