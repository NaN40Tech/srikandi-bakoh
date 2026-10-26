import type { Metadata } from "next";
import SupplierRegistrationContent from "./SupplierRegistrationContent";
import "./supplier-registration.css";

export const metadata: Metadata = {
  title: "Supplier Registration | PT Dwi Srikandi Bakoh",
  description:
    "Daftarkan produk Anda sebagai calon supplier PT Dwi Srikandi Bakoh untuk kebutuhan pengadaan komoditas pertanian dan rempah.",
};

export default function SupplierRegistrationPage() {
  return (
    <main className="supplier-page">
      <SupplierRegistrationContent />
    </main>
  );
}