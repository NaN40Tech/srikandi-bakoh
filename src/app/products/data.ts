export interface Product {
  slug: string;
  name: string;
  image: string;
  origin: string;
  grade: string;
  usage: string;
  description: string;
}

export const products: Product[] = [
  {
    slug: "nutmeg",
    name: "Nutmeg",
    image: "/assets/nutmeg.webp",
    origin: "Indonesia",
    grade: "Premium",
    usage: "Culinary, Industrial, Health products",
    description:
      "Our Nutmeg is carefully selected from the best regions in Indonesia, ensuring aromatic quality suitable for both culinary and industrial applications. Ideal for spice mixes, essential oils, and traditional remedies.",
  },
  {
    slug: "clove",
    name: "Clove",
    image: "/assets/clove.webp",
    origin: "Indonesia",
    grade: "Premium",
    usage: "Culinary, Industrial, Health products",
    description:
      "High-quality cloves sourced from Indonesian farms, perfect for spice, oil extraction, and herbal remedies.",
  },
  {
    slug: "cinnamon",
    name: "Cinnamon",
    image: "/assets/cinnamon.webp",
    origin: "Indonesia",
    grade: "Premium",
    usage: "Culinary, Industrial, Health products",
    description:
      "Aromatic cinnamon sticks from the best plantations in Indonesia, great for culinary and industrial purposes.",
  },
];
