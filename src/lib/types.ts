export type HeroSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  image: string;
  imageAlt: string;
};

export type TrustBadge = {
  id: string;
  label: string;
  value: string;
};

export type PainPoint = {
  id: string;
  emoji: string;
  text: string;
};

export type Benefit = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  id: string;
  step: string;
  title: string;
  description: string;
};

export type VideoTestimonial = {
  id: string;
  title: string;
  customer: string;
  location: string;
  quote: string;
  thumbnail: string;
  videoUrl: string;
};

export type BoxItem = {
  id: string;
  title: string;
  description: string;
};

export type ComparisonRow = {
  id: string;
  feature: string;
  scentmason: string;
  sprayCan: string;
  candle: string;
  plugIn: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  rating: number;
};

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type PackageOption = {
  id: string;
  name: string;
  price: string;
  compareAt?: string;
  savings?: string;
  description: string;
  badge?: string;
};

export type OrderField = {
  id: string;
  label: string;
  name: string;
  type: "text" | "tel" | "textarea" | "select";
  placeholder: string;
  required?: boolean;
  options?: string[];
};
