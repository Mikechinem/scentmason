"use client";

export default function StoryConvenience() {
  return (
    <section className="bg-black px-4 py-14 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HEADLINE
        ===================================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#D6A63A]">
            This is what made me keep it
          </p>

          <h2 className="mt-3 text-[32px] font-black leading-[1.08] tracking-[-0.025em] sm:text-[48px]">
            I Didn't Have To Keep
            <span className="block text-[#D6A63A]">
              Spraying My Room.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[18px] font-medium leading-[1.55] text-white/65 sm:text-[20px]">
            I set ScentMason up once and let it keep releasing
            fragrance while I went about my day.
          </p>

        </div>

        {/* =====================================================
            SIMPLE 3-STEP FLOW
        ===================================================== */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">

          {/* STEP 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-7">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D6A63A] text-[18px] font-black text-black">
              1
            </div>

            <h3 className="mt-5 text-[20px] font-black">
              Set it up
            </h3>

            <p className="mt-2 text-[15px] font-medium leading-[1.5] text-white/55">
              Put it where you want your space to smell fresh.
            </p>

          </div>

          {/* STEP 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-7">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D6A63A] text-[18px] font-black text-black">
              2
            </div>

            <h3 className="mt-5 text-[20px] font-black">
              Pick your level
            </h3>

            <p className="mt-2 text-[15px] font-medium leading-[1.5] text-white/55">
              Choose how strong you want the fragrance to be.
            </p>

          </div>

          {/* STEP 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center sm:p-7">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D6A63A] text-[18px] font-black text-black">
              3
            </div>

            <h3 className="mt-5 text-[20px] font-black">
              Let it work
            </h3>

            <p className="mt-2 text-[15px] font-medium leading-[1.5] text-white/55">
              ScentMason keeps releasing fragrance for you.
            </p>

          </div>

        </div>

        {/* =====================================================
            KEY BENEFIT
        ===================================================== */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-[#D6A63A]/25 bg-[#D6A63A]/10 px-6 py-8 text-center sm:px-10 sm:py-10">

          <p className="text-[24px] font-black leading-[1.2] sm:text-[32px]">
            No walking around with a spray bottle.
          </p>

          <p className="mt-3 text-[17px] font-medium leading-[1.5] text-white/65 sm:text-[19px]">
            No trying to remember when you last sprayed.
            Just set it and let it do the work.
          </p>

        </div>

        {/* =====================================================
            STORY CALLBACK
        ===================================================== */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-[15px] font-semibold leading-[1.5] text-white/45">
          That simple convenience was one of the reasons I decided
          this little diffuser was staying in my home.
        </p>

      </div>
    </section>
  );
}