"use client";

const ROOM_COMPARE_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/compare-real-design.png?updatedAt=1780833409537";

export default function RoomUseCases() {
  return (
    <section className="w-full bg-[#f7f3ed]">
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          py-12

          sm:px-6
          sm:py-16

          lg:px-10
          lg:py-20
        "
      >
        {/* ================================================
            HEADLINE
        ================================================= */}

        <div className="mx-auto max-w-3xl text-center">
          <p
            className="
              mb-3
              text-[11px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#A67C00]

              sm:text-[12px]
            "
          >
            One Machine. Any Room.
          </p>

          <h2
            className="
              text-[32px]
              font-medium
              leading-[1.08]
              tracking-[-0.04em]
              text-[#1e1008]

              sm:text-[42px]
              lg:text-[52px]
            "
          >
            From{" "}
            <span className="font-extrabold text-[#A67C00]">
              bedroom comfort
            </span>{" "}
            to{" "}
            <span className="font-extrabold text-[#A67C00]">
              bathroom freshness.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-[14px]
              font-medium
              leading-6
              text-[#7a5c45]

              sm:text-[15px]
            "
          >
            Place it where you want your space to smell and feel better.
          </p>
        </div>

        {/* ================================================
            IMAGE
        ================================================= */}

        <div
          className="
            mx-auto
            mt-8
            w-full
            max-w-[1100px]
            overflow-hidden
            rounded-2xl
            shadow-[0_20px_60px_rgba(59,31,14,0.12)]

            sm:mt-10
            sm:rounded-3xl
          "
        >
          <img
            src={ROOM_COMPARE_IMAGE}
            alt="ScentMason fragrance machine in a bedroom and bathroom"
            loading="lazy"
            decoding="async"
            className="
              block
              h-auto
              w-full
              object-contain
            "
          />
        </div>

        {/* ================================================
            BOTTOM MICRO-COPY
        ================================================= */}

        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-[#A67C00]/40" />

          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#7a5c45]

              sm:text-[12px]
            "
          >
            Bedroom · Bathroom · Living Room · Office
          </p>

          <span className="h-px w-8 bg-[#A67C00]/40" />
        </div>
      </div>
    </section>
  );
}