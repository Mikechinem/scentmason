type Tier = {
  key: string;
  name: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  original: string;
  price: string;
  saveLabel: string;
};

const TIERS: Tier[] = [
  {
    key: "1",
    name: "1 Set",
    subtitle: "Standard Personal Pack",
    badge: "40% OFF TODAY",
    badgeColor: "bg-black/80",
    original: "₦45,000",
    price: "₦27,000",
    saveLabel: "Save ₦18,000 instantly",
  },
  {
    key: "2",
    name: "2 Sets",
    subtitle: "Perfect For Living Room + Bedroom",
    badge: "🔥 MOST POPULAR",
    badgeColor: "bg-red-600",
    original: "₦90,000",
    price: "₦50,000",
    saveLabel: "Only ₦25,000 each — Save ₦40,000",
  },
  {
    key: "3",
    name: "3 Sets",
    subtitle: "For The Whole Downstairs",
    badge: "BEST FOR FAMILIES",
    badgeColor: "bg-[#3B1F0E]",
    original: "₦135,000",
    price: "₦73,000",
    saveLabel: "Save ₦62,000 total",
  },
  {
    key: "5",
    name: "5 Sets",
    subtitle: "The Full Home Set + 1 Free Oil",
    badge: "MAXIMUM SAVINGS",
    badgeColor: "bg-[#C17F4A]",
    original: "₦225,000",
    price: "₦122,000",
    saveLabel: "Save ₦103,000 + Free Oil Bottle",
  },
];

export default function PricingOfferStack() {
  return (
    <section className="px-4 py-10 bg-[#FAF7F2]">
      <div className="mx-auto w-full max-w-[560px] text-center">
        <p className="text-[12px] font-bold uppercase tracking-widest text-[#C17F4A]">
          Limited-Time Promo Pricing
        </p>
        <h2 className="mt-2 text-[22px] font-extrabold tracking-tight text-[#3B1F0E] sm:text-[28px]">
          Choose Your Automatic Fragrance Machine Set
        </h2>
        <p className="mt-2 text-[14px] font-medium text-black/60 sm:text-[15px]">
          Prices go back up when the promo ends.
        </p>

        <div className="mt-6 space-y-3">
          {TIERS.map((tier) => (
            <a
              key={tier.key}
              href="#order-form-start"
              className="relative flex w-full flex-col items-stretch rounded-2xl border-2 border-[#3B1F0E]/15 bg-white px-4 py-4 text-left shadow-sm transition-transform active:scale-[0.99] sm:px-5 sm:py-5"
            >
              <span
                className={`absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${tier.badgeColor}`}
              >
                {tier.badge}
              </span>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[16px] font-bold text-[#3B1F0E] sm:text-[17px]">
                    {tier.name}
                  </p>
                  <p className="mt-0.5 text-[12.5px] font-medium text-black/55 sm:text-[13px]">
                    {tier.subtitle}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[13px] font-medium text-black/40 line-through">
                    {tier.original}
                  </p>
                  <p className="text-[20px] font-extrabold text-[#3B1F0E] sm:text-[22px]">
                    {tier.price}
                  </p>
                </div>
              </div>

              <p className="mt-2 text-[12.5px] font-semibold text-red-600 sm:text-[13px]">
                {tier.saveLabel}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}