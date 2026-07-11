export default function PromoBanner() {
  return (
    <div
      className="sticky top-0 z-[99999] w-full bg-[#3B1F0E] px-3 py-2.5 text-center"
      role="banner"
    >
      <p className="text-[12px] font-bold uppercase tracking-wide text-[#FAF7F2] sm:text-[13px]">
        🔥 Flash Promo — Save Up To{" "}
        <span className="text-[#C17F4A]">₦103,000</span> Today Only
      </p>
    </div>
  );
}