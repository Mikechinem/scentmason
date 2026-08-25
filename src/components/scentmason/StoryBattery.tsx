"use client";

import Image from "next/image";

const BATTERY_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/dispalywall.png?updatedAt=1786308795453";

export default function StoryBattery() {
  return (
    <section className="overflow-hidden bg-[#f7f5ef] px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HEADLINE
        ===================================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[13px] font-black uppercase tracking-[0.16em] text-[#A67C00] sm:text-[14px]">
            And the battery?
          </p>

          <h2 className="mt-3 text-[34px] font-black leading-[1.02] tracking-[-0.035em] text-black sm:text-[48px]">
            Charge It For 2 Hours.
            <span className="mt-2 block text-[#A67C00]">
              Use It For Up To 60 Days.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[18px] font-bold leading-[1.45] text-black/65 sm:text-[20px]">
            Charge it, set it up and let ScentMason keep working
            without staying plugged into the wall.
          </p>

        </div>

        {/* =====================================================
            FULL IMAGE
            IMPORTANT:
            - No fixed aspect ratio
            - No object-cover
            - Entire source image stays visible
        ===================================================== */}
        <div className="relative mx-auto mt-8 w-full max-w-5xl sm:mt-10">

          <div className="relative w-full overflow-hidden rounded-[24px] bg-white sm:rounded-[30px]">

            <Image
              src={BATTERY_IMAGE}
              alt="ScentMason diffuser and its no-drill wall mount"
              width={1000}
              height={667}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1000px"
              className="block h-auto w-full object-contain"
            />

          </div>

        </div>

        {/* =====================================================
            BIG PROOF NUMBERS
        ===================================================== */}
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:mt-8 sm:grid-cols-2">

          {/* 2 HOURS */}
          <div className="rounded-3xl bg-white px-5 py-8 text-center shadow-sm sm:px-8 sm:py-9">

            <p className="text-[56px] font-black leading-none tracking-[-0.05em] text-black sm:text-[64px]">
              2
            </p>

            <p className="mt-2 text-[16px] font-black uppercase tracking-[0.1em] text-[#A67C00] sm:text-[18px]">
              Hours To Charge
            </p>

            <p className="mx-auto mt-2 max-w-xs text-[15px] font-bold leading-[1.45] text-black/55">
              Give it a short charge and you're ready to go.
            </p>

          </div>

          {/* 60 DAYS */}
          <div className="rounded-3xl bg-black px-5 py-8 text-center text-white shadow-sm sm:px-8 sm:py-9">

            <p className="text-[56px] font-black leading-none tracking-[-0.05em] text-[#D6A63A] sm:text-[64px]">
              60
            </p>

            <p className="mt-2 text-[16px] font-black uppercase tracking-[0.1em] sm:text-[18px]">
              Days Of Use
            </p>

            <p className="mx-auto mt-2 max-w-xs text-[15px] font-bold leading-[1.45] text-white/55">
              Enjoy your fragrance for up to 60 days before charging again.
            </p>

          </div>

        </div>

        {/* =====================================================
            THREE SIMPLE BENEFITS
        ===================================================== */}
        <div className="mx-auto mt-7 flex max-w-4xl flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A67C00] text-[12px] font-black text-white">
              ✓
            </span>

            <span className="text-[15px] font-bold text-black">
              No daily charging
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A67C00] text-[12px] font-black text-white">
              ✓
            </span>

            <span className="text-[15px] font-bold text-black">
              No wires around your room
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A67C00] text-[15px] font-black text-white">
              ✓
            </span>

            <span className="text-[15px] font-bold text-black">
              Easy to move
            </span>
          </div>

        </div>

        {/* =====================================================
            CLOSING LINE
        ===================================================== */}
        <p className="mx-auto mt-9 max-w-2xl text-center text-[20px] font-black leading-[1.35] text-black sm:text-[22px]">
          Charge it. Set it. Let it work.
        </p>

      </div>
    </section>
  );
}