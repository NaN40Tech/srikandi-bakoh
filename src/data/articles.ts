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
  slug: 'black-keluak',
  title: 'Black Keluak: Indonesia\'s Rarest Spice and Why Global Chefs Are Finally Paying Attention',
  date: 'Jun 2026',
  description:
    'Black Keluak (Pangium edule) is one of Indonesia\'s most distinctive spices — earthy, umami-rich, and centuries old. Discover why international buyers and Michelin-starred chefs are sourcing it now.',
  image: '/assets/article-keluak1.webp',
  heroImage: '/assets/keluak-field.webp',
  content: `
    <h2>Black Keluak: Indonesia's Rarest Spice and Why Global Chefs Are Finally Paying Attention</h2>

    <img src="/assets/article-keluak1.webp" alt="Black Keluak seeds from East Java, Indonesia" />
    <p class="caption">
      Fermented Black Keluak (Pangium edule) sourced from selected farmers in East Java.
    </p>

    <p>
      There is a spice in the heart of <strong>East Java</strong> that has colored soups black
      for centuries, earned a place at Michelin-starred tables in Singapore, and remained almost
      completely unknown to the rest of the world. Its name is <strong>Black Keluak</strong> —
      and for buyers who source premium, differentiated ingredients, it may be the most
      undervalued commodity in Southeast Asia today.
    </p>

    <h2>What Is Black Keluak?</h2>

    <p>
      Black Keluak (<em>Pangium edule</em>) is the fermented seed of a large tree native to
      the mangrove swamps of Southeast Asia. In its raw state, the seed contains hydrogen
      cyanide and is highly toxic. Through a traditional fermentation process — boiling,
      then burying in ash, banana leaves, and earth for up to forty days — the toxins are
      completely neutralized, leaving behind a seed with a deep, earthy, umami-rich flavor
      and a characteristic near-black color.
    </p>

    <p>
      The result is unlike anything else in the global spice palette. Its flavor profile
      has been described as a cross between truffles, dark chocolate, and fermented black
      bean — complex, funky, and deeply savory.
    </p>

    <h2>A Spice with Deep Roots in Indonesian Cuisine</h2>

    <img src="/assets/keluak-rawon.webp" alt="Rawon, East Javanese black beef soup made with keluak" />
    <p class="caption">
      Rawon — East Java's iconic black beef soup — owes its signature color entirely to keluak.
    </p>

    <p>
      Keluak is the defining ingredient in several of Indonesia's most iconic dishes.
      <em>Rawon</em>, the black beef soup from East Java, <em>Brongkos</em> from Yogyakarta,
      <em>Coto Makassar</em> from Sulawesi, and <em>Ayam Buah Keluak</em> from Peranakan
      cuisine in Singapore and Malaysia — none of them exist without this spice.
    </p>

    <p>
      For centuries, keluak was harvested by hand from wild trees, processed by local
      communities using traditional methods, and traded only within the region. Its limited
      availability and complex preparation kept it off the radar of international ingredient
      buyers. That is now beginning to change.
    </p>

    <h2>Why Global Buyers Are Taking Notice</h2>

    <p>
      The global fine dining industry has been quietly discovering keluak for the past
      several years. Singapore's Michelin-starred restaurants have featured it as a premium
      ingredient. Food innovation teams at major FMCG companies have flagged it as a
      candidate for next-generation umami solutions. And as clean-label, naturally fermented
      ingredients gain momentum in the EU and North American food markets, keluak's profile
      as a traditionally processed, plant-based flavor enhancer has become increasingly relevant.
    </p>

    <p>For importers in the food industry, three factors make keluak a strategically interesting sourcing target:</p>

    <h3>1. True Uniqueness</h3>
    <p>
      Keluak has no direct substitute in terms of flavor and color. Unlike black pepper or
      turmeric — commodities with multiple global supply origins — keluak is sourced almost
      exclusively from Indonesia and Malaysia, with Indonesian supply being dominant.
    </p>

    <h3>2. Low Competition Among Suppliers</h3>
    <p>
      While demand in the culinary world is growing, the number of certified, export-ready
      keluak suppliers remains very small. Buyers who establish early supply relationships
      secure a structural advantage.
    </p>

    <h3>3. Regulatory Compliance Is Achievable</h3>
    <p>
      Properly fermented keluak contains no detectable hydrogen cyanide and has been traded
      safely in international markets for decades. With HACCP-certified processing and full
      traceability documentation, export compliance for EU, US, and GCC markets is entirely feasible.
    </p>

    <h2>Our Quality and Traceability Standards</h2>

    <img src="/assets/keluak-processing.webp" alt="Keluak fermentation and processing facility" />
    <p class="caption">
      Every batch is processed and tested under HACCP and ISO 22000 standards before export.
    </p>

    <p>
      At <strong>PT Dwi Srikandi Bakoh</strong>, our Black Keluak is sourced from selected
      farmers across East Java — the historical heartland of keluak cultivation — and processed
      under strict hygiene and fermentation standards. Every batch is tested for safety,
      moisture content, and sensory quality before packaging.
    </p>

    <p>
      Our operations are supported by <strong>HACCP certification</strong>,
      <strong>Halal certification</strong>, and <strong>ISO 22000 Food Safety</strong> standards,
      providing international buyers with the documentation and traceability they require
      for import clearance across major markets.
    </p>

    <h2>Sourcing Information</h2>

    <p>For buyers new to this ingredient, here is what you need to know:</p>

    <ul>
      <li><strong>Form:</strong> Whole fermented seeds (shell-on) or shelled flesh. Most international buyers prefer shell-on for longer shelf life and ease of storage.</li>
      <li><strong>Certifications:</strong> HACCP, Halal, ISO 22000. Full documentation provided upon request.</li>
      <li><strong>Lead time:</strong> Typically 2–4 weeks from order confirmation, depending on destination port.</li>
      <li><strong>Markets served:</strong> Europe, Middle East, Southeast Asia, East Asia.</li>
    </ul>

    <p>
      Black Keluak is one of the last great undiscovered spices in the global ingredient market.
      If you are sourcing differentiated, story-rich ingredients for a discerning market,
      we invite you to explore what keluak can do for your product line.
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