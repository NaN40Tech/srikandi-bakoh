"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";


interface ProductDetailGalleryProps {
  images: string[];
  productName: string;
  origin?: string;
}


export default function ProductDetailGallery({
  images,
  productName,
  origin = "Indonesia",
}: ProductDetailGalleryProps) {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const touchStartX =
    useRef<number | null>(null);

  const touchEndX =
    useRef<number | null>(null);

  const thumbnailsRef =
    useRef<HTMLDivElement | null>(null);

  const thumbnailRefs =
    useRef<Array<HTMLButtonElement | null>>([]);


  const safeImages =
    images.filter(Boolean);

  const imageCount =
    safeImages.length;

  const hasMultipleImages =
    imageCount > 1;

  const activeImage =
    safeImages[activeIndex];


  /* ========================================
     KEEP INDEX SAFE
  ======================================== */

  useEffect(() => {
    if (
      activeIndex >=
      imageCount
    ) {
      setActiveIndex(0);
    }
  }, [
    activeIndex,
    imageCount,
  ]);


  /* ========================================
     KEEP ACTIVE THUMBNAIL VISIBLE
  ======================================== */

  useEffect(() => {
    const activeThumbnail =
      thumbnailRefs.current[
        activeIndex
      ];

    if (
      !activeThumbnail
    ) {
      return;
    }

    activeThumbnail.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeIndex]);


  /* ========================================
     PREVIOUS IMAGE
  ======================================== */

  const previousImage = () => {
    if (
      !hasMultipleImages
    ) {
      return;
    }

    setActiveIndex(
      (current) =>
        current === 0
          ? imageCount - 1
          : current - 1
    );
  };


  /* ========================================
     NEXT IMAGE
  ======================================== */

  const nextImage = () => {
    if (
      !hasMultipleImages
    ) {
      return;
    }

    setActiveIndex(
      (current) =>
        current ===
        imageCount - 1
          ? 0
          : current + 1
    );
  };


  /* ========================================
     SELECT IMAGE
  ======================================== */

  const selectImage = (
    index: number
  ) => {
    setActiveIndex(index);
  };


  /* ========================================
     KEYBOARD
  ======================================== */

  const handleKeyDown = (
    event:
      React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      !hasMultipleImages
    ) {
      return;
    }

    if (
      event.key ===
      "ArrowLeft"
    ) {
      event.preventDefault();
      previousImage();
    }

    if (
      event.key ===
      "ArrowRight"
    ) {
      event.preventDefault();
      nextImage();
    }
  };


  /* ========================================
     TOUCH / SWIPE
  ======================================== */

  const handleTouchStart = (
    event:
      React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current =
      null;

    touchStartX.current =
      event.targetTouches[
        0
      ].clientX;
  };


  const handleTouchMove = (
    event:
      React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current =
      event.targetTouches[
        0
      ].clientX;
  };


  const handleTouchEnd = () => {
    if (
      touchStartX.current ===
        null ||
      touchEndX.current ===
        null
    ) {
      touchStartX.current =
        null;

      touchEndX.current =
        null;

      return;
    }

    const distance =
      touchStartX.current -
      touchEndX.current;

    const minimumSwipeDistance =
      45;

    if (
      distance >
      minimumSwipeDistance
    ) {
      nextImage();
    }

    if (
      distance <
      -minimumSwipeDistance
    ) {
      previousImage();
    }

    touchStartX.current =
      null;

    touchEndX.current =
      null;
  };


  /* ========================================
     EMPTY
  ======================================== */

  if (
    imageCount === 0
  ) {
    return (
      <div className="product-gallery-empty">
        Product image unavailable
      </div>
    );
  }


  return (
    <div className="product-gallery">

      {/* ========================================
          MAIN IMAGE
      ======================================== */}

      <div
        className="product-gallery-main"
        onKeyDown={
          handleKeyDown
        }
        onTouchStart={
          handleTouchStart
        }
        onTouchMove={
          handleTouchMove
        }
        onTouchEnd={
          handleTouchEnd
        }
        tabIndex={
          hasMultipleImages
            ? 0
            : -1
        }
        aria-label={
          hasMultipleImages
            ? `${productName} image gallery`
            : `${productName} product image`
        }
      >

        <Image
          key={
            activeImage
          }
          src={
            activeImage
          }
          alt={`${productName} from ${origin}`}
          fill
          priority
          quality={82}
          sizes="
            (max-width: 480px) calc(100vw - 2rem),
            (max-width: 768px) calc(100vw - 2rem),
            (max-width: 960px) calc(100vw - 3rem),
            (max-width: 1180px) 50vw,
            560px
          "
          className="product-gallery-main-image"
        />


        <div className="product-gallery-shade" />


        <span className="product-gallery-origin">
          {origin}
        </span>


        {/* ========================================
            ARROWS
        ======================================== */}

        {hasMultipleImages && (
          <>
            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow-left"
              onClick={
                previousImage
              }
              aria-label="Previous product image"
            >
              <span
                aria-hidden="true"
              >
                ‹
              </span>
            </button>


            <button
              type="button"
              className="product-gallery-arrow product-gallery-arrow-right"
              onClick={
                nextImage
              }
              aria-label="Next product image"
            >
              <span
                aria-hidden="true"
              >
                ›
              </span>
            </button>


            <div
              className="product-gallery-counter"
              aria-live="polite"
            >
              <span>
                {activeIndex + 1}
              </span>

              <span className="product-gallery-counter-divider">
                /
              </span>

              <span>
                {imageCount}
              </span>
            </div>
          </>
        )}

      </div>


      {/* ========================================
          THUMBNAIL PREVIEW
      ======================================== */}

      {hasMultipleImages && (
        <div
          ref={
            thumbnailsRef
          }
          className="product-gallery-thumbnails"
          aria-label="Product image thumbnails"
        >

          {safeImages.map(
            (
              image,
              index
            ) => {
              const isActive =
                activeIndex ===
                index;

              return (
                <button
                  ref={(element) => {
                    thumbnailRefs.current[
                      index
                    ] = element;
                  }}
                  type="button"
                  key={`${image}-${index}`}
                  className={`product-gallery-thumbnail ${
                    isActive
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    selectImage(
                      index
                    )
                  }
                  aria-label={`View ${productName} image ${
                    index + 1
                  }`}
                  aria-pressed={
                    isActive
                  }
                >

                  <Image
                    src={
                      image
                    }
                    alt=""
                    fill
                    quality={60}
                    sizes="
                      (max-width: 480px) 64px,
                      (max-width: 768px) 70px,
                      (max-width: 960px) 76px,
                      82px
                    "
                    className="product-gallery-thumbnail-image"
                  />


                  <span className="product-gallery-thumbnail-overlay" />

                </button>
              );
            }
          )}

        </div>
      )}


      {/* ========================================
          MOBILE SWIPE INFO
      ======================================== */}

      {hasMultipleImages && (
        <p className="product-gallery-swipe-hint">
          Swipe or select an image to view more
        </p>
      )}

    </div>
  );
}