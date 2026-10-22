"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import "./not-found.css";

interface Spice {
  id: number;
  left: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export default function NotFoundPage() {
  const [
    spices,
    setSpices,
  ] = useState<Spice[]>([]);

  useEffect(() => {
    const spiceColors = [
      "#D4B673",
      "#C98B5B",
      "#8D6E63",
      "#B8A35A",
    ];

    const spiceCount = 18;

    const initialSpices: Spice[] =
      Array.from(
        {
          length: spiceCount,
        },
        (_, index) => ({
          id: index,

          left:
            Math.random() * 100,

          size:
            12 +
            Math.random() * 24,

          color:
            spiceColors[
              Math.floor(
                Math.random() *
                  spiceColors.length
              )
            ],

          delay:
            Math.random() * 8,

          duration:
            10 +
            Math.random() * 8,
        })
      );

    setSpices(initialSpices);
  }, []);

  return (
    <main className="not-found">
      {/* ========================================
          DECORATIVE FALLING SPICES
      ======================================== */}

      {spices.map((spice) => (
        <span
          key={spice.id}
          className="falling-spice"
          aria-hidden="true"
          style={{
            left: `${spice.left}%`,
            width: `${spice.size}px`,
            height: `${spice.size}px`,
            backgroundColor:
              spice.color,
            animationDelay:
              `${spice.delay}s`,
            animationDuration:
              `${spice.duration}s`,
          }}
        />
      ))}


      {/* ========================================
          ERROR CONTENT
      ======================================== */}

      <div className="container">
        <h1>
          404
        </h1>

        <h2>
          Page Not Found
        </h2>

        <p>
          The page you are looking for may
          have been moved, removed, or is
          no longer available.
        </p>

        <Link
          href="/"
          className="btn-primary"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}