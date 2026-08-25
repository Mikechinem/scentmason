"use client";

const FRAGRANCE_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/scentmasonimg/hx5.png?tr=f-webp,q-82,w-1080";

export default function HealthFriendlyFragrance() {
  return (
    <section className="relative overflow-hidden bg-[#090909] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* =====================================================
          SUBTLE GOLD ATMOSPHERE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-[260px]
          w-[260px]
          -translate-x-1/2
          rounded-full
          bg-[#A67C00]/10
          blur-[100px]
        "
      />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* ===================================================
            HEADLINE
        =================================================== */}

        <div className="mx-auto max-w-4xl text-center">
          <h2
            className="
              text-[36px]
              font-black
              leading-[1.02]
              tracking-[-0.04em]
              text-white

              sm:text-[48px]
              lg:text-[62px]
              xl:text-[70px]
            "
          >
            Comes with{" "}
            <span className="text-[#D6A63A]">
              health-friendly fragrances.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-[18px]
              font-semibold
              leading-[1.45]
              text-white/65

              sm:text-[21px]
            "
          >
            Choose from what I use — or use what works for you.
          </p>
        </div>

        {/* ===================================================
            IMAGE
        =================================================== */}

        <div className="relative mx-auto mt-8 w-full max-w-[1080px] sm:mt-10">
          {/* Soft glow behind image */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[55%]
              w-[65%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#D6A63A]/10
              blur-[90px]
            "
          />

          {/* Image */}

          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px]">
            <img
              src={FRAGRANCE_IMAGE}
              alt="ScentMason diffuser surrounded by different fragrance options"
              loading="lazy"
              decoding="async"
              className="
                block
                h-auto
                w-full
                object-contain
              "
            />

            {/* Bottom fade — makes the photograph disappear
                naturally into the dark Story page */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                h-[22%]
                bg-gradient-to-t
                from-[#090909]
                via-[#090909]/35
                to-transparent
              "
            />

            {/* Top fade — subtle integration with headline */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-x-0
                top-0
                h-[10%]
                bg-gradient-to-b
                from-[#090909]/30
                to-transparent
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}