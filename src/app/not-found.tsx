"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import './not-found.css';

interface Spice {
  id: number;
  left: number;
  size: number;
  color: string;
}

export default function NotFoundPage() {
  const [spices, setSpices] = useState<Spice[]>([]);

  useEffect(() => {
    const spiceColors = ['#F2C94C', '#D98880', '#8D6E63', '#F2994A'];
    const spiceCount = 20;
    const initialSpices: Spice[] = Array.from({ length: spiceCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 15 + Math.random() * 30,
      color: spiceColors[Math.floor(Math.random() * spiceColors.length)],
    }));
    setSpices(initialSpices);
  }, []);

  return (
    <main className="not-found">
      {spices.map(spice => (
        <div
          key={spice.id}
          className="falling-spice"
          style={{
            left: `${spice.left}%`,
            width: `${spice.size}px`,
            height: `${spice.size}px`,
            backgroundColor: spice.color,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="container">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>Looks like the spices got lost along the way.</p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
