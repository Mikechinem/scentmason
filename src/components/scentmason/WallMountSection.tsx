"use client";

const WALL_MOUNT_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/dispalywall.png";

export default function WallMountSection() {
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
      {/* =================================================
          LIGHT INNER SECTION
      ================================================= */}
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
        <div
          className="
            grid
            items-center

            gap-8

            px-3
            py-6

            sm:gap-10
            sm:px-6
            sm:py-10

            lg:grid-cols-[0.78fr_1.22fr]
            lg:gap-6
            lg:px-8
            lg:py-14

            xl:grid-cols-[0.72fr_1.28fr]
            xl:gap-8
            xl:px-12
            xl:py-16
          "
        >
          {/* =================================================
              IMAGE — MOBILE FIRST
              BIG / DOMINANT
          ================================================= */}
          <div
            className="
              order-1
              flex
              min-w-0
              flex-col
              items-center
              justify-center

              lg:order-2
            "
          >
            {/* =================================================
                LABEL ABOVE IMAGE
            ================================================= */}
            <div
              className="
                mb-2
                flex
                items-center
                gap-2
                self-center

                sm:mb-3

                lg:self-end
              "
            >
              <span
                className="
                  h-px
                  w-7
                  bg-[#3b1f0e]/25

                  sm:w-9
                "
              />

              <p
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-[#7a5c45]

                  sm:text-[12px]
                "
              >
                EFFORTLESS WALL MOUNTING
              </p>
            </div>

            {/* =================================================
                LARGE IMAGE
            ================================================= */}
            <div
              className="
                relative
                -mx-2
                w-[calc(100%+1rem)]
                max-w-[1100px]

                sm:-mx-3
                sm:w-[calc(100%+1.5rem)]

                lg:mx-0
                lg:w-full

                xl:scale-[1.04]
              "
            >
              <img
                src={WALL_MOUNT_IMAGE}
                alt="ScentMason automatic fragrance machine with wall mounting system"
                loading="lazy"
                decoding="async"
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                  drop-shadow-[0_30px_60px_rgba(59,31,14,0.20)]

                  sm:scale-[1.04]

                  lg:scale-[1.08]

                  xl:scale-[1.1]
                "
              />
            </div>

            {/* =================================================
                IMAGE MESSAGE — OUTSIDE PRODUCT
            ================================================= */}
            <div
              className="
                mt-1
                flex
                items-center
                gap-2
                self-center

                sm:mt-2

                lg:self-end
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#198754]
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                ✓
              </span>

              <p
                className="
                  text-[15px]
                  font-semibold
                  leading-5
                  text-[#5f4b3c]

                  sm:text-[13px]
                "
              >
                Paste onto wall. No drilling or nailing.
              </p>
            </div>
          </div>

          {/* =================================================
              COPY
              BIGGER + EASY TO READ
          ================================================= */}
          <div
            className="
              order-2
              min-w-0
              text-center

              lg:order-1
              lg:text-left
            "
          >
            {/* Eyebrow */}
            <div
              className="
                mb-5
                flex
                items-center
                justify-center
                gap-3

                lg:justify-start
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#3b1f0e]/25

                  sm:w-10
                "
              />

            </div>

            {/* =================================================
                BIGGER HEADLINE
            ================================================= */}
            <h2
              className="
                max-w-lg
                text-[36px]
                font-medium
                leading-[1.06]
                tracking-[-0.04em]
                text-[#1e1008]

                sm:text-[44px]

                lg:text-[48px]

                xl:text-[56px]
              "
            >
              Your home should never{" "}
              <span className="font-extrabold text-[#3b1f0e]">
                embarrass you.
              </span>
            </h2>

            {/* Supporting copy */}
            <p
              className="
                mx-auto
                mt-5
                max-w-lg
                text-[16px]
                leading-7
                text-[#5f4b3c]

                sm:mt-6
                sm:text-[17px]
                sm:leading-7

                lg:mx-0
                lg:text-[18px]
                lg:leading-8
              "
            >
              Even when visitors come unannounced. This Smart Diffuser helps
              you kick out annoying odours in your:
            </p>

            {/* =================================================
                LOCATION GRID
                BIGGER + EASY TO SEE
            ================================================= */}
            <div
              className="
                mx-auto
                mt-7
                grid
                max-w-lg
                grid-cols-2
                gap-2.5

                sm:mt-8
                sm:gap-3

                lg:mx-0
              "
            >
              {[
                "Bedroom",
                "Living room",
                "Office",
                "Hotel room",
                "Salon",
                "Shop counter",
              ].map((place) => (
                <div
                  key={place}
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-2.5
                    rounded-xl
                    border
                    border-[#3b1f0e]/10
                    bg-white/60
                    px-3
                    py-3

                    sm:rounded-2xl
                    sm:px-4
                    sm:py-3.5
                  "
                >
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#3b1f0e]
                      text-[10px]
                      font-bold
                      text-white

                      sm:h-7
                      sm:w-7
                      sm:text-[11px]
                    "
                  >
                    ✓
                  </span>

                  <span
                    className="
                      min-w-0
                      text-[13px]
                      font-semibold
                      leading-tight
                      text-[#1e1008]

                      sm:text-[14px]
                    "
                  >
                    {place}
                  </span>
                </div>
              ))}
            </div>

            {/* =================================================
                BOTTOM STATEMENT
            ================================================= */}
            <div
              className="
                mx-auto
                mt-6
                flex
                max-w-lg
                items-start
                justify-center
                gap-3

                lg:mx-0
                lg:justify-start
              "
            >
              <span
                className="
                  mt-2.5
                  h-px
                  w-8
                  shrink-0
                  bg-[#3b1f0e]/25
                "
              />

              <p
                className="
                  text-[12px]
                  font-medium
                  leading-6
                  tracking-wide
                  text-[#7a5c45]

                  sm:text-[13px]
                "
              >
                No drilling. No nailing. Just paste it onto your wall.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}