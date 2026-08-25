// components/StickyOrderBar.tsx

"use client";

export default function StickyOrderBar() {
  return (
    <div
      className="
        fixed
        left-0
        right-0
        top-0
        z-[9999]
        w-full
        border-b
        border-[#A67C00]/20
        bg-[#11100e]/95
        shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[58px]
          w-full
          max-w-[1400px]
          items-center
          justify-between
          px-4

          sm:h-[64px]
          sm:px-6

          lg:px-10
        "
      >
        {/* PAYMENT ON DELIVERY */}

        <div className="flex items-center gap-2">
          <span
            className="
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-[#198754]
              text-[11px]
              font-extrabold
              text-white
            "
          >
            ✓
          </span>

          <span
            className="
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.08em]
              text-white

              sm:text-[12px]
            "
          >
            Payment on Delivery
          </span>
        </div>

        {/* ORDER NOW */}

        <a
          href="#order-form-start"
          className="
            flex
            min-h-[40px]
            items-center
            justify-center
            rounded-lg
            bg-[#A67C00]
            px-5
            text-[12px]
            font-extrabold
            uppercase
            tracking-[0.06em]
            text-white
            shadow-[0_6px_18px_rgba(166,124,0,0.25)]
            transition-all
            duration-200
            hover:bg-[#8f6a00]
            active:scale-[0.98]

            sm:min-h-[44px]
            sm:px-7
            sm:text-[13px]
          "
        >
          ORDER NOW
        </a>
      </div>
    </div>
  );
}