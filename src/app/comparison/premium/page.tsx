"use client";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/tracking/attribution";
import PremiumHero from "@/components/scentmason/PremiumHero";
import UpStickyOrderBar from "@/components/scentmason/UpStickyOrderBar";
import WallMountSection from "@/components/scentmason/WallMountSection";
import WallOrTable from "@/components/scentmason/WallOrTable";
import SpaFeelSection from "@/components/scentmason/SpaFeelSection";
import TestimonialsSection from "@/components/scentmason/TestimonialsSection";
import RoomUseCases from "@/components/scentmason/RoomUseCases";
import LuxurySpaceBar from "@/components/scentmason/LuxurySpaceBar";
import UnboxingVideoSection from "@/components/scentmason/UnboxingVideoSection";
import PremiumWhatsInsideSection from "@/components/scentmason/PremiumWhatsInsideSection";
import PremiumOrderForm from "@/components/scentmason/PremiumOrderForm";
import RiskOff from "@/components/scentmason/RiskOff";


export default function PremiumPage() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return (
    <main>
<UpStickyOrderBar />
      {/* =========================================================
          SECTION 1 — HERO
      ========================================================= */}
      <PremiumHero />
    

      {/* =========================================================
    SECTION 3 — WALL MOUNT / TABLETOP
========================================================= */}

<WallOrTable />
   {/* =========================================================
    SECTION 2 — WALL MOUNT / TABLETOP
========================================================= */}




{/* =========================================================
    SECTION 4 — GUARANTEED QUALITY
========================================================= */}

<section className="bg-[#090909] px-3 py-6 sm:px-5 sm:py-10 lg:px-8 lg:py-14">

  {/* LIGHT INNER SECTION */}

  <div
    className="
      overflow-hidden
      rounded-2xl
      border
      border-white/20
      bg-[#f7f3ed]

      sm:rounded-3xl
    "
  >

    <div
      className="
        grid
        lg:grid-cols-[0.85fr_1.15fr]
      "
    >

      {/* =================================================
          LEFT — EXISTING COPY
      ================================================= */}

      <div
        className="
          order-2
          px-6
          py-12
          text-center

          sm:px-10
          sm:py-14

          lg:order-1
          lg:px-12
          lg:py-16
          lg:text-left

          xl:px-16
          xl:py-20
        "
      >

        {/* Eyebrow */}

        <div
          className="
            mb-6
            flex
            items-center
            justify-center
            gap-3

            lg:justify-start
          "
        >
          <span className="h-px w-9 bg-[#3b1f0e]/25" />

          <p
            className="
              text-[12px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#7a5c45]

              sm:text-[13px]
            "
          >
            Guaranteed Quality
          </p>
        </div>


        {/* Main headline */}

        <h2
          className="
            max-w-xl
            text-[40px]
            font-medium
            leading-[1.06]
            tracking-[-0.04em]
            text-[#1e1008]

            sm:text-[50px]
            lg:text-[56px]
            xl:text-[62px]
          "
        >
          Premium quality.
          <br />

          <span className="font-extrabold text-[#3b1f0e]">
            Made to last.
          </span>
        </h2>


        {/* Benefits */}

        <div
          className="
            mt-9
            space-y-5

            sm:mt-10
            sm:space-y-6
          "
        >

          {/* Benefit 1 */}

          <div className="flex items-start gap-4 text-left">

            <div
              className="
                mt-0.5
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#3b1f0e]
                text-base
                font-bold
                text-white

                sm:h-11
                sm:w-11
              "
            >
              ✓
            </div>

            <div>
              <h3
                className="
                  text-[18px]
                  font-bold
                  leading-[1.3]
                  tracking-[-0.01em]
                  text-[#1e1008]

                  sm:text-[20px]
                "
              >
                Premium Experience
              </h3>

              <p
                className="
                  mt-1.5
                  text-[15px]
                  leading-7
                  text-[#7a5c45]

                  sm:text-[16px]
                "
              >
                Designed to elevate the way your home feels and smells.
              </p>
            </div>

          </div>


          {/* Benefit 2 */}

          <div className="flex items-start gap-4 text-left">

            <div
              className="
                mt-0.5
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#3b1f0e]
                text-base
                font-bold
                text-white

                sm:h-11
                sm:w-11
              "
            >
              ✓
            </div>

            <div>
              <h3
                className="
                  text-[18px]
                  font-bold
                  leading-[1.3]
                  tracking-[-0.01em]
                  text-[#1e1008]

                  sm:text-[20px]
                "
              >
                Long Lasting Fragrance
              </h3>

              <p
                className="
                  mt-1.5
                  text-[15px]
                  leading-7
                  text-[#7a5c45]

                  sm:text-[16px]
                "
              >
                Enjoy a consistently fresh and inviting fragrance experience.
              </p>
            </div>

          </div>


          {/* Benefit 3 */}

          <div className="flex items-start gap-4 text-left">

            <div
              className="
                mt-0.5
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#3b1f0e]
                text-base
                font-bold
                text-white

                sm:h-11
                sm:w-11
              "
            >
              ✓
            </div>

            <div>
              <h3
                className="
                  text-[18px]
                  font-bold
                  leading-[1.3]
                  tracking-[-0.01em]
                  text-[#1e1008]

                  sm:text-[20px]
                "
              >
                Safe & Reliable
              </h3>

              <p
                className="
                  mt-1.5
                  text-[15px]
                  leading-7
                  text-[#7a5c45]

                  sm:text-[16px]
                "
              >
                A dependable automatic fragrance solution for everyday use.
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          RIGHT — IMAGE + OFFER COPY
      ================================================= */}

      <div
        className="
          order-1
          relative
          flex
          min-h-[620px]
          flex-col
          items-center
          justify-center
          overflow-hidden
          bg-[#f7f3ed]
          px-5
          py-10

          sm:min-h-[700px]
          sm:px-8

          lg:order-2
          lg:min-h-[760px]
          lg:px-8

          xl:min-h-[820px]
        "
      >

        {/* ===============================================
            PRODUCT IMAGE
        =============================================== */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-[780px]
          "
        >
          <picture>

            <source
              srcSet="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/inside0utside%20(1).png"
              type="image/png"
            />

            <img
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/inside0utside%20(1).png"
              alt="ScentMason automatic fragrance machine and fragrance packaging"
              loading="lazy"
              decoding="async"
              className="
                block
                h-auto
                w-full
                object-contain
                drop-shadow-[0_25px_45px_rgba(59,31,14,0.18)]
              "
            />

          </picture>
        </div>


        {/* ===============================================
            limited — offer
        =============================================== */}

        <div
          className="
            absolute
            left-[5%]
            top-[7%]
            z-20
            rounded-2xl
            border
            border-[#3b1f0e]/10
            bg-white/95
            px-4
            py-3
            text-center
            shadow-[0_15px_35px_rgba(59,31,14,0.12)]
            backdrop-blur-sm

            sm:left-[7%]
            sm:px-5
            sm:py-4
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#7a5c45]

              sm:text-[11px]
            "
          >
            Limited Offer
          </p>

          <p
            className="
              mt-0.5
              text-[25px]
              font-extrabold
              leading-none
              tracking-[-0.03em]
              text-[#3b1f0e]

              sm:text-[30px]
            "
          >
            30% Discount
          </p>
        </div>


        {/* ===============================================
            OFFER DETAILS
            MOBILE FIRST
        =============================================== */}

        <div
          className="
            relative
            z-20
            mt-6
            flex
            w-full
            max-w-[340px]
            flex-col
            items-center
            gap-4
            rounded-2xl
            border
            border-[#3b1f0e]/10
            bg-white/95
            px-4
            py-4
            text-center
            shadow-[0_15px_35px_rgba(59,31,14,0.12)]
            backdrop-blur-sm

            sm:max-w-[390px]
            sm:px-5
            sm:py-4

            lg:absolute
            lg:bottom-[6%]
            lg:left-auto
            lg:right-[7%]
            lg:mt-0
            lg:w-auto
            lg:max-w-none
            lg:translate-x-0
            lg:flex-row
            lg:items-center
            lg:gap-6
            lg:rounded-xl
            lg:border-0
            lg:bg-white/90
            lg:px-5
            lg:py-3.5
          "
        >

          {/* ===============================================
              PRICE
          =============================================== */}

          <div
            className="
              flex
              items-baseline
              justify-center
              gap-2
              whitespace-nowrap
            "
          >
            <span
              className="
                text-[17px]
                font-semibold
                text-[#9a8777]
                line-through

                sm:text-[20px]
              "
            >
              ₦45,000
            </span>

            <span
              className="
                text-[32px]
                font-extrabold
                leading-none
                tracking-[-0.04em]
                text-[#3b1f0e]

                sm:text-[38px]
              "
            >
              ₦28,000
            </span>
          </div>


          {/* ===============================================
              DIVIDER
          =============================================== */}

          <div
            className="
              h-px
              w-full
              bg-[#3b1f0e]/10

              lg:h-10
              lg:w-px
            "
          />


          {/* ===============================================
              DELIVERY / PAYMENT
          =============================================== */}

          <div
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-3

              lg:w-auto
              lg:items-start
              lg:gap-2
            "
          >

            {/* Free Delivery */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[12px]
                font-bold
                leading-none
                text-[#3b1f0e]

                sm:text-[13px]
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#3b1f0e]
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                ✓
              </span>

              <span>Free Delivery</span>
            </div>


            {/* Payment on Delivery */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[12px]
                font-bold
                leading-none
                text-[#3b1f0e]

                sm:text-[13px]
              "
            >
              <span
                className="
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#3b1f0e]
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                ✓
              </span>

              <span>Payment on Delivery</span>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
{/* SECTION 4 — WALL MOUNT */}
<WallMountSection />
<SpaFeelSection />
<LuxurySpaceBar />
<TestimonialsSection />
<RoomUseCases />
<UnboxingVideoSection />
<PremiumWhatsInsideSection />
<RiskOff />

{/* Order form intro + form */}
<section
  id="order-form-start"
  className="scroll-mt-24 px-4 py-10"
>
  <div className="mx-auto w-full max-w-[480px] rounded-2xl border-2 border-[#bff0d4] p-4">
    
    <div className="text-center">
      <p className="text-[15px] font-extrabold uppercase tracking-wider text-red-600">
        PRICE MAY GO UP SOON
      </p>

      <h2 className="mt-2 text-[24px] font-bold tracking-tight text-black">
        Fill Order Form Below
      </h2>

      <p className="mx-auto mt-3 max-w-[420px] text-[16px] font-medium text-black/60">
        Buy 5 machines and get 1 extra fragrance oil free, automatically
        added to your order.
      </p>
    </div>

    

    <PremiumOrderForm />

  </div>
</section>

  {/* Contact */}
      <section className="mx-4 my-10 rounded-[2rem] bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:mx-10 sm:px-10 sm:py-16">
  <p className="mx-auto max-w-3xl text-[24px] font-semibold leading-[1.25] text-black sm:text-[34px]">
    For more enquiries, call us on{" "}
    <a
      href="tel:07064969603"
      className="inline-block font-black text-black underline decoration-black/30 underline-offset-4 transition hover:scale-[1.03]"
    >
      0706 496 9603
    </a>
  </p>
</section>

      {/* Facebook disclaimer */}
      <p className="mx-auto max-w-[720px] px-4 pb-14 text-center text-[11px] font-medium leading-5 text-black/40">
        This site is not part of the Facebook website, Facebook Inc, the
        Google website, or Alphabet Inc, and is not endorsed by Facebook or
        Google in any way. FACEBOOK and GOOGLE are trademarks of Facebook Inc
        and Alphabet Inc respectively.
      </p>

    </main>
  );
}