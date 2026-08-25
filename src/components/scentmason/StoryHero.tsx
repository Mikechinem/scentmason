"use client";

import Image from "next/image";

const HERO_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/gh4.png?updatedAt=1697030919050";

export default function StoryHero() {
  return (
    <section className="relative overflow-hidden bg-[#0b0b0a] px-4 pb-12 pt-7 text-white sm:px-6 sm:pb-16 sm:pt-10">

      {/* =====================================================
          ATMOSPHERIC GLOW
          Keeps the mist/product visually alive on dark background
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[390px] h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#d6a63a]/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-[#d6a63a]/[0.04] blur-[90px]"
      />

      <div className="relative mx-auto w-full max-w-6xl">

        {/* =====================================================
            HOOK
        ===================================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="mb-4 text-[13px] font-black uppercase tracking-[0.14em] text-[#d6a63a] sm:text-[14px]">
            The diffuser I wasn't planning to keep
          </p>

          <h1 className="text-[40px] font-black leading-[0.97] tracking-[-0.045em] text-white sm:text-[55px] lg:text-[64px]">
            I Bought This For My Friend…
            <span className="mt-2 block text-[#d6a63a]">
              Then I Kept It.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[19px] font-bold leading-[1.4] text-white/70 sm:text-[21px]">
            And honestly, I understand why.
          </p>

        </div>

        {/* =====================================================
            HERO IMAGE
            No card. No border. No box.
            Let the woman naturally sit inside the page.
        ===================================================== */}
        <div className="relative mx-auto -mt-1 w-full max-w-[470px] sm:mt-1">

          {/* Product/mist glow */}
          <div
            aria-hidden="true"
            className="absolute left-[65%] top-[35%] h-[230px] w-[230px] -translate-x-1/2 rounded-full bg-[#d6a63a]/10 blur-[85px]"
          />

          <Image
            src={HERO_IMAGE}
            alt="Woman holding the ScentMason automatic fragrance diffuser"
            width={768}
            height={1152}
            priority
            sizes="(max-width: 640px) 100vw, 470px"
            className="relative z-10 mx-auto h-auto w-full object-contain"
          />

        </div>

        {/* =====================================================
            PRODUCT BENEFITS
        ===================================================== */}
        <div className="-mt-5 relative z-20 mx-auto max-w-xl sm:-mt-8">

          <div className="grid gap-3 sm:grid-cols-3">

            {/* =================================================
                RECHARGEABLE
            ================================================= */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-5 text-center backdrop-blur-sm">

              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6a63a] text-[21px] font-black text-black">
                ↻
              </div>

              <p className="mt-3 text-[20px] font-black leading-none text-white">
                Rechargeable
              </p>

              <p className="mt-2 text-[15px] font-bold leading-tight text-white/55">
                Charges in 2 hours
              </p>

            </div>

            {/* =================================================
                NO DRILL
            ================================================= */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-5 text-center backdrop-blur-sm">

              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6a63a] text-[21px] font-black text-black">
                ⌁
              </div>

              <p className="mt-3 text-[20px] font-black leading-none text-white">
                No Drill Mount
              </p>

              <p className="mt-2 text-[15px] font-bold leading-tight text-white/55">
                Stick. Press. Done.
              </p>

            </div>

            {/* =================================================
                AUTOMATIC
            ================================================= */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-5 text-center backdrop-blur-sm">

              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6a63a] text-[21px] font-black text-black">
                ✦
              </div>

              <p className="mt-3 text-[20px] font-black leading-none text-white">
                Automatic
              </p>

              <p className="mt-2 text-[15px] font-bold leading-tight text-white/55">
                Sprays on its own
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            OFFER
        ===================================================== */}
        <div className="mx-auto mt-9 max-w-xl text-center">

          <div className="inline-flex items-center rounded-full bg-[#d6a63a] px-4 py-2 text-[14px] font-black uppercase tracking-[0.06em] text-black">
            30% DISCOUNT
          </div>

          <div className="mt-4 flex items-end justify-center gap-3">

            <span className="text-[40px] font-black leading-none tracking-[-0.04em] text-white sm:text-[48px]">
              ₦28,000
            </span>

            <span className="pb-1 text-[17px] font-bold text-white/35 line-through">
              ₦45,000
            </span>

          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">

            <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-black text-black">
              FREE DELIVERY
            </span>

            <span className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-black text-white">
              PAYMENT ON DELIVERY
            </span>

          </div>

        </div>

        {/* =====================================================
            CTA
        ===================================================== */}
        <div className="mx-auto mt-6 max-w-xl">

          <a
            href="#order-form-start"
            className="flex min-h-[62px] w-full items-center justify-center rounded-2xl bg-[#d6a63a] px-7 py-4 text-[19px] font-black text-black shadow-[0_14px_45px_rgba(214,166,58,0.20)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
          >
            GET IT NOW
          </a>

          <p className="mt-3 text-center text-[13px] font-bold text-white/40">
            You don't pay until your order arrives.
          </p>

        </div>

      </div>

      {/* =====================================================
          SOFT TRANSITION INTO NEXT SECTION
      ===================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#11100d] to-transparent"
      />

    </section>
  );
}