import { painPoints, painSection } from "@/data/scentmason";

export default function PainSection() {
  return (
    <section className="bg-[var(--background)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="mb-8">
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[15px] font-black text-[var(--accent)]">
            {painSection.eyebrow}
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1.08] tracking-[-0.01em] text-[var(--primary)]">
            {painSection.headline}
          </h2>

          <p className="mt-5 text-[19px] font-medium leading-9 text-[var(--text-muted)]">
            {painSection.subheadline}
          </p>
        </div>

        <div className="mb-7 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-soft">
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
            <img
              src={painSection.image}
              alt={painSection.imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="mt-3 rounded-3xl bg-[var(--background)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
              The everyday scent problem
            </p>

            <p className="mt-1 text-[1.35rem] font-black leading-[1.12] tracking-[-0.01em] text-[var(--primary)]">
              The room can smell fine now… then feel heavy again later.
            </p>

            <p className="mt-2 text-[17px] font-medium leading-8 text-[var(--text-muted)]">
              That is why relying on memory, spray cans, candles, or plug
              sockets can become stressful.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {painPoints.map((pain) => (
            <div
              key={pain.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--background)] text-xl">
                {pain.emoji}
              </div>

              <p className="text-[18px] font-bold leading-8 text-[var(--text-main)]">
                {pain.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-[var(--primary)] p-5">
          <p className="text-[19px] font-black leading-8 text-white">
            {painSection.transition}
          </p>
        </div>
      </div>
    </section>
  );
}