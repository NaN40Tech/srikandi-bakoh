export interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  image: string;
  heroImage?: string;
  content?: string; // HTML string
}

export const articles: Article[] = [
  {
    slug: 'ginger-origin',
    title: 'The Origin of Ginger',
    date: 'Jan 2025',
    description:
      'Our ginger is cultivated in Ponorogo, East Java — specifically the Jenangan area...',
    image: '/assets/article-ginger1.webp',
    heroImage: '/assets/ginger-farm.webp',
    content: `
      <h2>Origin of Our Ginger</h2>
      <p>
        Our ginger is cultivated in <strong>Ponorogo, East Java — specifically the Jenangan area</strong>,
        known for its fertile volcanic soil and premium crop quality.
      </p>

      <img src="/assets/ginger-farm.webp" alt="Ginger fields in Ponorogo" />
      <p class="caption">
        Jenangan, Ponorogo — a fertile volcanic region for premium ginger cultivation.
      </p>

      <h2>What Makes Jenangan Special?</h2>
      <p>
        The volcanic soil of Jenangan is naturally enriched with minerals, providing
        ideal conditions for ginger plants to thrive.
      </p>

      <h2>Export-Ready Quality</h2>
      <ul>
        <li>Fresh whole ginger</li>
        <li>Dried ginger</li>
        <li>Sliced ginger</li>
        <li>Ginger powder</li>
      </ul>

      <h2>Global Reach</h2>
      <p>
        From Ponorogo’s fertile land to destinations across Asia, the Middle East,
        and Europe, our ginger is supplied to meet international standards.
      </p>

      <h2>Our Commitment</h2>
      <p>
        At PT Srikandi Barokah, we are proud to share the story of Jenangan ginger
        with the world through responsible sourcing and consistent quality.
      </p>
    `,
  },

  {
    slug: 'ginger-plantations',
    title: 'Ginger Plantations',
    date: 'Jan 2025',
    description:
      'Our ginger plantations are managed with local farmers in Jenangan...',
    image: '/assets/article-ginger2.webp',
    content: `
      <p>
        Our ginger plantations are managed together with local farmers in Jenangan
        using eco-friendly farming methods to preserve soil fertility and crop quality.
      </p>
    `,
  },

  {
    slug: 'turmeric-origin',
    title: 'The Origin of Turmeric',
    date: 'Jan 2025',
    description:
      'Our turmeric comes from Ponorogo Jenangan...',
    image: '/assets/article-turmeric1.webp',
    content: `
      <p>
        Our turmeric comes from Ponorogo Jenangan, a region rich in natural minerals
        that produces bright-colored turmeric with strong flavor and aroma.
      </p>
    `,
  },

  {
    slug: 'turmeric-plantations',
    title: 'Turmeric Plantations',
    date: 'Jan 2025',
    description:
      'Our turmeric plantations in Jenangan are managed sustainably...',
    image: '/assets/article-turmeric2.webp',
    content: `
      <p>
        Our turmeric plantations in Jenangan are managed sustainably with local
        farmers to ensure long-term soil health and consistent production quality.
      </p>
    `,
  },

  {
    slug: 'premium-rice',
    title: 'Carefully Selected in Every Grain, Excellence Served in Every Meal',
    date: 'Jan 2025',
    description:
      'Premium rice sourced from selected local farmers in East Java, processed with modern technology to preserve purity, taste, and consistent quality.',
    image: '/assets/article-rice1.webp',
    heroImage: '/assets/rice-field.webp',
    content: `
      <h2>Carefully Selected in Every Grain, Excellence Served in Every Meal</h2>

      <img src="/assets/article-rice1.webp" alt="Premium rice from East Java" />
      <p class="caption">
        Premium rice sourced from selected local farmers in East Java.
      </p>

      <p>
        Premium rice sourced from carefully selected local farmers in
        <strong>East Java</strong>, processed with modern technology to preserve
        purity, taste, and consistent quality from harvest to table.
      </p>

      <h2>From Origin to Excellence</h2>

      <img src="/assets/rice-field.webp" alt="Rice fields in East Java" />
      <p class="caption">
        East Java — one of Indonesia’s most fertile and renowned rice-producing regions.
      </p>

      <p>
        We believe that exceptional rice begins at its origin. Our rice is produced
        from carefully selected paddy sourced directly from experienced local farmers.
      </p>

      <p>
        Each paddy grain undergoes a meticulous sorting process to ensure optimal
        maturity, uniformity, and cleanliness. Controlled milling stages help
        preserve natural aroma, texture, and superior eating quality.
      </p>

      <p>
        Hygienic and standardized packaging systems are applied to maintain freshness
        and integrity throughout distribution, delivering reliable quality for
        global markets.
      </p>

      <h2>Rice Grades Available</h2>

      <h3>Premium Rice</h3>
      <p>
        Uniform grain size, low broken content, and superior eating quality.
        Ideal for premium retail, hospitality, and food service markets.
      </p>

      <h3>Medium Grade Rice</h3>
      <p>
        A cost-effective option with balanced quality, suitable for mass
        distribution and general consumer markets.
      </p>

      <h3>Broken Rice (Menir)</h3>
      <p>
        Finely broken rice grains used in rice flour manufacturing and
        food-processing industries.
      </p>

      <h2>Bulk Supply and Packaging</h2>
      <p>
        We are fully prepared to fulfill bulk orders with customized specifications,
        including grain length, broken percentage, moisture level, and whitening degree.
      </p>

      <p>
        Packaging options range from bulk bags to retail-ready formats, with private
        labeling available upon request. Our production system supports consistent
        supply and long-term partnerships.
      </p>
    `,
  },
];
