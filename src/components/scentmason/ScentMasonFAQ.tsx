"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Will ScentMason really keep my space smelling fresh without me spraying?",
    answer:
      "Yes. ScentMason releases fragrance automatically according to the setting you choose, so you do not need to keep picking up a spray can throughout the day.",
  },
  {
    question: "Does it need to stay plugged into a socket?",
    answer:
      "No. ScentMason is rechargeable. A full charge takes about 2 hours and can last up to 60 days depending on your settings and usage.",
  },
  {
    question: "How long does the 80ml fragrance oil last?",
    answer:
      "One 80ml bottle lasts about 1 and half months based on the normal usage benchmark. You can also add extra bottles when placing your order if you want to keep your fragrance supply ready.",
  },
  {
    question: "How does payment and delivery work?",
    answer:
      "Place your order online and a ScentMason customer care representative will call to confirm your details before dispatch. Delivery is free, and you pay when your order arrives.",
  },

  {
    question: "What fragrance oil comes with the diffuser?",
    answer:
      "Each set comes with one premium aromatherapy oil carefully selected for its calming, air-purifying properties..",
  },

   {
    question: "How do i buy another fragrance oil to refil?",
    answer:
      "You just message us on whatsapp to buy another oil.",
  },
];

export default function ScentMasonFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#FAF7F2] px-4 py-14">
      <div className="mx-auto w-full max-w-[650px]">
        <div className="text-center">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.18em] text-[#A27B5C]">
            Before You Order
          </p>
          <h2 className="mt-2 text-[29px] font-extrabold leading-tight tracking-tight text-black sm:text-[36px]">
            Questions You May Have
          </h2>
          <p className="mx-auto mt-3 max-w-[520px] text-[17px] leading-6 text-black/65">
            Here are the important things to know before placing your order.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.question} className="overflow-hidden rounded-xl border border-black/10 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="text-[17px] font-bold leading-6 text-black sm:text-[18px]">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-[22px] font-medium transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-black/5 px-5 pb-5 pt-4">
                    <p className="text-[16px] font-medium leading-7 text-black/70 sm:text-[17px]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
