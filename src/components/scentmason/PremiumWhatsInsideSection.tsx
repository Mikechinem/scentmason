"use client";

export default function PremiumWhatsInsideSection() {
  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-[#f8f5ef]
        px-5
        py-12

        sm:px-8
        sm:py-16

        lg:px-10
        lg:py-20
      "
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* =================================================
            SECTION INTRO
        ================================================= */}

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#A67C00]/40" />

            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#A67C00]

                sm:text-[12px]
              "
            >
              Everything You Need
            </p>

            <span className="h-px w-8 bg-[#A67C00]/40" />
          </div>

          <h2
            className="
              text-[38px]
              font-medium
              leading-[1.05]
              tracking-[-0.04em]
              text-[#1e1008]

              sm:text-[50px]

              lg:text-[60px]
            "
          >
            What Is Inside
            <br />

            <span className="font-extrabold text-[#A67C00]">
              Your Order?
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-lg
              text-[14px]
              font-medium
              leading-6
              text-[#7a5c45]

              sm:text-[16px]
              sm:leading-7
            "
          >
            Everything you need to start enjoying effortless fragrance,
            right out of the box.
          </p>
        </div>


        {/* =================================================
            PRODUCT / UNBOXING IMAGE
        ================================================= */}

        <div
          className="
            mx-auto
            mt-8
            w-full
            max-w-[850px]

            sm:mt-10

            lg:mt-12
          "
        >
          <div
            className="
              relative
              overflow-hidden
              shadow-[0_25px_70px_rgba(59,31,14,0.12)]
            "
          >
            <img
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/unbox_real.png?updatedAt=1781023129314"
              alt="Everything included in a ScentMason automatic fragrance machine order"
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
        </div>


        {/* =================================================
            SIMPLE BOTTOM STATEMENT
        ================================================= */}

        <div
          className="
            mx-auto
            mt-7
            flex
            items-center
            justify-center
            gap-3

            sm:mt-9
          "
        >
          <span className="h-px w-7 bg-[#1e1008]/20" />

          <p
            className="
              text-center
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#7a5c45]

              sm:text-[12px]
            "
          >
            Ready to use. Nothing complicated.
          </p>

          <span className="h-px w-7 bg-[#1e1008]/20" />
        </div>
      </div>
    </section>
  );
}