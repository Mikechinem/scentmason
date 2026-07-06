"use client";

import { useRef } from "react";
import ScrollReveal from "@/components/scentmason/ScrollReveal";

interface PremiumGalleryProps {
  images?: string[];
}

const defaultGalleryImages = [
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/family_stone%20(1).png?updatedAt=1783274641004",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffuser_satone_lake%20(3).png?updatedAt=1783274640881",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/real%20image_handing.png?updatedAt=1780844410915",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/spraycan_vs%20Automatic%20Fragrance%20Machine.png?updatedAt=1780827901379",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/AMD%20vs-reed.png?updatedAt=1780827901026",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/wall_office_mount.png?updatedAt=1780841614076",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el7.png?updatedAt=1780413593530",
  "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788300/white-peach_pzruxu.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788299/Hilton_e6vjyk.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788299/lavender_tdeabk.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/v1782788297/Gardener_fg2g5o.png",
];

export default function PremiumGallery({ images = defaultGalleryImages }: PremiumGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler for the right-pointing action button
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Scrolls by roughly the width of one single card element
      const scrollAmount = container.clientWidth * 0.82; 
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#120803] px-0 py-20 text-center text-white">
      {/* Premium Web3 Matrix: Mesh Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" 
        style={{ maskImage: 'radial-gradient(ellipse_at_center, white, transparent 85%)', WebkitMaskImage: 'radial-gradient(ellipse_at_center, white, transparent 85%)' }}
      />
      
      {/* High-End Deep Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B1F0E] to-[#A27B5C]/20 rounded-full blur-[140px] opacity-60 pointer-events-none" />

      <ScrollReveal delay={100} className="relative z-10 px-4">
        {/* Luxury Badge */}
        <div className="inline-block mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FAF7F2] bg-gradient-to-r from-[#3B1F0E] to-[#5C341A] border border-[#A27B5C]/30 px-4 py-1.5 rounded-full shadow-inner backdrop-blur-md">
            Cordless Freedom
          </span>
        </div>

        {/* Conversion Optimized Headlines */}
        <h2 className="mt-5 mx-auto max-w-[620px] text-[28px] font-black tracking-tight text-[#FAF7F2] leading-tight sm:text-[38px]">
          Rechargeable Smart Fragrance Machine
        </h2>
        
        <p className="mt-3 mx-auto max-w-[480px] text-[16px] sm:text-[17px] leading-relaxed text-zinc-400 font-medium">
          No plugging into electricity to function. Sprays automatically to keep your environment fresh all the time. Take it anywhere you go.
        </p>
      </ScrollReveal>

      {/* Main Interactive Carousel Layer */}
      <div className="relative mx-auto mt-10 w-full max-w-[540px]">
        
        {/* Dynamic Functional Navigation Arrow Button */}
        <button
          onClick={handleScrollRight}
          className="absolute right-6 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#120803]/80 text-white shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-95 hover:bg-[#3B1F0E] hover:border-[#A27B5C]/50"
          aria-label="Next Slide"
        >
          <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>

        {/* 
          Facebook-Style Peek Wrapper: 
          - uses `w-[86%]` so 14% of the following slide acts as an intuitive visual cue.
          - padding-left handles alignment for the initial active slide layout.
        */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-6 pt-2 pl-4 pr-16 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, index) => (
            <div 
              key={index} 
              className="w-[86%] sm:w-[440px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300"
            >
              {/* Inner container preserving natural infographic layouts without harsh cropping */}
              <div className="flex aspect-square w-full items-center justify-center bg-black/20 p-2">
                <img
                  src={src}
                  alt={`ScentMason premium lifestyle presentation asset ${index + 1}`}
                  className="h-full w-full object-contain object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Web3 Structural Progress Bar */}
        <div className="mx-auto mt-2 max-w-[80px] h-[3px] rounded-full bg-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-[#A27B5C] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}