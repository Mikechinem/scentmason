"use client";

const reviews = [
  {
    quote:
      "My room smells so good now. I don't even need to spray every day.",
    name: "Verified Customer",
    detail: "Home use",
  },
  {
    quote:
      "I bought one for my room first. I liked it so much that I got another one for the living room.",
    name: "Verified Customer",
    detail: "Home use",
  },
  {
    quote:
      "My visitors notice the smell when they come in. That is what I wanted.",
    name: "Verified Customer",
    detail: "Home use",
  },
];

export default function StorySocialProof() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#A67C00]">
            You're not the only one
          </p>

          <h2 className="mt-3 text-[32px] font-black leading-[1.08] tracking-[-0.025em] text-black sm:text-[46px]">
            Other ScentMason Owners
            <span className="block text-[#A67C00]">
              Love It Too.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[18px] font-medium leading-[1.5] text-black/65 sm:text-[20px]">
            A good smell is one thing.
            Not having to keep spraying is even better.
          </p>

        </div>

        {/* =====================================================
            REVIEWS
        ===================================================== */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">

          {reviews.map((review, index) => (
            <article
              key={index}
              className="rounded-3xl border border-black/[0.07] bg-[#f8f6f1] p-6 sm:p-7"
            >

              {/* Stars */}
              <div
                className="flex gap-1 text-[17px] text-[#A67C00]"
                aria-label="5 out of 5 stars"
              >
                ★★★★★
              </div>

              {/* Quote */}
              <blockquote className="mt-5 text-[17px] font-bold leading-[1.45] text-black">
                “{review.quote}”
              </blockquote>

              {/* Customer */}
              <div className="mt-6 border-t border-black/[0.07] pt-4">
                <p className="text-[14px] font-extrabold text-black">
                  {review.name}
                </p>

                <p className="mt-1 text-[13px] font-medium text-black/45">
                  {review.detail}
                </p>
              </div>

            </article>
          ))}

        </div>

        {/* =====================================================
            STORY → PROOF BRIDGE
        ===================================================== */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-black px-6 py-8 text-center text-white sm:px-10 sm:py-9">

          <p className="text-[22px] font-black leading-[1.25] sm:text-[28px]">
            Maybe that's why I ended up keeping mine.
          </p>

          <p className="mx-auto mt-3 max-w-xl text-[16px] font-medium leading-[1.5] text-white/60 sm:text-[18px]">
            Once you get used to walking into a fresh-smelling room,
            it is hard to go back.
          </p>

        </div>

      </div>
    </section>
  );
}