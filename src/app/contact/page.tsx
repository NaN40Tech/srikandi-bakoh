"use client";

import React, { useEffect, useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
    product: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Template message generator
  const getDefaultMessage = (product?: string, name?: string) =>
    product
      ? `Dear Sales Team,\n\nI am interested in requesting a quotation for your product: ${product}.\nCould you kindly provide the pricing details, packaging options, and shipping information?\n\nThank you in advance.\nBest regards,\n${name || "[Your Name]"}`
      : `Dear Sales Team,\n\nI would like to get in touch regarding your products and services.\n\nBest regards,\n${name || "[Your Name]"}`;

  // ambil query ?product=
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const product = params.get("product") || "";

      setForm((prev) => ({
        ...prev,
        product,
        message: getDefaultMessage(product, prev.name),
      }));
    }
  }, []);

  // update message otomatis jika product berubah
  useEffect(() => {
    if (form.product) {
      setForm((prev) => ({
        ...prev,
        message: getDefaultMessage(prev.product, prev.name),
      }));
    }
     
  }, [form.product]);

  const validatePhone = (phone: string) => /^\+?[1-9]\d{6,14}$/.test(phone);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!validatePhone(form.phone))
      newErrors.phone = "Invalid phone number.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      message:
        name === "name"
          ? getDefaultMessage(prev.product, value)
          : prev.message,
    }));

    if (errors[name]) {
      const newErr = { ...errors };
      delete newErr[name];
      setErrors(newErr);
    }
  };

  const handleWhatsApp = () => {
    if (!validateForm()) return;
    setLoading(true);

    const waNumber = "6281232366354"; 
    const waMessage = [
      "Hello PT Dwi Srikandi Bakoh Team,",
      "",
      `My name: ${form.name}`,
      `Phone: ${form.phone}`,
      "",
      form.message,
    ].join("\n");

    const url = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(
      waMessage
    )}`;

    window.open(url, "_blank");
    setLoading(false);
  };

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>
            We’d love to hear from you. Let’s connect for inquiries and
            quotations.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="contact-section">
        <div className="contact-grid">
          {/* INFO */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>
              <strong>Email:</strong>
              <br /> ptdwisrikandibakoh@gmail.com
            </p>
            <p>
              <strong>Phone / WhatsApp:</strong>
              <br />
              <a
                href="https://api.whatsapp.com/send?phone=6281232366354"
                target="_blank"
                rel="noreferrer"
              >
                Admin 1:+62 812-3236-6354 (Chat via WhatsApp)
              </a>
               <br />
              <a
                href="https://api.whatsapp.com/send?phone=6285604950653"
                target="_blank"
                rel="noreferrer"
              >
                Admin 2:+62 856-0495-0653 (Chat via WhatsApp)
              </a>
              <br />
                            <a
                href="https://api.whatsapp.com/send?phone=6285159017001"
                target="_blank"
                rel="noreferrer"
              >
                Admin 3: +62 851-5901-7001 (Chat via WhatsApp)
              </a>
            </p>
            <p>
              <strong>Address:</strong>
              <br />
              Jl. Raya Jenangan No.109, Krajan I, Desa Jenangan,
              <br />
               Kecamatan Jenangan, Kabupaten Ponorogo,
              <br />
              Jawa Timur 63492, Indonesia
            </p>
          </div>

          {/* FORM */}
          <div className="contact-form">
            <h2>Request a Quote</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleWhatsApp();
              }}
              noValidate
            >
              <label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: errors.name
                      ? "1px solid #e11"
                      : "1px solid #ccc",
                    marginBottom: 8,
                  }}
                />
              </label>
              {errors.name && (
                <div style={{ color: "#b91c1c", fontSize: "0.9rem" }}>
                  {errors.name}
                </div>
              )}

              <label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number (e.g. +628***)"
                  value={form.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: errors.phone
                      ? "1px solid #e11"
                      : "1px solid #ccc",
                    marginBottom: 8,
                  }}
                />
              </label>
              {errors.phone && (
                <div style={{ color: "#b91c1c", fontSize: "0.9rem" }}>
                  {errors.phone}
                </div>
              )}

              <label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={7}
                  value={form.message}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: 6,
                    border: errors.message
                      ? "1px solid #e11"
                      : "1px solid #ccc",
                    marginBottom: 8,
                  }}
                />
              </label>
              {errors.message && (
                <div style={{ color: "#b91c1c", fontSize: "0.9rem" }}>
                  {errors.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  background: loading ? "#ece5dd" : "#25d366",
                  color: "#fff",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Opening WhatsApp..." : "Send via WhatsApp"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAP */}
        <section className="map" style={{ marginTop: 20 }}>
  <iframe
    src="https://www.google.com/maps?q=-7.8229422,111.542023&z=17&output=embed"
    width="100%"
    height="400"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</section>
    </>
  );
}
