import PseudoRotationViewer from "@/components/scentmason/Pseudorotationviewer";
import LuxuryLifestyleGallery from "@/components/scentmason/Luxurylifestylegallery";
import HotspotLifestyleSection from "@/components/scentmason/Hotspotlifestylesection";
import OrderFormPromo from "@/components/scentmason/OrderFormPromo";

export default function Luxury3DPage() {
  return (
    <main className="bg-zinc-950 text-white">
      {/* Hero — id required by StickyCTABar's IntersectionObserver */}
      <section id="luxury-hero" className="px-4 pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Automatic Fragrance Machine
        </p>
        <h1 className="mx-auto mt-6 max-w-[600px] text-[42px] font-medium leading-[1.05] tracking-tight text-white sm:text-[56px] md:text-[68px]">
          Engineered for the modern home.
        </h1>
        <p className="mx-auto mt-6 max-w-[440px] text-[16px] font-normal leading-relaxed tracking-wide text-zinc-400 md:text-[18px]">
          No drilling. No plugging in. No remembering. Sixty days of quiet,
          automatic fragrance.
        </p>

        <div className="mt-16 md:mt-20">
          <PseudoRotationViewer />
        </div>

        <a
          href="#order-form-start"
          className="mt-14 inline-block rounded-sm bg-white px-8 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-zinc-900 transition-transform duration-500 ease-out hover:scale-[1.02] md:mt-16"
        >
          Claim ₦27,000 Offer
        </a>
      </section>

      {/* Lifestyle gallery — luxury spacing, alternating captions */}
      <LuxuryLifestyleGallery />

      {/* Hotspot section — no-drill mount callout */}
      <HotspotLifestyleSection />

      {/* Value statement — big bold typography moment */}
      <section className="px-4 py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-[640px] text-[32px] font-medium leading-[1.15] tracking-tight text-white sm:text-[44px] md:text-[52px]">
          Set it once.
          <br />
          <span className="text-zinc-500">Forget it for sixty days.</span>
        </h2>
      </section>

      {/* Pricing + order form — light card floating on dark background,
          consistent with luxury e-commerce contrast conventions */}
      <section id="order-form-start" className="px-4 py-24 md:py-32">
        <div className="mx-auto max-w-[480px] rounded-sm bg-white p-6 text-zinc-900 sm:p-8">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">
            Limited-time offer
          </p>
          <p className="mt-3 text-center text-[32px] font-medium tracking-tight text-zinc-900">
            ₦27,000
          </p>
          <p className="mt-1 text-center text-[13px] font-medium text-zinc-500">
            Free nationwide delivery · Pay on delivery
          </p>

          <div className="mt-8">
            <OrderFormPromo />
          </div>
        </div>
      </section>
    </main>
  );
}