import { productIntro } from "@/data/scentmason";

export default function ProductIntro() {
  return (
    <section className="bg-[var(--surface)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-xs font-black text-[var(--accent)]">
            {productIntro.eyebrow}
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1] tracking-tight text-[var(--primary)]">
            {productIntro.headline}
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
            {productIntro.description}
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--background)] p-2 shadow-soft">
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
            <img
              src={productIntro.image}
              alt={productIntro.imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-[var(--background)] p-3 text-center">
            <p className="text-lg">🔋</p>
            <p className="mt-1 text-[10px] font-black leading-tight text-[var(--primary)]">
              Rechargeable
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--background)] p-3 text-center">
            <p className="text-lg">🔩</p>
            <p className="mt-1 text-[10px] font-black leading-tight text-[var(--primary)]">
              No Drilling
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--background)] p-3 text-center">
            <p className="text-lg">💨</p>
            <p className="mt-1 text-[10px] font-black leading-tight text-[var(--primary)]">
              Auto Spray
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}