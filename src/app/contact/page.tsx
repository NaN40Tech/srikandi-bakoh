import { Suspense } from "react";
import ContactInner from "./contact-inner";

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactInner />
    </Suspense>
  );
}
