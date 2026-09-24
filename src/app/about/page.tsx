import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>About Our Company</h1>
          <p>Rooted in Indonesia, Trusted Worldwide.</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <h4>Company Profile</h4>
            <h2>Who We Are</h2>
            <p>
              PT Dwi Srikandi Bakoh is an Indonesian exporter of premium spices and
              herbs. We are dedicated to bringing the richness of Indonesia’s
              agriculture to global markets.
            </p>
            <p>
              With strong partnerships with local farmers and a focus on
              sustainability, we ensure every product meets international
              standards of quality, traceability, and authenticity.
            </p>
          <Link href="/products" className="btn btn-primary">
            Explore Our Products
          </Link>
          </div>
          <div className="about-img" style={{ position: "relative", width: "100%", maxWidth: "500px", height: "350px" }}>
            <Image
            src="/assets/spices-about.webp"
            alt="Indonesian Spices"
            fill
            sizes="(max-width: 768px) 100vw, 
                    (max-width: 1200px) 50vw, 
                    500px"
            style={{ objectFit: "cover", borderRadius: "12px" }}
            priority
            />

          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
<section className="vision-mission">
  <div className="vm-heading">
    <span className="gold">Vision</span>
    <span className="green">&amp; Mission</span>
  </div>
  <div className="vm-divider">
    <div className="vm-divider-line"></div>
    <div className="vm-divider-dot"></div>
    <div className="vm-divider-line"></div>
  </div>

  <div className="vm-grid">
    <div className="vm-vision">
      <div className="vm-icon-circle">
        <i className="ti ti-eye" aria-hidden="true"></i>
      </div>
      <div className="vm-card-title">
        <div className="vm-card-title-line"></div>
        <h3>Vision</h3>
        <div className="vm-card-title-line"></div>
      </div>
      <p>
        To become a leading Indonesian spice export company, bringing the rich
        flavors of the archipelago to global markets through superior quality
        and internationally recognized standards.
      </p>
    </div>

    <div className="vm-mission">
      <div className="vm-icon-circle">
        <i className="ti ti-target" aria-hidden="true"></i>
      </div>
      <div className="vm-card-title">
        <div className="vm-card-title-line"></div>
        <h3>Mission</h3>
        <div className="vm-card-title-line"></div>
      </div>
      <ul className="vm-list">
        <li>Deliver premium-quality Indonesian spices that consistently meet international standards.</li>
        <li>Foster sustainable partnerships with local farmers to ensure ethical sourcing and long-term growth.</li>
        <li>Bring authentic Indonesian flavors to global markets through reliable service and customer excellence.</li>
      </ul>
    </div>
  </div>
</section>

      {/* CERTIFICATIONS */}
      {/* <section className="certifications">
        <h2>Certifications</h2>
        <p>
          Our products are supported by certifications to ensure global market
          acceptance and customer trust.
        </p>
        <div className="cert-grid">
          <div className="cert-card">
            <i className="fas fa-shield-alt"></i>
            <span>HACCP Certified</span>
          </div>
          <div className="cert-card">
            <i className="fas fa-moon"></i>
            <span>Halal Certified</span>
          </div>
          <div className="cert-card">
            <i className="fas fa-certificate"></i>
            <span>ISO 22000 Food Safety</span>
          </div>
        </div>
      </section> */}
    </>
  );
}
