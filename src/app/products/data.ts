export interface Product {
  slug:
    | "dried-sliced-turmeric"
    | "dried-sliced-temulawak"
    | "sliced-emprit-ginger"
    | "shelled-kluwek"
    | "dried-cloves";

  name: string;
  image: string;
  origin: string;
  type?: string;
  grade?: string;
  usage: string;
  description: string;
  moisture?: string;
  ash?: string;
  packing?: string;
}

export const products: Product[] = [
  {
    slug: "dried-sliced-turmeric",
    name: "Dried Sliced Turmeric",
    image: "/assets/dried-turmeric.webp",
    origin: "Indonesia",
    grade: "Manual & Machine Sliced",
    usage: "Spice Ingredient",
    moisture: "10–12%",
    ash: "2%",
    packing: "25 kg / 40 kg PP bags with inner plastic",
    description: "Dried sliced turmeric from Indonesia, prepared for spice, food, and ingredient applications.",
  },
  {
    slug: "dried-sliced-temulawak",
    name: "Dried Sliced Java Turmeric (Temulawak)",
    image: "/assets/temulawak.webp",
    origin: "Indonesia",
    grade: "Manual & Machine Sliced",
    usage: "Spice Ingredient",
    moisture: "10–12%",
    ash: "2%",
    packing: "25 kg / 40 kg PP bags with inner plastic",
    description: "Dried sliced Java turmeric (temulawak) from Indonesia, prepared for spice, herbal, and ingredient applications.",
  },
  {
    slug: "sliced-emprit-ginger",
    name: "Dried Sliced Emprit Ginger",
    image: "/assets/emprit-ginger.webp",
    origin: "Indonesia",
    grade: "Manual & Machine Sliced",
    usage: "Spice Ingredient",
    moisture: "10–12%",
    ash: "2%",
    packing: "25 kg / 40 kg PP bags with inner plastic",
    description:
      "Dried sliced emprit ginger from Indonesia, prepared for spice, food, and ingredient sourcing requirements.",
  },
  {
    slug: "shelled-kluwek",
    name: "Shelled Kluwek",
    image: "/assets/kluwek.webp",
    origin: "Indonesia",
    grade: "Fermented for 6 months",
    usage: "Culinary Ingredient",
    packing: "25 kg",
    description:"Shelled kluwek from Indonesia, prepared for culinary and food ingredient applications.",
  },
  {
    slug: "dried-cloves",
    name: "Dried Cloves",
    image: "/assets/Clove.webp",
    origin: "Indonesia",
    grade: "AB6 / AB10",
    usage: "Spice Ingredient",
    moisture: "8–12%",
    ash: "2%",
    packing: "25 kg / 40 kg PP bags with inner plastic",
    description: "Dried cloves from Indonesia, prepared for spice, food, and ingredient applications.",
  },
];