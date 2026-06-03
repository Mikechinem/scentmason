import { heroSlides } from "@/data/scentmason";
import { SECTION_IDS } from "@/lib/constants";
import CTAButton from "@/components/shared/CTAButton";
import TrustBadges from "@/components/scentmason/TrustBadges";

export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden bg-[var(--background)] px-4 pb-10 pt-3">
      <style>{`
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateY(10px);
          pointer-events: none;
          animation: heroAutoRotate 15s infinite;
        }

        .hero-slide-1 {
          animation-delay: 0s;
        }

        .hero-slide-2 {
          animation-delay: 5s;
        }

        .hero-slide-3 {
          animation-delay: 10s;
        }

        .hero-image-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: var(--primary);
          opacity: 0;
          pointer-events: none;
          animation: heroDarkFlash 15s infinite;
        }

        .hero-slide-1 .hero-image-wrap::after {
          animation-delay: 0s;
        }

        .hero-slide-2 .hero-image-wrap::after {
          animation-delay: 5s;
        }

        .hero-slide-3 .hero-image-wrap::after {
          animation-delay: 10s;
        }

        @keyframes heroAutoRotate {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }

          4% {
            opacity: 1;
            transform: translateY(0);
          }

          29% {
            opacity: 1;
            transform: translateY(0);
          }

          33% {
            opacity: 0;
            transform: translateY(-8px);
          }

          100% {
            opacity: 0;
            transform: translateY(-8px);
          }
        }

        @keyframes heroDarkFlash {
          0% {
            opacity: 0;
          }

          28% {
            opacity: 0;
          }

          30.5% {
            opacity: 0.92;
          }

          33% {
            opacity: 0;
          }

          100% {
            opacity: 0;
          }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[430px]">
        <nav className="mb-4 flex items-center justify-between gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 shadow-soft">
          <a href="/" className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-[11px] font-black text-white">
              SM
            </div>

            <div className="min-w-0 leading-none">
              <p className="truncate text-xs font-black text-[var(--primary)]">
                ScentMason
              </p>
              <p className="mt-0.5 truncate text-[9px] font-bold text-[var(--text-muted)]">
                Delighting life with scent
              </p>
            </div>
          </a>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" />
            </span>

            <span className="text-[10px] font-black text-green-700">
              2,400+ Sold
            </span>
          </div>
        </nav>

        <div className="relative overflow-hidden rounded-[2.25rem] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-soft">
          <div className="pointer-events-none absolute inset-x-5 top-24 h-80 rounded-full bg-[var(--accent-soft)] opacity-45 blur-3xl" />

          <div className="relative min-h-[735px] sm:min-h-[755px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero-slide hero-slide-${index + 1}`}
              >
                <div className="mb-3 inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-xs font-black text-[var(--accent)]">
                  {slide.eyebrow}
                </div>

                <h1 className="text-balance text-[2.42rem] font-black leading-[0.95] tracking-tight text-[var(--primary)]">
                  {slide.headline}
                </h1>

                <p className="mt-4 text-base leading-7 text-[var(--text-muted)]">
                  {slide.subheadline}
                </p>

                <div className="mt-6 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--background)] p-2 shadow-soft">
                  <div className="relative">
                    <div className="absolute left-4 top-4 z-20 rounded-full bg-[var(--background)] px-3 py-2 text-[10px] font-black text-[var(--primary)] shadow-soft">
                      Rechargeable · No Drill · Auto Spray
                    </div>

                    <div className="absolute right-4 top-4 z-20 rounded-full bg-[var(--primary)] px-3 py-2 text-[10px] font-black text-white shadow-soft">
                      {index + 1}/{heroSlides.length}
                    </div>

                    <div className="hero-image-wrap relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-1 border-t border-[var(--border)] pt-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-center">
                <p className="text-base">🚚</p>
                <p className="mt-1 text-[9px] font-black leading-tight text-[var(--primary)]">
                  2–3 Days Delivery
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-center">
                <p className="text-base">🔋</p>
                <p className="mt-1 text-[9px] font-black leading-tight text-[var(--primary)]">
                  60-Day Battery
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] px-3 py-3 text-center">
                <p className="text-base">🛡️</p>
                <p className="mt-1 text-[9px] font-black leading-tight text-[var(--primary)]">
                  30-Day Guarantee
                </p>
              </div>
            </div>

            <div className="mt-5 flex w-full flex-col gap-3">
              <CTAButton
                href={`#${SECTION_IDS.howItWorks}`}
                variant="ghost"
                className="w-full bg-[var(--background)]"
              >
                See How It Works
              </CTAButton>
            </div>

            <div className="mt-5 border-t border-[var(--border)] pt-4">
              <TrustBadges />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}