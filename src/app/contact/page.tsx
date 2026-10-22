"use client";

import React, { useEffect, useState } from "react";

import "./contact.css";

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

I am interested in ${product}.

Could you please provide information about availability, product specifications, packing options, and quotation?

Thank you.`;
    }

    return `Hello,

I would like to inquire about your products.

Could you please provide more information about availability, specifications, packing options, and quotation?

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
      <section className="contact-page-hero">
        <div className="contact-page-hero-inner">
          <span className="contact-page-hero-label">
            Contact & Inquiry
          </span>

          <h1>Contact PT Dwi Srikandi Bakoh</h1>

          <p>
            Get in touch for Indonesian spice and agricultural product
            inquiries, specifications, samples, availability, and quotations.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="contact-page-main">
        <div className="contact-page-container">
          <div className="contact-page-grid">
            {/* LEFT */}
            <div className="contact-page-info-card">
              <div className="contact-page-heading">
                <span>Product Inquiry</span>

                <h2>Get in Touch</h2>

                <p>
                  Tell us the product you are looking for, your preferred
                  specification, required quantity, packing needs, and delivery
                  destination.
                </p>
              </div>

              <div className="contact-page-contact-list">
                <div className="contact-page-contact-box">
                  <div className="contact-page-contact-icon">
                    <i className="fa-solid fa-envelope" />
                  </div>

                  <div className="contact-page-contact-content">
                    <span className="contact-page-contact-label">
                      Email
                    </span>

                    <a href="mailto:ptdwisrikandibakoh@gmail.com">
                      ptdwisrikandibakoh@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-page-contact-box">
                  <div className="contact-page-contact-icon">
                    <i className="fa-brands fa-whatsapp" />
                  </div>

                  <div className="contact-page-contact-content">
                    <span className="contact-page-contact-label">
                      Phone / WhatsApp
                    </span>

                    <div className="contact-page-whatsapp-list">
                      <a
                        href="https://api.whatsapp.com/send?phone=6281232366354"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +62 812-3236-6354
                      </a>

                      <a
                        href="https://api.whatsapp.com/send?phone=6282232294053"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +62 822-3229-4053
                      </a>

                      <a
                        href="https://api.whatsapp.com/send?phone=6285159017001"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +62 851-5901-7001
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-page-contact-box">
                  <div className="contact-page-contact-icon">
                    <i className="fa-solid fa-location-dot" />
                  </div>

                  <div className="contact-page-contact-content">
                    <span className="contact-page-contact-label">
                      Address
                    </span>

                    <p>
                      Jl. Raya Jenangan No. 109, Krajan I, Desa Jenangan,
                      Kecamatan Jenangan, Kabupaten Ponorogo, Jawa Timur 63492,
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="contact-page-form-card">
              <div className="contact-page-heading">
                <span>Request Information</span>

                <h2>Request a Quote</h2>

                <p>
                  Send your inquiry through WhatsApp and include as much detail
                  as possible so we can review your requirement more accurately.
                </p>
              </div>

              <form
                className="contact-page-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleWhatsApp();
                }}
                noValidate
              >
                <div className="contact-page-field">
                  <label htmlFor="name">
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    className={
                      errors.name
                        ? "contact-page-input contact-page-input-error"
                        : "contact-page-input"
                    }
                  />

                  {errors.name && (
                    <span
                      role="alert"
                      className="contact-page-error"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact-page-field">
                  <label htmlFor="phone">
                    Phone / WhatsApp
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Example: +62 812 3456 7890"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.phone)}
                    className={
                      errors.phone
                        ? "contact-page-input contact-page-input-error"
                        : "contact-page-input"
                    }
                  />

                  {errors.phone && (
                    <span
                      role="alert"
                      className="contact-page-error"
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="contact-page-field">
                  <label htmlFor="message">
                    Inquiry Details
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us the product, specification, quantity, packing, and destination you require."
                    rows={8}
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    className={
                      errors.message
                        ? "contact-page-input contact-page-textarea contact-page-input-error"
                        : "contact-page-input contact-page-textarea"
                    }
                  />

                  {errors.message && (
                    <span
                      role="alert"
                      className="contact-page-error"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="contact-page-submit"
                >
                  <i className="fa-brands fa-whatsapp" />

                  {loading
                    ? "Opening WhatsApp..."
                    : "Send Inquiry via WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="contact-page-map-section">
        <div className="contact-page-map-heading">
          <span>Our Location</span>
          <h2>PT Dwi Srikandi Bakoh</h2>
        </div>

        <div className="contact-page-map">
          <iframe
            title="PT Dwi Srikandi Bakoh Location"
            src="https://www.google.com/maps?q=-7.8229422,111.542023&z=17&output=embed"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}