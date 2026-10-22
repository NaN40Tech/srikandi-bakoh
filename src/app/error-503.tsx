"use client";

import Link from "next/link";

import "./error.css";

export default function ServiceUnavailable() {
  return (
    <main className="error-page">
      <div className="error-page-container">
        <span className="error-page-label">
          Service Unavailable
        </span>

        <h1>
          503
        </h1>

        <h2>
          We&apos;ll Be Back Soon
        </h2>

        <p>
          Our website is temporarily unavailable.
          Please check back again shortly.
        </p>

        <Link
          href="/"
          className="error-page-btn error-page-btn-primary"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}