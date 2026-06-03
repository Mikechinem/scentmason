export const BRAND = {
  name: "ScentMason",
  tagline: "Delighting life with scent",
  description:
    "A rechargeable automatic fragrance diffuser made for Nigerian homes that want a warm, hotel-like scent without spraying, drilling, or plugging in.",
};

export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const IMAGEKIT = {
  baseUrl:
    process.env.NEXT_PUBLIC_IMAGEKIT_URL ||
    "https://ik.imagekit.io/j1e78ujalr",

  scentMasonFolder:
    "boxify_testimonilas_edited/perfume_diffuser_48hrs-60days",
};

export function imageKitUrl(path: string) {
  const baseUrl = IMAGEKIT.baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return `${baseUrl}/${cleanPath}`;
}

export function scentMasonAsset(fileName: string) {
  return imageKitUrl(`${IMAGEKIT.scentMasonFolder}/${fileName}`);
}

export const SCENTMASON_IMAGES = {
  heroBedroom: scentMasonAsset(
    "spa_woman_refreshed.png?updatedAt=1780413593619"
  ),

  heroGuests: scentMasonAsset(
    "spa_woman_refreshed.png?updatedAt=1780413593619"
  ),

  heroNoPlug: scentMasonAsset(
    "spa_woman_refreshed.png?updatedAt=1780413593619"
  ),

  productMain: scentMasonAsset(
    "spa_woman_refreshed.png?updatedAt=1780413593619"
  ),

  videoUnboxingThumb: scentMasonAsset(
    "spa_woman_refreshed.png?updatedAt=1780413593619"
  ),

  videoMountingThumb: scentMasonAsset(
    "spa_woman_refreshed.png?updatedAt=1780413593619"
  ),

  videoTestimonialThumb: scentMasonAsset(
    "spa_woman_refreshed.png?updatedAt=1780413593619"
  ),

  videoUnboxing: scentMasonAsset("unboxing.mp4"),
  videoMounting: scentMasonAsset("mounting.mp4"),
  videoTestimonial: scentMasonAsset("testimonial.mp4"),
};

export const WHATSAPP = {
  salesRepNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "234XXXXXXXXXX",
};

export const OFFER = {
  productName: "ScentMason Automatic Fragrance Diffuser",
  regularPrice: "₦45,000",
  offerPrice: "₦34,000",
  savings: "Save ₦11,000 today",
  delivery: "Nationwide delivery",
  deliveryTimeline: "2–3 days delivery",
  fulfilmentPartner: "Boxify",
  guarantee: "30-Day Replacement Guarantee",
};

export const PRODUCT_SPECS = {
  capacity: "80ml",
  size: "14 × 6.5 × 2.8cm",
  material: "ABS",
  battery: "18650 high-density rechargeable battery chip",
  chargeTime: "Charges in about 2 hours",
  batteryLife: "Up to 60 days depending on setting",
  speedLevels: "6-speed adjustment",
};

export const TRACKING = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  googleAdsConversionId: process.env.NEXT_PUBLIC_GA_ADS_CONVERSION_ID || "",
};

export const SECTION_IDS = {
  howItWorks: "how-it-works",
  orderForm: "order-form",
};
