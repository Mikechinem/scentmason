import { fulfilmentTrust } from "@/data/scentmason";

export default function FulfilmentTrust() {
  return (
    <section className="bg-[var(--primary)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="mb-6 rounded-[2rem] border border-[#F6D7A7]/40 bg-[#F6D7A7] p-5 text-center shadow-soft">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-[var(--primary)] shadow-soft">
            <span className="text-4xl">🛡️</span>
          </div>

          <p className="text-[13px] font-black uppercase tracking-[0.18em] text-[var(--primary)]">
            Your Money Won't go to Waste
          </p>

          <h3 className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.02em] text-[var(--primary)]">
            Your Order Is Confirmed Before Dispatch
          </h3>

          <p className="mt-3 text-[17px] font-extrabold leading-7 text-[var(--primary)]">
            Wrong item, faulty product, or delivery issue? Our support process
            helps you get attended to without stress.
          </p>
        </div>

      <div className="mt-6 rounded-[1.9rem] border-2 border-[#F6D7A7] bg-white p-5 shadow-[0_0_0_6px_rgba(246,215,167,0.18)]">
  <p className="mb-3 text-[12px] font-black uppercase tracking-[0.18em] text-[#C17F4A]">
    Protected Order Process
  </p>

  <h2 className="text-[2.35rem] font-black leading-[1.04] tracking-[-0.025em] text-[var(--primary)]">
    {fulfilmentTrust.headline}
  </h2>

  <p className="mt-5 text-[21px] font-black leading-9 text-[var(--text-muted)]">
    {fulfilmentTrust.description}
  </p>
</div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {fulfilmentTrust.points.map((point) => (
            <div
              key={point}
              className="flex min-h-20 items-center justify-center rounded-2xl border border-white/15 bg-white/10 p-3 text-center"
            >
              <p className="text-sm font-black leading-6 text-white">
                {point}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[#F6D7A7]/40 bg-white/10 p-2 shadow-soft">
          <div className="overflow-hidden rounded-[1.5rem] bg-white/10">
            <img
              src={fulfilmentTrust.image}
              alt={fulfilmentTrust.imageAlt}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}