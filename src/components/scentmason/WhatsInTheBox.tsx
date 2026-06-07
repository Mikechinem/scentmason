import {
  sectionImages,
  whatsInTheBox,
  whatsInTheBoxCallout,
} from "@/data/scentmason";

export default function WhatsInTheBox() {
  return (
    <section className="bg-[var(--background)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[15px] font-black text-[var(--accent)]">
            What’s Inside Your Order
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1.08] tracking-[-0.01em] text-[var(--primary)]">
            Everything you need. Nothing missing. Unbox it, mount it, done.
          </h2>

          <p className="mt-5 text-[19px] font-medium leading-9 text-[var(--text-muted)]">
            ScentMason comes as a complete starter set — the diffuser machine,
            signature fragrance oil, no-drill mount, USB cable, and setup guide.
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-soft">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
            <img
              src={sectionImages.orderForm}
              alt="ScentMason Automatic Fragrance Machine package showing the machine, oil bottle, mount, USB cable and manual"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="mt-3 rounded-3xl bg-[var(--background)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--accent)]">
              Real Size
            </p>

            <p className="mt-1 text-[1.35rem] font-black leading-[1.12] tracking-[-0.01em] text-[var(--primary)]">
              14 × 6.5 × 2.8cm
            </p>

            <p className="mt-2 text-[17px] font-bold leading-8 text-[var(--text-muted)]">
              Slim by design, not bulky. It fits neatly in your room, bathroom,
              office, or closet.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {whatsInTheBox.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h3 className="text-[1.35rem] font-black leading-[1.12] tracking-[-0.01em] text-[var(--primary)]">
                {item.title}
              </h3>

              <p className="mt-2 text-[17px] font-medium leading-8 text-[var(--text-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-[var(--primary)] p-5">
          <p className="text-[19px] font-black leading-8 text-white">
            {whatsInTheBoxCallout}
          </p>
        </div>
      </div>
    </section>
  );
}