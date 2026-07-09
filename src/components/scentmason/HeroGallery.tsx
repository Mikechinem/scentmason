"use client";

import { useState, useEffect } from "react";

const heroImages = [
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/real%20image_handing.png?updatedAt=1780844410915",
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788300/gardenia_deep_so4elw.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788300/white-peach_pzruxu.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788299/Hilton_e6vjyk.png",
  "https://res.cloudinary.com/doatbjjtn/image/upload/f_auto,q_auto,w_800/v1782788299/lavender_tdeabk.png",
];
export default function HeroGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2200); // Faster automatic loop (2.2 seconds)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto mt-8 w-full max-w-[600px] aspect-[4/5] relative overflow-hidden bg-transparent">
      
      {/* Sliding Track Container */}
      <div 
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {heroImages.map((src, index) => (
          <div key={src} className="h-full w-full shrink-0 px-2">
            <img
              src={src}
              alt={`ScentMason fragrance showcase ${index + 1}`}
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
        ))}
      </div>
      
      {/* Navigation Indicators */}
      <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-4" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}