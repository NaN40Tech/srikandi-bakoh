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
    useRef<number | null>(
      null
    );


  const touchEndX =
    useRef<number | null>(
      null
    );


  const thumbnailContainerRef =
    useRef<HTMLDivElement | null>(
      null
    );


  const thumbnailRefs =
    useRef<
      Array<
        HTMLButtonElement |
        null
      >
    >([]);


  const safeImages =
    images.filter(Boolean);


  const imageCount =
    safeImages.length;


  const hasMultipleImages =
    imageCount > 1;


  const activeImage =
    safeImages[
      activeIndex
    ];


  /* ========================================
     KEEP INDEX SAFE
  ======================================== */

  useEffect(() => {
    if (
      imageCount === 0
    ) {
      return;
    }


    if (
      activeIndex >=
      imageCount
    ) {
      setActiveIndex(
        0
      );
    }
  }, [
    activeIndex,
    imageCount,
  ]);


  /* ========================================
     KEEP THUMBNAIL VISIBLE

     Important:
     jangan pakai scrollIntoView()
     karena bisa menggeser page / ancestor
     ketika responsive layout berubah.
  ======================================== */

  useEffect(() => {
    const container =
      thumbnailContainerRef.current;


    const thumbnail =
      thumbnailRefs.current[
        activeIndex
      ];


    if (
      !container ||
      !thumbnail
    ) {
      return;
    }


    const containerLeft =
      container.scrollLeft;


    const containerRight =
      containerLeft +
      container.clientWidth;


    const thumbnailLeft =
      thumbnail.offsetLeft;


    const thumbnailRight =
      thumbnailLeft +
      thumbnail.offsetWidth;


    if (
      thumbnailLeft <
      containerLeft
    ) {
      container.scrollTo({
        left:
          thumbnailLeft -
          4,

        behavior:
          "smooth",
      });
    } else if (
      thumbnailRight >
      containerRight
    ) {
      container.scrollTo({
        left:
          thumbnailRight -
          container.clientWidth +
          4,

        behavior:
          "smooth",
      });
    }
  }, [
    activeIndex,
  ]);


  /* ========================================
     PREVIOUS
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
          ? imageCount -
            1
          : current -
            1
    );
  };


  /* ========================================
     NEXT
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
        imageCount -
          1
          ? 0
          : current +
            1
    );
  };


  /* ========================================
     SELECT
  ======================================== */

  const selectImage = (
    index: number
  ) => {
    setActiveIndex(
      index
    );
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


    touchEndX.current =
      null;
  };


  const handleTouchMove = (
    event:
      React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current =
      event.touches[0]
        ?.clientX ??
      null;
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
    } else if (
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
      <div className="detail-gallery-empty">
        Product image unavailable
      </div>
    );
  }


  return (
    <div className="detail-gallery">

      {/* ========================================
          MAIN IMAGE
      ======================================== */}

      <div
        className="detail-gallery-main"
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
            (max-width: 680px) calc(100vw - 2rem),
            (max-width: 960px) calc(100vw - 3rem),
            (max-width: 1180px) 50vw,
            560px
          "
          className="detail-gallery-main-image"
        />


        <div
          className="detail-gallery-shade"
          aria-hidden="true"
        />


        <span className="detail-gallery-origin">
          {origin}
        </span>


        {hasMultipleImages && (
          <>

            <button
              type="button"
              className="detail-gallery-arrow detail-gallery-arrow-left"
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
              className="detail-gallery-arrow detail-gallery-arrow-right"
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
              className="detail-gallery-counter"
              aria-live="polite"
            >

              <span>
                {
                  activeIndex +
                  1
                }
              </span>


              <span className="detail-gallery-counter-divider">
                /
              </span>


              <span>
                {
                  imageCount
                }
              </span>

            </div>

          </>
        )}

      </div>


      {/* ========================================
          THUMBNAILS
      ======================================== */}

      {hasMultipleImages && (
        <div
          ref={
            thumbnailContainerRef
          }
          className="detail-gallery-thumbnails"
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
                  ref={(
                    element
                  ) => {
                    thumbnailRefs.current[
                      index
                    ] =
                      element;
                  }}
                  type="button"
                  key={`${image}-${index}`}
                  className={`detail-gallery-thumbnail ${
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
                    index +
                    1
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
                      (max-width: 680px) 68px,
                      82px
                    "
                    className="detail-gallery-thumbnail-image"
                  />


                  <span
                    className="detail-gallery-thumbnail-overlay"
                    aria-hidden="true"
                  />

                </button>
              );
            }
          )}

        </div>
      )}


      {hasMultipleImages && (
        <p className="detail-gallery-swipe-hint">
          Swipe or select an image
          to view more
        </p>
      )}

    </div>
  );
}