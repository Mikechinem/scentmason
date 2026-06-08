import { heroSlides } from "@/data/scentmason";
import { SECTION_IDS } from "@/lib/constants";
import CTAButton from "@/components/shared/CTAButton";
import TrustBadges from "@/components/scentmason/TrustBadges";

const heroImage = heroSlides[0];

export default function HeroCarousel() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pb-10 pt-3">
      <div className="mx-auto w-full max-w-[430px]">
        <nav className="mb-4 flex items-center justify-between gap-3 rounded-full border border-[#E7DED3] bg-white px-2.5 py-2 shadow-soft">
          <a href="/" className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3B1F0E] text-sm font-black text-white">
              SM
            </div>

            <div className="min-w-0 leading-none">
              <p className="truncate text-[15px] font-black text-[#3B1F0E]">
                ScentMason
              </p>
              <p className="mt-0.5 truncate text-[11px] font-bold text-[#6B5A4A]">
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

        <div className="relative overflow-hidden rounded-[2.25rem] border border-[#E7DED3] bg-white p-3 shadow-soft">
          <div className="pointer-events-none absolute inset-x-5 top-24 h-80 rounded-full bg-[#F6D7A7] opacity-30 blur-3xl" />

          <div className="relative">
            <div className="mb-3 inline-flex rounded-full border border-[#E7DED3] bg-[#FAF7F2] px-4 py-2 text-[15px] font-black text-[#C17F4A]">
              The Automatic Fragrance Machine
            </div>

    <h1 className="text-balance text-[2.6rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-black">
  Bring That{" "}
  <span className="font-extrabold text-black">
    Iconic Hotel Scent
  </span>{" "}
  Into Every Corner of Your Home and Office
</h1>

            <p className="mt-4 text-[19px] font-medium leading-9 text-[#6B5A4A]">
              <span className="bg-[linear-gradient(transparent_48%,#F6D7A7_48%)] px-1 font-bold text-black">
                No wall drilling, no remembering to spray every time, and no
                everyday fragrance stress.
              </span>
            </p>

            <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#E7DED3] bg-[#FAF7F2] p-2 shadow-soft">
              <div className="relative">
                <div className="absolute left-4 top-4 z-20 rounded-full bg-white px-3 py-2 text-xs font-black text-black shadow-soft">
                  Rechargeable · No Drill · Auto Spray
                </div>

                <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#F2EDE4]">
                  <img
                    src={heroImage.image}
                    alt={heroImage.imageAlt}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#E7DED3] pt-4">
              <TrustBadges />
            </div>

            <div className="mt-5 flex w-full flex-col gap-3">
              <CTAButton
                href={`#${SECTION_IDS.howItWorks}`}
                variant="ghost"
                className="w-full bg-white text-base text-black"
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