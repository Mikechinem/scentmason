"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Important:
   * Default is visible.
   * So if mobile browser/observer fails, your reviews/images still show.
   */
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      setShouldAnimate(false);
      return;
    }

    const rect = el.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const alreadyInView = rect.top < viewportHeight * 0.95 && rect.bottom > 0;

    if (alreadyInView) {
      setVisible(true);
      setShouldAnimate(true);
      return;
    }

    setVisible(false);
    setShouldAnimate(true);

    let delayTimer: number | undefined;

    const reveal = () => {
      delayTimer = window.setTimeout(() => {
        setVisible(true);
      }, delay);
    };

    const checkPosition = () => {
      const currentRect = el.getBoundingClientRect();
      const currentViewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const isInView =
        currentRect.top < currentViewportHeight * 0.95 &&
        currentRect.bottom > 0;

      if (isInView) {
        reveal();
        window.removeEventListener("scroll", checkPosition);
        window.removeEventListener("resize", checkPosition);
        window.removeEventListener("touchmove", checkPosition);
      }
    };

    let observer: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            reveal();
            observer?.disconnect();
            window.removeEventListener("scroll", checkPosition);
            window.removeEventListener("resize", checkPosition);
            window.removeEventListener("touchmove", checkPosition);
          }
        },
        {
          threshold: 0,
          rootMargin: "200px 0px 200px 0px",
        },
      );

      observer.observe(el);
    }

    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);
    window.addEventListener("touchmove", checkPosition, { passive: true });

    /**
     * Safety fallback:
     * If mobile still refuses to trigger scroll/observer,
     * reveal the content instead of leaving the section empty.
     */
    const safetyTimer = window.setTimeout(() => {
      setVisible(true);
    }, 1200);

    return () => {
      observer?.disconnect();

      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      window.removeEventListener("touchmove", checkPosition);

      if (delayTimer) window.clearTimeout(delayTimer);
      window.clearTimeout(safetyTimer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} ${
        shouldAnimate ? "transition-all duration-700 ease-out" : ""
      } ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}