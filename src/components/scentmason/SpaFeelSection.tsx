"use client";

const SPA_IMAGE_WEBP =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/model_girl_prd_real.png?tr=f-webp";

const SPA_IMAGE_PNG =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/model_girl_prd_real.png?updatedAt=1781024869003";

export default function SpaFeelSection() {
  return (
    <section
      className="
        overflow-hidden
        bg-[#11100e]
        text-white
      "
    >
      <div
        className="
          grid
          items-center

          lg:grid-cols-[1.15fr_0.85fr]
        "
      >

        {/* =================================================
            IMAGE
            IMAGE-FIRST VISUAL
        ================================================= */}

        <div
          className="
            relative
            order-1
            min-w-0
            overflow-hidden

            lg:order-1
          "
        >
          <picture>
            <source
              srcSet={SPA_IMAGE_WEBP}
              type="image/webp"
            />

            <img
              src={SPA_IMAGE_PNG}
              alt="Woman enjoying a relaxing spa-like fragrance experience with the ScentMason automatic fragrance machine"
              loading="lazy"
              decoding="async"
              className="
                block
                h-auto
                w-full
                object-cover

                scale-[1.01]

                lg:min-h-[720px]
                lg:object-cover
              "
            />
          </picture>

          {/* =================================================
              SOFT EDGE BLENDS
              Makes the photo melt naturally into dark section
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0

              bg-gradient-to-b
              from-transparent
              via-transparent
              to-[#11100e]

              lg:bg-gradient-to-r
              lg:from-transparent
              lg:via-transparent
              lg:to-[#11100e]
            "
          />

          {/* Subtle warm overlay */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#8b5a20]/[0.04]
            "
          />
        </div>


        {/* =================================================
            COPY
            SHORT — IMAGE DOES MOST OF THE SELLING
        ================================================= */}

        <div
          className="
            order-2
            px-6
            pb-10
            pt-2

            sm:px-10
            sm:pb-14

            lg:order-2
            lg:px-10
            lg:py-16

            xl:px-16
            xl:py-20
          "
        >

          {/* Eyebrow */}
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-8
                bg-[#A67C00]
              "
            />

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[#b8a995]

                sm:text-[11px]
              "
            >
              The Spa Feel, At Home
            </p>
          </div>


          {/* =================================================
              HEADLINE / CORE COPY
          ================================================= */}

          <h2
            className="
              max-w-[560px]
              text-[30px]
              font-medium
              leading-[1.13]
              tracking-[-0.03em]
              text-white

              sm:text-[38px]

              lg:text-[42px]

              xl:text-[48px]
            "
          >
            It automatically transforms your space into a{" "}
            <span
              className="
                font-extrabold
                text-[#A67C00]
              "
            >
              5-star luxury spa
            </span>{" "}
            using a sleek, sculptural design—
            <span className="text-[#b8b0a7]">
              no manual spraying, no tracking,{" "}
            </span>
            <span
              className="
                font-extrabold
                text-[#A67C00]
              "
            >
              zero effort.
            </span>
          </h2>


          {/* =================================================
              SMALL CLOSING LINE
          ================================================= */}

          <div
            className="
              mt-7
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-8
                shrink-0
                bg-[#A67C00]/60
              "
            />

            <p
              className="
                text-[11px]
                font-medium
                tracking-wide
                text-[#8f877e]

                sm:text-[13px]
              "
            >
              Set it once. Let the atmosphere take care of itself.
            </p>
          </div>

        </div>

      </div>
    {/* =================================================
    CTA — SEPARATE CONVERSION BLOCK
================================================= */}

<div
  className="
    mt-10
    w-full
    border-t
    border-[#198754]/10
    pt-8

    sm:mt-12
    sm:pt-10
  "
>
  <div className="flex justify-center px-1">
    <a
      href="#order-form-start"
      className="
        group
        flex
        min-h-[82px]
        w-full
        max-w-[560px]
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-[#198754]
        px-6
        py-4
        text-center
        text-white
        shadow-[0_14px_35px_rgba(25,135,84,0.28)]
        transition-all
        duration-200
        hover:-translate-y-1
        hover:bg-[#157347]
        hover:shadow-[0_18px_40px_rgba(25,135,84,0.34)]
        active:translate-y-0
        active:scale-[0.98]

        sm:min-h-[92px]
        sm:gap-4
        sm:rounded-2xl
      "
    >
      {/* CART ICON */}
      <span
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-white/15

          sm:h-12
          sm:w-12
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="
            h-6
            w-6

            sm:h-7
            sm:w-7
          "
        >
          <circle cx="9" cy="20" r="1" />
          <circle cx="19" cy="20" r="1" />
          <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
        </svg>
      </span>

      {/* BUTTON COPY */}
      <span className="flex flex-col items-start">
        <span
          className="
            text-[16px]
            font-extrabold
            leading-tight
            tracking-[0.01em]

            sm:text-[19px]
          "
        >
          YES! I WANT TO BUY NOW
        </span>

        <span
          className="
            mt-1
            text-[10px]
            font-bold
            uppercase
            leading-none
            tracking-[0.14em]
            text-white/90

            sm:text-[11px]
          "
        >
          FOR 30% DISCOUNT
        </span>
      </span>
    </a>
  </div>
</div>
    </section>
  );
}