"use client";

import React from "react";

const SOCIAL_TESTIMONIALS = [

   {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/1.png",
    alt: "ScentMason customer testimonial",
  },

  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/reordertestimoniawhatsapp.png",
    alt: "ScentMason WhatsApp reorder testimonial",
  },

{
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/temu-scentmason-testimonials/Screenshot%202026-09-20%20103827(1)_16px_readable.png?updatedAt=1791008760539",
    alt: "ScentMason customer review",
  },
  
];

export default function SocialTestimonia() {
  return (
    <section className="w-full bg-[#111111] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        <h2 className="mx-auto max-w-3xl text-center text-[28px] font-bold leading-[1.15] tracking-tight text-white sm:text-[36px] md:text-[42px]">
          PEOPLE ARE BUYING MORE AFTER TRYING IT
        </h2>

        {/* Testimonials */}
        <div
          className="
            mt-8
            flex gap-4 overflow-x-auto pb-3
            snap-x snap-mandatory
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:mt-10
            md:grid md:grid-cols-3 md:gap-5
            md:overflow-visible
            md:pb-0
          "
        >
          {SOCIAL_TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className="
                w-[84vw] max-w-[390px]
                flex-shrink-0 snap-center
                overflow-hidden rounded-2xl
                border border-white/10
                bg-white
                shadow-[0_12px_35px_rgba(0,0,0,0.25)]
                md:w-auto md:max-w-none
              "
            >
              <img
                src={testimonial.src}
                alt={testimonial.alt}
                loading={index === 0 ? "eager" : "lazy"}
                className="block h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}