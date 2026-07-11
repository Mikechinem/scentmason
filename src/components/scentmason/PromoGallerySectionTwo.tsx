import Image from "next/image";

type UseCaseItem = {
  label: string;
  imageUrl: string;
  alt: string;
};

const items: UseCaseItem[] = [
  {
    label: "No-Drill Mounting",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/No_wall%20drill_pasting.png?tr=w-360,q-75,f-webp",
    alt: "No-drill wall mount installation demo",
  },
  {
    label: "Family Living Room",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/family_stone%20(1).png?tr=w-360,q-75,f-webp",
    alt: "Smart Fragrance Machine styled in a family living room",
  },
  {
    label: "Elegant for outdoor camping",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffuser_satone_lake%20(3).png?tr=w-360,q-75,f-webp",
    alt: "Automatic fragrance machine styled in an elegant home setting",
  },
  {
    label: "Office & Workspace",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/wall_office_mount.png?tr=w-360,q-75,f-webp",
    alt: "Fragrance machine wall-mounted in an office",
  },
  {
    label: "Bedroom Comfort",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/model_girl_prd_real.png?tr=w-360,q-75,f-webp",
    alt: "Aromatherapy fragrance machine in a bedroom setting",
  },
  {
    label: "What's In The Box",
    imageUrl:
      "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/prd2x.png?updatedAt=1781025552653?tr=w-360,q-75,f-webp",
    alt: "Unboxing the ScentMason automatic fragrance machine",
  },
];

export default function PromoSectionTwo() {
  return (
    <section className="px-4 py-10 bg-[#FAF7F2]">
      <div className="mx-auto max-w-[560px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-widest text-[#C17F4A]">
          Fits Anywhere In Your Life
        </p>
        <h2 className="mt-2 text-[21px] font-extrabold tracking-tight text-[#000000] sm:text-[26px]">
          One Machine. Every Room. Every Reason.
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {items.map((item) => (
            <div key={item.label} className="text-left">
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  width={360}
                  height={360}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>
            <p className="mt-1.5 px-0.5 text-[17px] font-semibold text-[#000000] sm:text-[18px]">
           {item.label}
            </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}