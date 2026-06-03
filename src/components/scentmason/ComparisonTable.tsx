import { comparisonRows, sectionImages } from "@/data/scentmason";

const columns = [
  {
    key: "scentmason",
    label: "ScentMason",
    className: "bg-[var(--primary)] text-white",
  },
  {
    key: "sprayCan",
    label: "Spray Can",
    className: "bg-[var(--surface)] text-[var(--primary)]",
  },
  {
    key: "candle",
    label: "Candle",
    className: "bg-[var(--surface)] text-[var(--primary)]",
  },
  {
    key: "plugIn",
    label: "Plug-In",
    className: "bg-[var(--surface)] text-[var(--primary)]",
  },
] as const;

export default function ComparisonTable() {
  return (
    <section className="bg-[var(--surface)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-xs font-black text-[var(--accent)]">
            Why It Feels Different
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1] tracking-tight text-[var(--primary)]">
            Spray cans smell good for minutes. ScentMason works in the
            background.
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
            You don&apos;t want to keep spraying, lighting candles, or looking
            for a socket. You want your home to smell ready before guests even
            enter.
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--background)] p-2 shadow-soft">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
            <img
              src={sectionImages.comparison}
              alt="ScentMason diffuser compared against spray cans, candles, and plug-in diffusers"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="mt-3 rounded-3xl bg-[var(--surface)] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--accent)]">
              Set Once. No Babysitting.
            </p>

            <p className="mt-1 text-xl font-black leading-tight text-[var(--primary)]">
              This is not another spray can.
            </p>

            <p className="mt-2 text-xs font-bold leading-5 text-[var(--text-muted)]">
              It charges, sprays automatically, mounts without drilling, and
              keeps the scent consistent.
            </p>
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--background)] shadow-soft">
          <div className="bg-[var(--primary)] px-5 py-5">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--accent-soft)]">
              Quick Comparison
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-white">
              What you stop dealing with after switching.
            </h3>
          </div>

          <div className="space-y-4 p-4">
            {comparisonRows.map((row) => (
              <div
                key={row.id}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4"
              >
                <p className="mb-3 text-sm font-black leading-6 text-[var(--primary)]">
                  {row.feature}
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {columns.map((column) => (
                    <div
                      key={column.key}
                      className={`rounded-2xl px-2 py-3 text-center ${column.className}`}
                    >
                      <p className="text-[9px] font-black leading-tight">
                        {column.label}
                      </p>

                      <p className="mt-2 text-sm font-black leading-tight">
                        {row[column.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] bg-[var(--background)] p-5">
            <p className="text-base font-black leading-7 text-[var(--primary)]">
              The real difference is simple: ScentMason is not something you
              remember to use. It is something you set once and let it work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}