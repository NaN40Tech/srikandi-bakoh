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

    <p>
      We believe that exceptional rice begins at its origin. Our rice is produced
      from carefully selected paddy sourced directly from experienced local farmers
      in East Java—one of Indonesia's most fertile and renowned rice-producing regions.
    </p>

    <p>
      Each paddy grain undergoes a meticulous sorting process to ensure optimal
      maturity, uniformity, and cleanliness. Through a series of controlled milling
      stages using advanced modern equipment, we preserve the rice's natural aroma,
      texture, and superior eating quality.
    </p>

    <p>
      Hygienic and standardized packaging systems are applied to maintain freshness
      and integrity throughout distribution. The result is premium-quality rice that
      meets international standards and delivers reliability, consistency, and
      excellence for global markets.
    </p>

    <h2>Rice Grades Available</h2>

    <p>
      We offer multiple rice grades to accommodate diverse market and industrial needs,
      supported by flexible specifications and packaging options tailored to buyer
      requirements.
    </p>

    <h3>Premium Rice</h3>
    <img src="/assets/premium-rice-grade.webp" alt="Premium rice grade" />
    <p>
      Produced from carefully selected paddy, this grade delivers uniform grain size,
      low broken content, and superior eating quality. Ideal for premium retail,
      hospitality, and food service markets requiring consistent performance and
      presentation.
    </p>

    <h3>Medium Grade Rice</h3>
    <p>
      A cost-effective solution with balanced quality and grain uniformity, suitable
      for mass distribution, catering, and general consumer markets.
    </p>

    <h3>Broken Rice (Menir)</h3>
    <img src="/assets/broken-rice.webp" alt="Broken rice (menir)" />
    <p>
      Finely broken rice grains commonly used in rice flour manufacturing and
      food-processing industries. This grade ensures stable quality and efficiency
      for industrial applications.
    </p>

    <h2>Bulk Supply and Packaging</h2>
    <img src="/assets/rice-packaging.webp" alt="Rice packaging facility" />
    
    <p>
      We are fully prepared to fulfill bulk orders with specifications customized
      to buyer requirements, including grain length, broken percentage, moisture
      level, and whitening degree.
    </p>

    <p>
      Packaging options are flexible, ranging from bulk bags to retail-ready formats,
      with private labeling available upon request. Our structured production system
      and modern facilities enable us to support consistent supply and long-term
      partnerships for global buyers.
    </p>
  `,
},

  {
    slug: 'ginger-origin',
    title: 'Premium Ginger from Jenangan',
    date: 'Jan 2025',
    description:
      'Our ginger is cultivated in Jenangan, Ponorogo, East Java — a region known for its fertile volcanic soil that produces ginger with exceptional quality and flavor.',
    image: '/assets/article-ginger1.webp',
    heroImage: '/assets/article-ginger1.webp',
    content: `
      <h2>Premium Ginger from Jenangan</h2>
      
      <img src="/assets/article-ginger1.webp" alt="Ginger from Jenangan, Ponorogo" />
      <p class="caption">
        Premium ginger from the volcanic soil of Jenangan, Ponorogo.
      </p>

      <p>
        Our ginger is cultivated in <strong>Jenangan, Ponorogo, East Java</strong> — 
        a region known for its fertile volcanic soil that produces ginger with 
        exceptional aroma, pungency, and quality.
      </p>

      <img src="/assets/ginger-farm.webp" alt="Ginger fields in Jenangan" />
      <p class="caption">
        Jenangan's volcanic terrain provides ideal conditions for premium ginger cultivation.
      </p>

      <h2>Why Jenangan Ginger?</h2>
      <p>
        The volcanic soil of Jenangan is naturally enriched with minerals, creating 
        optimal conditions for ginger cultivation. This unique terroir contributes to 
        the distinctive flavor and high essential oil content that makes our ginger 
        highly valued in international markets.
      </p>

      <p>
        Local farmers with generations of experience combine traditional knowledge 
        with modern agricultural practices to ensure consistent quality and optimal yield.
      </p>

      <h2>Export Forms Available</h2>
      <p>
        We supply ginger in various forms to meet diverse market needs:
      </p>
      <ul>
        <li>Fresh whole ginger</li>
        <li>Dried ginger</li>
        <li>Sliced ginger</li>
        <li>Ginger powder</li>
      </ul>

      <h2>Quality & Distribution</h2>
      <p>
        Every stage from harvest to packaging is monitored under strict quality control. 
        We export to Asia, the Middle East, and Europe, ensuring proper handling and 
        logistics to maintain freshness throughout the supply chain.
      </p>

      <p>
        At PT Srikandi Barokah, we work closely with local farming communities to 
        ensure sustainable practices and fair partnerships while delivering consistent 
        premium quality to global markets.
      </p>
    `,
  },

  {
    slug: 'ginger-plantations',
    title: 'Sustainable Ginger Cultivation',
    date: 'Jan 2025',
    description:
      'Our ginger plantations in Jenangan are managed with local farmers using sustainable farming methods to preserve soil fertility and ensure consistent crop quality.',
    image: '/assets/article-ginger2.webp',
    heroImage: '/assets/article-ginger2.webp',
    content: `
      <h2>Sustainable Ginger Cultivation in Jenangan</h2>

      <img src="/assets/article-ginger2.webp" alt="Ginger plantation in Jenangan" />
      <p class="caption">
        Sustainable ginger farming in the fertile lands of Jenangan, Ponorogo.
      </p>

      <p>
        Our ginger plantations are managed in partnership with local farmers in 
        Jenangan using sustainable farming methods to preserve soil health and 
        ensure consistent crop quality.
      </p>

      <h2>Sustainable Farming Practices</h2>
      <p>
        We prioritize environmental sustainability in our farming operations:
      </p>
      <ul>
        <li>Organic composting to naturally enrich soil</li>
        <li>Crop rotation to maintain soil health</li>
        <li>Integrated pest management to minimize chemical use</li>
        <li>Efficient irrigation systems for water conservation</li>
      </ul>

      <h2>Farmer Partnerships</h2>
      <p>
        Our success is built on strong partnerships with local farming communities. 
        We provide technical support, fair pricing, and long-term commitments to 
        ensure mutual growth and sustainability.
      </p>

      <p>
        By working directly with farmers, we maintain quality control from field to 
        export, ensuring traceability and consistency in every shipment.
      </p>

      <h2>Quality Assurance</h2>
      <p>
        From planting to harvest, every stage is monitored to meet international 
        export standards. Regular soil testing, optimal harvest timing, and proper 
        post-harvest handling all contribute to the premium quality of our ginger.
      </p>
    `,
  },

  {
    slug: 'turmeric-origin',
    title: 'Premium Turmeric from Jenangan',
    date: 'Jan 2025',
    description:
      'Our turmeric comes from Jenangan, Ponorogo — a region with mineral-rich volcanic soil that produces vibrant turmeric with high curcumin content and strong aroma.',
    image: '/assets/article-turmeric1.webp',
    heroImage: '/assets/article-turmeric1.webp',
    content: `
      <h2>Premium Turmeric from Jenangan</h2>

      <img src="/assets/article-turmeric1.webp" alt="Turmeric from Jenangan, Ponorogo" />
      <p class="caption">
        Vibrant turmeric from the mineral-rich volcanic soil of Jenangan, Ponorogo.
      </p>

      <p>
        Our turmeric comes from <strong>Jenangan, Ponorogo</strong> — a region with 
        mineral-rich volcanic soil that produces vibrant turmeric with high curcumin 
        content, strong aroma, and distinctive golden color.
      </p>

      <h2>Why Jenangan Turmeric?</h2>
      <p>
        The volcanic soil of Jenangan, enriched with minerals and organic matter, 
        provides ideal growing conditions for turmeric. This natural environment 
        contributes to the bright golden color and high curcumin content that makes 
        our turmeric highly sought after in international markets.
      </p>

      <h2>Quality Characteristics</h2>
      <p>Our turmeric is known for:</p>
      <ul>
        <li>Bright golden-yellow color</li>
        <li>High curcumin content</li>
        <li>Strong, pleasant aroma</li>
        <li>Rich, earthy flavor</li>
        <li>Consistent quality across harvests</li>
      </ul>

      <h2>Export Forms Available</h2>
      <p>
        We supply turmeric in various forms to meet different market requirements:
      </p>
      <ul>
        <li>Fresh turmeric rhizomes</li>
        <li>Dried whole turmeric</li>
        <li>Turmeric slices</li>
        <li>Turmeric powder</li>
      </ul>

      <h2>Applications & Markets</h2>
      <p>
        Our turmeric is used worldwide in culinary applications, traditional medicine, 
        dietary supplements, natural food coloring, and cosmetic products. We ensure 
        every shipment meets the specific requirements of each market and application.
      </p>
    `,
  },

  {
    slug: 'turmeric-plantations',
    title: 'Sustainable Turmeric Cultivation',
    date: 'Jan 2025',
    description:
      'Our turmeric plantations in Jenangan are managed sustainably with local farmers to ensure soil health and consistent production quality for global markets.',
    image: '/assets/article-turmeric2.webp',
    heroImage: '/assets/article-turmeric2.webp',
    content: `
      <h2>Sustainable Turmeric Cultivation in Jenangan</h2>

      <img src="/assets/article-turmeric2.webp" alt="Turmeric plantation" />
      <p class="caption">
        Sustainable turmeric farming in partnership with local communities.
      </p>

      <p>
        Our turmeric plantations in Jenangan are managed sustainably with local 
        farmers to ensure long-term soil health and consistent production quality.
      </p>

      <h2>Cultivation Excellence</h2>
      <p>
        Turmeric cultivation in Jenangan follows carefully planned cycles that 
        respect the natural rhythm of the crop. From selecting the best rhizomes 
        for planting to optimal harvest timing, every step is designed to maximize 
        both quality and yield.
      </p>

      <h2>Sustainable Practices</h2>
      <p>
        We practice agriculture that benefits both the land and the community:
      </p>
      <ul>
        <li>Natural fertilization using organic compost</li>
        <li>Minimal chemical intervention</li>
        <li>Soil conservation practices</li>
        <li>Efficient water management systems</li>
        <li>Biodiversity preservation</li>
      </ul>

      <h2>Farmer Partnerships</h2>
      <p>
        Our turmeric supply chain is built on fair partnerships with local farmers. 
        We provide technical training, fair pricing, access to quality planting 
        materials, and stable market connections.
      </p>

      <h2>From Farm to Export</h2>
      <p>
        After harvest, turmeric is carefully processed in our facilities to ensure 
        proper cleaning, drying, sorting, and packaging. Every batch is tested for 
        quality parameters including curcumin content, moisture level, and purity 
        standards to meet international buyer expectations.
      </p>
    `,
  },
];