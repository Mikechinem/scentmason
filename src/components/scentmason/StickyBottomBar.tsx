"use client";

import { stickyBar } from "@/data/scentmason";

export default function StickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
      <div className="mx-auto w-full max-w-[430px] rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] p-3 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-black text-[var(--primary)]">
              {stickyBar.text}
            </p>

            <p className="mt-1 text-[10px] font-bold text-[var(--text-muted)]">
              Payment on delivery · Sales rep confirms first
            </p>
          </div>

          <a
            href="#order-form-start"
            className="flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] px-5 py-3 text-center text-xs font-black !text-white shadow-soft"
          >
            {stickyBar.buttonLabel}
          </a>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
          </span>

          <p className="text-[10px] font-black text-green-700">
            Free nationwide delivery · 1–2 days Lagos &amp; Abuja
          </p>
        </div>
      </div>
    </div>
  );
}