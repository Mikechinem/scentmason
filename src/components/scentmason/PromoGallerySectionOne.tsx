import Image from "next/image";

type ProblemSolutionItem = {
  problem: string;
  imageUrl: string;
  alt: string;
};

// 💡 NOTE: Images paired to problems in the order they were sent — confirm/reorder if a
// specific image should map to a different problem statement.
const items: ProblemSolutionItem[] = [
  {
    problem: "Generator fumes taking over your home?",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/WhatsApp%20Image%202026-07-10%20at%2007.55.21.jpeg?tr=w-600,q-75,f-webp",
    alt: "Smart Fragrance Machine tackling generator odour in a home",
  },
  {
    problem: "Guests show up and you weren't ready?",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/WhatsApp%20Image%202026-07-10%20at%2007.47.19.jpeg?tr=w-600,q-75,f-webp",
    alt: "Home always guest-ready with automatic fragrance machine",
  },
  {
    problem: "Landlord won't let you drill the wall?",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/No_wall%20drill_pasting.png?updatedAt=1782304087767?tr=w-600,q-75,f-webp",
    alt: "No-drill wall mount for rented apartments",
  },
  {
    problem: "Forgot to spray again?",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/vegan.jpeg?tr=w-600,q-75,f-webp",
    alt: "Automatic fragrance machine running hands-free",
  },
  {
    problem: "Cooking smells that won't leave the kitchen?",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/WhatsApp%20Image%202026-07-10%20at%2007.47.14.jpeg?tr=w-600,q-75,f-webp",
    alt: "Aromatherapy fragrance machine clearing kitchen odours",
  },
];

export default function PromoGallerySectionOne() {
  return (
    <section className="px-4 py-10 bg-white">
      <div className="mx-auto max-w-[480px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-widest text-[#C17F4A]">
          Real Everyday Problems
        </p>
        <h2 className="mt-2 text-[25px] font-extrabold tracking-tight text-[#000000] sm:text-[26px]">
          Solves The Smell Problems You Deal With Every Day
        </h2>

        <div className="mt-7 space-y-8">
          {items.map((item, index) => (
            <div key={item.problem} className="text-center">
              <p className="text-[18px] font-bold leading-snug text-[#FF0000] sm:text-[18px]">
                {item.problem}
              </p>
              <div className="mt-3 overflow-hidden rounded-xl border border-black/10 shadow-sm">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  width={600}
                  height={600}
                  loading={index === 0 ? undefined : "lazy"}
                  priority={index === 0}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}