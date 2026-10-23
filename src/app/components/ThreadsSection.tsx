import "./threads-section.css";


const THREADS_URL =
  "https://www.threads.com/@ptdwisrikandi/";


const threadsItems = [
  {
    label: "Top Post",

    title:
      "Our Most Viewed Thread",

    description:
      "One of our most viewed updates on Threads. See the full post and join the conversation.",

    url:
      "https://www.threads.com/share/D_Al1u8UF/",
  },

  {
    label: "From Our Threads",

    title:
      "Updates From Our Journey",

    description:
      "Follow our activities, product updates, and moments we share beyond the website.",

    url:
      "https://www.threads.com/share/D_VhTt3OH/",
  },

  {
    label: "From Our Threads",

    title:
      "More From Our Team",

    description:
      "Discover more updates and everyday moments from PT Dwi Srikandi Bakoh.",

    url:
      "https://www.threads.com/share/EFRhNVBV4/",
  },
];


function ThreadsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12.15 2C6.52 2 2.5 6.08 2.5 11.96c0 5.84 4.04 10.04 9.65 10.04 4.58 0 7.61-2.4 8.86-5.76.73-1.96.67-4.16-.17-5.99-.78-1.71-2.24-3.01-4.04-3.66-.85-.31-1.74-.48-2.63-.52-.37-1.02-.94-1.92-1.69-2.62C11.35 2.4 9.83 2 8.32 2.17"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8.08 10.05c1.36-1.09 3.49-1.49 5.28-.84 2.35.85 3.25 3.06 2.27 5.16-.86 1.84-3.04 2.74-5.08 2.07-1.71-.56-2.69-2.12-2.32-3.67.4-1.66 2.22-2.62 4.14-2.19 1.93.44 3.22 1.97 3.21 3.78"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export default function ThreadsSection() {
  return (
    <section className="threads-home-section">

      <div className="threads-home-heading">

        <span className="threads-home-eyebrow">
          Stay Connected
        </span>


        <div className="threads-home-title-row">

          <div className="threads-home-icon">
            <ThreadsIcon />
          </div>


          <h2>
            From Our Threads
          </h2>

        </div>


        <p>
          Follow our updates, conversations,
          and everyday moments beyond the website.
        </p>

      </div>


      <div className="threads-home-grid">

        {threadsItems.map(
          (
            item
          ) => (
            <a
              key={
                item.title
              }
              href={
                THREADS_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              className="threads-home-card"
              aria-label={`${item.title} on Threads`}
            >

              <div className="threads-home-card-top">

                <span className="threads-home-card-label">
                  {
                    item.label
                  }
                </span>


                <span
                  className="threads-home-card-arrow"
                  aria-hidden="true"
                >
                  ↗
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


              <div className="threads-home-card-footer">

                <span className="threads-home-mini-icon">
                  <ThreadsIcon />
                </span>


                <span>
                  @ptdwisrikandi
                </span>

              </div>

            </a>
          )
        )}

      </div>


      <div className="threads-home-action">

        <a
          href={
            THREADS_URL
          }
          target="_blank"
          rel="noopener noreferrer"
          className="threads-home-button"
        >

          <span className="threads-home-button-icon">
            <ThreadsIcon />
          </span>


          <span>
            Follow Us on Threads
          </span>


          <span
            aria-hidden="true"
            className="threads-home-button-arrow"
          >
            ↗
          </span>

        </a>

      </div>

    </section>
  );
}