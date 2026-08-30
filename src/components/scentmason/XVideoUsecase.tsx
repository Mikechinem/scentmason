"use client";

import { useEffect, useRef, useState } from "react";

type XVideoUsecaseProps = {
  src: string;
  poster?: string;
  className?: string;
};

export default function XVideoUsecase({
  src,
  poster,
  className = "",
}: XVideoUsecaseProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Start loading the video before it actually
    // reaches the user's screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        // Begin loading roughly 800px before
        // the video enters the viewport.
        rootMargin: "800px 0px",
        threshold: 0,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoad) return;

    const attemptPlay = async () => {
      try {
        video.muted = true;
        video.playsInline = true;

        await video.play();
      } catch (error) {
        // Some browsers may delay autoplay until
        // the page receives user interaction.
        console.debug(
          "XVideoUsecase autoplay waiting:",
          error
        );
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, {
        once: true,
      });

      return () => {
        video.removeEventListener(
          "loadeddata",
          attemptPlay
        );
      };
    }
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className={`
        mx-auto
        w-full
        max-w-[220px]
        overflow-hidden
        rounded-2xl
        bg-black
        shadow-md
        sm:max-w-[250px]
        md:max-w-[280px]
        ${className}
      `}
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={shouldLoad ? "auto" : "none"}
        controls={false}
        className="
          block
          h-auto
          w-full
          object-contain
        "
        aria-hidden="true"
      />
    </div>
  );
}