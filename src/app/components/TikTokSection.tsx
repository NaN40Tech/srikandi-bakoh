import Image from "next/image";

import "./tiktok-section.css";


const TIKTOK_PROFILE =
  "https://www.tiktok.com/@dwisrikandibakoh";


const tiktokItems = [
  {
    type:
      "Top Post",

    title:
      "Our Most Popular TikTok Post",

    description:
      "See one of our most popular updates and explore more from our journey on TikTok.",

    image:
      "/assets/Tiktok/tiktok-1.webp",

    url:
      "https://www.tiktok.com/@dwisrikandibakoh/photo/7672573276987690241",

    isVideo:
      false,
  },

  {
    type:
      "TikTok Video",

    title:
      "Behind the Scenes",

    description:
      "Take a closer look at our activities and moments we share from behind the scenes.",

    image:
      "/assets/Tiktok/tiktok-2.webp",

    url:
      "https://www.tiktok.com/@dwisrikandibakoh/video/7665919798211120400",

    isVideo:
      true,
  },

  {
    type:
      "TikTok Video",

    title:
      "More From Our Journey",

    description:
      "Discover more updates, activities, and moments from PT Dwi Srikandi Bakoh.",

    image:
      "/assets/Tiktok/tiktok-3.webp",

    url:
      "https://www.tiktok.com/@dwisrikandibakoh/video/7669642441464597777",

    isVideo:
      true,
  },
];


function TikTokIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M14.5 3v11.1a4.6 4.6 0 1 1-3.7-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14.5 3c.8 2.7 2.4 4.2 5 4.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8.5 6.8 17 12l-8.5 5.2V6.8Z"
        fill="currentColor"
      />
    </svg>
  );
}


function PhotoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="9"
        cy="10"
        r="1.4"
        fill="currentColor"
      />

      <path
        d="m6.5 17 4.1-4 2.6 2.3 2.2-2 2.6 3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function TikTokSection() {
  return (
    <section className="tiktok-home-section">

      <div className="tiktok-home-heading">

        <span className="tiktok-home-eyebrow">
          Social Highlights
        </span>


        <div className="tiktok-home-title-row">

          <div className="tiktok-home-heading-icon">
            <TikTokIcon />
          </div>


          <h2>
            Follow Our Journey
          </h2>

        </div>


        <p>
          See more of our activities,
          product moments, and everyday
          updates on TikTok.
        </p>

      </div>


      <div className="tiktok-home-grid">

        {tiktokItems.map(
          (
            item
          ) => (
            <a
              key={
                item.url
              }
              href={
                item.url
              }
              target="_blank"
              rel="noopener noreferrer"
              className="tiktok-home-card"
              aria-label={`View ${item.title} on TikTok`}
            >

              <div className="tiktok-home-image">

                <Image
                  src={
                    item.image
                  }
                  alt={
                    item.title
                  }
                  fill
                  quality={68}
                  sizes="
                    (max-width: 620px) calc(100vw - 2rem),
                    (max-width: 900px) 50vw,
                    380px
                  "
                />


                <div
                  className="tiktok-home-image-overlay"
                  aria-hidden="true"
                />


                <span className="tiktok-home-badge">
                  {
                    item.type
                  }
                </span>


                <span className="tiktok-home-media-icon">

                  {item.isVideo ? (
                    <PlayIcon />
                  ) : (
                    <PhotoIcon />
                  )}

                </span>

              </div>


              <div className="tiktok-home-content">

                <div className="tiktok-home-account">

                  <span className="tiktok-home-mini-icon">
                    <TikTokIcon />
                  </span>


                  <span>
                    @dwisrikandibakoh
                  </span>

                </div>


                <h3>
                  {
                    item.title
                  }
                </h3>


                <p>
                  {
                    item.description
                  }
                </p>


                <div className="tiktok-home-link">

                  <span>
                    View on TikTok
                  </span>


                  <span
                    aria-hidden="true"
                  >
                    ↗
                  </span>

                </div>

              </div>

            </a>
          )
        )}

      </div>


      <div className="tiktok-home-action">

        <a
          href={
            TIKTOK_PROFILE
          }
          target="_blank"
          rel="noopener noreferrer"
          className="tiktok-home-button"
        >

          <span className="tiktok-home-button-icon">
            <TikTokIcon />
          </span>


          <span>
            Follow Us on TikTok
          </span>


          <span
            aria-hidden="true"
          >
            ↗
          </span>

        </a>

      </div>

    </section>
  );
}