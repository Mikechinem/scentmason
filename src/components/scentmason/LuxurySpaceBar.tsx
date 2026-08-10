"use client";

export default function LuxurySpaceBar() {
  return (
    <section
      className="
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-white
        py-8

        sm:py-10

        lg:py-12
      "
      aria-hidden="true"
    >
      {/* Decorative line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-[#1e1008]/10" />

      {/* Center transition mark */}
      <div
        className="
          relative
          z-10
          flex
          h-10
          w-20
          items-center
          justify-center
          bg-white
        "
      >
        <span
          className="
            text-[24px]
            font-light
            leading-none
            tracking-[-0.08em]
            text-[#1e1008]
          "
        >
          ↓
        </span>
      </div>
    </section>
  );
}