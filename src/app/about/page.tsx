import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>About PT Srikandi Bakoh</h1>
          <p>Bringing Indonesia’s finest spices to the global stage.</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <h4>Company Profile</h4>
            <h2>Who We Are</h2>
            <p>
              PT Srikandi Bakoh is an Indonesian exporter of premium spices and
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
        <h2>Our Vision & Mission</h2>
        <div className="vm-grid">
          <div className="vm-card vision">
            <h3>Vision</h3>
            <p>
              To become a trusted global supplier of authentic Indonesian spices,
              bringing Indonesia’s rich heritage to the world.
            </p>
          </div>
          <div className="vm-card mission">
            <h3>Mission</h3>
            <p>
              Providing high-quality, traceable, and hygienically packaged
              products while empowering local farmers, ensuring sustainability,
              and meeting international standards.
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="certifications">
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
      </section>
    </>
  );
}
