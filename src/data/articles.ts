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
    description: 'Our ginger is cultivated in Ponorogo, East Java — specifically the Jenangan area...',
    image: '/assets/article-ginger1.webp',
    heroImage: '/assets/ginger-farm.webp',
    content: `
      <h2>Origin of Our Ginger</h2>
      <p>Our ginger is cultivated in <strong>Ponorogo, East Java — specifically the Jenangan area</strong>, known for its fertile volcanic soil and premium crop quality...</p>
      <img src="/assets/ginger-farm.webp" alt="Ginger fields in Ponorogo" />
      <p class="caption">Jenangan, Ponorogo — a fertile volcanic region for premium ginger cultivation.</p>
      <h2>What Makes Jenangan Special?</h2>
      <p>The volcanic soil of Jenangan is naturally enriched with minerals, providing ideal conditions for ginger plants to thrive...</p>
      <h2>Export-Ready Quality</h2>
      <ul>
        <li>Fresh whole ginger</li>
        <li>Dried ginger</li>
        <li>Sliced ginger</li>
        <li>Ginger powder</li>
      </ul>
      <h2>Global Reach</h2>
      <p>From Ponorogo’s fertile land to destinations across Asia, the Middle East, and Europe...</p>
      <h2>Our Commitment</h2>
      <p>At PT Srikandi Barokah, we are proud to share the story of Jenangan ginger with the world...</p>
    `,
  },
  {
    slug: 'ginger-plantations',
    title: 'Ginger Plantations',
    date: 'Jan 2025',
    description: 'Our ginger plantations are managed with local farmers in Jenangan...',
    image: '/assets/article-ginger2.webp',
    content: `<p>Our ginger plantations are managed with local farmers in Jenangan using eco-friendly methods...</p>`,
  },
  {
    slug: 'turmeric-origin',
    title: 'The Origin of Turmeric',
    date: 'Jan 2025',
    description: 'Our turmeric comes from Ponorogo Jenangan...',
    image: '/assets/article-turmeric1.webp',
    content: `<p>Our turmeric comes from Ponorogo Jenangan, rich in minerals producing bright-colored turmeric...</p>`,
  },
  {
    slug: 'turmeric-plantations',
    title: 'Turmeric Plantations',
    date: 'Jan 2025',
    description: 'Our turmeric plantations in Jenangan are managed sustainably...',
    image: '/assets/article-turmeric2.webp',
    content: `<p>Our turmeric plantations in Jenangan are managed sustainably with local farmers...</p>`,
  },
];
