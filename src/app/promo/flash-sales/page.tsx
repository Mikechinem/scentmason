import OrderFormPromo from "@/components/scentmason/OrderFormPromo";
import PromoBanner from "@/components/scentmason/PromoBanner";
import PromoHero from "@/components/scentmason/PromoHero";
import PricingOfferStack from "@/components/scentmason/PricingOfferStack";
import WhyAutomationSection from "@/components/scentmason/WhyAutomationSection";
import ScarcitySection from "@/components/scentmason/ScarcitySection";
import RiskReversalSection from "@/components/scentmason/RiskReversalSection";
import StickyMobileCTA from "@/components/scentmason/StickyMobileCTA";
import FAQSection2 from "@/components/scentmason/FAQSection2";
import ScrollReveal from "@/components/scentmason/ScrollReveal";
import PromoGallerySectionOne from "@/components/scentmason/PromoGallerySectionOne";
import PromoGallerySectionTwo from "@/components/scentmason/PromoGallerySectionTwo";
import GuestMagnetCard from "@/components/scentmason/GuestMagnetCard";


const testimonials = [
  {
    name: "Sefunmi",
    text: "Best purchase I've made this year! My guests always ask what I use, and it looks so fine sitting on my console table. Delivery was fast too.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womn_diff2.png",
  },
  {
    name: "Emeka Nwagbaraocha",
    text: "I bought one for my office and one for home. Odours are gone, and I honestly feel calmer during work. Pay on delivery made it easy for me.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff3.png",
  },
  {
    name: "Blessing Achebe",
    text: "I was skeptical about rechargeable diffusers but this one actually delivers. My bedroom smells incredible every night.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandif6.png",
  },
  {
    name: "Lydia Apat",
    text: "I've used other fragrance machines before, but this one is different. It's stronger, lasts longer, and even after months of use, the fragrance still comes out really well.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/woman_diff1.png",
  },
  {
    name: "Mrs Tolu Martins",
    text: "Simple setup, clean look, and the fragrance throw is strong without being overpowering. Worth every naira.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandiff4.png",
  },
  {
    name: "Benson Ode",
    text: "Ordered 2 sets for my apartment. Best decision — every room now smells consistent and clean.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff1.png",
  },
];

const whatsInside = [
  "1 ScentMason Diffuser Machine",
  "1 Signature Fragrance Oil",
  "1 No-Drill Wall Mount",
  "1 USB Charging Cable",
  "1 User Manual",
];

export default function FlashSalePromoPage() {
  return (
    <main className="bg-white text-black">
      <PromoBanner />
      <PromoHero />
      <ScrollReveal delay={100}>
     <PromoGallerySectionOne />   {/* problem/solution — right after hero, builds the case */}
         </ScrollReveal>

         <section>
         <GuestMagnetCard />
         </section>


      <ScrollReveal delay={100}>
        <PricingOfferStack />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <WhyAutomationSection />
      </ScrollReveal>

     {/* Compact social proof strip — kept light on purpose */}
      <section className="py-8 bg-[#000000]">
        <h2 className="px-4 text-center text-[28px] font-extrabold tracking-tight text-[#EFBF04] sm:text-[32px]">
          What Customers Are Saying
        </h2>

        <div className="mt-5 flex gap-3 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((review) => (
            <article
              key={review.name}
              className="w-[260px] shrink-0 rounded-xl border border-black/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-9 w-9 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="text-[16px] font-semibold leading-tight">
                    {review.name}
                  </p>
                  <p className="text-[11px] font-medium text-black/50">
                    Verified Buyer
                  </p>
                </div>
              </div>
              <p className="mt-2 text-[13px] font-semibold text-amber-500">
                ★★★★★
              </p>
              <p className="mt-1.5 text-[14px] font-medium leading-5 text-black/80">
                {review.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <ScrollReveal delay={100}>
  <PromoGallerySectionTwo />   {/* use-cases — after they understand the value, show where it fits their life */}
</ScrollReveal>

      {/* Order Form Section */}
      <ScrollReveal delay={100}>
        <section id="order-form-start" className="px-4 py-10">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="text-center">
              <p className="text-[13px] font-extrabold uppercase tracking-wider text-red-600">
                Promo Price Ends Today.
              </p>
              <h2 className="mt-2 text-[22px] font-bold tracking-tight text-[#BF9903] sm:text-[24px]">
                Fill This Order Form Below — Your Promo Price Is Locked The Moment You
                Submit
              </h2>
              <p className="mx-auto mt-3 max-w-[420px] text-[14px] font-medium text-black/60 sm:text-[15px]">
                A ScentMason rep calls to confirm your order before dispatch.
                No card needed, no upfront payment.
              </p>
            </div>

          <section className="mt-5">
              <RiskReversalSection />
            </section>
             
             {/* Unboxing Video Section */}
      <section className="mt-10 px-4 py-16 text-center max-w-4xl mx-auto bg-black">
      <h2 className="text-[32px] font-black tracking-tight text-white sm:text-[42px]">See It In Action</h2>
<p className="mt-2 text-[14px] font-medium tracking-wide text-white/60 sm:text-[15px]">
  Play the video
</p>
<div className="video-arrow-blink mt-1 text-[32px] font-black text-red-600 sm:text-[40px]">
  ↓
</div>

<style
  dangerouslySetInnerHTML={{
    __html: `
      @keyframes videoArrowBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.15; }
      }
      .video-arrow-blink {
        animation: videoArrowBlink 1s ease-in-out infinite;
      }
    `,
  }}
/>
        <div className="mx-auto mt-8 w-full max-w-[560px] overflow-hidden rounded-2xl border-4 border-[#3B1F0E]/40 bg-black shadow-2xl">
          <video
            controls
            poster="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd_image_dark.png?updatedAt=1780838530529"
            className="h-auto w-full"
          >
            <source src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffus_unbox_woman.MOV/ik-video.mp4?updatedAt=1781957688695" type="video/mp4" />
          </video>
        </div>
      </section>


      {/* What's inside */}
      <section className="px-4 py-16 bg-white text-black border-y border-[#3B1F0E]/20">
        <h2 className="text-[32px] font-black tracking-tight text-black sm:text-[42px] text-center">
          What Is Inside Your Order?
        </h2>

        <div className="mx-auto mt-8 w-full max-w-[480px] overflow-hidden rounded-2xl border-2 border-[#3B1F0E] shadow-2xl">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/unbox_real.png?updatedAt=1781023129314"
            alt="Everything that comes inside your ScentMason package order"
            className="h-auto w-full object-cover"
          />
        </div>

        <ul className="mx-auto mt-8 max-w-[480px] space-y-3 text-left">
          {whatsInside.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-[#3B1F0E]/20 bg-neutral-50 px-6 py-5 text-[20px] font-black text-black flex items-center gap-4 shadow-sm"
            >
              <span className="text-[#3B1F0E] text-[22px]">✔</span> {item}
            </li>
          ))}
        </ul>
      </section>


             <ScarcitySection />
            <div className="mt-2 rounded-2xl border-2 border-[#bff0d4] p-4">
              
              <OrderFormPromo />
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section>
        <FAQSection2 />
      </section>

      {/* Contact Section */}
      <ScrollReveal delay={100}>
        <section className="mx-4 my-10 rounded-[2rem] bg-[#FAF7F2] px-6 py-10 text-center ring-1 ring-black/5 sm:mx-10 sm:px-10 sm:py-14">
          <p className="mx-auto max-w-2xl text-[24px] font-semibold leading-[1.3] text-[#000000] sm:text-[26px]">
            For more enquiries, call us on{" "}
            <a
              href="tel:07064969603"
              className="inline-block font-black underline decoration-[#3B1F0E]/30 underline-offset-4"
            >
              0706 496 9603
            </a>
          </p>
        </section>
      </ScrollReveal>

      {/* Facebook Disclaimer */}
      <p className="mx-auto max-w-[720px] px-4 pb-24 text-center text-[11px] font-medium leading-5 text-black/40 sm:pb-14">
        This site is not part of the Facebook website, Facebook Inc, the
        Google website, or Alphabet Inc, and is not endorsed by Facebook or
        Google in any way. FACEBOOK and GOOGLE are trademarks of Facebook Inc
        and Alphabet Inc respectively.
      </p>

      <StickyMobileCTA />
    </main>
  );
}