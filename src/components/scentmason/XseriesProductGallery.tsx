"use client";

import { useState } from "react";

type ProductImage = {
  src: string;
  alt: string;
};

const PRODUCT_IMAGES: ProductImage[] = [
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_08.jpg",
    alt: "ScentMason automatic fragrance machine",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_05.jpg",
    alt: "ScentMason automatic fragrance machine",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_11.jpg",
    alt: "ScentMason fragrance machine lifestyle",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_09.jpg",
    alt: "ScentMason fragrance machine in a home",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_03.jpg",
    alt: "ScentMason fragrance machine product detail",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_10.jpg",
    alt: "ScentMason automatic fragrance machine",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_01.jpg",
    alt: "ScentMason automatic fragrance diffuser",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_06.jpg",
    alt: "ScentMason fragrance machine",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_02.jpg",
    alt: "ScentMason diffuser product view",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_12.jpg",
    alt: "ScentMason automatic fragrance machine",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_07.jpg",
    alt: "ScentMason diffuser in a premium interior",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_13.jpg",
    alt: "ScentMason automatic fragrance machine detail",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/ScentMason_Carousel_04.jpg",
    alt: "ScentMason fragrance diffuser lifestyle",
  },
];

export default function XseriesProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = PRODUCT_IMAGES[activeIndex];

  const previousImage = () => {
    setActiveIndex((current) =>
      current === 0 ? PRODUCT_IMAGES.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((current) =>
      current === PRODUCT_IMAGES.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section
      aria-label="ScentMason product gallery"
      className="w-full"
    >
      {/* =========================================
          DESKTOP / TABLET GALLERY
      ========================================== */}
      <div className="hidden gap-4 md:flex">

        {/* Thumbnail column */}
        <div className="flex w-[82px] shrink-0 flex-col gap-2 overflow-y-auto">
          {PRODUCT_IMAGES.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View product image ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 bg-[#f7f7f5] transition-all duration-200 ${
                  isActive
                    ? "border-black"
                    : "border-transparent opacity-70 hover:border-black/30 hover:opacity-100"
                }`}
              >
                <img
                  src={image.src}
                  alt=""
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Main image */}
        <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5]">

          <div className="aspect-square w-full">
            <img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous product image"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur transition hover:bg-white active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next product image"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur transition hover:bg-white active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {activeIndex + 1} / {PRODUCT_IMAGES.length}
          </div>
        </div>
      </div>

      {/* =========================================
          DESKTOP REVIEW / TRUST STRIP
      ========================================== */}
      <div className="mt-3 hidden border-y border-black/10 py-2.5 md:block">
        <div className="flex items-center justify-between gap-3">

          {/* Rating */}
          <div className="flex min-w-0 items-center gap-2 text-[13px] sm:text-[14px]">
            <span className="font-medium text-black">
              484 reviews
            </span>

            <span className="text-black/30">
              |
            </span>

            <span className="font-semibold text-black">
              4.8
            </span>

            {/* Black stars */}
            <div
              className="flex items-center gap-[1px]"
              aria-label="4.8 out of 5 stars"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  viewBox="0 0 24 24"
                  className="h-[15px] w-[15px] fill-black"
                  aria-hidden="true"
                >
                  <path d="M12 2.5l2.93 5.94 6.56.95-4.75 4.63 1.12 6.54L12 17.47l-5.86 3.09 1.12-6.54L2.51 9.39l6.56-.95L12 2.5z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Verified purchases */}
          <div className="flex shrink-0 items-center gap-1.5 rounded-sm bg-[#f4f8f2] px-1.5 py-1">

            <div className="flex h-[17px] w-[17px] items-center justify-center rounded-[3px] bg-green-700">
              <svg
                viewBox="0 0 24 24"
                className="h-[11px] w-[11px] fill-white"
                aria-hidden="true"
              >
                <path d="M12 2l7 3v5.4c0 5.1-3.1 9.8-7 11.6-3.9-1.8-7-6.5-7-11.6V5l7-3zm-1.1 13.4l5.1-5.1-1.4-1.4-3.7 3.7-1.7-1.7-1.4 1.4 3.1 3.1z" />
              </svg>
            </div>

            <span className="text-[10px] font-semibold text-green-700 sm:text-[11px]">
              All reviews are from verified purchases
            </span>
          </div>

        </div>
      </div>

      {/* =========================================
          MOBILE GALLERY
      ========================================== */}
      <div className="md:hidden">

        {/* Main image */}
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5]">

          <div className="aspect-square w-full">
            <img
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous product image"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next product image"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-md backdrop-blur active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {activeIndex + 1} / {PRODUCT_IMAGES.length}
          </div>
        </div>

        {/* Mobile thumbnails */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {PRODUCT_IMAGES.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View product image ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border-2 bg-[#f7f7f5] transition-all ${
                  isActive
                    ? "border-black"
                    : "border-transparent opacity-70"
                }`}
              >
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* =========================================
            MOBILE REVIEW / TRUST STRIP
        ========================================== */}
        <div className="mt-3 border-y border-black/10 py-2.5">

          <div className="flex flex-wrap items-center justify-between gap-2">

            {/* Rating */}
            <div className="flex items-center gap-2 text-[13px]">

              <span className="font-medium text-black">
                484 reviews
              </span>

              <span className="text-black/30">
                |
              </span>

              <span className="font-semibold text-black">
                4.8
              </span>

              <div
                className="flex items-center gap-[1px]"
                aria-label="4.8 out of 5 stars"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    viewBox="0 0 24 24"
                    className="h-[14px] w-[14px] fill-black"
                    aria-hidden="true"
                  >
                    <path d="M12 2.5l2.93 5.94 6.56.95-4.75 4.63 1.12 6.54L12 17.47l-5.86 3.09 1.12-6.54L2.51 9.39l6.56-.95L12 2.5z" />
                  </svg>
                ))}
              </div>

            </div>

            {/* Verified purchases */}
            <div className="flex items-center gap-1.5 rounded-sm bg-[#f4f8f2] px-1.5 py-1">

              <div className="flex h-[17px] w-[17px] items-center justify-center rounded-[3px] bg-green-700">
                <svg
                  viewBox="0 0 24 24"
                  className="h-[11px] w-[11px] fill-white"
                  aria-hidden="true"
                >
                  <path d="M12 2l7 3v5.4c0 5.1-3.1 9.8-7 11.6-3.9-1.8-7-6.5-7-11.6V5l7-3zm-1.1 13.4l5.1-5.1 3.7-3.7 1.4 1.4-5.1 5.1-1.7-1.7-1.4 1.4 3.1 3.1z" />
                </svg>
              </div>

              <span className="text-[9px] font-semibold text-green-700">
                Verified purchases
              </span>

            </div>

          </div>

        </div>

        <p className="mt-2 text-center text-xs font-medium text-black/40">
          Tap an image to view
        </p>

      </div>
    </section>
  );
}