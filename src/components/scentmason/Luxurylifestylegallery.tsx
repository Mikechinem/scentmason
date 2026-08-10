import Image from "next/image";

// A tiny neutral placeholder — swap for real per-image base64 blurs (e.g. via the
// `plaiceholder` package at build time) for accurate blur-up; this is a generic stand-in.
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

type LifestyleImage = {
  src: string;
  alt: string;
  caption: string;
};

const images: LifestyleImage[] = [
  {
    src: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/family_stone%20(1).png?updatedAt=1783274641004&tr=w-900,q-80,f-webp",
    alt: "Smart Fragrance Machine in a family living room",
    caption: "Built for the rooms you actually live in",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/diffuser_satone_lake%20(3).png?updatedAt=1783274640881&tr=w-900,q-80,f-webp",
    alt: "Automatic fragrance machine styled in an elegant home setting",
    caption: "Quiet, considered, always on",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/wall_office_mount.png?updatedAt=1780841614076&tr=w-900,q-80,f-webp",
    alt: "Fragrance machine wall-mounted in an office",
    caption: "No drilling. Mounts anywhere.",
  },
  {
    src: "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/unbox_real.png?updatedAt=1781023129314&tr=w-900,q-80,f-webp",
    alt: "Unboxing the ScentMason automatic fragrance machine",
    caption: "Everything you need, nothing you don't",
  },
];

export default function LuxuryLifestyleGallery() {
  return (
    <section className="space-y-24 bg-zinc-950 px-4 py-24 md:space-y-32 md:py-32">
      {images.map((img, index) => (
        <div key={img.src} className="mx-auto max-w-[720px]">
          <div className="relative w-full overflow-hidden rounded-sm bg-zinc-900">
            <Image
              src={img.src}
              alt={img.alt}
              width={900}
              height={900}
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full object-cover transition-all duration-500 ease-out"
            />
          </div>
          <p
            className={`mt-6 text-[15px] font-medium tracking-wide text-zinc-400 ${
              index % 2 === 0 ? "text-left" : "text-right"
            }`}
          >
            {img.caption}
          </p>
        </div>
      ))}
    </section>
  );
}