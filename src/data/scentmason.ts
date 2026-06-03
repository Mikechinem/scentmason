import type {
  Benefit,
  BoxItem,
  ComparisonRow,
  FAQItem,
  HeroSlide,
  HowItWorksStep,
  OrderField,
  PackageOption,
  PainPoint,
  Testimonial,
  TrustBadge,
  VideoTestimonial,
} from "@/lib/types";

import { OFFER, PRODUCT_SPECS } from "@/lib/constants";

const HERO_IMAGE_1 =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/spa_woman_refreshed.png?updatedAt=1780413593619";

const HERO_IMAGE_2 =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el6.png?updatedAt=1780413593841";

const HERO_IMAGE_3 =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el3.png?updatedAt=1780413593766";

const PRODUCT_IMAGE = 
"https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/product_unveil.png"

const COMPARISON_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el1.png?updatedAt=1780413594782";

const ORDER_FORM_IMAGE =
  "https://ik.imagekit.io/j1e78ujalr/boxify_testimonilas_edited/perfume_diffuser_48hrs-60days/el2.png?updatedAt=1780413593681";

export const sectionImages = {
  comparison: COMPARISON_IMAGE,
  orderForm: ORDER_FORM_IMAGE,
};
const VIDEO_THUMBNAIL = HERO_IMAGE_1;
const EMPTY_VIDEO_URL = "";

export const heroSlides: HeroSlide[] = [
  {
    id: "bedroom-hotel",
    eyebrow: "🛏️ For Your Bedroom",
    headline: "The 5 star hotel smell and feeling now brought to your bedrom. All day. All night.",
    subheadline:
      "Set it once. Wake up to a room that smells incredible — automatically.",
    image: HERO_IMAGE_1,
    imageAlt:
      "ScentMason diffuser in a warm Nigerian bedroom that feels like a 5-star hotel",
  },
  {
    id: "guest-compliment",
    eyebrow: "🏠 For Your Guests",
    headline: "Your guests will always ask. You’ll never have to explain.",
    subheadline:
      "Your home has a scent now. One that makes people stop and notice.",
    image: HERO_IMAGE_2,
    imageAlt:
      "ScentMason diffuser in an elegant living room prepared for guests",
  },
  {
    id: "no-plug-no-drill",
    eyebrow: "🔋 60 Days. No Plug. No Drill.",
    headline: "Charges in 2 hours. Smells amazing for 60 days.",
    subheadline:
      "No wall socket. No drilling. No thinking about it. Just your home, always smelling perfect.",
    image: HERO_IMAGE_3,
    imageAlt:
      "ScentMason rechargeable diffuser mounted neatly without drilling or plugging in",
  },
];

export const trustBadges: TrustBadge[] = [
  {
    id: "rating",
    value: "4.8/5",
    label: "Customer rating",
  },
  {
    id: "delivery",
    value: "2–3 Days",
    label: "Nationwide delivery",
  },
  {
    id: "battery",
    value: "60 Days",
    label: "Battery life",
  },
  {
    id: "guarantee",
    value: "30 Days",
    label: "Replacement guarantee",
  },
];

export const socialProofBar = {
  text: "Nigerian homes are upgrading from spray cans to a cleaner, more effortless scent experience.",
};

export const painSection = {
  eyebrow: "Sound familiar?",
  headline: "Your home should not smell good only when you remember to spray.",
  subheadline:
    "You do not want to babysit a spray can, fight with plug sockets, or worry that guests will walk into a room that feels heavy.",
  transition: "ScentMason fixes all of this. Automatically.",
};

export const painPoints: PainPoint[] = [
  {
    id: "spray-fades",
    emoji: "😤",
    text: "You sprayed before they arrived. An hour later — nothing. Your guests walked into nothing.",
  },
  {
    id: "plug-corner",
    emoji: "🔌",
    text: "Every plug-in diffuser you’ve tried chains you to one corner of the room.",
  },
  {
    id: "landlord-no-drill",
    emoji: "🔩",
    text: "Your landlord said no drilling. So your walls stay untouched and your space stays generic.",
  },
  {
    id: "generator-fumes",
    emoji: "😮‍💨",
    text: "The generator ran all night. You know that smell. Your guests know it too.",
  },
];

export const productIntro = {
  eyebrow: "Meet ScentMason",
  headline:
    "The diffuser that makes your home smell intentional — without stress.",
  description:
    "Meet the diffuser that runs for 60 days on a single charge, mounts without drilling, and sprays on its own — so your home always smells the way you intended.",
  image: PRODUCT_IMAGE,
  imageAlt: "ScentMason automatic fragrance diffuser product shot",
};

export const benefits: Benefit[] = [
  {
    id: "bedroom",
    icon: "🛏️",
    title: "Bedroom",
    description:
      "Drift off to sleep in a room that smells like a luxury hotel. Wake up to the same.",
  },
  {
    id: "living-room",
    icon: "🪑",
    title: "Living Room",
    description:
      "The first thing guests notice when they walk in. You didn’t have to do a thing.",
  },
  {
    id: "bathroom",
    icon: "🚿",
    title: "Bathroom",
    description:
      "Small space. Big impression. Mount it above the door — no drilling required.",
  },
  {
    id: "home-office",
    icon: "💼",
    title: "Home Office",
    description:
      "Warm scent in the morning. Fresh energy in the afternoon. You control the mood.",
  },
  {
    id: "any-room",
    icon: "🏠",
    title: "Any Room",
    description:
      "No socket needed. Move it freely — bedroom, kitchen, guest room, closet.",
  },
];

export const howItWorks: HowItWorksStep[] = [
  {
    id: "mount",
    step: "Step 1",
    title: "Mount It",
    description: "Peel, stick, press. No drilling. No tools. 30 seconds.",
  },
  {
    id: "set-speed",
    step: "Step 2",
    title: "Set Your Speed",
    description: "Choose your intensity on the digital display. 6 levels.",
  },
  {
    id: "forget-it",
    step: "Step 3",
    title: "Forget It",
    description: "It sprays automatically. You get compliments. You do nothing.",
  },
];

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "unboxing-size",
    title: "Real unboxing. Real size.",
    customer: "ScentMason Demo",
    location: "Lagos",
    quote:
      "See the diffuser, the oil bottle, the mount, and exactly how it looks before it gets to you.",
    thumbnail: VIDEO_THUMBNAIL,
    videoUrl: EMPTY_VIDEO_URL,
  },
  {
    id: "mounting-demo",
    title: "No drilling. No tools.",
    customer: "ScentMason Demo",
    location: "Abuja",
    quote:
      "Watch how it mounts neatly on the wall without damaging your apartment.",
    thumbnail: VIDEO_THUMBNAIL,
    videoUrl: EMPTY_VIDEO_URL,
  },
  {
    id: "guest-reaction",
    title: "The guest compliment effect.",
    customer: "Customer Story",
    location: "Nigeria",
    quote:
      "That moment someone walks in and says, ‘your house smells so good.’",
    thumbnail: VIDEO_THUMBNAIL,
    videoUrl: EMPTY_VIDEO_URL,
  },
];

export const whatsInTheBox: BoxItem[] = [
  {
    id: "diffuser",
    title: "1 × ScentMason Diffuser",
    description: `${PRODUCT_SPECS.size} — slim by design, so it fits your space without looking bulky.`,
  },
  {
    id: "oil",
    title: "1 × Signature Fragrance Oil",
    description:
      "80ml warm, layered fragrance blend curated for Nigerian homes.",
  },
  {
    id: "mount",
    title: "1 × No-Drill Wall Mount",
    description:
      "Stick it neatly without drilling your wall or annoying your landlord.",
  },
  {
    id: "usb",
    title: "1 × USB Charging Cable",
    description:
      "Charge in about 2 hours and enjoy long-lasting automatic fragrance.",
  },
  {
    id: "manual",
    title: "1 × User Manual",
    description:
      "Simple setup instructions so you can unbox it, mount it, and start using it fast.",
  },
];

export const whatsInTheBoxCallout =
  "Everything you need. Nothing missing. Unbox it, mount it, done.";

export const comparisonRows: ComparisonRow[] = [
  {
    id: "lasts-60-days",
    feature: "Lasts up to 60 days on one charge",
    scentmason: "✅",
    sprayCan: "❌",
    candle: "❌",
    plugIn: "❌",
  },
  {
    id: "no-drill",
    feature: "No wall drilling",
    scentmason: "✅",
    sprayCan: "✅",
    candle: "✅",
    plugIn: "❌",
  },
  {
    id: "no-socket",
    feature: "No socket needed while in use",
    scentmason: "✅",
    sprayCan: "✅",
    candle: "✅",
    plugIn: "❌",
  },
  {
    id: "automatic",
    feature: "Automatic — no effort",
    scentmason: "✅",
    sprayCan: "❌",
    candle: "❌",
    plugIn: "✅",
  },
  {
    id: "no-flame",
    feature: "No open flame",
    scentmason: "✅",
    sprayCan: "✅",
    candle: "❌",
    plugIn: "✅",
  },
  {
    id: "rechargeable",
    feature: "Rechargeable",
    scentmason: "✅",
    sprayCan: "❌",
    candle: "❌",
    plugIn: "❌",
  },
  {
    id: "heavy-air",
    feature: "Keeps fragrance consistent after heat, cooking, or generator fumes",
    scentmason: "✅",
    sprayCan: "⚠️ Short-lived",
    candle: "⚠️ Needs attention",
    plugIn: "⚠️ Needs socket",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "amara-lagos",
    name: "Amara",
    location: "Lekki, Lagos",
    rating: 5,
    quote:
      "My guests always ask what I use. The funny thing is I don’t even remember to spray anything anymore. It just works.",
  },
  {
    id: "chioma-abuja",
    name: "Chioma",
    location: "Wuse, Abuja",
    rating: 5,
    quote:
      "I wanted my room to smell like a hotel without candles everywhere. This gave me that exact feeling.",
  },
  {
    id: "tomi-yaba",
    name: "Tomi",
    location: "Yaba, Lagos",
    rating: 5,
    quote:
      "No drilling was what convinced me. I rent my apartment, so I needed something clean, simple, and no stress.",
  },
];

export const fulfilmentTrust = {
  eyebrow: "Delivered by Boxify",
  headline: "Place your order. We confirm. Boxify handles delivery.",
  description:
    "After you submit your order, our sales rep confirms your details on WhatsApp or phone call before dispatch. Your ScentMason order is then handled through Boxify for smooth nationwide delivery.",
  points: [
    "Nationwide delivery",
    "2–3 days delivery timeline",
    "WhatsApp confirmation before dispatch",
    "Order handled through Boxify",
  ],
};

export const guarantee = {
  eyebrow: "No stress. No runaround.",
  headline: OFFER.guarantee,
  description:
    "If anything is wrong when your ScentMason diffuser arrives, contact us on WhatsApp within 30 days. We’ll sort it with a replacement. No stress. No runaround.",
};

export const scarcity = {
  eyebrow: "Limited batch available",
  headline:
    "Only a limited number of ScentMason diffusers are available in this batch.",
  description:
    "Orders are confirmed on a first-come basis. Submit your details now and our sales rep will contact you before dispatch.",
};

export const packages: PackageOption[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₦34,000",
    compareAt: "₦45,000",
    savings: "Save ₦11,000",
    description: "1 Diffuser + 1 Signature Oil + Mount + USB Cable",
  },
  {
    id: "home-duo",
    name: "Home Duo",
    price: "₦62,000",
    compareAt: "₦68,000",
    savings: "Save ₦6,000",
    description: "2 Diffusers + 2 Signature Oils for bedroom and living room",
    badge: "Popular",
  },
  {
    id: "full-home",
    name: "Full Home",
    price: "₦88,000",
    compareAt: "₦102,000",
    savings: "Save ₦14,000",
    description: "3 Diffusers + 3 Signature Oils for multiple rooms",
  },
];

export const orderForm = {
  eyebrow: "Place your order",
  headline: `Order ScentMason today for ${OFFER.offerPrice}`,
  subheadline:
    "Fill in your details below. Our sales rep will contact you to confirm your order before dispatch.",
  priceLine: `${OFFER.regularPrice} → ${OFFER.offerPrice}`,
  savingsLine: OFFER.savings,
  mentalReframe:
    "Less than 3 spray cans a month — but your home smells incredible for weeks.",
  submitLabel: "Submit My Order Request",
};

export const orderFields: OrderField[] = [
  {
    id: "full-name",
    label: "Full Name",
    name: "fullName",
    type: "text",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    id: "phone",
    label: "WhatsApp / Phone Number",
    name: "phone",
    type: "tel",
    placeholder: "Enter your WhatsApp number",
    required: true,
  },
  {
    id: "state",
    label: "Delivery State",
    name: "state",
    type: "select",
    placeholder: "Select your delivery state",
    required: true,
    options: [
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "FCT - Abuja",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nasarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
    ],
  },
  {
    id: "address",
    label: "Delivery Address",
    name: "address",
    type: "textarea",
    placeholder: "Enter your full delivery address",
    required: true,
  },
];

export const faqs: FAQItem[] = [
  {
    id: "size",
    question: "Is the diffuser as big as it looks in the photos?",
    answer:
      "ScentMason is slim by design. The actual size is 14 × 6.5 × 2.8cm, so it fits neatly on your wall, shelf, bathroom, bedroom, or office without looking bulky.",
  },
  {
    id: "oil-last",
    question: "How long does the oil actually last?",
    answer:
      "The included oil is 80ml. How long it lasts depends on the spray speed you choose, but the diffuser is designed for long-lasting automatic fragrance instead of quick one-time spraying.",
  },
  {
    id: "generator-fumes",
    question: "Will it work against generator fumes or heavy room smell?",
    answer:
      "ScentMason is not an air purifier, so it does not clean the air. What it does is keep a consistent fragrance in your space, which helps your room feel fresher after heat, cooking, bathroom smell, or generator fumes.",
  },
  {
    id: "pets",
    question: "Is it safe around pets?",
    answer:
      "The supplier describes the fragrance as pet-safe. Still, use it in a ventilated space, start with a low spray setting, and keep the oil bottle away from direct contact with pets or children.",
  },
  {
    id: "no-drilling",
    question: "Can I use it without drilling my wall?",
    answer:
      "Yes. ScentMason comes with a no-drill wall sticky hook, so renters can mount it without damaging the wall.",
  },
  {
    id: "battery",
    question: "Do I need to keep it plugged in?",
    answer:
      "No. Charge it with the USB cable, then use it without keeping it connected to a socket. It charges in about 2 hours and can last up to 60 days depending on your spray setting.",
  },
  {
    id: "stops-working",
    question: "What if it stops working or arrives faulty?",
    answer:
      "You are covered by our 30-Day Replacement Guarantee. Contact us on WhatsApp within 30 days if there is a fault when it arrives, and we’ll sort it out.",
  },
  {
    id: "payment",
    question: "How does payment work?",
    answer:
      "Submit your order details first. Our sales rep will contact you to confirm your order, payment arrangement, and delivery details before dispatch.",
  },
  {
    id: "delivery",
    question: "How long does delivery take?",
    answer:
      "Delivery is nationwide and typically takes 2–3 days after your order has been confirmed.",
  },
];

export const finalCta = {
  eyebrow: "Your home already has a smell.",
  headline: "The question is whether it smells intentional.",
  description:
    "ScentMason helps your room feel warm, elevated, and guest-ready without spray cans, drilling, plug stress, or daily reminders.",
  buttonLabel: "Order ScentMason Now",
};

export const stickyBar = {
  text: "ScentMason — ₦34,000 · Nationwide Delivery · 2–3 Days",
  buttonLabel: "Order Now",
};