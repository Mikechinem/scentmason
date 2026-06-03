import { trustBadges } from "@/data/scentmason";

const badgeIcons: Record<string, string> = {
  rating: "⭐",
  delivery: "🚚",
  battery: "🔋",
  guarantee: "🛡️",
};

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {trustBadges.map((badge) => (
        <div
          key={badge.id}
          className="flex min-h-[72px] flex-col items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-2 py-3 text-center"
        >
          <div className="mb-1 text-base leading-none">
            {badgeIcons[badge.id] || "✨"}
          </div>

          <p className="text-[11px] font-black leading-tight text-[var(--primary)]">
            {badge.value}
          </p>

          <p className="mt-1 text-[9px] font-bold leading-tight text-[var(--text-muted)]">
            {badge.label}
          </p>
        </div>
      ))}
    </div>
  );
}
