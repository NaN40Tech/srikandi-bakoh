import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import "./about.css";


export const metadata: Metadata = {
  title: "About Indonesian Spice Supplier",

  description:
    "Learn about PT Dwi Srikandi Bakoh, an Indonesian supplier of spices and agricultural commodities serving domestic and international buyers.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "website",
    url: "/about",
    title:
      "About PT Dwi Srikandi Bakoh | Indonesian Spice Supplier",
    description:
      "Learn about PT Dwi Srikandi Bakoh and our approach to sourcing and supplying Indonesian spices and agricultural commodities.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "About PT Dwi Srikandi Bakoh | Indonesian Spice Supplier",
    description:
      "Learn about PT Dwi Srikandi Bakoh and our approach to sourcing and supplying Indonesian spices and agricultural commodities.",
  },
};


export default function AboutPage() {
  return (
    <>
      {/* ========================================
          HERO
      ======================================== */}

      <section className="about-clean-hero">
        <Image
          src="/assets/spices-about.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={68}
          sizes="100vw"
          className="about-clean-hero-image"
          aria-hidden="true"
        />

        <div
          className="about-clean-hero-overlay"
          aria-hidden="true"
        />

        <div className="about-clean-hero-inner">
          <span className="about-clean-eyebrow">
            About Us
          </span>

          <h1>
            About PT Dwi Srikandi Bakoh
          </h1>

          <p>
            Connecting buyers with Indonesian spices and agricultural
            commodities through practical sourcing and clear supply
            coordination.
          </p>
        </div>
      </section>


      {/* ========================================
          COMPANY PROFILE
      ======================================== */}

      <section className="about-clean-profile">
        <div className="about-clean-container">
          <div className="about-clean-profile-grid">

            <div className="about-clean-profile-copy">
              <span className="about-clean-label">
                Company Profile
              </span>

              <h2>
                Who We Are
              </h2>

              <p className="about-clean-lead">
                PT Dwi Srikandi Bakoh is an Indonesian supplier of spices and
                agricultural commodities for domestic and international buyers.
              </p>

              <p>
                We work with suppliers and sourcing partners to prepare products
                based on buyer requirements, including product form,
                specifications, quantity, packing, and destination.
              </p>

              <p>
                Our role is to make the sourcing process clearer and more
                practical, from the initial inquiry through product preparation
                and supply coordination.
              </p>

              <Link
                href="/products"
                className="about-clean-button"
              >
                Explore Our Products

                <span aria-hidden="true">
                  →
                </span>
              </Link>
            </div>


            <div className="about-clean-profile-image">
              <Image
                src="/assets/spices-about.webp"
                alt="Indonesian spices and agricultural products"
                fill
                quality={68}
                sizes="(max-width: 900px) 100vw, 48vw"
                className="about-clean-image"
              />

              <div
                className="about-clean-profile-image-accent"
                aria-hidden="true"
              />
            </div>

          </div>
        </div>
      </section>


      {/* ========================================
          PRINCIPLES
      ======================================== */}

      <section className="about-clean-principles">
        <div className="about-clean-container">

          <div className="about-clean-section-heading">
            <span className="about-clean-label">
              Our Approach
            </span>

            <h2>
              What We Focus On
            </h2>

            <p>
              A straightforward sourcing process built around product
              requirements, coordination, and communication.
            </p>
          </div>


          <div className="about-clean-principles-grid">

            <article className="about-clean-principle">
              <span className="about-clean-number">
                01
              </span>

              <div>
                <h3>
                  Clear Requirements
                </h3>

                <p>
                  We begin by understanding the product, specification,
                  quantity, packing, and delivery needs.
                </p>
              </div>
            </article>


            <article className="about-clean-principle">
              <span className="about-clean-number">
                02
              </span>

              <div>
                <h3>
                  Supply Coordination
                </h3>

                <p>
                  We coordinate sourcing and preparation according to the
                  agreed requirements.
                </p>
              </div>
            </article>


            <article className="about-clean-principle">
              <span className="about-clean-number">
                03
              </span>

              <div>
                <h3>
                  Practical Communication
                </h3>

                <p>
                  We keep product information, availability, and quotation
                  discussions clear throughout the process.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>


      {/* ========================================
          VISION & MISSION
      ======================================== */}

      <section className="about-clean-vm">
        <div className="about-clean-container">

          <div className="about-clean-vm-grid">

            <div className="about-clean-vm-intro">
              <span className="about-clean-label">
                Our Direction
              </span>

              <h2>
                Vision &amp; Mission
              </h2>

              <p>
                Building long-term relationships while improving access to
                Indonesian agricultural products for domestic and international
                markets.
              </p>
            </div>


            <div className="about-clean-vm-content">

              <div className="about-clean-vm-block">
                <span className="about-clean-vm-title">
                  Vision
                </span>

                <p>
                  To become a trusted Indonesian supplier of spices and
                  agricultural commodities, connecting buyers with reliable
                  supply from Indonesia.
                </p>
              </div>


              <div
                className="about-clean-divider"
                aria-hidden="true"
              />


              <div className="about-clean-vm-block">
                <span className="about-clean-vm-title">
                  Mission
                </span>

                <ul>
                  <li>
                    Supply products according to agreed buyer requirements.
                  </li>

                  <li>
                    Build long-term relationships with suppliers, buyers, and
                    business partners.
                  </li>

                  <li>
                    Improve sourcing coordination and product preparation.
                  </li>

                  <li>
                    Support domestic and international market access for
                    Indonesian agricultural products.
                  </li>

                  <li>
                    Contribute to economic opportunities within local supply
                    and farming communities.
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ========================================
          CTA
      ======================================== */}

      <section className="about-clean-cta">
        <div className="about-clean-cta-inner">

          <span className="about-clean-cta-label">
            Product Inquiry
          </span>

          <h2>
            Explore Indonesian Spices &amp; Agricultural Products
          </h2>

          <p>
            View our current products or contact us to discuss specifications,
            quantity, packing, and delivery requirements.
          </p>

          <div className="about-clean-cta-actions">
            <Link
              href="/products"
              className="about-clean-cta-primary"
            >
              View Products
            </Link>

            <Link
              href="/contact"
              className="about-clean-cta-secondary"
            >
              Contact Us
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}