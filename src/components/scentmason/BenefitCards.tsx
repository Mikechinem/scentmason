import { benefits } from "@/data/scentmason";

export default function BenefitCards() {
  return (
    <section className="bg-[var(--background)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="mb-8">
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black text-[var(--accent)]">
            Where It Works
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1] tracking-tight text-[var(--primary)]">
            One diffuser. Different rooms. Same “your house smells so good” effect.
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
            ScentMason is made for the everyday spaces Chioma cares about — the room she sleeps in, the living room guests enter, and the corners that should never smell forgotten.
          </p>
        </div>

        <div className="space-y-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--background)] text-2xl">
                {benefit.icon}
              </div>

              <h3 className="text-xl font-black text-[var(--primary)]">
                {benefit.title}
              </h3>

              <p className="mt-3 text-[15px] font-medium leading-7 text-[var(--text-muted)]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
