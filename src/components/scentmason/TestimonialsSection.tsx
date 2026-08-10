"use client";

import ScrollReveal from "@/components/scentmason/ScrollReveal";

const testimonials = [
  {
    name: "Lydia Apat",
    text: "I’ve used other fragrance machines before, but this one is different. It’s stronger, lasts longer, and even after months of use, the fragrance still comes out really well.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/woman_diff1.png",
  },
  {
    name: "Emeka Nwagbaraocha",
    text: "I bought one for my office and one for home. Odours are gone, and I honestly feel calmer during work. Pay on delivery made it easy for me.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff3.png",
  },
  {
    name: "Sefunmi",
    text: "Best purchase I've made this year! My guests always ask what I use, and it looks so fine sitting on my console table. Delivery was fast too.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womn_diff2.png",
  },
  {
    name: "Mrs Tolu Martins",
    text: "Simple setup, clean look, and the fragrance throw is strong without being overpowering. Worth every naira.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandiff4.png",
  },
  {
    name: "Chamun Ishaya",
    text: "My salon smells amazing now. Clients keep asking what I use and I just point at the machine on the wall.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/sm12.2.png?updatedAt=1773233437317",
  },
  {
    name: "Ibrahim Sule",
    text: "Bought this for my shop. Customers comment on the smell before they even say hello. Good investment.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff2.png?updatedAt=1782326017349",
  },
  {
    name: "Blessing Achebe",
    text: "I was skeptical about rechargeable diffusers but this one actually delivers. My bedroom smells incredible every night.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/womandif6.png",
  },
  {
    name: "Benson Ode",
    text: "Ordered 2 sets for my apartment. Best decision — every room now smells consistent and clean.",
    avatar:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/man_diff1.png",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full overflow-hidden">
        <div className="px-4 pt-10 text-center sm:pt-14">
  <h2
    className="
      text-[28px]
      font-extrabold
      uppercase
      tracking-[-0.03em]
      text-[#1e1008]

      sm:text-[36px]
      lg:text-[42px]
    "
  >
    Customer Reviews
  </h2>

  <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-[#A67C00]" />
</div>
      <div
        className="
          mt-6
          flex
          gap-4
          overflow-x-auto
          px-4
          pb-2
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {testimonials.map((review, index) => (
          <ScrollReveal
            key={review.name}
            delay={(index % 4) * 100}
            className="w-[280px] shrink-0"
          >
            <article
              className="
                rounded-xl
                border
                border-black/10
                bg-white
                p-4
                shadow-sm
              "
            >
              {/* ================================
                  BUYER INFO
              ================================= */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="
                      h-10
                      w-10
                      rounded-full
                      object-cover
                    "
                  />

                  <div>
                    <p
                      className="
                        text-[16px]
                        font-semibold
                        leading-tight
                      "
                    >
                      {review.name}
                    </p>

                    <p
                      className="
                        text-[12px]
                        font-medium
                        text-black/50
                      "
                    >
                      Verified Buyer
                    </p>
                  </div>
                </div>

                <span
                  className="
                    rounded-full
                    bg-black/5
                    px-2
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-black/50
                  "
                >
                  Review
                </span>
              </div>

              {/* ================================
                  STAR RATING
              ================================= */}
              <p
                className="
                  mt-3
                  text-[14px]
                  font-semibold
                  text-amber-500
                "
              >
                ★★★★★
              </p>

              {/* ================================
                  TESTIMONIAL
              ================================= */}
              <p
                className="
                  mt-2
                  text-[16px]
                  font-medium
                  leading-6
                  text-black/80
                "
              >
                {review.text}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}