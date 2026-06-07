import { howItWorks } from "@/data/scentmason";
import { SECTION_IDS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section id={SECTION_IDS.howItWorks} className="bg-[var(--surface)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="mb-8">
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[15px] font-black text-[var(--accent)]">
            How It Works
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1.08] tracking-[-0.01em] text-[var(--primary)]">
            Mount it. Set it. Forget it.
          </h2>

          <p className="mt-5 text-[19px] font-medium leading-9 text-[var(--text-muted)]">
            No complicated setup. No app. No WiFi. No drilling. Just a simple automatic diffuser that keeps your room smelling intentional.
          </p>
        </div>

        <div className="space-y-4">
          {howItWorks.map((step, index) => (
            <div key={step.id} className="relative rounded-3xl border border-[var(--border)] bg-[var(--background)] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-base font-black text-[var(--background)]">
                  {index + 1}
                </div>

                <p className="text-[13px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">
                  {step.step}
                </p>
              </div>

              <h3 className="text-[1.65rem] font-black leading-[1.1] tracking-[-0.01em] text-[var(--primary)]">
                {step.title}
              </h3>

              <p className="mt-3 text-[18px] font-medium leading-8 text-[var(--text-muted)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-[var(--primary)] p-5">
          <p className="text-[19px] font-black leading-8 text-[var(--background)]">
            You set the speed once. It keeps doing the work in the background.
          </p>
        </div>
      </div>
    </section>
  );
}