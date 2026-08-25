"use client";

const WALL_PLACE_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/wahuk.png?tr=f-webp";

export default function WallOrTable() {
  return (
    <section className="bg-[#090909] px-3 py-6 sm:px-5 sm:py-10 lg:px-8 lg:py-14">
      {/* =================================================
          GOLD WRAPPER
      ================================================= */}

      <div
        className="
          rounded-3xl
          bg-[#A67C00]
          p-[3px]
          shadow-[0_18px_50px_rgba(166,124,0,0.15)]
        "
      >
        {/* =================================================
            DARK INNER SECTION
        ================================================= */}

        <div
          className="
            overflow-hidden
            rounded-[21px]
            bg-[#11100e]
          "
        >
          <div
            className="
              grid
              items-center
              gap-8
              px-5
              py-8

              sm:gap-10
              sm:px-8
              sm:py-12

              lg:grid-cols-[0.78fr_1.22fr]
              lg:gap-10
              lg:px-10
              lg:py-16

              xl:grid-cols-[0.75fr_1.25fr]
              xl:gap-12
              xl:px-12
              xl:py-20
            "
          >
            {/* =================================================
                PRODUCT IMAGE
                RESPONSIVE / NO CROPPING
            ================================================= */}

            <div
              className="
                order-1
                flex
                min-w-0
                items-center
                justify-center

                lg:order-2
                lg:col-start-2
                lg:row-start-1
              "
            >
              <div
                className="
                  relative
                  flex
                  w-full
                  max-w-[900px]
                  items-center
                  justify-center
                  overflow-visible

                  -mx-3
                  sm:mx-0
                "
              >
                <img
                  src={WALL_PLACE_IMAGE}
                  alt="ScentMason automatic fragrance machine shown wall mounted and placed on a surface"
                  loading="lazy"
                  decoding="async"
                  className="
                    block
                    h-auto
                    w-full
                    max-w-none
                    object-contain
                    drop-shadow-[0_30px_55px_rgba(0,0,0,0.45)]

                    scale-[1.04]

                    sm:scale-105
                    lg:scale-110
                    xl:scale-115
                  "
                />
              </div>
            </div>

            {/* =================================================
                COPY
            ================================================= */}

            <div
              className="
                order-2
                min-w-0
                max-w-xl

                lg:order-1
                lg:col-start-1
                lg:row-start-1
              "
            >
              {/* =================================================
                  EYEBROW
              ================================================= */}

              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#A67C00]/70" />

                <p
                  className="
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#b8a995]

                    sm:text-[13px]
                  "
                >
                  Luxury That Fits Anywhere
                </p>
              </div>

              {/* =================================================
                  HEADLINE
              ================================================= */}

              <h2
                className="
                  text-[40px]
                  font-medium
                  leading-[1.08]
                  tracking-[-0.04em]
                  text-white

                  sm:text-[50px]
                  lg:text-[58px]
                  xl:text-[64px]
                "
              >
                <span className="font-extrabold text-[#A67C00]">
                  Mount it on your wall.
                </span>

                <br />

                <span className="text-[#b8b0a7]">
                  Or place it anywhere.
                </span>
              </h2>

              {/* =================================================
                  FEATURE GRID
              ================================================= */}

              <div
                className="
                  mt-10
                  grid
                  grid-cols-2
                  gap-3

                  sm:gap-5
                "
              >
                {/* WALL MOUNT */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-[#A67C00]/25
                    bg-[#1b1916]
                    p-4

                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#A67C00]/50
                    hover:bg-[#211e1a]

                    sm:p-6
                  "
                >
                  <div
                    className="
                      mb-4
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#A67C00]
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_6px_16px_rgba(166,124,0,0.25)]
                    "
                  >
                    ↗
                  </div>

                  <h3
                    className="
                      text-[15px]
                      font-semibold
                      text-white

                      sm:text-[17px]
                    "
                  >
                    Wall Mount
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[13px]
                      leading-6
                      text-[#b8a995]

                      sm:text-[15px]
                    "
                  >
                    No drilling required
                  </p>
                </div>

                {/* TABLETOP */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-[#A67C00]/25
                    bg-[#1b1916]
                    p-4

                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#A67C00]/50
                    hover:bg-[#211e1a]

                    sm:p-6
                  "
                >
                  <div
                    className="
                      mb-4
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#A67C00]
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_6px_16px_rgba(166,124,0,0.25)]
                    "
                  >
                    ◇
                  </div>

                  <h3
                    className="
                      text-[15px]
                      font-semibold
                      text-white

                      sm:text-[17px]
                    "
                  >
                    Tabletop Display
                  </h3>

                  <p
                    className="
                      mt-2
                      text-[13px]
                      leading-6
                      text-[#b8a995]

                      sm:text-[15px]
                    "
                  >
                    Looks beautiful anywhere
                  </p>
                </div>
              </div>

              {/* =================================================
                  BOTTOM STATEMENT
              ================================================= */}

              <div
                className="
                  mt-8
                  flex
                  items-start
                  gap-3

                  sm:mt-9
                  sm:items-center
                "
              >
                <div
                  className="
                    mt-2
                    h-px
                    w-8
                    shrink-0
                    bg-[#A67C00]/60

                    sm:mt-0
                  "
                />

                <p
                  className="
                    text-[12px]
                    font-medium
                    leading-6
                    tracking-wide
                    text-[#b8a995]

                    sm:text-[14px]
                  "
                >
                  No plugs. No drilling. No daily spraying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}