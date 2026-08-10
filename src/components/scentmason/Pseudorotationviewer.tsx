"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

// 💡 NOTE: These are your actual product/lifestyle shots, not a matched turntable
// sequence — dragging cycles between them rather than producing a true smooth spin.
// Swap this array for 24–36 same-background incremental-angle frames later and the
// drag mechanics below work unchanged.
const FRAMES = [
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/real%20image_handing.png?updatedAt=1780844410915&tr=w-800,q-80,f-webp",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd2x.png?updatedAt=1781025552653&tr=w-800,q-80,f-webp",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd_image_dark.png?updatedAt=1780838530529&tr=w-800,q-80,f-webp",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/model_girl_prd_real.png?updatedAt=1781024869003&tr=w-800,q-80,f-webp",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/compare-real-design.png?updatedAt=1780833409537&tr=w-800,q-80,f-webp",
];

const DRAG_SENSITIVITY = 40; // px of horizontal drag per frame step

export default function PseudoRotationViewer() {
  const [frameIndex, setFrameIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const dragStartIndex = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      dragStartX.current = e.clientX;
      dragStartIndex.current = frameIndex;
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [frameIndex]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    const steps = Math.round(delta / DRAG_SENSITIVITY);
    let nextIndex = (dragStartIndex.current - steps) % FRAMES.length;
    if (nextIndex < 0) nextIndex += FRAMES.length;
    setFrameIndex(nextIndex);
  }, []);

  const handlePointerUp = useCallback(() => {
    dragStartX.current = null;
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full select-none">
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative mx-auto flex h-[380px] w-full max-w-[440px] cursor-grab items-center justify-center rounded-2xl bg-zinc-900 sm:h-[460px] ${
          isDragging ? "cursor-grabbing" : ""
        }`}
        style={{ touchAction: "pan-y" }}
      >
        {/* Active frame — priority since this is above-the-fold hero content */}
        <Image
          src={FRAMES[frameIndex]}
          alt="ScentMason Smart Fragrance Machine — interactive view"
          width={440}
          height={440}
          priority
          draggable={false}
          className="pointer-events-none h-auto w-[80%] object-contain"
        />

        {/* Hidden preload loop — memoizes/pre-caches every frame so switching is instant */}
        <div className="hidden">
          {FRAMES.map((src, i) =>
            i === frameIndex ? null : (
              <Image key={src} src={src} alt="" width={440} height={440} aria-hidden />
            )
          )}
        </div>

        {/* Frame indicator dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {FRAMES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === frameIndex ? "bg-white" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-400">
        ✋ Drag to explore
      </p>
    </div>
  );
}