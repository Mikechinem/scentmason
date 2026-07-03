import OrderForm4 from "@/components/scentmason/OrderForm4";
import ScrollReveal from "@/components/scentmason/ScrollReveal";
import DiffuserGraveyard from "@/components/scentmason/DiffuserGraveyard";
import HeroGallery from "@/components/scentmason/HeroGallery";

const useCases = [
  "Bedroom",
  "Living room",
  "Office",
  "Hotel room",
  "Salon",
  "Shop counter",
];

const whatsInside = [
  "1 ScentMason Diffuser Machine",
  "1 Signature Fragrance Oil",
  "1 No-Drill Wall Mount",
  "1 USB Charging Cable",
  "1 User Manual",
];

const whyLove = [
  "Rechargeable — one single charge lasts more than a month, even through regular power outages.",
  "Set & forget — it automatically sprays on its own schedule, no need to ever remember it.",
  "No-drill mount — sticks firmly with the included heavy-duty mount, no drilling your beautiful walls.",
];

const testimonials = [
  {
    name: "Lydia Apat",
    text: "I’ve used other fragrance machines before, but this one is completely different. It’s stronger, lasts longer, and even after months of daily use, the luxury fragrance still comes out perfectly.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/woman_diff1.png",
  },
  {
    name: "Emeka Nwagbaraocha",
    text: "I bought one for my private office and one for my home. All bad odours are gone, and I honestly feel much calmer during work. Pay on delivery made the transaction completely stress-free.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff3.png",
  },
  {
    name: "Sefunmi",
    text: "Best purchase I've made this entire year! My guests always ask what premium scent I use, and it looks so elegant sitting on my console table. Delivery was fast too.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womn_diff2.png",
  },
  {
    name: "Mrs Tolu Martins",
    text: "Simple setup, clean architectural look, and the fragrance throw is remarkably strong without being overpowering. Worth every single naira spent.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandiff4.png",
  },
  {
    name: "Chamun Ishaya",
    text: "My salon smells incredibly amazing now. Clients constantly keep asking what I use to achieve this atmosphere and I just point at the clean machine on the wall.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/sm12.2.png?updatedAt=1773233437317",
  },
  {
    name: "Ibrahim Sule",
    text: "Bought this for my physical shop. My customers comment positively on the rich smell before they even say hello. An excellent investment for any business.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff2.png?updatedAt=1782326017349",
  },
  {
    name: "Blessing Achebe",
    text: "I was highly skeptical about rechargeable diffusers at first, but this one actually delivers on its promises. My bedroom smells absolutely incredible every single night.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandif6.png",
  },
  {
    name: "Benson Ode",
    text: "Ordered 2 full sets for my apartment. Best decision I made this month — every single room now smells entirely consistent, premium, and clean.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff1.png",
  },
];

function CTAButton({ label = "YES! I WANT TO BUY NOW" }: { label?: string }) {
  return (
    <a
      href="#order-form-start"
      className="mx-auto mt-8 flex w-full max-w-[390px] items-center justify-center whitespace-nowrap rounded-xl bg-[#3B1F0E] border-2 border-[#3B1F0E] px-4 py-4 text-center text-[16px] xs:text-[18px] sm:text-[21px] font-black uppercase tracking-wider text-white !text-white shadow-xl hover:bg-black hover:border-black transition-all duration-300 transform hover:scale-[1.02]"
    >
      {label}
    </a>
  );
}

export default function RechargeableDiffuserPage() {
  return (
    <main className="bg-black text-white font-sans antialiased selection:bg-[#3B1F0E] selection:text-white">
      
      {/* Hero Section — Reduced top padding to bring everything up cleanly */}
      <section className="px-4 pt-6 pb-16 text-center max-w-4xl mx-auto">
        <p className="inline-block rounded-full bg-white px-5 py-2 text-[13px] font-black uppercase tracking-widest text-black border border-[#3B1F0E] ring-4 ring-[#3B1F0E]/20">
          Aromatherapy Diffuser (Rechargeable)
        </p>

        {/* Headline — Adjusted spacing to shift up tighter against the badge */}
        <h1 className="mx-auto mt-5 max-w-[800px] text-[34px] font-black leading-tight tracking-tight text-white sm:text-[46px]">
          The Intelligent Fragrance Machine That Transforms Your Home Into A{" "}
          <span className="underline decoration-[#3B1F0E] decoration-4 underline-offset-8">
            Healing Sanctuary.
          </span>
        </h1>

        {/* Extracted Interactive Hero Gallery Component — Sits prominently higher */}
        <div className="mt-6">
          <HeroGallery />
        </div>

        {/* Short Text Detail Callout */}
        <div className="mx-auto mt-8 max-w-[560px] rounded-2xl border-2 border-[#3B1F0E] bg-white p-6 shadow-xl">
          <p className="text-[22px] font-black leading-snug text-black">
            No drilling. No plugging in. No remembering.
          </p>
          <p className="mt-3 text-[18px] font-bold text-[#3B1F0E]">
            Just set it once and enjoy luxury scent <span className="text-red-600 font-black">all days all nights.</span>
          </p>
        </div>

        <div className="mt-6">
          <CTAButton />
        </div>
      </section>

      {/* Pricing Highlight Section */}
      <section className="px-4 py-16 bg-white border-y border-[#3B1F0E]/20">
        <div className="mx-auto w-full max-w-[520px] rounded-2xl border-2 border-[#3B1F0E] bg-white p-6 sm:p-8 text-center shadow-2xl">
          <p className="text-[22px] font-black uppercase tracking-widest text-[#3B1F0E]">
            60 Days No Charging Required
          </p>

          <div className="mx-auto mt-6 w-full max-w-[360px] overflow-hidden rounded-xl border border-[#3B1F0E]/20 shadow-md">
            <img
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd2x.png?updatedAt=1781025552653"
              alt="ScentMason diffuser product shot"
              className="h-auto w-full object-cover"
            />
          </div>

          <p className="mt-8 text-[26px] font-bold text-neutral-400 line-through">
            ₦45,000
          </p>

          <div className="flex flex-col items-center justify-center gap-1">
            <p className="text-[54px] font-black text-black tracking-tight leading-none">
              ₦28,000
            </p>
            <p className="text-[13px] font-black uppercase tracking-wider text-red-600 mt-2">
              ⚠️ Limited Promo Price Offer Available Now.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-[#3B1F0E] px-4 py-4 flex items-center justify-center shadow-sm border border-[#3B1F0E]">
              <p className="text-[15px] font-black text-white tracking-wide uppercase text-center">
                Free Delivery
              </p>
            </div>
            <div className="rounded-xl bg-[#3B1F0E] px-4 py-4 flex items-center justify-center shadow-sm border border-[#3B1F0E]">
              <p className="text-[15px] font-black text-white tracking-wide uppercase text-center">
                Payment On Delivery
              </p>
            </div>
            <div className="rounded-xl bg-[#3B1F0E] px-4 py-4 flex items-center justify-center shadow-sm border border-[#3B1F0E]">
              <p className="text-[15px] font-black text-white tracking-wide uppercase text-center">
                60 Days Battery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No More Bad Odour */}
      <section className="bg-white text-black px-4 py-16 border-b border-[#3B1F0E]/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mx-auto max-w-[760px] text-[28px] font-black leading-snug tracking-tight text-black sm:text-[36px]">
            Your home should <span className="underline decoration-red-600 decoration-4 underline-offset-4 font-black text-red-600">never embarrass you</span> even when visitors come unannounced. This <span className="text-[#3B1F0E] font-black">Smart diffuser</span> helps you <span className="text-red-600 font-black">kick out annoying odour effortlessly</span> in your:
          </h2>

          <ul className="mx-auto mt-10 max-w-[500px] space-y-4 text-left">
            {useCases.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-[#3B1F0E]/20 bg-neutral-50 px-6 py-5 text-[21px] font-black text-black flex items-center gap-4 shadow-sm"
              >
                <span className="text-[#3B1F0E] text-[24px]">✔</span> {item}
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-12 w-full max-w-[480px] overflow-hidden rounded-2xl border-2 border-[#3B1F0E] shadow-2xl">
            <img
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/No_wall%20drill_pasting.png"
              alt="ScentMason diffuser misting demo"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-8">
            <CTAButton />
          </div>
          
          <div className="mt-12 bg-neutral-50 rounded-2xl border border-[#3B1F0E]/10 p-4">
            <DiffuserGraveyard />
          </div>
        </div>
      </section>

      {/* Luxury Spa Vibe */}
      <section className="px-4 py-16 bg-black text-center border-b border-[#3B1F0E]/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="mx-auto max-w-[740px] text-[28px] font-bold leading-relaxed tracking-tight text-neutral-200 sm:text-[36px]">
            It automatically transforms your entire space into a <span className="font-black text-white underline decoration-white/40 underline-offset-4">5-star luxury spa</span> using a sleek, sculptural design—<span className="font-black text-white bg-[#3B1F0E] px-2 py-0.5 rounded">no manual spraying, no tracking, zero effort.</span>
          </h2>

          <div className="mx-auto mt-12 w-full max-w-[600px] overflow-hidden rounded-2xl border-4 border-[#3B1F0E]/20 shadow-2xl">
            <img
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/model_girl_prd_real.png?updatedAt=1781024869003"
              alt="ScentMason diffuser styled in a luxury home setting"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white text-black border-b border-[#3B1F0E]/20">
        <h2 className="px-4 text-center text-[34px] font-black tracking-tight text-black sm:text-[44px]">
          Trusted By Real Nigerians
        </h2>

        <div className="mt-10 flex gap-6 overflow-x-auto px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((review, index) => (
            <ScrollReveal
              key={review.name}
              delay={(index % 4) * 100}
              className="w-[320px] shrink-0"
            >
              <article className="h-full rounded-2xl border-2 border-[#3B1F0E]/10 bg-white p-6 shadow-xl flex flex-col justify-between hover:border-[#3B1F0E]/30 transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="h-14 w-14 rounded-full border-2 border-[#3B1F0E]/40 object-cover"
                      />
                      <div>
                        <p className="text-[18px] font-black text-black leading-tight">
                          {review.name}
                        </p>
                        <p className="text-[13px] font-black text-[#3B1F0E] uppercase tracking-wide mt-0.5">
                          Verified Buyer
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-black px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white">
                      Review
                    </span>
                  </div>

                  <p className="mt-4 text-[18px] font-black text-[#3B1F0E] tracking-widest">
                    ★★★★★
                  </p>

                  <p className="mt-3 text-[18px] font-bold leading-relaxed text-neutral-800">
                    "{review.text}"
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Why you'll love it */}
      <section className="bg-white text-black px-4 py-16 text-center border-b border-[#3B1F0E]/20">
        <div className="inline-block mx-auto">
          <span className="text-[14px] font-black uppercase tracking-widest text-white bg-[#3B1F0E] px-5 py-2.5 rounded-full">
            Intelligent Engineering
          </span>
        </div>
        
        <h2 className="mt-6 text-[32px] font-black tracking-tight text-black leading-tight sm:text-[42px] max-w-3xl mx-auto">
          Why You’ll Love the ScentMason Intelligent Diffuser
        </h2>

        <ul className="mx-auto mt-10 max-w-[580px] space-y-4 text-left">
          {whyLove.map((item) => (
            <li 
              key={item} 
              className="flex gap-4 items-start p-6 rounded-xl border border-[#3B1F0E]/20 bg-neutral-50 shadow-sm transition-all duration-200 hover:border-[#3B1F0E]/40"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3B1F0E]/10 text-[#3B1F0E] mt-0.5 border border-[#3B1F0E]/30">
                <svg 
                  className="h-5 w-5 stroke-[3.5]" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>

              <p className="text-[20px] font-black leading-relaxed text-black">
                {item}
              </p>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-12 w-full max-w-[560px] overflow-hidden rounded-2xl border-2 border-[#3B1F0E] shadow-2xl">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/compare-real-design.png?updatedAt=1780833409537"
            alt="ScentMason diffuser mounted seamlessly on a wall layout"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="mt-10">
          <CTAButton label="I Want This Now" />
        </div>
      </section>

      {/* Unboxing Video Section */}
      <section className="px-4 py-16 text-center max-w-4xl mx-auto bg-black">
        <h2 className="text-[32px] font-black tracking-tight text-white sm:text-[42px]">See It In Action</h2>

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

      {/* Order Form Section */}
      <section id="order-form-start" className="px-4 py-20 bg-black">
        <div className="mx-auto w-full max-w-[660px] rounded-2xl border-2 border-[#3B1F0E] bg-white p-5 sm:p-10 shadow-2xl">
          <div className="text-center pb-6 border-b border-[#3B1F0E]/10 mb-8">
            <div className="inline-block bg-red-600 text-white px-5 py-2 rounded-md text-[13px] font-black tracking-widest uppercase mb-4 animate-pulse">
              PRICE MAY GO UP SOON
            </div>
            <h2 className="text-[32px] font-black tracking-tight text-black">
              Fill Order Form Below
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[18px] font-bold text-neutral-600 leading-relaxed">
              Buy 5 machines and get <span className="text-red-600 font-black underline">1 extra fragrance oil free</span>, automatically added to your package shipment.
            </p>
          </div>

          <div className="w-full text-black placeholder-neutral-400 overflow-visible">
            <OrderForm4 />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="px-4 py-12 bg-white">
        <div className="mx-auto rounded-[2rem] bg-white px-6 py-14 text-center border-2 border-[#3B1F0E] shadow-2xl max-w-4xl sm:px-12">
          <p className="mx-auto max-w-3xl text-[26px] font-black leading-relaxed text-black sm:text-[38px]">
            For more enquiries, call us directly on{" "}
            <a
              href="tel:07064969603"
              className="inline-block font-black text-[#3B1F0E] underline decoration-[#3B1F0E]/40 underline-offset-4 transition hover:scale-[1.01]"
            >
              0706 496 9603
            </a>
          </p>
        </div>
      </section>

      {/* Facebook Disclaimer */}
      <footer className="bg-black py-16">
        <p className="mx-auto max-w-[760px] px-6 text-center text-[13px] font-bold leading-relaxed text-neutral-600">
          This site is not part of the Facebook website, Facebook Inc, the Google website, or Alphabet Inc, and is not endorsed by Facebook or Google in any way. FACEBOOK and GOOGLE are trademarks of Facebook Inc and Alphabet Inc respectively.
        </p>
      </footer>
    </main>
  );
}