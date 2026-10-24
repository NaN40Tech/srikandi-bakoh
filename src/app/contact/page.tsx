"use client";

import Image from "next/image";
import type {
  ChangeEvent,
  FormEvent,
} from "react";
import {
  useEffect,
  useState,
} from "react";

import "./contact.css";


interface ContactForm {
  name: string;
  phone: string;
  message: string;
  product: string;
}


type FormErrors =
  Partial<
    Record<
      keyof ContactForm,
      string
    >
  >;


/* ========================================
   GOOGLE MAPS
======================================== */

const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Dwi+Srikandi+Bakoh/@-7.8229213,111.5419881,21z/data=!4m6!3m5!1s0x2e79a1c9554d3ad1:0x8f7965c46a8c415b!8m2!3d-7.8229422!4d111.542023!16s%2Fg%2F11zd56yvhr";


const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Dwi%20Srikandi%20Bakoh%2C%20-7.8229422%2C111.542023&ll=-7.8229422,111.542023&z=19&output=embed";


/* ========================================
   ICONS
======================================== */

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 6h18v12H3V6Zm0 1 9 6 9-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12.05 2A9.83 9.83 0 0 0 3.6 16.83L2 22l5.3-1.54A9.93 9.93 0 1 0 12.05 2Zm0 17.86a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-3.14.91.94-3.06-.19-.31A7.76 7.76 0 1 1 12.05 19.86Zm4.27-5.82c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.52.12-.16.23-.6.76-.74.92-.14.15-.27.17-.5.05-.23-.12-.98-.36-1.87-1.15a7.04 7.04 0 0 1-1.29-1.6c-.14-.23-.01-.36.1-.48.1-.1.23-.27.35-.4.11-.14.15-.24.23-.4.08-.15.04-.29-.02-.4-.06-.12-.52-1.26-.72-1.73-.19-.45-.38-.39-.52-.4h-.45c-.16 0-.41.06-.62.29-.22.23-.82.8-.82 1.95 0 1.14.84 2.25.95 2.4.12.16 1.65 2.52 4 3.54.56.24 1 .39 1.34.5.56.18 1.07.15 1.47.09.45-.07 1.38-.57 1.58-1.11.19-.55.19-1.02.13-1.12-.05-.1-.21-.16-.44-.27Z"
      />
    </svg>
  );
}


function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m9 18 6-6-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* ========================================
   CONTACT PAGE
======================================== */

export default function ContactPage() {
  const [form, setForm] =
    useState<ContactForm>({
      name: "",
      phone: "",
      message: "",
      product: "",
    });


  const [errors, setErrors] =
    useState<FormErrors>({});


  const [loading, setLoading] =
    useState(false);


  const [showMap, setShowMap] =
    useState(false);


  /* ========================================
     DEFAULT MESSAGE
  ======================================== */

  const getDefaultMessage = (
    product?: string
  ) => {
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


  /* ========================================
     READ PRODUCT FROM URL
  ======================================== */

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search
      );


    const product =
      params.get("product") || "";


    setForm((prev) => ({
      ...prev,

      product,

      message:
        getDefaultMessage(
          product
        ),
    }));
  }, []);


  /* ========================================
     PHONE VALIDATION
  ======================================== */

  const normalizePhone = (
    phone: string
  ) => {
    return phone.replace(
      /[\s\-()]/g,
      ""
    );
  };


  const validatePhone = (
    phone: string
  ) => {
    const normalizedPhone =
      normalizePhone(phone);


    return /^\+?[1-9]\d{6,14}$/.test(
      normalizedPhone
    );
  };


  /* ========================================
     FORM VALIDATION
  ======================================== */

  const validateForm = () => {
    const newErrors:
      FormErrors = {};


    if (!form.name.trim()) {
      newErrors.name =
        "Name is required.";
    }


    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !validatePhone(
        form.phone
      )
    ) {
      newErrors.phone =
        "Please enter a valid phone number.";
    }


    if (!form.message.trim()) {
      newErrors.message =
        "Message is required.";
    }


    setErrors(
      newErrors
    );


    return (
      Object.keys(
        newErrors
      ).length === 0
    );
  };


  /* ========================================
     HANDLE CHANGE
  ======================================== */

  const handleChange = (
    e:
      ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >
  ) => {
    const {
      name,
      value,
    } = e.target;


    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));


    const field =
      name as keyof ContactForm;


    if (errors[field]) {
      setErrors((prev) => {
        const updated = {
          ...prev,
        };


        delete updated[field];


        return updated;
      });
    }
  };


  /* ========================================
     WHATSAPP
  ======================================== */

  const handleWhatsApp = () => {
    if (!validateForm()) {
      return;
    }


    setLoading(true);


    const waNumber =
      "6281232366354";


    const waMessage = [
      "Hello PT Dwi Srikandi Bakoh Team,",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      "",
      form.message,
    ].join("\n");


    const url =
      `https://wa.me/${waNumber}?text=${encodeURIComponent(
        waMessage
      )}`;


    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );


    setLoading(false);
  };


  /* ========================================
     SUBMIT
  ======================================== */

  const handleSubmit = (
    e:
      FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();


    handleWhatsApp();
  };


  return (
    <>
      {/* ========================================
          HERO
      ======================================== */}

      <section className="contact-page-hero">

        <Image
          src="/assets/articles-hero.webp"
          alt="PT Dwi Srikandi Bakoh contact page"
          fill
          priority
          fetchPriority="high"
          quality={68}
          sizes="100vw"
          className="contact-page-hero-image"
          aria-hidden="true"
        />


        <div
          className="contact-page-hero-overlay"
          aria-hidden="true"
        />


        <div className="contact-page-hero-inner">

          <span className="contact-page-hero-label">
            Contact &amp; Inquiry
          </span>


          <h1>
            Contact PT Dwi
            Srikandi Bakoh
          </h1>


          <p>
            Get in touch for
            Indonesian spice and
            agricultural product
            inquiries, specifications,
            samples, availability,
            and quotations.
          </p>

        </div>

      </section>


      {/* ========================================
          MAIN
      ======================================== */}

      <section className="contact-page-main">

        <div className="contact-page-container">

          <div className="contact-page-grid">

            {/* ========================================
                CONTACT INFORMATION
            ======================================== */}

            <div className="contact-page-info-card">

              <div className="contact-page-heading">

                <span>
                  Product Inquiry
                </span>


                <h2>
                  Get in Touch
                </h2>


                <p>
                  Tell us the product
                  you are looking for,
                  your preferred
                  specification,
                  required quantity,
                  packing needs, and
                  delivery destination.
                </p>

              </div>


              <div className="contact-page-contact-list">

                {/* EMAIL */}

                <div className="contact-page-contact-box">

                  <div className="contact-page-contact-icon">
                    <EmailIcon />
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


                {/* WHATSAPP */}

                <div className="contact-page-contact-box">

                  <div className="contact-page-contact-icon">
                    <WhatsAppIcon />
                  </div>


                  <div className="contact-page-contact-content">

                    <span className="contact-page-contact-label">
                      Phone / WhatsApp
                    </span>


                    <div className="contact-page-whatsapp-list">

                      <a
                        href="https://wa.me/6281232366354"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>
                          +62 812-3236-6354
                          (Admin 1)
                        </span>

                        <ArrowIcon />
                      </a>


                      <a
                        href="https://wa.me/6282232294053"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>
                          +62 822-3229-4053
                          (Admin 2)
                        </span>

                        <ArrowIcon />
                      </a>


                      <a
                        href="https://wa.me/6285159017001"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>
                          +62 851-5901-7001
                          (Admin 3)
                        </span>

                        <ArrowIcon />
                      </a>

                    </div>

                  </div>

                </div>


                {/* ADDRESS */}

                <div className="contact-page-contact-box">

                  <div className="contact-page-contact-icon">
                    <LocationIcon />
                  </div>


                  <div className="contact-page-contact-content">

                    <span className="contact-page-contact-label">
                      Address
                    </span>


                    <p>
                      Jl. Raya Jenangan
                      No. 109, Krajan I,
                      Desa Jenangan,
                      Kecamatan Jenangan,
                      Kabupaten Ponorogo,
                      Jawa Timur 63492,
                      Indonesia
                    </p>


                    <a
                      href={
                        GOOGLE_MAPS_PLACE_URL
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-page-address-map-link"
                    >
                      View on Google Maps
                    </a>

                  </div>

                </div>

              </div>

            </div>


            {/* ========================================
                FORM
            ======================================== */}

            <div className="contact-page-form-card">

              <div className="contact-page-heading">

                <span>
                  Request Information
                </span>


                <h2>
                  Request a Quote
                </h2>


                <p>
                  Send your inquiry
                  through WhatsApp and
                  include as much detail
                  as possible so we can
                  review your requirement
                  more accurately.
                </p>

              </div>


              <form
                className="contact-page-form"
                onSubmit={
                  handleSubmit
                }
                noValidate
              >

                {/* NAME */}

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
                    value={
                      form.name
                    }
                    onChange={
                      handleChange
                    }
                    aria-invalid={
                      Boolean(
                        errors.name
                      )
                    }
                    aria-describedby={
                      errors.name
                        ? "name-error"
                        : undefined
                    }
                    className={
                      errors.name
                        ? "contact-page-input contact-page-input-error"
                        : "contact-page-input"
                    }
                  />


                  {errors.name && (
                    <span
                      id="name-error"
                      role="alert"
                      className="contact-page-error"
                    >
                      {errors.name}
                    </span>
                  )}

                </div>


                {/* PHONE */}

                <div className="contact-page-field">

                  <label htmlFor="phone">
                    Phone / WhatsApp
                  </label>


                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    placeholder="Example: +62 812 3456 7890"
                    autoComplete="tel"
                    value={
                      form.phone
                    }
                    onChange={
                      handleChange
                    }
                    aria-invalid={
                      Boolean(
                        errors.phone
                      )
                    }
                    aria-describedby={
                      errors.phone
                        ? "phone-error"
                        : undefined
                    }
                    className={
                      errors.phone
                        ? "contact-page-input contact-page-input-error"
                        : "contact-page-input"
                    }
                  />


                  {errors.phone && (
                    <span
                      id="phone-error"
                      role="alert"
                      className="contact-page-error"
                    >
                      {errors.phone}
                    </span>
                  )}

                </div>


                {/* MESSAGE */}

                <div className="contact-page-field">

                  <label htmlFor="message">
                    Inquiry Details
                  </label>


                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us the product, specification, quantity, packing, and destination you require."
                    rows={8}
                    value={
                      form.message
                    }
                    onChange={
                      handleChange
                    }
                    aria-invalid={
                      Boolean(
                        errors.message
                      )
                    }
                    aria-describedby={
                      errors.message
                        ? "message-error"
                        : undefined
                    }
                    className={
                      errors.message
                        ? "contact-page-input contact-page-textarea contact-page-input-error"
                        : "contact-page-input contact-page-textarea"
                    }
                  />


                  {errors.message && (
                    <span
                      id="message-error"
                      role="alert"
                      className="contact-page-error"
                    >
                      {errors.message}
                    </span>
                  )}

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="contact-page-submit"
                >

                  <span
                    className="contact-page-submit-icon"
                    aria-hidden="true"
                  >
                    <WhatsAppIcon />
                  </span>


                  <span>
                    {loading
                      ? "Opening WhatsApp..."
                      : "Send Inquiry via WhatsApp"}
                  </span>

                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          MAP
      ======================================== */}

      <section className="contact-page-map-section">

        <div className="contact-page-map-heading">

          <span>
            Our Location
          </span>


          <h2>
            PT Dwi Srikandi Bakoh
          </h2>


          <p>
            Jenangan, Ponorogo,
            East Java, Indonesia
          </p>

        </div>


        <div className="contact-page-map">

          {!showMap ? (
            <div className="contact-page-map-placeholder">

              <div className="contact-page-map-pin">
                <LocationIcon />
              </div>


              <span className="contact-page-map-small">
                Our Office
              </span>


              <h3>
                PT Dwi Srikandi Bakoh
              </h3>


              <p>
                Jl. Raya Jenangan
                No. 109, Krajan I,
                Desa Jenangan,
                Kecamatan Jenangan,
                Kabupaten Ponorogo,
                Jawa Timur 63492,
                Indonesia
              </p>


              <div className="contact-page-map-actions">

                <button
                  type="button"
                  className="contact-page-map-load"
                  onClick={() =>
                    setShowMap(
                      true
                    )
                  }
                >
                  Load Interactive Map
                </button>


                <a
                  href={
                    GOOGLE_MAPS_PLACE_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-page-map-link"
                >
                  Open in Google Maps
                </a>

              </div>

            </div>
          ) : (
            <iframe
              title="PT Dwi Srikandi Bakoh on Google Maps"
              src={
                GOOGLE_MAPS_EMBED_URL
              }
              width="100%"
              height="450"
              style={{
                border: 0,
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}

        </div>

      </section>
    </>
  );
}