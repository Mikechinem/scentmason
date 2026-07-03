import OrderForm3 from "@/components/scentmason/OrderForm3";
import ScrollReveal from "@/components/scentmason/ScrollReveal";
import DiffuserGraveyard from "@/components/scentmason/DiffuserGraveyard";


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
  "Rechargeable — one charge lasts more than a month, even through power outages.",
  "Set & forget — it sprays on its own, no need to remember to spray.",
  "No-drill mount — sticks up with the included mount, no drilling your wall.",
];

const testimonials = [
  {
    name: "Lydia Apat",
    text: "I’ve used other fragrance machines before, but this one is different. It’s stronger, lasts longer, and even after months of use, the fragrance still comes out really well.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/woman_diff1.png",
  },
  {
    name: "Emeka Nwagbaraocha",
    text: "I bought one for my office and one for home. Odours are gone, and I honestly feel calmer during work. Pay on delivery made it easy for me.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff3.png",
  },
  {
    name: "Sefunmi",
    text: "Best purchase I've made this year! My guests always ask what I use, and it looks so fine sitting on my console table. Delivery was fast too.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womn_diff2.png",
  },
  {
    name: " Mrs Tolu Martins",
    text: "Simple setup, clean look, and the fragrance throw is strong without being overpowering. Worth every naira.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandiff4.png",
  },
  {
    name: "Chamun Ishaya",
    text: "My salon smells amazing now. Clients keep asking what I use and I just point at the machine on the wall.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/sm12.2.png?updatedAt=1773233437317",
  },
  
  {
    name: "Ibrahim Sule",
    text: "Bought this for my shop. Customers comment on the smell before they even say hello. Good investment.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff2.png?updatedAt=1782326017349",
  },
 
  {
    name: "Blessing Achebe",
    text: "I was skeptical about rechargeable diffusers but this one actually delivers. My bedroom smells incredible every night.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandif6.png",
  },
  {
    name: "Benson Ode",
    text: "Ordered 2 sets for my apartment. Best decision — every room now smells consistent and clean.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff1.png",
  },
];

const galleryImages = [
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el3.png?updatedAt=1780413593766",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el7.png?updatedAt=1780413593530",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/wall_office_mount.png?updatedAt=1780841614076",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el6.png?updatedAt=1780413593841",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el2.png?updatedAt=1780413593681",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el5.png?updatedAt=1780413594046",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/wall_office_mount.png?updatedAt=1780841614076",
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el1.png?updatedAt=1780413594782",
  
];

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2347064969603"
      className="mx-auto mt-6 flex w-full max-w-[320px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-center text-[19px] font-semibold text-white"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-5 w-5 shrink-0"
        fill="#ffffff"
        aria-hidden="true"
      >
        <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.385.694 4.6 1.885 6.466L4 29l7.73-1.838A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.629 28 15.001 28 8.373 22.629 3 16.001 3zm6.992 16.99c-.295.83-1.452 1.59-2.31 1.762-.797.158-1.5.225-3.193-.42-2.726-1.04-4.484-3.78-4.62-3.95-.137-.17-1.103-1.47-1.103-2.8 0-1.33.7-1.984.95-2.255.246-.27.535-.337.713-.337.178 0 .357 0 .513.008.165.008.387-.063.605.462.224.54.762 1.86.83 1.994.067.135.112.293.022.47-.09.178-.135.288-.27.443-.135.157-.284.35-.405.47-.135.135-.276.282-.118.55.157.27.7 1.155 1.504 1.873 1.04.927 1.917 1.213 2.187 1.348.27.135.428.113.586-.067.157-.18.674-.785.854-1.055.18-.27.36-.225.605-.135.246.09 1.564.738 1.832.872.27.135.45.202.516.315.067.113.067.652-.227 1.483z" />
      </svg>
      Chat Us On WhatsApp
    </a>
  );
}

function CTAButton({ label = "YES! I WANT TO BUY NOW" }: { label?: string }) {
  return (
    <a
      href="#order-form-start"
      className="mx-auto mt-6 flex w-full max-w-[320px] items-center justify-center rounded-full bg-[#25D366] px-6 py-4 text-center text-[19px] font-semibold text-white"
    >
      {label}
    </a>
  );
}

export default function RechargeableDiffuserPage() {
  return (
    <main className="bg-white text-black">
      {/* Top notice bar */}
      <section className="bg-white border-b border-black/5 px-4 py-3 text-center">
        <p className="text-[14px] font-extrabold  tracking-widest text-red-600">
          Discount Sale + Free Delivery + Payment On Delivery
        </p>
      </section>

      {/* Hero */}
      <section className="px-4 py-10 text-center">
        <p className="inline-block rounded-full bg-[#FAF7F2] px-4 py-1.5 text-[16px] font-bold uppercase tracking-wider text-[#3B1F0E] border border-[#3B1F0E]/10">
          Aromatherapy Diffuser (Rechargeable)
        </p>

        <h1 className="mx-auto mt-4 max-w-[620px] text-[25px] font-normal leading-9 tracking-tight text-black sm:text-[28px]">
          The diffuser that <span className="font-bold">makes your home smell luxurious</span> like a <br></br>5-star hotel without you remembering to spray all the time.
        </h1>
<div className="mx-auto mt-8 w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10">
  <img
    src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/real%20image_handing.png?updatedAt=1780844410915"
    alt="ScentMason rechargeable automatic fragrance diffuser"
    className="h-auto w-full object-cover"
  />
</div>
<div className="mx-auto mt-5 max-w-[520px] rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 text-center">
  <p className="text-[16px] font-semibold leading-relaxed text-black">
    No drilling. No plugging in. No remembering.
  </p>
  <p className="mt-1 text-[15px] font-medium text-amber-600">
    Just set it once and enjoy luxury scent all days all nights.
  </p>
</div>

        <CTAButton />
      </section>

      {/* Pricing highlight */}
      <section className="px-4 py-10">
        <div className="mx-auto w-full max-w-[480px] rounded-2xl border-2 border-[#3B1F0E] bg-[#FAF7F2] p-6 text-center">
          <p className="text-[19px] font-extrabold uppercase tracking-wider text-[#3B1F0E]">
            60 Days No Charging
          </p>

          <div className="mx-auto mt-4 w-full max-w-[320px] overflow-hidden rounded-xl border border-[#3B1F0E]/15">
            <img
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd2x.png?updatedAt=1781025552653"
              alt="ScentMason diffuser product shot"
              className="h-auto w-full object-cover"
            />
          </div>

          <p className="mt-5 text-[20px] font-medium text-black/50 line-through">
            ₦45,000
          </p>

          <p className="mt-1 text-[36px] font-bold text-[#3B1F0E]">
            ₦28,000
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-lg bg-[#3B1F0E] px-3 py-3">
              <p className="text-[16px] font-semibold text-white">
                Free Delivery
              </p>
            </div>
            <div className="rounded-lg bg-[#3B1F0E] px-3 py-3">
              <p className="text-[16px] font-semibold text-white">
                Payment On Delivery
              </p>
            </div>
            <div className="rounded-lg bg-[#3B1F0E] px-3 py-3">
              <p className="text-[16px] font-semibold text-white">
                60 Days No Charging
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No more bad odour */}
      <section className="px-4 py-10 text-center">
       <h2 className="mx-auto max-w-[600px] text-[23px] font-bold leading-9 tracking-tight text-black">
  Your home should <span className="text-red-600">never embarrass you</span> even when visitors come <span className="underline decoration-black/30 decoration-2">unannounced</span>. This <span className="text-amber-600">Smart diffuser</span> helps you kick-out annoying odour in your:
</h2>

        <ul className="mx-auto mt-5 max-w-[420px] space-y-2 text-left">
          {useCases.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-black/10 px-4 py-3 text-[17px] font-medium"
            >
              ✔ {item}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 w-full max-w-[420px] overflow-hidden rounded-2xl border border-black/10">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/No_wall%20drill_pasting.png"
            alt="ScentMason diffuser misting demo"
            className="h-auto w-full object-cover"
          />
        </div>


            <CTAButton />
        <DiffuserGraveyard />

        
      </section>

      {/* Spa vibe */}
      <section className="px-4 py-10 text-center">
        <h2 className="mx-auto max-w-[600px] text-[23px] font-normal leading-9 tracking-tight text-black/80">
  It automatically transforms your space into a <span className="font-bold text-black text-[24px]">5-star luxury spa</span> using a sleek, sculptural design—<span className="font-bold text-amber-600">no manual spraying, no tracking, zero effort.</span>
</h2>

        <div className="mx-auto mt-6 w-full max-w-[560px] overflow-hidden rounded-2xl border border-black/10">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/model_girl_prd_real.png?updatedAt=1781024869003"
            alt="ScentMason diffuser styled in a home setting"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* Testimonials - scrolling, screenshot-style review cards, animate into view */}
      <section className="py-10">
        <h2 className="mt-4 px-4 text-center text-[28px] font-bold tracking-tight text-black leading-tight sm:text-[36px]">
    Customer Reviews
  </h2>

        <div className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((review, index) => (
            <ScrollReveal
              key={review.name}
              delay={(index % 4) * 100}
              className="w-[280px] shrink-0"
            >
              <article className="rounded-xl border border-black/10 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[16px] font-semibold leading-tight">
                        {review.name}
                      </p>
                      <p className="text-[12px] font-medium text-black/50">
                        Verified Buyer
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-black/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/50">
                    Review
                  </span>
                </div>

                <p className="mt-3 text-[14px] font-semibold text-amber-500">
                  ★★★★★
                </p>

                <p className="mt-2 text-[16px] font-medium leading-6 text-black/80">
                  {review.text}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

    

      {/* Why you'll love it */}
      <section className="bg-white px-4 py-14 text-center">
  {/* Premium Luxury Badge & Headings */}
  <div className="inline-block mx-auto">
    <span className="text-[12px] font-bold uppercase tracking-widest text-[#A27B5C] bg-[#A27B5C]/10 px-3 py-1 rounded-full">
      Intelligent Engineering
    </span>
  </div>
  
  <h2 className="mt-4 text-[28px] font-extrabold tracking-tight text-black leading-tight sm:text-[36px]">
    Why You’ll Love the ScentMason Intelligent Diffuser
  </h2>

  {/* High-Conversion Dynamic List */}
  <ul className="mx-auto mt-8 max-w-[520px] space-y-4 text-left">
    {whyLove.map((item) => (
      <li 
        key={item} 
        className="flex gap-4 items-start p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 shadow-sm transition-all duration-200 hover:border-zinc-200"
      >
        {/* ScentMason Luxury Brown SVG Check Icon */}
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#A27B5C]/10 text-[#A27B5C] mt-0.5">
          <svg 
            className="h-3.5 w-3.5 stroke-[3]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Scaled Text Label */}
        <p className="text-[17px] font-semibold leading-relaxed text-zinc-900">
          {item}
        </p>
      </li>
    ))}
  </ul>

  {/* Premium Wall Mount Image Display Block */}
  <div className="mx-auto mt-10 w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10 shadow-sm">
    <img
      src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/compare-real-design.png?updatedAt=1780833409537"
      alt="ScentMason diffuser mounted seamlessly on a wall"
      className="h-auto w-full object-cover"
      loading="lazy"
    />
  </div>

  {/* Interactive Conversion Trigger */}
  <div className="mt-8">
    <CTAButton label="I Want This Now" />
  </div>
</section>
      {/* Unboxing video */}
      <section className="px-4 py-10 text-center">
        <h2 className="mt-4 text-[28px] font-bold tracking-tight text-black leading-tight sm:text
        text-[36px]">See It In Action</h2>

        <div className="mx-auto mt-6 w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10">
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
      <section className="px-4 py-10 text-center">
        <h2 className="mt-4 text-[28px] font-extrabold tracking-tight text-black leading-tight sm:text-[36px]">
          What Is Inside Your Order?
        </h2>

        <div className="mx-auto mt-6 w-full max-w-[420px] overflow-hidden rounded-2xl border border-black/10">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/unbox_real.png?updatedAt=1781023129314"
            alt="Everything that comes inside your ScentMason order"
            className="h-auto w-full object-cover"
          />
        </div>

        <ul className="mx-auto mt-5 max-w-[420px] space-y-2 text-left">
          {whatsInside.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-black/10 px-4 py-3 text-[17px] font-medium"
            >
              ✔ {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Order form intro + form, wrapped in a shared light green border */}
      <section id="order-form-start" className="px-4 py-10">
        <div className="mx-auto w-full max-w-[480px] rounded-2xl border-2 border-[#bff0d4] p-4">
          <div className="text-center">
            <p className="text-[15px] font-extrabold uppercase tracking-wider text-red-600">
              PRICE MAY GO UP SOON
            </p>
            <h2 className="mt-2 text-[24px] font-bold tracking-tight text-black">
              Fill Order Form Below
            </h2>
            <p className="mx-auto mt-3 max-w-[420px] text-[16px] font-medium text-black/60">
              Buy 5 machines and get 1 extra fragrance oil free, automatically
              added to your order.
            </p>
          </div>

          <OrderForm3 />
        </div>
      </section>

      {/* Contact */}
      <section className="mx-4 my-10 rounded-[2rem] bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:mx-10 sm:px-10 sm:py-16">
  <p className="mx-auto max-w-3xl text-[24px] font-semibold leading-[1.25] text-black sm:text-[34px]">
    For more enquiries, call us on{" "}
    <a
      href="tel:07064969603"
      className="inline-block font-black text-black underline decoration-black/30 underline-offset-4 transition hover:scale-[1.03]"
    >
      0706 496 9603
    </a>
  </p>
</section>

      {/* Facebook disclaimer */}
      <p className="mx-auto max-w-[720px] px-4 pb-14 text-center text-[11px] font-medium leading-5 text-black/40">
        This site is not part of the Facebook website, Facebook Inc, the
        Google website, or Alphabet Inc, and is not endorsed by Facebook or
        Google in any way. FACEBOOK and GOOGLE are trademarks of Facebook Inc
        and Alphabet Inc respectively.
      </p>
    </main>
  );
}