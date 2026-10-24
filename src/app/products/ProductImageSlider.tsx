"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


type ProductImageSliderProps = {
  images: string[];
  imageAlts?: string[];
  productName: string;
};


export default function ProductImageSlider({
  images,
  imageAlts = [],
  productName,
}: ProductImageSliderProps) {
  const safeImages =
    images.filter(Boolean);

  const total =
    safeImages.length;


  const [
    current,
    setCurrent,
  ] = useState(0);


  const [
    paused,
    setPaused,
  ] = useState(false);


  const touchStartX =
    useRef<number | null>(
      null
    );


  /* ========================================
     GO TO SLIDE
  ======================================== */

  const goTo = (
    index: number
  ) => {
    if (total <= 1) {
      return;
    }


    let next =
      index;


    if (next < 0) {
      next =
        total - 1;
    }


    if (next >= total) {
      next = 0;
    }


    setCurrent(next);
  };


  /* ========================================
     AUTO SLIDE
  ======================================== */

  useEffect(() => {
    if (
      total <= 1 ||
      paused
    ) {
      return;
    }


    const timer =
      window.setInterval(
        () => {
          setCurrent(
            (previous) =>
              previous + 1 >=
              total
                ? 0
                : previous + 1
          );
        },
        4500
      );


    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [
    paused,
    total,
  ]);


  /* ========================================
     RESET INDEX
  ======================================== */

  useEffect(() => {
    if (
      total === 0
    ) {
      return;
    }


    if (
      current >= total
    ) {
      setCurrent(0);
    }
  }, [
    current,
    total,
  ]);


  /* ========================================
     TOUCH
  ======================================== */

  const handleTouchStart = (
    event:
      React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current =
      event.touches[0]
        ?.clientX ??
      null;


    setPaused(true);
  };


  const handleTouchEnd = (
    event:
      React.TouchEvent<HTMLDivElement>
  ) => {
    if (
      touchStartX.current ===
      null
    ) {
      setPaused(false);

      return;
    }


    const endX =
      event.changedTouches[0]
        ?.clientX ??
      touchStartX.current;


    const difference =
      touchStartX.current -
      endX;


    const swipeThreshold =
      40;


    if (
      Math.abs(
        difference
      ) >=
      swipeThreshold
    ) {
      if (
        difference > 0
      ) {
        goTo(
          current + 1
        );
      } else {
        goTo(
          current - 1
        );
      }
    }


    touchStartX.current =
      null;


    window.setTimeout(
      () => {
        setPaused(false);
      },
      350
    );
  };


  /* ========================================
     IMAGE ALT
  ======================================== */

  const getImageAlt = (
    index: number
  ) => {
    const customAlt =
      imageAlts[index]?.trim();


    if (customAlt) {
      return customAlt;
    }


    if (index === 0) {
      return productName;
    }


    return `${productName} image ${
      index + 1
    }`;
  };


  /* ========================================
     EMPTY
  ======================================== */

  if (total === 0) {
    return (
      <div className="catalog-gallery-empty">
        No image available
      </div>
    );
  }


  return (
    <div
      className="catalog-gallery"
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() =>
        setPaused(false)
      }
      onFocus={() =>
        setPaused(true)
      }
      onBlur={() =>
        setPaused(false)
      }
      onTouchStart={
        handleTouchStart
      }
      onTouchEnd={
        handleTouchEnd
      }
    >

      {/* ========================================
          VIEWPORT
      ======================================== */}

      <div className="catalog-gallery-viewport">

        <div
          className="catalog-gallery-track"
          style={{
            transform:
              `translate3d(-${
                current *
                100
              }%, 0, 0)`,
          }}
        >

          {safeImages.map(
            (
              image,
              index
            ) => (
              <div
                className="catalog-gallery-slide"
                key={`${image}-${index}`}
              >

                <Image
                  src={
                    image
                  }
                  alt={
                    getImageAlt(
                      index
                    )
                  }
                  fill
                  quality={66}
                  sizes="
                    (max-width: 720px) calc(100vw - 2rem),
                    (max-width: 1100px) 34vw,
                    390px
                  "
                />

              </div>
            )
          )}

        </div>

      </div>


      {/* ========================================
          COUNT
      ======================================== */}

      {total > 1 && (
        <span className="catalog-gallery-count">

          {current + 1}

          <span>
            /
          </span>

          {total}

        </span>
      )}


      {/* ========================================
          ARROWS
      ======================================== */}

      {total > 1 && (
        <>

          <button
            type="button"
            className="catalog-gallery-arrow catalog-gallery-arrow-left"
            aria-label={`Previous image of ${productName}`}
            onClick={() =>
              goTo(
                current - 1
              )
            }
          >
            ‹
          </button>


          <button
            type="button"
            className="catalog-gallery-arrow catalog-gallery-arrow-right"
            aria-label={`Next image of ${productName}`}
            onClick={() =>
              goTo(
                current + 1
              )
            }
          >
            ›
          </button>

        </>
      )}


      {/* ========================================
          DOTS
      ======================================== */}

      {total > 1 && (
        <div className="catalog-gallery-dots">

          {safeImages.map(
            (
              _,
              index
            ) => (
              <button
                key={
                  index
                }
                type="button"
                className={`catalog-gallery-dot ${
                  index ===
                  current
                    ? "active"
                    : ""
                }`}
                aria-label={`View image ${
                  index +
                  1
                } of ${productName}`}
                aria-current={
                  index ===
                  current
                    ? "true"
                    : undefined
                }
                onClick={() =>
                  goTo(
                    index
                  )
                }
              />
            )
          )}

        </div>
      )}

    </div>
  );
}