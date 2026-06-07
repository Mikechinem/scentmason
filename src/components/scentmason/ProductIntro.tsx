"use client";

import { useRef } from "react";
import { productIntro } from "@/data/scentmason";

export default function ProductIntro() {
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const galleryImages =
    productIntro.gallery && productIntro.gallery.length > 0
      ? productIntro.gallery
      : [
          {
            id: "fallback-product-image",
            image: productIntro.image,
            imageAlt: productIntro.imageAlt,
          },
        ];

  const scrollToNextImage = () => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const firstCard = gallery.querySelector("[data-gallery-card]");
    const cardWidth =
      firstCard instanceof HTMLElement
        ? firstCard.offsetWidth
        : gallery.clientWidth * 0.82;

    const gap = 14;
    const nextScrollPosition = gallery.scrollLeft + cardWidth + gap;

    const hasReachedEnd =
      gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 20;

    gallery.scrollTo({
      left: hasReachedEnd ? 0 : nextScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-black px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[15px] font-black text-[var(--accent-soft)]">
            {productIntro.eyebrow}
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1.08] tracking-[-0.01em] text-white">
            {productIntro.headline}
          </h2>

          <p className="mt-5 text-[19px] font-medium leading-9 text-white/70">
            {productIntro.description}
          </p>
        </div>

        <div className="mt-7">
          <div className="relative">
            <div
              ref={galleryRef}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2"
            >
              {galleryImages.map((item, index) => (
                <div
                  key={item.id}
                  data-gallery-card
                  className="w-[82%] shrink-0 snap-start"
                >
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-2 shadow-soft">
                    <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-white/5">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 px-1">
                    <p className="text-sm font-black text-white/80">
                      {index + 1}/{galleryImages.length}
                    </p>

                    <p className="text-xs font-bold text-white/50">
                      Swipe to view more
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToNextImage}
              aria-label="View next product image"
              className="absolute right-1 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white text-2xl font-black text-black shadow-soft"
            >
              ›
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-xl">🔋</p>
            <p className="mt-1 text-xs font-black leading-tight text-white">
              Rechargeable
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-xl">🔩</p>
            <p className="mt-1 text-xs font-black leading-tight text-white">
              No Drilling
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-center">
            <p className="text-xl">💨</p>
            <p className="mt-1 text-xs font-black leading-tight text-white">
              Auto Spray
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}