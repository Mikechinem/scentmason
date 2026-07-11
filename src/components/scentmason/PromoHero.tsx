import Image from "next/image";

export default function PromoHero() {
  return (
   <section className="relative w-full overflow-hidden bg-[#FAF7F2] px-4 py-8 sm:py-12 md:px-6">
      <div className="mx-auto flex w-full max-w-[650px] flex-col items-center text-center border-[3px] border-[#3B1F0E] bg-white p-5 sm:p-10 rounded-2xl shadow-xl overflow-hidden">

        {/* Top accent strip — gives the card a premium "framed" feel */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#3B1F0E] via-[#C17F4A] to-[#3B1F0E]" />

        {/* Pre-headline */}
        <p className="mt-4 text-[20px] font-medium leading-relaxed text-neutral-600 sm:text-[18px]">
          Your home already has everything else. Give it a scent your guests will always remember.
        </p>

        {/* Gold-framed headline */}
        <div className="mt-5 w-full border-[3px] border-[#C17F4A] bg-[#C17F4A]/5 p-5 sm:p-8 rounded-md shadow-inner">
          <h1 className="text-[24px] font-black leading-snug tracking-tight text-[#000000] sm:text-[34px] sm:leading-normal">
            Get The Smart Fragrance Machine For{" "}
            <span className="text-red-600">₦27,000</span> Today Only!
          </h1>

          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="text-[18px] font-medium text-black/40 line-through sm:text-[22px]">
              ₦45,000
            </span>
            <span className="text-[28px] font-extrabold text-[#000000] sm:text-[36px]">
              ₦27,000
            </span>
          </div>

          {/* Savings pill — red is now reserved exclusively for savings/urgency signals */}
          <div className="mt-3 flex justify-center">
            <span className="inline-block rounded-full bg-red-600 px-4 py-1 text-[13px] font-bold text-white sm:text-[14px]">
              You Save ₦18,000 Today
            </span>
          </div>
        </div>

        {/* Feature chips — moved out of red, now match brand brown for cohesion.
            Red is reserved for price/urgency only. */}
        <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-[#3B1F0E]/8 px-2.5 py-1 text-[18px] font-bold text-[#3B1F0E] sm:text-[18px]">
            🚫🔧 No drilling
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#3B1F0E]/8 px-2.5 py-1 text-[18px] font-bold text-[#3B1F0E] sm:text-[18px]">
            🚫🔌 No plugging in
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#3B1F0E]/8 px-2.5 py-1 text-[18px] font-bold text-[#3B1F0E] sm:text-[18px]">
            🚫🧠 No remembering
          </span>
        </div>

        <p className="mt-3 text-[18px] font-medium leading-relaxed text-black/70 sm:text-[18px]">
          This Aromatherapy Fragrance Machine runs itself for{" "}
          <span className="font-bold text-[#3B1F0E] underline decoration-[#C17F4A] decoration-2 underline-offset-2">
            60 days straight.
          </span>{" "}
          Your guests will always wonder how.
        </p>

        {/* Product image */}
        <div className="relative mt-7 w-full max-w-[440px] overflow-hidden rounded-xl bg-neutral-50 p-2 border border-neutral-100 shadow-sm">
          <Image
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/real%20image_handing.png?updatedAt=1780844410915"
            alt="ScentMason Smart Fragrance Machine — automatic aromatherapy diffuser"
            width={440}
            height={440}
            className="h-auto w-full rounded-lg object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur-sm text-[10px] font-bold text-white px-2.5 py-1 rounded uppercase tracking-wider">
            - 40% Today
          </div>
        </div>

        {/* CTA */}
        <div className="mt-7 w-full max-w-[420px]">
          <a
            href="#order-form-start"
            className="flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-4 text-center text-[17px] font-bold text-white shadow-md active:scale-[0.99] transition-transform sm:text-[18px]"
          >
            Claim My ₦27,000 Machine Now
          </a>

          {/* Trust row — split into separate chips instead of one run-on line, easier to scan */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="text-[11px] font-medium tracking-wide text-neutral-500 sm:text-[12px]">
              🔒 Pay On Delivery
            </span>
            <span className="text-[11px] font-medium tracking-wide text-neutral-500 sm:text-[12px]">
              🚚 Free Nationwide Delivery
            </span>
            <span className="text-[11px] font-bold tracking-wide text-red-600 sm:text-[12px]">
              ⏳ Promo Ends Soon
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}