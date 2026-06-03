import { painPoints, painSection } from "@/data/scentmason";

export default function PainSection() {
  return (
    <section className="bg-[var(--background)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="mb-8">
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black text-[var(--accent)]">
            {painSection.eyebrow}
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1] tracking-tight text-[var(--primary)]">
            {painSection.headline}
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
            {painSection.subheadline}
          </p>
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

              <p className="text-[15px] font-bold leading-7 text-[var(--text-main)]">
                {pain.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-[var(--primary)] p-5">
          <p className="text-lg font-black leading-7 text-[var(--background)]">
            {painSection.transition}
          </p>
        </div>
      </div>
    </section>
  );
}
