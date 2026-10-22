"use client";

import Link from "next/link";
import { useEffect } from "react";

import "./error.css";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="error-page">
      <div className="error-page-container">
        <span className="error-page-label">
          Internal Server Error
        </span>

        <h1>
          500
        </h1>

        <h2>
          Something Went Wrong
        </h2>

        <p>
          We could not complete your request due to an unexpected error.
          Please try again or return to the homepage.
        </p>

        <div className="error-page-actions">
          <button
            type="button"
            className="error-page-btn error-page-btn-primary"
            onClick={() => reset()}
          >
            Try Again
          </button>

          <Link
            href="/"
            className="error-page-btn error-page-btn-secondary"
          >
            Back to Home
          </Link>
        </div>

        {error.digest && (
          <p className="error-page-reference">
            Error reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}