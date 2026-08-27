"use client";

export default function MiniDiffuserGraveyard() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#0b0a09]
        px-4
        py-14
        text-white
        sm:px-6
        sm:py-18
        lg:py-24
      "
    >
      {/* =================================================
          BACKGROUND ATMOSPHERE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[22%]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[#A27B5C]/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-1/2
          h-[360px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-[#A27B5C]/5
          blur-[100px]
        "
      />

      <div className="relative z-10 mx-auto max-w-[760px]">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center">

          <span
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-[#A27B5C]/25
              bg-[#A27B5C]/10
              px-3
              py-1
              text-[11px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#C49A78]
            "
          >
            A Better Way To Scent Your Home
          </span>

          <h2
            className="
              mt-4
              text-[29px]
              font-extrabold
              leading-[1.08]
              tracking-[-0.035em]
              text-white
              sm:text-[38px]
            "
          >
            Tired of Diffusers That Stop Spraying After 2 Months?

            <span className="text-[#C49A78]">
              {" "}This one last well well
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-[580px]
              text-[15.5px]
              font-medium
              leading-7
              text-zinc-400
              sm:text-[17px]
            "
          >
            ScentMason makes it easier to enjoy a fresh,
            beautiful scent around your home.
          </p>

        </div>


        {/* =================================================
            MAIN IMAGE — BLENDED VISUAL
        ================================================= */}

        <div
          className="
            relative
            mt-9
            overflow-hidden
            rounded-[26px]
            border
            border-white/[0.08]
            bg-[#11100e]
            shadow-[0_25px_80px_rgba(0,0,0,0.45)]
          "
        >

          {/* Atmospheric glow */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[48%]
              z-10
              h-64
              w-64
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#C49A78]/20
              blur-[90px]
            "
          />

          {/* Gold ambient light */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[42%]
              z-10
              h-32
              w-32
              -translate-x-1/2
              rounded-full
              bg-[#E0B88F]/15
              blur-[55px]
            "
          />

          {/* Image */}
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/gh4.png?updatedAt=1787663255105"
            alt="Woman holding a ScentMason automatic fragrance diffuser"
            className="
              relative
              z-20
              block
              h-auto
              w-full
              object-cover
            "
            loading="lazy"
          />

          {/* Bottom fade — blends image into section */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              z-30
              h-32
              bg-gradient-to-t
              from-[#0b0a09]
              via-[#0b0a09]/45
              to-transparent
            "
          />

          {/* Side fades — help remove the 'image pasted in a box' feeling */}
          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-30
              w-20
              bg-gradient-to-r
              from-[#11100e]
              to-transparent
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              z-30
              w-20
              bg-gradient-to-l
              from-[#11100e]
              to-transparent
            "
          />

          {/* Image caption */}
          <div
            className="
              absolute
              bottom-4
              left-4
              z-40
              rounded-full
              border
              border-white/15
              bg-black/60
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-white
              backdrop-blur-md
              sm:bottom-5
              sm:left-5
            "
          >
            Fresh scent. Less effort.
          </div>

        </div>


        {/* =================================================
            BENEFIT INTRO
        ================================================= */}

        <div className="mt-9 text-center">

          <p
            className="
              text-[13px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#C49A78]
            "
          >
            What changes when you use ScentMason
          </p>

        </div>


        {/* =================================================
            BENEFIT HIGHLIGHTS
        ================================================= */}

        <div
          className="
            mt-5
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
          "
        >

          {/* =================================================
              BENEFIT 1
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-4
              shadow-[0_10px_30px_rgba(0,0,0,0.16)]
              backdrop-blur-sm
              sm:p-5
            "
          >

            <div className="flex items-start gap-3">

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C49A78]/25
                  bg-[#C49A78]/10
                  text-[15px]
                  font-bold
                  text-[#C49A78]
                "
              >
                ✓
              </span>

              <div>

                <p className="text-[15px] font-bold text-white">
                  Fresh scent without the work
                </p>

                <p className="mt-1 text-[13.5px] leading-5.5 text-zinc-400">
                  Automatic fragrance release means you don't
                  have to remember to spray.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              BENEFIT 2
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-4
              shadow-[0_10px_30px_rgba(0,0,0,0.16)]
              backdrop-blur-sm
              sm:p-5
            "
          >

            <div className="flex items-start gap-3">

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C49A78]/25
                  bg-[#C49A78]/10
                  text-[15px]
                  font-bold
                  text-[#C49A78]
                "
              >
                ✓
              </span>

              <div>

                <p className="text-[15px] font-bold text-white">
                  No water. No mess.
                </p>

                <p className="mt-1 text-[13.5px] leading-5.5 text-zinc-400">
                  Uses pure fragrance oil, so there is no water
                  to refill or mix.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              BENEFIT 3
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-4
              shadow-[0_10px_30px_rgba(0,0,0,0.16)]
              backdrop-blur-sm
              sm:p-5
            "
          >

            <div className="flex items-start gap-3">

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C49A78]/25
                  bg-[#C49A78]/10
                  text-[15px]
                  font-bold
                  text-[#C49A78]
                "
              >
                ✓
              </span>

              <div>

                <p className="text-[15px] font-bold text-white">
                  Easy to move around
                </p>

                <p className="mt-1 text-[13.5px] leading-5.5 text-zinc-400">
                  Rechargeable power means you can place it
                  where you want it.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              BENEFIT 4
          ================================================= */}

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-4
              shadow-[0_10px_30px_rgba(0,0,0,0.16)]
              backdrop-blur-sm
              sm:p-5
            "
          >

            <div className="flex items-start gap-3">

              <span
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C49A78]/25
                  bg-[#C49A78]/10
                  text-[15px]
                  font-bold
                  text-[#C49A78]
                "
              >
                ✓
              </span>

              <div>

                <p className="text-[15px] font-bold text-white">
                  A more refined scent
                </p>

                <p className="mt-1 text-[13.5px] leading-5.5 text-zinc-400">
                  Cold-air diffusion helps fill your space with
                  a fine fragrance mist.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              BENEFIT 5
          ================================================= */}

          <div
            className="
              sm:col-span-2
              rounded-2xl
              border
              border-[#C49A78]/20
              bg-[#C49A78]/[0.07]
              p-4
              shadow-[0_12px_35px_rgba(0,0,0,0.20)]
              sm:p-5
            "
          >

            <div className="flex items-start justify-center gap-3 text-center">

              <span
                className="
                  mt-0.5
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C49A78]
                  text-[15px]
                  font-bold
                  text-[#0b0a09]
                "
              >
                ✦
              </span>

              <div>

                <p className="text-[15px] font-bold text-white sm:text-[16px]">
                  Bring that luxury-home feeling into your everyday space.
                </p>

                <p className="mt-1 text-[13.5px] leading-5.5 text-zinc-400">
                  Less spraying. Less hassle. Just a home that
                  smells beautiful.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}