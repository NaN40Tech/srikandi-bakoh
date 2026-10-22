"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <Link href="/" className="brand" onClick={closeMenu}>
        <Image
          src="/assets/logo.webp"
          alt="PT Dwi Srikandi Bakoh"
          width={50}
          height={50}
          priority
        />

        <span>PT Dwi Srikandi Bakoh</span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Toggle Menu"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      <nav
        id="main-navigation"
        className={menuOpen ? "nav-open" : ""}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className={pathname === "/" ? "active" : ""}
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          href="/about"
          className={pathname === "/about" ? "active" : ""}
          onClick={closeMenu}
        >
          About
        </Link>

        <Link
          href="/products"
          className={pathname.startsWith("/products") ? "active" : ""}
          onClick={closeMenu}
        >
          Products
        </Link>

        <Link
          href="/contact"
          className={pathname === "/contact" ? "active" : ""}
          onClick={closeMenu}
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}