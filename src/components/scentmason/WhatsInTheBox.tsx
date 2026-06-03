import {
  productIntro,
  whatsInTheBox,
  whatsInTheBoxCallout,
} from "@/data/scentmason";

export default function WhatsInTheBox() {
  return (
    <section className="bg-[var(--background)] px-4 py-16">
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black text-[var(--accent)]">
            What’s Inside Your Order
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1] tracking-tight text-[var(--primary)]">
            Everything you need. Nothing missing. Unbox it, mount it, done.
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
            ScentMason comes as a complete starter set — the diffuser machine,
            signature fragrance oil, no-drill mount, USB cable, and setup guide.
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-soft">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
            <img
              src={productIntro.image}
              alt="ScentMason diffuser package showing the machine, oil bottle, mount, USB cable and manual"
              className="h-full w-full object-cover"
              loading="lazy"
            />

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[var(--background)]/95 p-4 shadow-soft">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--accent)]">
                Real Size
              </p>

              <p className="mt-1 text-xl font-black text-[var(--primary)]">
                14 × 6.5 × 2.8cm
              </p>

              <p className="mt-1 text-xs font-bold leading-5 text-[var(--text-muted)]">
                Slim by design, not bulky. It fits neatly in your room,
                bathroom, office, or closet.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {whatsInTheBox.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <h3 className="text-base font-black text-[var(--primary)]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm font-medium leading-6 text-[var(--text-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-[var(--primary)] p-5">
          <p className="text-base font-black leading-7 text-white">
            {whatsInTheBoxCallout}
          </p>
        </div>
      </div>
    </section>
  );
}