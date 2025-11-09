"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type FormState = {
  name: string;
  email: string;
  phone: string;
  product: string;
  subject: string;
  message: string;
};

type Status = { success: boolean; msg: string } | null;

export default function ContactPage() {
  const searchParams = useSearchParams();
  const productFromQuery = searchParams?.get("product") ?? "";

  const getDefaultSubject = (product: string) =>
    product ? `New Contact Message: ${product} – from [Your Name]` : "New Contact Message";

  const getDefaultMessage = (product: string) =>
    product
      ? `Dear Sales Team,\n\nI am interested in requesting a quotation for your product: ${product}.\nCould you kindly provide the pricing details, packaging options, and shipping information?\n\nThank you in advance.\nBest regards,\n[Your Name]`
      : `Dear Sales Team,\n\nI would like to get in touch regarding your products and services.\n\nBest regards,\n[Your Name]`;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    product: productFromQuery,
    subject: getDefaultSubject(productFromQuery),
    message: getDefaultMessage(productFromQuery),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>(null);
  const [loading, setLoading] = useState(false);

  // Auto-clear status setelah 4 detik
  useEffect(() => {
    if (status) {
      const t = setTimeout(() => setStatus(null), 4000);
      return () => clearTimeout(t);
    }
  }, [status]);

  // Update default subject/message jika product query berubah
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      product: productFromQuery,
      subject: productFromQuery
        ? `New Contact Message: ${productFromQuery} – from ${prev.name || "[Your Name]"}`
        : "New Contact Message",
      message: productFromQuery
        ? `Dear Sales Team,\n\nI am interested in requesting a quotation for your product: ${productFromQuery}.\nCould you kindly provide the pricing details, packaging options, and shipping information?\n\nThank you in advance.\nBest regards,\n${prev.name || "[Your Name]"}`
        : getDefaultMessage(""),
    }));
  }, [productFromQuery]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // E.164-ish: optional +, leading 1-9, total 7-15 digits
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    return phoneRegex.test(phone);
  };

  // validateForm: returns true if valid; sets field errors & status (first error)
  const validateForm = (context?: "whatsapp" | "submit") => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name =
        context === "whatsapp"
          ? "Name is required before contacting via WhatsApp."
          : "Name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email =
        context === "whatsapp"
          ? "Email is required before contacting via WhatsApp."
          : "Email is required.";
    } else if (!validateEmail(form.email.trim())) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        context === "whatsapp"
          ? "Phone number is required before contacting via WhatsApp."
          : "Phone number is required.";
    } else if (!validatePhone(form.phone.trim())) {
      newErrors.phone = "Invalid phone number. Use format like +6285159017001";
    }

    if (!form.message.trim()) {
      newErrors.message =
        context === "whatsapp"
          ? "Message is required before contacting via WhatsApp."
          : "Message is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // set first error as global status for clarity (will auto-hide)
      const firstError = Object.values(newErrors)[0];
      setStatus({ success: false, msg: firstError });
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // update subject if name field changed and product exists
      subject:
        name === "name" && prev.product
          ? `New Contact Message: ${prev.product} – from ${value}`
          : prev.subject,
    }));

    // clear field-specific error on input
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!validateForm("submit")) return;

setLoading(true);
try {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  let data: Record<string, unknown> | null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (res.ok && (data as { success?: boolean })?.success) {
    setStatus({ success: true, msg: "Message sent successfully!" });
    setForm({
      name: "",
      email: "",
      phone: "",
      product: productFromQuery,
      subject: getDefaultSubject(productFromQuery),
      message: getDefaultMessage(productFromQuery),
    });
    setErrors({});
  } else {
    const msg =
      (data as { msg?: string })?.msg ||
      "Failed to send message. Try again later.";
    setStatus({ success: false, msg });
  }
} catch (err) {
  console.error("Contact send error:", err);
  setStatus({ success: false, msg: "Error sending message." });
} finally {
  setLoading(false);
}

  };

  const handleWhatsApp = () => {
    setStatus(null);
    if (!validateForm("whatsapp")) return;

    const waNumber = "6285159017001"; // kantor (tanpa +)
    const waMessage = `Hello PT Srikandi Barokah Team,\n\nMy name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

    // open in new tab
    window.open(url, "_blank");
  };

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Let’s connect for inquiries and business opportunities.</p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              <strong>Email:</strong>
              <br /> info@srikandibakoh.com
            </p>
            <p>
              <strong>Phone (Office):</strong>
              <br /> +62 851 5901 7001
            </p>
            <p>
              <strong>WhatsApp:</strong>
              <br />
              <a href="https://wa.me/6285159017001" target="_blank" rel="noreferrer">
                Chat via WhatsApp
              </a>
            </p>
            <p>
              <strong>Address:</strong>
              <br />
              Jl. Raya Jenangan No.129, Krajan II, Jimbe,
              <br />
              Kec. Jenangan, Kabupaten Ponorogo,
              <br />
              Jawa Timur 63492
            </p>
          </div>

          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} noValidate>
              <label style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: errors.name ? "1px solid #e11" : "1px solid #ccc",
                  }}
                />
              </label>
              {errors.name && (
                <div style={{ color: "#b91c1c", fontSize: "0.9rem", marginTop: -8, marginBottom: 8 }}>
                  {errors.name}
                </div>
              )}

              <label style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: errors.email ? "1px solid #e11" : "1px solid #ccc",
                  }}
                />
              </label>
              {errors.email && (
                <div style={{ color: "#b91c1c", fontSize: "0.9rem", marginTop: -8, marginBottom: 8 }}>
                  {errors.email}
                </div>
              )}

              <label style={{ display: "block", marginBottom: 6 }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number (e.g. +6285159017001)"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: errors.phone ? "1px solid #e11" : "1px solid #ccc",
                  }}
                />
              </label>
              {errors.phone && (
                <div style={{ color: "#b91c1c", fontSize: "0.9rem", marginTop: -8, marginBottom: 8 }}>
                  {errors.phone}
                </div>
              )}

              <label style={{ display: "block", marginBottom: 6 }}>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={7}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: errors.message ? "1px solid #e11" : "1px solid #ccc",
                  }}
                />
              </label>
              {errors.message && (
                <div style={{ color: "#b91c1c", fontSize: "0.9rem", marginTop: -8, marginBottom: 8 }}>
                  {errors.message}
                </div>
              )}

              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  aria-busy={loading}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "none",
                    background: loading ? "#9ca3af" : "#833A0AFF",
                    color: "#fff",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="btn btn-secondary"
                  disabled={loading}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "1px solid #999",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  Contact via WhatsApp
                </button>
              </div>
            </form>

            {/* Global status (first error / success) */}
            {status && (
              <div
                role="status"
                style={{
                  marginTop: 12,
                  color: status.success ? "#065f46" : "#b91c1c",
                  background: status.success ? "#ecfdf5" : "#fff1f2",
                  padding: "8px 10px",
                  borderRadius: 8,
                }}
              >
                {status.msg}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="map" style={{ marginTop: 20 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0657053746056!2d111.47113727472906!3d-7.347194672181503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79b9c6d3e94a53%3A0x301576d14febd40!2sJl.%20Raya%20Jenangan%20No.129%2C%20Jimbe%2C%20Kec.%20Jenangan%2C%20Kabupaten%20Ponorogo%2C%20Jawa%20Timur%2063492!5e0!3m2!1sid!2sid!4v1694092038000!5m2!1sid!2sid"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </section>
    </>
  );
}
