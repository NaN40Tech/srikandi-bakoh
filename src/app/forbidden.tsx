'use client';
import Link from 'next/link';
import './error.css';

export default function ForbiddenPage() {
  return (
    <main className="error-page">
      <div className="container">
        <h1>403</h1>
        <h2>Access Denied</h2>
        <p>Looks like you don’t have permission to see this page.</p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
