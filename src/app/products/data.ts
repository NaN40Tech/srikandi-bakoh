export interface Product {
  slug: "rice" | "ginger" | "turmeric";
  name: string;
  image: string;
  origin: string;
  grade: string;
  usage: string;
  description: string;
}

export const products = [
  {
    slug: "rice",
    name: "Rice",
    image: "/assets/rice.webp",
    origin: "East Java, Indonesia",
    grade: "Premium, Medium, Broken (Menir)",
    usage: "Culinary, Food Industry, Export",
    description:
      "High-quality Indonesian rice sourced from selected farmers in East Java. Processed with modern milling technology to ensure consistent quality for global markets.",
  },
  {
    slug: "ginger",
    name: "Ginger",
    image: "/assets/ginger.webp",
    origin: "Ponorogo, East Java",
    grade: "Premium",
    usage: "Fresh, Dried, Powder, Sliced",
    description:
      "Indonesian ginger cultivated in fertile volcanic soil of Ponorogo. Known for its strong aroma and high essential oil content.",
  },
  {
    slug: "turmeric",
    name: "Turmeric",
    image: "/assets/turmeric.webp",
    origin: "East Java, Indonesia",
    grade: "Premium",
    usage: "Fresh, Dried, Powder",
    description:
      "Natural turmeric from East Java with bright color and high curcumin content.",
  },
] as const;
