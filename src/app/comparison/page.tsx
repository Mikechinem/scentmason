import OrderForm3 from "@/components/scentmason/OrderForm3";
import ScrollReveal from "@/components/scentmason/ScrollReveal";


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
    text: "At first I thought it was just like an ordinary air freshener, but this one is different. The fragrance lasts long and my whole sitting room smells like a hotel lobby now.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/woman_diff1.png",
  },
  {
    name: "Emeka Nwagbaraocha",
    text: "I bought one for my office and one for home. Odours are gone, and I honestly feel calmer during work. Pay on delivery made it easy for me.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff3.png",
  },
  {
    name: "Ngozi",
    text: "Best purchase I've made this year! My guests always ask what I use, and it looks so fine sitting on my console table. Delivery was fast too.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womn_diff2.png",
  },
  {
    name: " Mrs Tolu Martins",
    text: "Simple setup, clean look, and the fragrance throw is strong without being overpowering. Worth every naira.",
    avatar: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandiff4.png",
  },
  {
    name: "Chiamaka Obi",
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
    name: "Kelechi Nnamdi",
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
          This diffuser will <span className="font-bold">make your home smell luxurious</span> like a 5-star hotel.
        </h1>

        <div className="mx-auto mt-8 w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/real%20image_handing.png?updatedAt=1780844410915"
            alt="ScentMason rechargeable automatic fragrance diffuser"
            className="h-auto w-full object-cover"
          />
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
            ₦34,000
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
          No more bad odour. This rechargeable diffuser is your trusted helper for tackling bad odour in your:
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
      </section>

      {/* Spa vibe */}
      <section className="px-4 py-10 text-center">
        <h2 className="mx-auto max-w-[600px] text-[23px] font-bold leading-9 tracking-tight text-black">
          It beautifies and gives your space a spa and 5-star hotel vibe…
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
        <h2 className="px-4 text-center text-[24px] font-bold tracking-tight text-black">
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

    
      {/* What's inside */}
      <section className="px-4 py-10 text-center">
        <h2 className="text-[24px] font-bold tracking-tight text-black">
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

      {/* Why you'll love it */}
      <section className="px-4 py-10 text-center">
        <h2 className="text-[24px] font-bold tracking-tight text-black">
          Why You'll Love Your Smart Aromatheraphy Diffuser
        </h2>

        <ul className="mx-auto mt-5 max-w-[480px] space-y-3 text-left">
          {whyLove.map((item) => (
            <li key={item} className="text-[17px] font-medium leading-7">
              ✅ {item}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/compare-real-design.png?updatedAt=1780833409537"
            alt="ScentMason diffuser mounted on wall"
            className="h-auto w-full object-cover"
          />
        </div>

        <CTAButton label="I Want This Now" />
      </section>

      {/* Unboxing video */}
      <section className="px-4 py-10 text-center">
        <h2 className="text-[24px] font-bold tracking-tight text-black">See It In Action</h2>

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