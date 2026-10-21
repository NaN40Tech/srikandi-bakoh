import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Contact PT Dwi Srikandi Bakoh for Indonesian spices and agricultural commodity inquiries, product specifications, samples, and quotations for domestic and international supply.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact PT Dwi Srikandi Bakoh",
    description:
      "Send your product requirements and request a quotation for Indonesian spices and agricultural commodities.",
    url: "/contact",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Contact PT Dwi Srikandi Bakoh",
    description:
      "Send your product requirements and request a quotation for Indonesian spices and agricultural commodities.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}