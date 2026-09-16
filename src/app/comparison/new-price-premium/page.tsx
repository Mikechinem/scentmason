import OrderFormNewPricePremium from "@/components/scentmason/OrderFormNewPricePremium";
import ScrollReveal from "@/components/scentmason/ScrollReveal";
import XVideoUsecase from "@/components/scentmason/XVideoUsecase";
import MiniDiffuserGraveyard from "@/components/scentmason/MiniDiffuserGraveyard";
import ScentMasonFAQ from "@/components/scentmason/ScentMasonFAQ";

const useCases = [
  "Bedroom",
  "Living room",
  "Office",
  "Hotel room",
  "Salon",
  "Shop counter",
];

const whatsInside = [
  "1 ScentMason Automatic Fragrance Machine",
  "1 × 80ml Signature Fragrance Oil",
  "1 No-Drill Wall Mount",
  "1 USB Charging Cable",
  "1 User Manual",
];

const testimonials = [
  {
    name: "Lydia Apat",
    text: "I have used other fragrance machines before, but this one feels different. The scent is strong, lasts long, and still smells good after months of use.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/woman_diff1.png",
  },
  {
    name: "Emeka Nwagbaraocha",
    text: "I bought one for my office and one for home. The bad smells are gone. My office feels better now. Pay on delivery also made it easy.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff3.png",
  },
  {
    name: "Mrs Tolu Martins",
    text: "It was easy to set up. It looks neat, and the smell is strong without being too much. I am happy with it.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandiff4.png",
  },
  {
    name: "Ibrahim Sule",
    text: "I bought this for my shop. Customers notice the nice smell before they even say hello. I really like it.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff2.png?updatedAt=1782326017349",
  },
];

function CTAButton({
  label = "YES! I WANT TO BUY NOW",
}: {
  label?: string;
}) {
  return (
    <a
      href="#order-form-start"
      className="mx-auto mt-6 flex w-full max-w-[340px] items-center justify-center rounded-full bg-[#25D366] px-6 py-4 text-center text-[19px] font-bold text-white shadow-sm"
    >
      {label}
    </a>
  );
}

export default function NewPricePremiumPage() {
  return (
    <main className="bg-white text-black">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="px-4 py-10 text-center">
        <h1 className="mx-auto mt-5 max-w-[650px] text-[30px] font-normal leading-[1.2] tracking-tight text-black sm:text-[38px]">
          Your home can look beautiful and still{" "}
          <span className="font-bold text-red-600">smell bad.</span>
        </h1>

        <p className="mx-auto mt-4 max-w-[600px] text-[19px] font-medium leading-7 text-black/80 sm:text-[21px]">
          Bad smells make your visitors feel uncomfortable. This Fragrance
          Machine releases fragrance on its own, so you do not have to keep
          spraying by hand.
        </p>

        <div className="mx-auto mt-8 w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/real%20image_handing.png?updatedAt=1780844410915"
            alt="ScentMason automatic fragrance machine"
            className="h-auto w-full object-cover"
          />
        </div>

        <CTAButton />
      </section>

      {/* =====================================================
          VIDEO
      ===================================================== */}
      <section className="py-12">
        <div className="mx-auto max-w-xl px-4">
          <XVideoUsecase
            src="https://res.cloudinary.com/doatbjjtn/video/upload/v1788080744/M0811_2_vhfx8n.mp4"
            className="mt-6"
          />
        </div>
      </section>

      {/* =====================================================
          PRICING HIGHLIGHT
      ===================================================== */}
      <section className="px-4 py-10">
        <div className="mx-auto w-full max-w-[480px] rounded-2xl border-2 border-[#3B1F0E] bg-[#FAF7F2] p-6 text-center">

          <p className="text-[20px] font-extrabold uppercase tracking-wider text-[#3B1F0E] sm:text-[21px]">
            60 Days No Charging
          </p>

          <div className="mx-auto mt-4 w-full max-w-[320px] overflow-hidden rounded-xl border border-[#3B1F0E]/15">
            <img
              src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd2x.png?updatedAt=1781025552653"
              alt="ScentMason automatic fragrance machine"
              className="h-auto w-full object-cover"
            />
          </div>

          <p className="mt-5 text-[21px] font-medium text-black/50 line-through">
            ₦38,000
          </p>

          <p className="mt-1 text-[40px] font-bold text-[#3B1F0E] sm:text-[44px]">
            ₦26,990
          </p>

          <p className="mt-2 text-[16px] font-semibold text-black/70 sm:text-[17px]">
            1 ScentMason Machine + 1 × 80ml Fragrance Oil
          </p>

          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              "Free Delivery",
              "Payment On Delivery",
              "60 Days No Charging",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-[#3B1F0E] px-3 py-3"
              >
                <p className="text-[16px] font-semibold text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EASY PLACEMENT
      ===================================================== */}
      <section className="py-12">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mx-auto max-w-xl text-center text-[27px] font-bold leading-tight sm:text-[32px]">
            Put it where you want. It works on its own.
          </h2>

          <XVideoUsecase
            src="https://res.cloudinary.com/doatbjjtn/video/upload/v1788076713/0811_3_vk4c8z.mp4"
          />
        </div>
      </section>

      {/* =====================================================
          BAD ODOUR
      ===================================================== */}
      <section className="px-4 py-10 text-center">
        <h2 className="mx-auto max-w-[650px] text-[26px] font-bold leading-[1.35] tracking-tight text-black sm:text-[31px]">
          Do not let bad smells{" "}
          <span className="text-red-600">embarrass you</span> when visitors
          come{" "}
          <span className="underline decoration-black/30 decoration-2">
            unexpected.
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-[600px] text-[18px] font-medium leading-7 text-black/70">
          ScentMason helps keep bad smells under control in the places where
          you live, work, or welcome visitors.
        </p>

        <ul className="mx-auto mt-6 max-w-[420px] space-y-2 text-left">
          {useCases.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-black/10 px-4 py-3 text-[18px] font-medium"
            >
              ✔ {item}
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-8 w-full max-w-[420px] overflow-hidden rounded-2xl border border-black/10">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/No_wall%20drill_pasting.png"
            alt="ScentMason diffuser mounting demonstration"
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* =====================================================
          NO DRILL
      ===================================================== */}
      <section className="py-12">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mx-auto max-w-xl text-center text-[27px] font-bold leading-tight sm:text-[32px]">
            Put it up without drilling your wall.
          </h2>

          <XVideoUsecase
            src="https://res.cloudinary.com/doatbjjtn/video/upload/v1788080752/M0821_wva946.mp4"
          />
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}
      <section className="py-10">
        <h2 className="mt-4 px-4 text-center text-[30px] font-bold leading-tight tracking-tight text-black sm:text-[36px]">
          What Our Customers Say
        </h2>

        <div className="mt-6 flex gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((review, index) => (
            <ScrollReveal
              key={review.name}
              delay={(index % 4) * 100}
              className="w-[290px] shrink-0"
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

                      <p className="text-[13px] font-medium text-black/50">
                        Verified Buyer
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-black/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/50">
                    Review
                  </span>
                </div>

                <p className="mt-3 text-[16px] font-semibold text-amber-500">
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

      {/* =====================================================
          FRAGRANCE VIDEO
      ===================================================== */}
      <section className="py-12">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mx-auto max-w-xl text-center text-[27px] font-bold leading-tight sm:text-[32px]">
            Safe for infants, pets, and asthmatic lungs.
          </h2>

          <XVideoUsecase
            src="https://res.cloudinary.com/doatbjjtn/video/upload/v1788080755/N0811_sdkzpu.mp4"
          />
        </div>
      </section>

      {/* =====================================================
          DIFFUSER GRAVEYARD
      ===================================================== */}
      <MiniDiffuserGraveyard />

      {/* =====================================================
          LUXURY PAYOFF
      ===================================================== */}
      <section className="bg-white px-4 py-14 text-center">
        <h2 className="mx-auto max-w-[620px] text-[29px] font-bold leading-tight sm:text-[36px]">
          It does more than help your space smell better.
        </h2>

        <p className="mx-auto mt-4 max-w-[560px] text-[18px] font-medium leading-7 text-black/70 sm:text-[20px]">
          It can give your space that clean, calm, 5-star hotel feeling.
        </p>

        <div className="mx-auto mt-10 w-full max-w-[520px] overflow-hidden rounded-2xl border border-black/10 shadow-sm">
          <img
            src="https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/compare-real-design.png?updatedAt=1780833409537"
            alt="ScentMason diffuser mounted seamlessly on a wall"
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </div>

        <CTAButton label="I Want This Now" />
      </section>

      {/* =====================================================
          WHAT'S INSIDE
      ===================================================== */}
      <section className="px-4 py-10 text-center">
        <h2 className="mt-4 text-[29px] font-extrabold leading-tight tracking-tight text-black sm:text-[36px]">
          What you get when you order?
        </h2>

        <p className="mx-auto mt-3 max-w-[500px] text-[17px] font-medium leading-6 text-black/65">
          Each full set gives you the machine and the fragrance oil you need
          to start.
        </p>

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

      {/* =====================================================
          FAQ
      ===================================================== */}
      <ScentMasonFAQ />

      {/* =====================================================
          ORDER FORM
      ===================================================== */}
      <section
        id="order-form-start"
        className="scroll-mt-6 px-4 py-10"
      >
        <div className="mx-auto w-full max-w-[500px] rounded-2xl border-2 border-[#bff0d4] p-4 sm:p-5">

          <div className="text-center">
            <p className="text-[16px] font-extrabold uppercase tracking-wider text-red-600 sm:text-[17px]">
              PRICES IN NIGERIA CAN CHANGE FAST
              <br />
              This price may go back to ₦38,000 soon.
            </p>

            <h2 className="mt-2 text-[27px] font-bold tracking-tight text-black sm:text-[31px]">
              Fill The Order Form Below
            </h2>

            <p className="mx-auto mt-3 max-w-[440px] text-[17px] font-medium leading-6 text-black/60">
              Choose your package below. We'll call you to confirm your order
              before delivery.
            </p>
          </div>

          <OrderFormNewPricePremium />
        </div>
      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}
      <section className="mx-4 my-10 rounded-[2rem] bg-white px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:mx-10 sm:px-10 sm:py-16">
        <p className="mx-auto max-w-3xl text-[25px] font-semibold leading-[1.25] text-black sm:text-[34px]">
          Have questions? Call us on{" "}
          <a
            href="tel:07064969603"
            className="inline-block font-black text-black underline decoration-black/30 underline-offset-4"
          >
            0706 496 9603
          </a>
        </p>
      </section>

      {/* =====================================================
          DISCLAIMER
      ===================================================== */}
      <p className="mx-auto max-w-[720px] px-4 pb-14 text-center text-[11px] font-medium leading-5 text-black/40">
        This site is not part of Facebook, Google, or their companies. It is
        not endorsed by Facebook or Google. Facebook and Google are trademarks
        of their respective companies.
      </p>
    </main>
  );
}