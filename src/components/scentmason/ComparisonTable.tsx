import { comparisonImages } from "@/data/scentmason";

export default function ComparisonTable() {
  return (
    <section className="bg-black px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[15px] font-black text-[var(--accent-soft)]">
            Why It Feels Different
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1.08] tracking-[-0.01em] text-white">
            This is not another air freshener you have to babysit.
          </h2>

          <p className="mt-5 text-[19px] font-medium leading-9 text-white/70">
            ScentMason’s Automatic Fragrance Machine is built for people who
            want their home to smell ready without spraying, plugging in, or
            constantly checking if the scent has faded.
          </p>
        </div>

        <div className="mt-8 space-y-10">
          {comparisonImages.map((item) => (
            <div key={item.id}>
              <div>
                <p className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[15px] font-black text-[var(--accent-soft)]">
                  {item.eyebrow}
                </p>

                <h3 className="text-[1.85rem] font-black leading-[1.1] tracking-[-0.01em] text-white">
                  {item.headline}
                </h3>

                <p className="mt-4 text-[19px] font-medium leading-9 text-white/70">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-2 shadow-soft">
                <div className="overflow-hidden rounded-[1.5rem] bg-white/5">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5">
          <p className="text-[19px] font-black leading-8 text-white">
            The real difference is simple: ScentMason’s Automatic Fragrance
            Machine is not something you remember to use. It is something you
            set once and let it work.
          </p>
        </div>
      </div>
    </section>
  );
}