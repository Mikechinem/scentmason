"use client";

import { useEffect, useState } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 420);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[999998] px-4 pb-4 transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="#order-form-start"
        className="flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3.5 text-center text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
      >
        Claim My 40% Discount Now
      </a>
    </div>
  );
}