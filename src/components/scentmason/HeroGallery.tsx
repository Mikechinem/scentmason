"use client";

import { useEffect, useRef, useState } from "react";

const heroImages = [
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788300/gardenia_deep_so4elw.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788300/white-peach_pzruxu.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788299/Hilton_e6vjyk.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788299/lavender_tdeabk.png",
];

export default function HeroGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // ============================================================
  // AUTOMATIC CAROUSEL
  // ============================================================

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // ============================================================
  // SWIPE HANDLERS
  // ============================================================

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      setIsPaused(false);
      return;
    }

    const distance =
      touchStartX.current - touchEndX.current;

    const minimumSwipeDistance = 50;

    if (Math.abs(distance) >= minimumSwipeDistance) {
      if (distance > 0) {
        // Swipe left → next
        setCurrentIndex(
          (prev) => (prev + 1) % heroImages.length
        );
      } else {
        // Swipe right → previous
        setCurrentIndex(
          (prev) =>
            (prev - 1 + heroImages.length) %
            heroImages.length
        );
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;

    setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  // ============================================================
  // DOT NAVIGATION
  // ============================================================

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);

    setTimeout(() => {
      setIsPaused(false);
    }, 2500);
  };

  // ============================================================
  // CAROUSEL
  // ============================================================

  return (
    <section
      className="
        relative
        mt-8
        w-full
        overflow-hidden
        bg-[#111111]
        py-5
      "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ======================================================
          CAROUSEL VIEWPORT
          ====================================================== */}

      <div className="w-full overflow-hidden">
        <div
          className="
            flex
            items-center
            gap-3
            transition-transform
            duration-700
            ease-out
            will-change-transform
          "
          style={{
            transform: `translateX(calc(14% - ${currentIndex * 75}% - ${
              currentIndex * 12
            }px))`,
          }}
        >
          {heroImages.map((src, index) => (
            <div
              key={src}
              className="
                relative
                w-[75%]
                min-w-[75%]
                shrink-0
                overflow-hidden
                rounded-2xl
                bg-[#1a1a1a]
                shadow-2xl
              "
              style={{
                aspectRatio: "4 / 5",
              }}
            >
              <img
                src={src}
                alt={`ScentMason fragrance showcase ${index + 1}`}
                width={800}
                height={1000}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
                className="
                  h-full
                  w-full
                  select-none
                  object-contain
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================
          DOT NAVIGATION
          ====================================================== */}

      <div className="relative z-20 mt-4 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-300
              ${
                index === currentIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}