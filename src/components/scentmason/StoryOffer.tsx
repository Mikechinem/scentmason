"use client";

export default function StoryOffer() {
  return (
    <section className="overflow-hidden bg-black px-4 py-14 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl text-center">

        {/* =====================================================
            OFFER INTRO
        ===================================================== */}
        <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#D6A63A]">
          Ready to try it?
        </p>

        <h2 className="mt-3 text-[34px] font-black leading-[1.05] tracking-[-0.03em] sm:text-[50px]">
          Give Your Home
          <span className="block text-[#D6A63A]">
            The Fresh Feeling Too.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-[18px] font-medium leading-[1.55] text-white/65 sm:text-[20px]">
          Set ScentMason up once and let it keep your space smelling
          fresh without daily spraying.
        </p>

        {/* =====================================================
            MAIN OFFER
        ===================================================== */}
        <div className="mx-auto mt-10 max-w-xl rounded-[28px] border border-white/10 bg-white/[0.06] px-6 py-8 sm:px-10 sm:py-10">

          <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-white/45">
            Starting from
          </p>

          <div className="mt-3 flex items-end justify-center gap-3">
            <span className="text-[48px] font-black leading-none tracking-[-0.04em] text-white sm:text-[60px]">
              ₦28,000
            </span>

            <span className="pb-1 text-[16px] font-bold text-white/35 line-through sm:text-[18px]">
              ₦45,000
            </span>
          </div>

          {/* =================================================
              TRUST / DELIVERY
          ================================================= */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">

            <span className="rounded-full bg-white px-4 py-2 text-[13px] font-extrabold text-black">
              FREE DELIVERY
            </span>

            <span className="rounded-full bg-[#D6A63A] px-4 py-2 text-[13px] font-extrabold text-black">
              PAYMENT ON DELIVERY
            </span>

          </div>

          <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-[1.5] text-white/55">
            You don't pay until your order arrives.
          </p>

        </div>

        {/* =====================================================
            WHAT THEY GET
        ===================================================== */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 text-left sm:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[16px] font-black">
              Automatic fragrance
            </p>

            <p className="mt-2 text-[14px] leading-[1.45] text-white/50">
              No need to keep spraying your room.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[16px] font-black">
              Up to 60 days
            </p>

            <p className="mt-2 text-[14px] leading-[1.45] text-white/50">
              Charge it and let it work.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-[16px] font-black">
              Free delivery
            </p>

            <p className="mt-2 text-[14px] leading-[1.45] text-white/50">
              Delivered to you nationwide.
            </p>
          </div>

        </div>

        {/* =====================================================
            CTA
        ===================================================== */}
        <a
          href="#order-form-start"
          className="mt-10 inline-flex min-h-[60px] w-full max-w-md items-center justify-center rounded-xl bg-[#D6A63A] px-8 py-4 text-[18px] font-black text-black shadow-[0_12px_35px_rgba(214,166,58,0.22)] transition hover:scale-[1.01] active:scale-[0.99]"
        >
          CHOOSE MY OFFER
        </a>

        {/* =====================================================
            STORY CALLBACK
        ===================================================== */}
        <p className="mx-auto mt-5 max-w-xl text-[15px] font-semibold leading-[1.5] text-white/40">
          And unlike me, you can decide whether you want to keep
          yours or give it away.
        </p>

      </div>
    </section>
  );
}