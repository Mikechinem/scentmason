"use client";

import Image from "next/image";

export default function StoryProductReveal() {
  return (
    <section className="overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#A67C00]">
            This is what I kept
          </p>

          <h2 className="mt-3 text-[32px] font-black leading-[1.08] tracking-[-0.025em] text-black sm:text-[46px]">
            This Little Diffuser Changed
            <span className="block text-[#A67C00]">
              How My Room Feels.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[18px] font-medium leading-[1.55] text-black/65 sm:text-[20px]">
            I set it up, turned it on and let it do its thing.
            No walking around with an air freshener. No daily spraying.
          </p>

        </div>

        {/* =====================================================
            PRODUCT + WOMAN
        ===================================================== */}
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* ===================================================
              IMAGE
          =================================================== */}
          <div className="relative order-1">

            {/* Soft glow behind image */}
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3ead7] blur-3xl sm:h-[420px] sm:w-[420px]" />

            <div className="relative mx-auto w-full max-w-[620px]">

              <Image
                src="/images/scentmason/story/story-product-woman.png"
                alt="Woman holding the ScentMason automatic fragrance diffuser"
                width={1200}
                height={1200}
                sizes="(max-width: 768px) 94vw, 600px"
                className="relative z-10 h-auto w-full object-contain"
              />

            </div>

          </div>

          {/* ===================================================
              COPY
          =================================================== */}
          <div className="order-2 lg:pl-2">

            <h3 className="text-[28px] font-black leading-[1.12] tracking-[-0.02em] text-black sm:text-[36px]">
              Set it once.
              <span className="block text-[#A67C00]">
                Let it keep working.
              </span>
            </h3>

            <p className="mt-5 text-[18px] font-medium leading-[1.55] text-black/70">
              ScentMason releases fragrance automatically, so your
              space can keep smelling fresh without you having to
              spray it again and again.
            </p>

            {/* =================================================
                SIMPLE BENEFITS
            ================================================= */}
            <div className="mt-7 space-y-4">

              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A67C00] text-[14px] font-black text-white">
                  ✓
                </div>

                <div>
                  <p className="text-[17px] font-extrabold text-black">
                    Automatic fragrance
                  </p>

                  <p className="mt-1 text-[15px] leading-[1.45] text-black/55">
                    It keeps working without daily spraying.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A67C00] text-[14px] font-black text-white">
                  ✓
                </div>

                <div>
                  <p className="text-[17px] font-extrabold text-black">
                    Quiet while it works
                  </p>

                  <p className="mt-1 text-[15px] leading-[1.45] text-black/55">
                    You enjoy the fragrance without the noise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A67C00] text-[14px] font-black text-white">
                  ✓
                </div>

                <div>
                  <p className="text-[17px] font-extrabold text-black">
                    Easy to use
                  </p>

                  <p className="mt-1 text-[15px] leading-[1.45] text-black/55">
                    Set your fragrance level and let it run.
                  </p>
                </div>
              </div>

            </div>

            {/* =================================================
                STORY CALLBACK
            ================================================= */}
            <div className="mt-8 rounded-2xl border border-black/5 bg-[#f8f6f1] p-5 sm:p-6">

              <p className="text-[17px] font-extrabold leading-[1.4] text-black">
                “I only wanted to test it before giving it away.”
              </p>

              <p className="mt-2 text-[15px] font-medium leading-[1.5] text-black/55">
                Six weeks later, it was still in my home.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}