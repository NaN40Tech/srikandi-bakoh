"use client";

import React, { useEffect, useState } from "react";

interface ContactForm {
  name: string;
  phone: string;
  message: string;
  product: string;
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    phone: "",
    message: "",
    product: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const getDefaultMessage = (product?: string) => {
    if (product) {
      return `Hello,

I am interested in ${product} and would like to request a quotation.

Could you please provide more information about the product, packing options, availability, and shipping?

Thank you.`;
    }

    return `Hello,

I would like to inquire about your products and request more information.

Thank you.`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product") || "";

    setForm((prev) => ({
      ...prev,
      product,
      message: getDefaultMessage(product),
    }));
  }, []);

  const normalizePhone = (phone: string) => {
    return phone.replace(/[\s\-()]/g, "");
  };

  const validatePhone = (phone: string) => {
    const normalizedPhone = normalizePhone(phone);

    return /^\+?[1-9]\d{6,14}$/.test(normalizedPhone);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    }

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
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  const handleWhatsApp = () => {
    if (!validateForm()) return;

    setLoading(true);

    const waNumber = "6281232366354";

    const waMessage = [
      "Hello PT Dwi Srikandi Bakoh Team,",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      "",
      form.message,
    ].join("\n");

    const url = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(
      waMessage
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");

    setLoading(false);
  };

  return (
    <>
      {/* HERO */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact PT Dwi Srikandi Bakoh</h1>

          <p>
            Contact us for product inquiries, specifications, samples, and
            quotations for domestic and international supply.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="contact-section">
        <div className="contact-grid">
          {/* INFO */}
          <div className="contact-info">
            <h2>Get in Touch</h2>

            <p>
              Tell us the product, specification, quantity, and destination you
              require. Our team will review your inquiry and provide the
              relevant information.
            </p>

            <p>
              <strong>Email:</strong>
              <br />

              <a href="mailto:ptdwisrikandibakoh@gmail.com">
                ptdwisrikandibakoh@gmail.com
              </a>
            </p>

            <p>
              <strong>Phone / WhatsApp:</strong>
              <br />

              <a
                href="https://api.whatsapp.com/send?phone=6281232366354"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin 1: +62 812-3236-6354
              </a>

              <br />

              <a
                href="https://api.whatsapp.com/send?phone=6282232294053"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin 2: +62 822-3229-4053
              </a>

              <br />

              <a
                href="https://api.whatsapp.com/send?phone=6285159017001"
                target="_blank"
                rel="noopener noreferrer"
              >
                Admin 3: +62 851-5901-7001
              </a>
            </p>

            <p>
              <strong>Address:</strong>
              <br />
              Jl. Raya Jenangan No. 109, Krajan I, Desa Jenangan,
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
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
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
                <div
                  role="alert"
                  style={{
                    color: "#b91c1c",
                    fontSize: "0.9rem",
                    marginBottom: 8,
                  }}
                >
                  {errors.name}
                </div>
              )}

              <label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number (e.g. +62 812 3456 7890)"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
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
                <div
                  role="alert"
                  style={{
                    color: "#b91c1c",
                    fontSize: "0.9rem",
                    marginBottom: 8,
                  }}
                >
                  {errors.phone}
                </div>
              )}

              <label>
                <textarea
                  name="message"
                  placeholder="Tell us the product, specification, quantity, and destination you require."
                  rows={7}
                  value={form.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
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
                <div
                  role="alert"
                  style={{
                    color: "#b91c1c",
                    fontSize: "0.9rem",
                    marginBottom: 8,
                  }}
                >
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
          title="PT Dwi Srikandi Bakoh Location"
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