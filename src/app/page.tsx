import Link from 'next/link';
export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Indonesian Spices for the World</h1>
          <p>Delivering premium spices and herbs with international standards.</p>
          <Link href="/products" className="btn btn-primary">
            Explore Products
          </Link>
          <Link href="/contact" className="btn btn-secondary">
            Get a Quote
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <h2>Why Choose Us</h2>
        <div className="why-slider">
          <button
            className="arrow left"
            aria-label="Scroll left"
            suppressHydrationWarning
          >
            &#10094;
          </button>
          <div className="why-track">
            <div className="feature-box">
              <img
                src="/assets/icon-quality.webp"
                alt="Premium Quality"
                width={60}
                height={60}
                loading="lazy"
              />
              <h3>Premium Quality</h3>
              <p>Carefully selected spices with international standards.</p>
            </div>

            <div className="feature-box">
              <img
                src="/assets/icon-trace.webp"
                alt="Traceability"
                width={60}
                height={60}
                loading="lazy"
              />
              <h3>Traceability</h3>
              <p>Full transparency from farm to export packaging.</p>
            </div>

            <div className="feature-box">
              <img
                src="/assets/icon-global.webp"
                alt="Global Export"
                width={60}
                height={60}
                loading="lazy"
              />
              <h3>Global Export</h3>
              <p>Supplying partners worldwide with trust and consistency.</p>
            </div>

            <div className="feature-box">
              <img
                src="/assets/icon-sustain.webp"
                alt="Sustainability"
                width={60}
                height={60}
                loading="lazy"
              />
              <h3>Sustainability</h3>
              <p>Working with farmers to ensure eco-friendly and ethical sourcing.</p>
            </div>

            <div className="feature-box">
              <img
                src="/assets/icon-support.webp"
                alt="Customer Support"
                width={60}
                height={60}
                loading="lazy"
              />
              <h3>Customer Support</h3>
              <p>Dedicated team to assist with inquiries and international trade needs.</p>
            </div>
          </div>
          <button
            className="arrow right"
            aria-label="Scroll right"
            suppressHydrationWarning
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-slider">
          <button
            className="arrow left"
            aria-label="Scroll left"
            suppressHydrationWarning
          >
            &#10094;
          </button>
          <div className="product-track">
            {/* === Product Cards === */}
            <div className="product-card">
              <img
                src="/assets/nutmeg.webp"
                alt="Nutmeg spice"
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>Nutmeg</h3>
              <p>Rich aroma, perfect for culinary and industrial use.</p>
              <div className="product-overlay">
                <a href="/products/nutmeg" className="btn-detail">
                  See Details
                </a>
              </div>
            </div>

            <div className="product-card">
              <img
                src="/assets/clove.webp"
                alt="Clove spice"
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>Clove</h3>
              <p>High-quality clove from Indonesia’s best regions.</p>
              <div className="product-overlay">
                <a href="/products/clove" className="btn-detail">
                  See Details
                </a>
              </div>
            </div>

            <div className="product-card">
              <img
                src="/assets/cinnamon.webp"
                alt="Cinnamon spice"
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>Cinnamon</h3>
              <p>Aromatic cinnamon sticks and powder.</p>
              <div className="product-overlay">
                <a href="/products/cinnamon" className="btn-detail">
                  See Details
                </a>
              </div>
            </div>

            <div className="product-card">
              <img
                src="/assets/ginger.webp"
                alt="Ginger spice"
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>Ginger</h3>
              <p>Fresh and dried ginger, perfect for culinary and health use.</p>
              <div className="product-overlay">
                <a href="/products/ginger" className="btn-detail">
                  See Details
                </a>
              </div>
            </div>

            <div className="product-card">
              <img
                src="/assets/turmeric.webp"
                alt="Turmeric spice"
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>Turmeric</h3>
              <p>Golden spice with powerful health benefits.</p>
              <div className="product-overlay">
                <a href="/products/turmeric" className="btn-detail">
                  See Details
                </a>
              </div>
            </div>

            <div className="product-card">
              <img
                src="/assets/cardamom.webp"
                alt="Cardamom spice"
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>Cardamom</h3>
              <p>Strong flavor, ideal for food and beverage industries.</p>
              <div className="product-overlay">
                <a href="/products/cardamom" className="btn-detail">
                  See Details
                </a>
              </div>
            </div>

            <div className="product-card">
              <img
                src="/assets/blackpepper.webp"
                alt="Black Pepper spice"
                width={250}
                height={200}
                loading="lazy"
              />
              <h3>Black Pepper</h3>
              <p>Premium black peppercorns for global markets.</p>
              <div className="product-overlay">
                <a href="/products/blackpepper" className="btn-detail">
                  See Details
                </a>
              </div>
            </div>
          </div>
          <button
            className="arrow right"
            aria-label="Scroll right"
            suppressHydrationWarning
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="articles">
        <h2>Articles</h2>
        <div className="article-grid">
          <div className="article-card">
            <img
              src="/assets/article-ginger1.webp"
              alt="Ginger origin Ponorogo"
              loading="lazy"
            />
            <div className="article-content">
              <h3>The Origin of Ginger</h3>
              <span className="date">Published: Jan 2025</span>
              <p>
                Our ginger is cultivated in Ponorogo, East Java—specifically the
                Jenangan area, known for its fertile volcanic soil and premium
                crop quality.
              </p>
              <Link href="/articles/ginger-origin" className="btn btn-secondary">
                Read More
              </Link>
            </div>
          </div>

          <div className="article-card">
            <img
              src="/assets/article-ginger2.webp"
              alt="Ginger plantation Ponorogo"
              loading="lazy"
            />
            <div className="article-content">
              <h3>Ginger Plantations</h3>
              <span className="date">Published: Jan 2025</span>
              <p>
                Our ginger plantations are managed together with local farmers in
                Jenangan, using eco-friendly farming methods to preserve soil
                fertility.
              </p>
              <a href="/article-ginger" className="btn btn-secondary">
                Read More
              </a>
            </div>
          </div>

          <div className="article-card">
            <img
              src="/assets/article-turmeric1.webp"
              alt="Turmeric origin Ponorogo"
              loading="lazy"
            />
            <div className="article-content">
              <h3>The Origin of Turmeric</h3>
              <span className="date">Published: Jan 2025</span>
              <p>
                Our turmeric comes from Ponorogo Jenangan, a region rich in
                natural minerals that produce bright-colored turmeric with strong
                flavor and aroma.
              </p>
              <a href="/article-turmeric" className="btn btn-secondary">
                Read More
              </a>
            </div>
          </div>
        </div>

        <div className="see-more">
          <a href="/articles" className="btn btn-primary">
            See More Articles
          </a>
        </div>
      </section>
    </>
  );
}
