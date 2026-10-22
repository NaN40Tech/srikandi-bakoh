import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Indonesian Spice Supplier & Request a Quote",

  description:
    "Contact PT Dwi Srikandi Bakoh for Indonesian spice and agricultural product inquiries, specifications, samples, availability, and quotations for domestic and international supply.",

  alternates: {
    canonical: "/contact",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    url: "/contact",

    title:
      "Contact Indonesian Spice Supplier | PT Dwi Srikandi Bakoh",

    description:
      "Send your product requirements, specifications, quantity, and destination to request information or a quotation for Indonesian spices and agricultural products.",
  },

  twitter: {
    card: "summary",

    title:
      "Contact Indonesian Spice Supplier | PT Dwi Srikandi Bakoh",

    description:
      "Send your product requirements, specifications, quantity, and destination to request information or a quotation for Indonesian spices and agricultural products.",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}