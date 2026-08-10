"use client";

import Image from "next/image";
import { useState } from "react";

export default function HotspotLifestyleSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-zinc-950 px-4 py-24 md:py-32">
      <div className="relative mx-auto max-w-[560px]">
        <Image
          src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/No_wall%20drill_pasting.png?tr=w-900,q-80,f-webp"
          alt="No-drill wall mount installation demo"
          width={900}
          height={900}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="h-auto w-full rounded-sm object-cover"
        />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Learn about the no-drill mount"
          className="absolute left-[38%] top-[42%] flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-[0_0_0_6px_rgba(255,255,255,0.15)] transition-transform duration-500 ease-out hover:scale-110"
        >
          <span className="text-[16px] leading-none">+</span>
        </button>

        {open && (
          <div className="absolute left-[38%] top-[calc(42%+40px)] w-[220px] max-w-[70vw] rounded-sm bg-zinc-900/95 p-4 text-left shadow-lg backdrop-blur-sm">
            <p className="text-[13px] font-medium leading-relaxed tracking-wide text-white">
              No drilling required. The included mount holds securely on any
              wall — remove it clean, no marks left behind.
            </p>
          </div>
        )}
      </div>

      <p className="mx-auto mt-6 max-w-[560px] text-center text-[13px] font-medium uppercase tracking-[0.15em] text-zinc-500">
        Tap the node to explore
      </p>
    </section>
  );
}