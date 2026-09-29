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
    description:
      "Indonesian dried sliced turmeric prepared for spice and ingredient applications.",
  },
  {
    slug: "dried-sliced-temulawak",
    name: "Dried Sliced Temulawak",
    image: "/assets/temulawak.webp",
    origin: "Indonesia",
    grade: "Manual & Machine Sliced",
    usage: "Spice Ingredient",
    moisture: "10–12%",
    ash: "2%",
    packing: "25 kg / 40 kg PP bags with inner plastic",
    description:
      "Dried sliced temulawak from Indonesia, prepared for spice and ingredient applications.",
  },
  {
    slug: "sliced-emprit-ginger",
    name: "Sliced Emprit Ginger",
    image: "/assets/emprit-ginger.webp",
    origin: "Indonesia",
    grade: "Manual & Machine Sliced",
    usage: "Spice Ingredient",
    moisture: "10-12%",
    ash: "2%",
    packing: "25 kg / 40 kg PP bags with inner plastic",
    description:
      "Indonesian emprit ginger processed into dried slices for spice and ingredient applications.",
  },
  {
    slug: "shelled-kluwek",
    name: "Shelled Kluwek",
    image: "/assets/kluwek.webp",
    origin: "Indonesia",
    grade: "Fermented for 6 months",
    usage: "Culinary Ingredient",
    packing: "25 kg",
    description:
      "Indonesian kluwek processed through a 6-month fermentation process and prepared in shelled form.",
  },
  {
    slug: "dried-cloves",
    name: "Dried Cloves",
    image: "/assets/Clove.webp",
    origin: "Indonesia",
    grade: "AB6 / AB10",
    usage: "Spice Ingredient",
    moisture: "8-12%",
    ash: "2%",
    packing: "25 kg / 40 kg PP bags with inner plastic",
    description:
      "Indonesian dried cloves, manually dried and available in AB6 and AB10 grades.",
  },
];