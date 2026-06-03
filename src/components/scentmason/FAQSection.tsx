import { faqs } from "@/data/scentmason";

export default function FAQSection() {
  return (
    <section className="bg-[var(--surface)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-xs font-black text-[var(--accent)]">
            Questions Before You Order
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1] tracking-tight text-[var(--primary)]">
            Still wondering if ScentMason is right for your home?
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
            Here are the common questions people ask before placing their order.
          </p>
        </div>

        <div className="mt-7 space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              open={index === 0}
              className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--background)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left">
                <span className="text-base font-black leading-6 text-[var(--primary)]">
                  {faq.question}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-lg font-black text-[var(--primary)] group-open:hidden">
                  +
                </span>

                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-lg font-black text-white group-open:flex">
                  −
                </span>
              </summary>

              <div className="border-t border-[var(--border)] px-5 py-5">
                <p className="text-[15px] font-medium leading-7 text-[var(--text-muted)]">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-7 rounded-3xl bg-[var(--primary)] p-5">
          <p className="text-base font-black leading-7 text-white">
            Still unsure? Submit your order request first. A sales rep will
            confirm your details before dispatch.
          </p>
        </div>
      </div>
    </section>
  );
}