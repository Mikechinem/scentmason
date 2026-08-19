"use client";

export default function RiskOff() {
  return (
    <section
      aria-labelledby="riskoff-heading"
      className="relative overflow-hidden rounded-3xl border border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50 px-5 py-7 shadow-[0_12px_40px_rgba(127,29,29,0.12)] sm:px-8 sm:py-9"
    >
      {/* Decorative background elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-200/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-red-200/30 blur-3xl"
      />

      <div className="relative z-10">
        {/* Section intro */}
        <div className="mx-auto mb-7 max-w-2xl text-center">
          <div className="mb-3 inline-flex items-center rounded-full border border-red-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-red-700 shadow-sm">
            Shop With Confidence
          </div>

          <h2
            id="riskoff-heading"
            className="text-2xl font-black leading-tight tracking-tight text-gray-950 sm:text-3xl"
          >
            Your Order Is{" "}
            <span className="text-red-700">Risk-Free</span>
          </h2>

          <p className="mt-2 text-lg leading-6 text-gray-600 sm:text-base">
            We want you to feel completely confident placing your order.
          </p>
        </div>

        {/* Two-column benefits */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Money-back guarantee */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-100 via-yellow-50 to-white p-5 shadow-sm sm:p-6">
            <div
              aria-hidden="true"
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-300/30 blur-2xl"
            />

            <div className="relative flex flex-col items-center text-center">
              {/* CSS guarantee badge */}
              <div
                aria-hidden="true"
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-amber-500 bg-white shadow-[0_8px_25px_rgba(180,83,9,0.2)]"
              >
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-dashed border-amber-400">
                  <span className="text-2xl leading-none">✓</span>
                  <span className="mt-1 text-[8px] font-black uppercase tracking-wider text-amber-800">
                    90 Days
                  </span>
                </div>
              </div>

              <h3 className="max-w-md text-lg font-black leading-snug text-gray-950 sm:text-xl">
                100% RISK-FREE PURCHASE MONEY-BACK GUARANTEE
              </h3>

              <p className="mt-3 text-base font-medium leading-6 text-red-700">
                Money back if you don't like the product.
              </p>

              <div className="mt-3 inline-flex items-center rounded-full bg-amber-500 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-sm">
                90-Day Guarantee
              </div>
            </div>
          </div>

          {/* Delivery + payment */}
          <div className="grid gap-4">
            {/* Free delivery */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600 to-red-800 text-3xl shadow-md"
              >
                🚚
              </div>

              <div>
                <h3 className="text-base font-black uppercase tracking-wide text-gray-950">
                  FREE DELIVERY
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  Nationwide delivery
                </p>
              </div>
            </div>

            {/* Payment on delivery */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-3xl shadow-md"
              >
                💵
              </div>

              <div>
                <h3 className="text-base font-black uppercase tracking-wide text-gray-950">
                  PAYMENT ON DELIVERY
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  Pay when your order arrives
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order readiness warning */}
        <div className="mt-5 rounded-2xl border-2 border-red-300 bg-red-50 p-5 shadow-sm sm:p-6">
          <div className="flex gap-4">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-700 text-lg font-black text-white shadow-md"
            >
              !
            </div>

            <div>
              <h3 className="text-base font-black leading-tight text-red-900 sm:text-lg">
                PLEASE ORDER ONLY IF YOU’RE READY TO RECEIVE IT
              </h3>

              <p className="mt-2 text-lg leading-6 text-red-900/80 sm:text-base">
                Failed deliveries cost us heavily. After filling the form,
                please click{" "}
                <strong className="font-black">“I WILL ACCEPT”</strong> to
                confirm you’re ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}