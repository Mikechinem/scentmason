"use client";

import { type FormEvent } from "react";
import {
  fulfilmentTrust,
  guarantee,
  orderFields,
  orderForm,
  packages,
  sectionImages,
} from "@/data/scentmason";
import { OFFER, SECTION_IDS, WHATSAPP } from "@/lib/constants";

export default function OrderForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const fullName = String(form.get("fullName") || "");
    const phone = String(form.get("phone") || "");
    const state = String(form.get("state") || "");
    const address = String(form.get("address") || "");
    const packageId = String(form.get("packageId") || packages[0]?.id);

    const selectedPackage =
      packages.find((item) => item.id === packageId) || packages[0];

    const message = [
      "Hello ScentMason, I want to place an order.",
      "",
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `State: ${state}`,
      `Address: ${address}`,
      "",
      `Package: ${selectedPackage?.name}`,
      `Price: ${selectedPackage?.price}`,
      `Details: ${selectedPackage?.description}`,
      "",
      "Please contact me to confirm my order before dispatch.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${
      WHATSAPP.salesRepNumber
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id={SECTION_IDS.orderForm}
      className="bg-[var(--background)] px-4 py-16"
    >
      <div className="mx-auto w-full max-w-[430px]">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-black text-[var(--accent)]">
            {orderForm.eyebrow}
          </p>

          <h2 className="text-[2.1rem] font-black leading-[1] tracking-tight text-[var(--primary)]">
            {orderForm.headline}
          </h2>

          <p className="mt-5 text-base leading-7 text-[var(--text-muted)]">
            {orderForm.subheadline}
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-soft">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--surface-strong)]">
            <img
              src={sectionImages.orderForm}
              alt="ScentMason order package with diffuser and fragrance oil"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="mt-3 rounded-3xl bg-[var(--background)] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--accent)]">
              Your Starter Set
            </p>

            <p className="mt-1 text-xl font-black leading-tight text-[var(--primary)]">
              Diffuser + Signature Oil + Mount + USB Cable
            </p>

            <p className="mt-2 text-xs font-bold leading-5 text-[var(--text-muted)]">
              Submit your details first. Our sales rep confirms before dispatch.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-soft">
          <div className="rounded-[1.5rem] border border-[var(--primary)] bg-[var(--primary)] p-4 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent-soft)]">
                  Today’s Offer
                </p>

                <p className="mt-2 text-4xl font-black leading-none text-white">
                  {OFFER.offerPrice}
                </p>

                <p className="mt-2 text-xs font-bold text-[var(--background)]/85">
                  <span className="line-through">{OFFER.regularPrice}</span>{" "}
                  · {OFFER.savings}
                </p>
              </div>

              <div className="flex min-h-12 max-w-[118px] items-center justify-center rounded-2xl bg-green-100 px-3 py-2 text-center text-[10px] font-black leading-tight text-green-800">
                ☑️ Payment on delivery
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-white/10 p-3">
              <p className="text-xs font-bold leading-5 text-white">
                Less than 3 spray cans a month — but your home smells incredible
                for months.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-5">
              <p className="mb-3 text-sm font-black text-[var(--primary)]">
                Choose your package
              </p>

              <div className="space-y-3">
                {packages.map((item, index) => (
                  <div key={item.id}>
                    <input
                      id={`package-${item.id}`}
                      type="radio"
                      name="packageId"
                      value={item.id}
                      defaultChecked={index === 0}
                      className="peer sr-only"
                    />

                    <label
                      htmlFor={`package-${item.id}`}
                      className="block w-full cursor-pointer rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left transition peer-checked:border-[var(--primary)] peer-checked:bg-[var(--background)] peer-checked:ring-2 peer-checked:ring-[var(--primary)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-base font-black text-[var(--primary)]">
                              {item.name}
                            </p>

                            {item.badge ? (
                              <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[9px] font-black text-[var(--primary)]">
                                {item.badge}
                              </span>
                            ) : null}
                          </div>

                          <p className="mt-2 text-sm font-bold leading-5 text-[var(--text-muted)]">
                            {item.description}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-black text-[var(--primary)]">
                            {item.price}
                          </p>

                          {item.savings ? (
                            <p className="mt-1 text-[10px] font-black text-[var(--accent)]">
                              {item.savings}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {orderFields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-black text-[var(--primary)]"
                  >
                    {field.label}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full rounded-3xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 text-sm font-bold text-[var(--primary)] outline-none transition placeholder:text-[var(--text-muted)]/60 focus:border-[var(--primary)]"
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      defaultValue=""
                      className="w-full rounded-3xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 text-sm font-bold text-[var(--primary)] outline-none transition focus:border-[var(--primary)]"
                    >
                      <option value="">{field.placeholder}</option>

                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full rounded-3xl border border-[var(--border)] bg-[var(--background)] px-4 py-4 text-sm font-bold text-[var(--primary)] outline-none transition placeholder:text-[var(--text-muted)]/60 focus:border-[var(--primary)]"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-5 flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--primary)] px-6 py-4 text-center text-sm font-black text-white shadow-soft transition hover:bg-[var(--primary-hover)]"
            >
              {orderForm.submitLabel}
            </button>
          </form>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {fulfilmentTrust.points.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3"
              >
                <p className="text-[11px] font-black leading-5 text-[var(--primary)]">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-3xl bg-[var(--primary)] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent-soft)]">
              {guarantee.eyebrow}
            </p>

            <h3 className="mt-2 text-xl font-black leading-tight text-white">
              {guarantee.headline}
            </h3>

            <p className="mt-3 text-sm font-bold leading-6 text-[var(--background)]">
              {guarantee.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}