"use client";

const PRODUCT_IMAGE_WEBP =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffuse_nbg.png?tr=f-webp";

const PRODUCT_IMAGE_PNG =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffuse_nbg.png";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      {/* Icon */}
      <div
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#3b1f0e]
          text-[12px]
          font-extrabold
          text-white
          shadow-[0_6px_14px_rgba(59,31,14,0.14)]

          sm:h-8
          sm:w-8
          sm:text-[13px]
        "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 pt-0.5">
        <p
          className="
            text-[15px]
            font-extrabold
            leading-[1.15]
            tracking-[-0.01em]
            text-[#1e1008]

            sm:text-[15px]
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1
            text-[12px]
            font-semibold
            leading-[1.3]
            text-[#7a5c45]

            sm:text-[12px]
            sm:leading-[1.35]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function ProductVisual() {
  return (
    <div
      className="
        relative
        mx-auto
        h-[390px]
        w-full
        max-w-[520px]

        sm:h-[470px]
        sm:max-w-[600px]

        lg:h-[560px]
        lg:max-w-[680px]

        xl:h-[610px]
        xl:max-w-[720px]
      "
    >
      {/* =================================================
          DECORATIVE OUTER RING
      ================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[72%]
          w-[72%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#c17f4a]/10

          sm:h-[69%]
          sm:w-[69%]

          lg:h-[67%]
          lg:w-[67%]
        "
      />

      {/* =================================================
          DECORATIVE INNER RING
      ================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[61%]
          w-[61%]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#c17f4a]/10

          sm:h-[59%]
          sm:w-[59%]

          lg:h-[57%]
          lg:w-[57%]
        "
      />

      {/* =================================================
          PRODUCT IMAGE
          HERO IMAGE — EAGER + HIGH PRIORITY
      ================================================= */}
      <picture>
        <source srcSet={PRODUCT_IMAGE_WEBP} type="image/webp" />

        <img
          src={PRODUCT_IMAGE_PNG}
          alt="ScentMason Automatic Fragrance Machine"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="
            absolute
            left-1/2
            top-[51%]
            z-10
            h-auto
            w-[71%]
            -translate-x-1/2
            -translate-y-1/2
            object-contain
            drop-shadow-[0_24px_30px_rgba(59,31,14,0.18)]

            sm:w-[69%]

            lg:w-[67%]
          "
        />
      </picture>

      {/* =================================================
          60 DAYS BADGE
      ================================================= */}
      <div
        className="
          absolute
          left-[2%]
          top-[6%]
          z-20
          flex
          h-[82px]
          w-[82px]
          flex-col
          items-center
          justify-center
          rounded-full
          bg-[#3b1f0e]
          text-center
          shadow-[0_15px_35px_rgba(59,31,14,0.16)]

          sm:left-[3%]
          sm:top-[7%]
          sm:h-[92px]
          sm:w-[92px]
        "
      >
        <span
          className="
            text-[19px]
            font-extrabold
            leading-none
            text-white

            sm:text-[21px]
          "
        >
          30%
        </span>

        <span
          className="
            mt-1
            text-[9px]
            font-bold
            leading-none
            tracking-[0.08em]
            text-white

            sm:text-[10px]
          "
        >
          DISCOUNT
        </span>

        <span
          className="
            mt-1
            text-[8px]
            font-medium
            uppercase
            leading-none
            text-[#eadfce]

            sm:text-[7px]
          "
        >
          GET IT NOW
        </span>
      </div>

      {/* =================================================
          FEATURE LABELS
          Moved farther OUT from product body.
      ================================================= */}
      <div
        className="
          absolute
          right-[-1%]
          top-[20%]
          z-20
          flex
          w-[36%]
          flex-col
          gap-8

          sm:right-[-2%]
          sm:top-[20%]
          sm:w-[35%]
          sm:gap-10

          lg:right-[-3%]
          lg:top-[21%]
          lg:w-[34%]
          lg:gap-12
        "
      >
        <FeatureCard
          icon="↻"
          title="Rechargeable"
          description="Charges in 2 hours"
        />

        <FeatureCard
          icon="⌁"
          title="No Drill Mount"
          description="Stick. Press. Done."
        />

        <FeatureCard
          icon="✦"
          title="Automatic"
          description="Sprays on its own"
        />
      </div>
    </div>
  );
}

export default function PremiumHero() {
  return (
    <section className="bg-[#f7f3ed]">
      <div
        className="
          px-5
          py-7

          sm:px-8
          sm:py-11

          lg:px-12
          lg:py-14

          xl:px-16
          xl:py-18
        "
      >
        {/* =================================================
            TOP EYEBROW
            Straight horizontal line.
        ================================================= */}
        {/*   <div
          className="
            mb-5
            flex
            w-full
            items-center
            justify-center
            gap-3

            lg:mb-7
            lg:justify-start
          "
        >
          <span className="h-px flex-1 bg-[#3b1f0e]/20 lg:max-w-[42px]" />

          <p
            className="
              shrink-0
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#7a5c45]

              sm:text-[11px]

              lg:text-[12px]
            "
          >
            Aromatherapy Diffuser · Rechargeable
          </p>

          <span className="h-px flex-1 bg-[#3b1f0e]/20 lg:hidden" />
        </div> */}
        
        {/* =================================================
            MAIN HERO GRID

            MOBILE:
            IMAGE → SUBHEADLINE → CTA

            DESKTOP:
            COPY LEFT / IMAGE RIGHT
        ================================================= */}
        <div
          className="
            grid
            items-center
            gap-4

            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-14

            xl:gap-20
          "
        >
          {/* =================================================
              PRODUCT VISUAL
          ================================================= */}
          <div
  className="
    order-1
    pt-20

    sm:pt-12

    lg:order-2
    lg:pt-12

    xl:pt-14
  "
>
  <ProductVisual />
</div>

          {/* =================================================
              HERO COPY
          ================================================= */}
          <div
            className="
              order-2
              text-center

              lg:order-1
              lg:pr-8
              lg:text-left
            "
          >
            {/* =================================================
                SUB-HEADLINE
            ================================================= */}
  <h1
  className="
    mx-auto
    max-w-[560px]
    text-[22px]
    font-medium
    leading-[1.18]
    tracking-[-0.025em]
    text-[#1e1008]

    sm:text-[27px]
    sm:leading-[1.16]

    lg:mx-0
    lg:text-[32px]
    lg:leading-[1.12]

    xl:text-[36px]
    xl:leading-[1.1]
  "
>
  The diffuser that makes your home smell{" "}

  <span
    className="
      font-extrabold
      tracking-[-0.035em]
      text-[#A67C00]
    "
  >
    luxurious like a <br className="hidden sm:block" />
    5-star hotel
  </span>{" "}

  <span
    className="
      font-normal
      tracking-[-0.025em]
      text-[#1e1008]
    "
  >
    without You constantly remembering to spray.
  </span>
</h1>

            {/* =================================================
                CTA
                MAIN TEXT + FREE DELIVERY SUBTEXT INSIDE BUTTON
            ================================================= */}
            <div className="mt-6 flex justify-center lg:justify-start">
             <a
  href="#order-form-start"
  className="
    inline-flex
    min-h-[68px]
    flex-row
    items-center
    justify-center
    gap-3
    rounded-xl
    bg-[#16a34a]
    px-7
    py-3
    text-white
    shadow-[0_12px_30px_rgba(22,163,74,0.25)]
    transition-all
    duration-200
    hover:-translate-y-0.5
    hover:bg-[#15803d]
    hover:shadow-[0_16px_35px_rgba(22,163,74,0.32)]
    active:translate-y-0

    sm:min-h-[76px]
    sm:gap-4
    sm:px-10
    sm:py-3.5
  "
>
  {/* CART ICON */}
  <span
    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-white/15

      sm:h-11
      sm:w-11
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
        h-5
        w-5

        sm:h-6
        sm:w-6
      "
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  </span>

  {/* BUTTON TEXT */}
 <span
  className="
    flex
    flex-col
    items-center
    text-center
  "
>
  <span
    className="
      text-[16px]
      font-extrabold
      leading-tight
      tracking-[0.02em]

      sm:text-[18px]
    "
  >
    YES! I WANT TO BUY NOW
  </span>

  <span
    className="
      mt-1
      text-center
      text-[10px]
      font-bold
      uppercase
      leading-none
      tracking-[0.14em]
      text-white/70

      sm:text-[11px]
    "
  >
    FOR FREE DELIVERY
  </span>
</span>
</a>
</div>

           
          </div>
        </div>
      </div>
    </section>
  );
}