export interface Product {
  slug: "dried-sliced-turmeric" | "shelled-kluwek" | "dried-cloves";
  name: string;
  image: string;
  origin: string;
  type?: string;
  grade?: string;
  usage: string;
  description: string;
}

export const products: Product[] = [
  {
    slug: "dried-sliced-turmeric",
    name: "Dried Sliced Turmeric",
    image: "/assets/dried-turmeric.webp",
    origin: "Ponorogo, East Java, Indonesia",
    type: "SP / Empu",
    grade: "Available upon specification",
    usage: "Dried Spice Ingredient",
    description:
      "Dried sliced turmeric sourced from Ponorogo, East Java, Indonesia. Available in SP and Empu types, processed through washing, slicing, and natural drying, with specifications prepared according to buyer requirements.",
  },

  {
    slug: "shelled-kluwek",
    name: "Shelled Kluwek",
    image: "/assets/kluwek.webp",
    origin: "East Java, Indonesia",
    type: "Shelled",
    grade: "Available upon specification",
    usage: "Culinary Ingredient",
    description:
      "Shelled kluwek (Pangium edule) sourced from Indonesia and prepared for culinary and ingredient applications according to buyer requirements.",
  },

  {
    slug: "dried-cloves",
    name: "Dried Cloves",
    image: "/assets/Clove.webp",
    origin: "East Java, Indonesia",
    type: "Dried",
    grade: "AB6 / AB10",
    usage: "Spice Ingredient",
    description:
      "Indonesian dried cloves sourced through our supplier network in East Java. Available in AB6 and AB10 grades, with specifications prepared according to buyer requirements.",
  },
];