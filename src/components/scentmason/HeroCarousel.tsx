import { heroSlides } from "@/data/scentmason";
import { SECTION_IDS } from "@/lib/constants";
import CTAButton from "@/components/shared/CTAButton";
import TrustBadges from "@/components/scentmason/TrustBadges";

const heroImage = heroSlides[0];

export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-4 pb-10 pt-3">
      <div className="mx-auto w-full max-w-[430px]">
        <nav className="mb-4 flex items-center justify-between gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 shadow-soft">
          <a href="/" className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-black text-white">
              SM
            </div>

            <div className="min-w-0 leading-none">
              <p className="truncate text-[15px] font-black text-[var(--primary)]">
                ScentMason
              </p>
              <p className="mt-0.5 truncate text-[11px] font-bold text-[var(--text-muted)]">
                Delighting life with scent
              </p>
            </div>
          </a>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
            </span>

            <span className="text-xs font-black text-green-700">
              2,600+ Sold
            </span>
          </div>
        </nav>

        <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-soft">
          <div className="pointer-events-none absolute inset-x-5 top-24 h-80 rounded-full bg-[var(--accent-soft)] opacity-45 blur-3xl" />

          <div className="relative">
            <div className="mb-3 inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-[15px] font-black text-[var(--accent)]">
              The Automatic Fragrance Machine
            </div>

            <h1 className="text-balance text-[2.6rem] font-black leading-[1.08] tracking-[-0.01em] text-[var(--primary)]">
              Bring the iconic hotel smell into every corner of your home and office
            </h1>

          <p className="mt-4 text-[19px] font-medium leading-9 text-[var(--text-muted)]">
  <span className="bg-[linear-gradient(transparent_48%,#F6D7A7_48%)] px-1 font-bold text-[var(--primary)]">
    No wall drilling, no remembering to spray every time, and no everyday
    fragrance stress.
  </span>
</p>
            <div className="mt-6 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--background)] p-2 shadow-soft">
              <div className="relative">
                <div className="absolute left-4 top-4 z-20 rounded-full bg-[var(--background)] px-3 py-2 text-xs font-black text-[var(--primary)] shadow-soft">
                  Rechargeable · No Drill · Auto Spray
                </div>

                <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
                  <img
                    src={heroImage.image}
                    alt={heroImage.imageAlt}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <TrustBadges />
            </div>

            <div className="mt-5 flex w-full flex-col gap-3">
              <CTAButton
                href={`#${SECTION_IDS.howItWorks}`}
                variant="ghost"
                className="w-full bg-[var(--background)] text-base"
              >
                See How It Works
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}