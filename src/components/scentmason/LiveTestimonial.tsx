"use client";

const TESTIMONIAL_IMAGES = [
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/ScentMason_Customer_Review_02.webp",
    alt: "ScentMason customer review",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/ScentMason_Customer_Review_01.webp",
    alt: "ScentMason customer review",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/ScentMason_Customer_Review_06.webp",
    alt: "ScentMason customer review",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/ScentMason_Customer_Review_08.webp",
    alt: "ScentMason customer review",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/ScentMason_Customer_Review_04.webp",
    alt: "ScentMason customer review",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/scentmasonTestimonialsreal/ScentMason_Customer_Review_05.webp",
    alt: "ScentMason customer review",
  },
];

export default function LiveTestimonial() {
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[27px] font-bold leading-[1.2] tracking-tight text-black sm:text-[34px]">
            What real customers around the world are saying about the product
          </h2>
        </div>

        {/* Live status */}
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm">
            
            {/* Pulsing live dot */}
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>

            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-black">
              Live customer reviews
            </span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-8">

          {/* Mobile */}
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:hidden">
            {TESTIMONIAL_IMAGES.map((testimonial, index) => (
              <div
                key={testimonial.src}
                className="w-[82vw] max-w-[360px] shrink-0 snap-center overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5] shadow-sm"
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.alt}
                  className="block h-auto w-full"
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden grid-cols-2 gap-5 md:grid lg:grid-cols-3">
            {TESTIMONIAL_IMAGES.map((testimonial, index) => (
              <div
                key={testimonial.src}
                className="overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f5] shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.alt}
                  className="block h-auto w-full"
                  loading={index < 3 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>

        </div>

        {/* Mobile scroll hint */}
        <p className="mt-3 text-center text-xs font-medium text-black/40 md:hidden">
          Swipe to see more customer reviews →
        </p>

      </div>
    </section>
  );
}