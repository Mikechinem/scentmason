"use client";

import React, { useRef, useEffect } from "react";

export type VideoUsecaseItem = {
  id: string;
  videoUrl: string;
};

interface PremiumVideoUsecaseProps {
  heading?: string;
  subheading?: string;
  items?: VideoUsecaseItem[];
}

const DEFAULT_ITEMS: VideoUsecaseItem[] = [
  {
    id: "1",
    videoUrl: "https://ik.imagekit.io/j1e78ujalr/short_vid_web/08111.mp4",
  },
  {
    id: "2",
    videoUrl: "https://ik.imagekit.io/j1e78ujalr/short_vid_web/0811(1).mp4",
  },
  {
    id: "3",
    videoUrl: "https://ik.imagekit.io/j1e78ujalr/short_vid_web/0812.mp4",
  },
  {
    id: "4",
    videoUrl: "https://ik.imagekit.io/j1e78ujalr/short_vid_web/00812.mp4", 
  },
  {
    id: "5",
    videoUrl: "https://ik.imagekit.io/j1e78ujalr/short_vid_web/N0811.mp4",
  },
  {
    id: "6",
    videoUrl: "https://ik.imagekit.io/j1e78ujalr/short_vid_web/0811.mp4?updatedAt=1787130690520",
  },
  
  {
    id: "8",
    videoUrl: "https://ik.imagekit.io/j1e78ujalr/short_vid_web/XT0811.mp4",
  },
];

export default function PremiumVideoUsecase({
  heading = "PAY ONLY WHEN YOU SEE  IT AND LIKE IT...",
  subheading = "Join our community of satisfied customers.",
  items = DEFAULT_ITEMS,
}: PremiumVideoUsecaseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const videoElements = container.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Catch and suppress browser autoplay restrictions if triggered
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoElements.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <section className="w-full bg-[#110A07] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mt-2 text-[32px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[36px]">
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[16px] font-medium leading-relaxed text-white/60">
            {subheading}
          </p>
        </div>

        <div
          ref={scrollContainerRef}
          className="
            no-scrollbar
            flex
            w-full
            snap-x
            snap-mandatory
            gap-4
            overflow-x-auto
            scroll-smooth
            pb-4
            pt-2
            [-ms-overflow-style:none]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="
                relative
                shrink-0
                snap-start
                w-[52vw]
                sm:w-[40vw]
                lg:w-[26vw]
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#1c120d]
                shadow-xl
                transition-transform
                duration-300
              "
            >
              <div className="relative aspect-[9/16] w-full bg-black">
                <video
                  src={item.videoUrl}
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-center sm:hidden">
          <span className="text-[16px] font-medium text-white/40">
            👈 Swipe to view more use cases 👉
          </span>
        </div>
      </div>
    </section>
  );
}