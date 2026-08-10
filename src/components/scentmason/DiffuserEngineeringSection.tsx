"use client";

const DIFFUSER_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffuse_nbg.png?updatedAt=1786289308513";

const FEATURES = [
  {
    title: "No Water Needed",
    description: "No limescale build-up.",
    position: "top-left",
  },
  {
    title: "Pure Oil Technology",
    description: "100% pure fragrance oil.",
    position: "top-right",
  },
  {
    title: "Anti-Clog",
    description: "Handles thick oils.",
    position: "bottom-left",
  },
  {
    title: "Consistent Mist",
    description: "Powerful scent, every day.",
    position: "bottom-right",
  },
];

const PROBLEMS = [
  {
    title: "The Water-Limescale Choke",
    text: "Water-based ultrasonic diffusers force you to mix oils with water. Over time, minerals can build up around the vibration plate and reduce mist output.",
  },
  {
    title: "Cheap Aerosol Nozzles Clog Easily",
    text: "Standard automatic battery sprayers can struggle with thicker fragrance oils, causing inconsistent spraying and poor atomization.",
  },
];

const BENEFITS = [
  {
    title: "Zero Water Needed",
    text: "Absolutely zero risk of mineral build-up or limescale choking.",
  },
  {
    title: "Anti-Clog Engineering",
    text: "A micro-polished nozzle designed to handle high-density pure oils.",
  },
  {
    title: "Consistent Mist Power",
    text: "Delivers consistent high-intensity scent coverage over time.",
  },
];

export default function DiffuserEngineeringSection() {
  return (
    <section
      className="
        bg-[#11100e]
        px-3
        py-6

        sm:px-5
        sm:py-8

        lg:px-8
        lg:py-10

        xl:px-10
      "
    >
      {/* =====================================================
          LIGHT INNER SECTION
      ===================================================== */}
      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#3b1f0e]/10
          bg-[#f7f3ed]

          sm:rounded-3xl
        "
      >
        {/* =====================================================
            VISUAL PRODUCT STAGE
            IMAGE FIRST — MOBILE FIRST
        ===================================================== */}
        <div
          className="
            relative
            px-3
            pb-8
            pt-7

            sm:px-8
            sm:pb-12
            sm:pt-10

            lg:px-12
            lg:pb-14
            lg:pt-12

            xl:px-16
            xl:pb-16
          "
        >
          {/* Small section label */}
          <div className="mb-3 flex items-center justify-center gap-2 sm:mb-5">
            <span className="h-px w-6 bg-[#3b1f0e]/30 sm:w-8" />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#7a5c45]

                sm:text-[11px]
              "
            >
              Premium Engineering
            </span>

            <span className="h-px w-6 bg-[#3b1f0e]/30 sm:w-8" />
          </div>

          {/* =================================================
              IMAGE + CIRCULAR CALLOUTS

              One visual unit.
              Product stays large and central.
          ================================================= */}
          <div
            className="
              relative
              mx-auto
              h-[390px]
              w-full
              max-w-[520px]

              sm:h-[520px]
              sm:max-w-[650px]

              lg:h-[610px]
              lg:max-w-[850px]

              xl:h-[680px]
              xl:max-w-[950px]
            "
          >
            {/* =================================================
                DOTTED CIRCLE
            ================================================= */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[245px]
                w-[245px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-dashed
                border-[#3b1f0e]/25

                sm:h-[330px]
                sm:w-[330px]

                lg:h-[410px]
                lg:w-[410px]

                xl:h-[470px]
                xl:w-[470px]
              "
            />

            {/* =================================================
                PRODUCT IMAGE

                Large and central.
                Lazy-loaded for performance.
            ================================================= */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                z-10
                w-[190px]
                -translate-x-1/2
                -translate-y-1/2

                sm:w-[270px]

                lg:w-[330px]

                xl:w-[370px]
              "
            >
              <img
                src={DIFFUSER_IMAGE}
                alt="ScentMason automatic fragrance machine"
                loading="lazy"
                decoding="async"
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                  drop-shadow-[0_25px_35px_rgba(59,31,14,0.22)]
                "
              />
            </div>

            {/* =================================================
                CALLOUT 1 — TOP LEFT
            ================================================= */}
            <div
              className="
                absolute
                left-[1%]
                top-[7%]
                z-20
                w-[132px]
                text-left

                sm:left-[4%]
                sm:top-[8%]
                sm:w-[190px]

                lg:left-[3%]
                lg:top-[10%]
                lg:w-[220px]
              "
            >
              <Callout
                title={FEATURES[0].title}
                description={FEATURES[0].description}
              />

              <span
                className="
                  absolute
                  -right-[42px]
                  top-[70%]
                  w-[48px]
                  border-t
                  border-dashed
                  border-[#3b1f0e]/40
                  rotate-[25deg]

                  sm:-right-[55px]
                  sm:w-[65px]
                "
              />
            </div>

            {/* =================================================
                CALLOUT 2 — TOP RIGHT
            ================================================= */}
            <div
              className="
                absolute
                right-[1%]
                top-[7%]
                z-20
                w-[132px]
                text-right

                sm:right-[4%]
                sm:top-[8%]
                sm:w-[190px]

                lg:right-[3%]
                lg:top-[10%]
                lg:w-[220px]
              "
            >
              <Callout
                title={FEATURES[1].title}
                description={FEATURES[1].description}
                align="right"
              />

              <span
                className="
                  absolute
                  -left-[42px]
                  top-[70%]
                  w-[48px]
                  border-t
                  border-dashed
                  border-[#3b1f0e]/40
                  -rotate-[25deg]

                  sm:-left-[55px]
                  sm:w-[65px]
                "
              />
            </div>

            {/* =================================================
                CALLOUT 3 — BOTTOM LEFT
            ================================================= */}
            <div
              className="
                absolute
                bottom-[7%]
                left-[1%]
                z-20
                w-[132px]
                text-left

                sm:bottom-[8%]
                sm:left-[4%]
                sm:w-[190px]

                lg:bottom-[10%]
                lg:left-[3%]
                lg:w-[220px]
              "
            >
              <Callout
                title={FEATURES[2].title}
                description={FEATURES[2].description}
              />

              <span
                className="
                  absolute
                  -right-[42px]
                  top-[20%]
                  w-[48px]
                  border-t
                  border-dashed
                  border-[#3b1f0e]/40
                  -rotate-[25deg]

                  sm:-right-[55px]
                  sm:w-[65px]
                "
              />
            </div>

            {/* =================================================
                CALLOUT 4 — BOTTOM RIGHT
            ================================================= */}
            <div
              className="
                absolute
                bottom-[7%]
                right-[1%]
                z-20
                w-[132px]
                text-right

                sm:bottom-[8%]
                sm:right-[4%]
                sm:w-[190px]

                lg:bottom-[10%]
                lg:right-[3%]
                lg:w-[220px]
              "
            >
              <Callout
                title={FEATURES[3].title}
                description={FEATURES[3].description}
                align="right"
              />

              <span
                className="
                  absolute
                  -left-[42px]
                  top-[20%]
                  w-[48px]
                  border-t
                  border-dashed
                  border-[#3b1f0e]/40
                  rotate-[25deg]

                  sm:-left-[55px]
                  sm:w-[65px]
                "
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN COPY
        ===================================================== */}
        <div
          className="
            mx-auto
            max-w-4xl
            px-5
            pb-8
            text-center

            sm:px-8
            sm:pb-12

            lg:px-12
            lg:pb-14
          "
        >
          <h2
            className="
              text-[30px]
              font-medium
              leading-[1.08]
              tracking-[-0.04em]
              text-[#1e1008]

              sm:text-[42px]

              lg:text-[52px]

              xl:text-[58px]
            "
          >
            Tired of Diffusers That Stop
            <br className="hidden sm:block" />
            <span className="font-extrabold text-[#3b1f0e]">
              {" "}
              Spraying After 2 Months?
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-3xl
              text-[14px]
              leading-6
              text-[#5f4b3c]

              sm:mt-6
              sm:text-[17px]
              sm:leading-7

              lg:text-[18px]
            "
          >
            If you have a{" "}
            <strong>
              “graveyard” of dead, weak, or clogged diffusers
            </strong>{" "}
            sitting inside your storage cabinet right now... you are not
            alone.
          </p>

          <p
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-[14px]
              leading-6
              text-[#5f4b3c]

              sm:text-[17px]
              sm:leading-7
            "
          >
            Most people assume they bought a bad brand, but the truth is
            simpler:
            <strong className="block text-[#1e1008]">
              traditional diffusers are structurally designed to fail.
            </strong>
          </p>

          <p
            className="
              mt-3
              text-[13px]
              font-medium
              text-[#7a5c45]

              sm:text-[15px]
            "
          >
            Here is why your old ones stopped working:
          </p>
        </div>

        {/* =====================================================
            WHAT GOES WRONG
        ===================================================== */}
        <div
          className="
            grid
            gap-4
            px-5
            pb-10

            sm:px-8
            sm:pb-14

            lg:grid-cols-2
            lg:px-12
            lg:pb-16

            xl:px-16
          "
        >
          {PROBLEMS.map((problem) => (
            <div
              key={problem.title}
              className="
                rounded-2xl
                border
                border-[#3b1f0e]/10
                bg-white/50
                p-5

                sm:rounded-3xl
                sm:p-7
              "
            >
              <div className="flex items-start gap-3">
                {/* RED X */}
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#b42318]
                    text-[16px]
                    font-bold
                    text-white
                  "
                >
                  ×
                </span>

                <h3
                  className="
                    pt-1
                    text-[16px]
                    font-extrabold
                    leading-tight
                    text-[#1e1008]

                    sm:text-[20px]
                  "
                >
                  {problem.title}
                </h3>
              </div>

              <p
                className="
                  mt-4
                  text-[13px]
                  leading-6
                  text-[#5f4b3c]

                  sm:text-[15px]
                  sm:leading-7
                "
              >
                {problem.text}
              </p>
            </div>
          ))}
        </div>

        {/* =====================================================
            SCENTMASON SOLUTION
        ===================================================== */}
        <div
          className="
            border-t
            border-[#3b1f0e]/10
            px-5
            py-9
            text-center

            sm:px-8
            sm:py-12

            lg:px-12
            lg:py-14
          "
        >
          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#7a5c45]

              sm:text-[12px]
            "
          >
            How ScentMason Changes Everything
          </p>

          <h3
            className="
              mt-3
              text-[26px]
              font-extrabold
              leading-tight
              tracking-[-0.03em]
              text-[#1e1008]

              sm:text-[38px]

              lg:text-[44px]
            "
          >
            Built For Continuous
            <span className="text-[#3b1f0e]">
              {" "}
              Premium Performance.
            </span>
          </h3>

          <p
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-[14px]
              leading-6
              text-[#5f4b3c]

              sm:text-[16px]
              sm:leading-7

              lg:text-[17px]
            "
          >
            ScentMason does not use ultrasonic water plates, and it does not
            use cheap aerosol push-nozzles. Instead, it is engineered with
            an internal{" "}
            <strong className="text-[#3b1f0e]">
              Industrial Cold-Air Micro-Pump.
            </strong>{" "}
            It takes 100% pure oil and uses pressurized air to shred the
            liquid instantly into a dry, microscopic vapor.
          </p>

          {/* =================================================
              GREEN BENEFITS
          ================================================= */}
          <div
            className="
              mx-auto
              mt-8
              grid
              max-w-5xl
              gap-5

              sm:mt-10

              lg:grid-cols-3
              lg:gap-8
            "
          >
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="
                  text-left
                  lg:text-center
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3

                    lg:justify-center
                  "
                >
                  {/* GREEN CHECK */}
                  <span
                    className="
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#198754]
                      text-[15px]
                      font-bold
                      text-white
                    "
                  >
                    ✓
                  </span>

                  <h4
                    className="
                      text-[15px]
                      font-extrabold
                      leading-tight
                      text-[#1e1008]

                      sm:text-[17px]
                    "
                  >
                    {benefit.title}
                  </h4>
                </div>

                <p
                  className="
                    mt-2
                    pl-11
                    text-[13px]
                    leading-6
                    text-[#5f4b3c]

                    sm:text-[14px]

                    lg:pl-0
                  "
                >
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          {/* =================================================
              FINAL STATEMENT
          ================================================= */}
          <div
            className="
              mx-auto
              mt-9
              max-w-4xl
              rounded-2xl
              bg-[#3b1f0e]
              px-5
              py-5
              text-center

              sm:mt-11
              sm:rounded-3xl
              sm:px-8
              sm:py-6
            "
          >
            <p
              className="
                text-[14px]
                font-semibold
                leading-6
                text-white

                sm:text-[17px]
                sm:leading-7
              "
            >
              ✦ Stop throwing money away on plastic replacements.
              <br />
              Set it once, and let premium engineering handle the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CALLOUT COMPONENT
   ============================================================ */

function Callout({
  title,
  description,
  align = "left",
}: {
  title: string;
  description: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      {/* FEATURE TITLE */}
      <div
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-[#3b1f0e]
          px-3
          py-2
          shadow-[0_8px_20px_rgba(59,31,14,0.15)]

          sm:gap-2
          sm:px-3.5
          sm:py-2.5
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
            border
            border-white/60
            text-[9px]
            font-bold
            text-white

            sm:h-6
            sm:w-6
            sm:text-[10px]
          "
        >
          ✦
        </span>

        <span
          className="
            text-[12px]
            font-extrabold
            leading-[1.05]
            text-white

            sm:text-[14px]
          "
        >
          {title}
        </span>
      </div>

      {/* FEATURE DESCRIPTION */}
      <p
        className="
          mt-2
          text-[11px]
          font-semibold
          leading-[1.35]
          text-[#5f4b3c]

          sm:mt-2.5
          sm:text-[13px]
          sm:leading-5

          lg:text-[14px]
        "
      >
        {description}
      </p>
    </div>
  );
}