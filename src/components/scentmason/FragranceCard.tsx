"use client";

import React from "react";

interface Fragrance {
  id: string;
  name: string;
  tagline: string;
  imageUrl: string;
}

const FRAGRANCES: Fragrance[] = [
  {
    id: "hilton-luxury",
    name: "The Hilton Signature",
    tagline: "Prestigious, Crisp & Iconic",
    imageUrl: "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788299/Hilton_e6vjyk.png",
  },
  {
    id: "shangri-la",
    name: "Shangri-La Zen",
    tagline: "Serene, Exotic & Warm",
    imageUrl: "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788299/shrigle-li_stkhxn.png",
  },
  {
    id: "white-peach",
    name: "White Peach & Jasmine",
    tagline: "Crisp, Uplifting & Sweet",
    imageUrl: "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788300/white-peach_pzruxu.png",
  },
  {
    id: "french-lavender",
    name: "French Lavender Fields",
    tagline: "Calming, Therapeutic & Pure",
    imageUrl: "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788299/lavender_tdeabk.png",
  },
  {
    id: "gardenia-deep",
    name: "Deep Gardenia",
    tagline: "Rich, Opulent & Relaxing",
    imageUrl: "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788300/gardenia_deep_so4elw.png",
  },
  {
    id: "royal-gardener",
    name: "Royal Gardener Flora",
    tagline: "Fresh-Cut, Earthy & Vibrant",
    imageUrl: "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788297/Gardener_fg2g5o.png",
  },
];

export default function FragranceCard() {
  return (
    <section className="bg-black text-white py-14 lg:py-20 overflow-hidden">
      {/* Title block */}
      <div className="mx-auto max-w-[600px] text-center mb-10 px-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#A27B5C] bg-[#A27B5C]/10 px-3 py-1 rounded-full">
          The ScentMason Collection
        </span>
        <h2 className="mt-4 text-[25px] font-bold tracking-tight text-white sm:text-[32px]">
          Choose Your Signature Luxury Scent
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-zinc-400">
          Discover our exquisite premium diffuser oil options curated for high-end spaces.
        </p>
      </div>

      {/* RESPONSIVE TRACK: Horizontal Slider on Mobile -> Beautiful 3-Column Grid on Desktop */}
      <div 
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-4 
                   [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   md:grid md:grid-cols-3 md:gap-6 md:max-w-5xl md:mx-auto md:px-6 md:overflow-x-visible"
      >
        {FRAGRANCES.map((oil) => (
          <div
            key={oil.id}
            className="w-[85%] shrink-0 snap-center md:w-full md:shrink md:snap-align-none" 
          >
            <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950 p-3.5 transition-all duration-300 hover:border-zinc-800">
              
              {/* Image Window */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800/20">
                <img
                  src={oil.imageUrl}
                  alt={oil.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Minimalist Headlines & Subheadlines */}
              <div className="mt-4 text-center">
                <h3 className="text-[17px] font-bold tracking-tight text-white">
                  {oil.name}
                </h3>
                
                {/* Deep ScentMason Brown Accent */}
                <p className="mt-1 text-[12px] font-semibold tracking-wide text-[#A27B5C] uppercase">
                  {oil.tagline}
                </p>
              </div>

            </div>
          </div>
        ))}

        {/* Padding preservation element - automatically hidden on desktop layouts */}
        <div className="w-2 shrink-0 md:hidden"></div>
      </div>
    </section>
  );
}