const points = [
  "Pay On Delivery — you inspect before you pay",
  "Nationwide delivery, tracked door to door",
  "60-day runtime on one charge, guaranteed",
];

export default function RiskReversalSection() {
  return (
    <div className="mx-auto w-full max-w-[480px] rounded-2xl border-2 border-[#3B1F0E]/15 bg-[#FAF7F2] px-5 py-5 text-center">
      <p className="text-[20px] font-bold text-[#000000] sm:text-[20px]">
        Zero Risk. Just A Better-Smelling Home.
      </p>
      <ul className="mt-3 space-y-2 text-left">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2 text-[15.5px] font-medium text-black/75 sm:text-[15px]"
          >
            <span className="mt-0.5 text-emerald-600">✔</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}