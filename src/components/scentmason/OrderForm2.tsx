"use client";

import { useMemo, useState, type FormEvent } from "react";

type SetOption = "1" | "2" | "3" | "4" | "5";
type OilOption = "0" | "1" | "2" | "3" | "4" | "5";

// Package pricing: price = discounted price, save = amount saved vs original
const SET_PRICING: Record<
  SetOption,
  { label: string; price: number; save: number }
> = {
  "1": { label: "1 Set", price: 34000, save: 11000 },
  "2": { label: "2 Sets", price: 66000, save: 24000 },
  "3": { label: "3 Sets", price: 98000, save: 37000 },
  "4": { label: "4 Sets", price: 130000, save: 42000 },
  "5": { label: "5 Sets", price: 160000, save: 55000 },
};

// Extra oil pricing: cumulative price for that many bottles
const OIL_PRICING: Record<OilOption, { label: string; price: number }> = {
  "0": { label: "No extra oil", price: 0 },
  "1": { label: "+1 Extra Oil Bottle", price: 10000 },
  "2": { label: "+2 Extra Oil Bottles", price: 17500 },
  "3": { label: "+3 Extra Oil Bottles", price: 24500 },
  "4": { label: "+4 Extra Oil Bottles", price: 34500 },
  "5": { label: "+5 Extra Oil Bottles", price: 42500 },
};

const STATES = [
  "Abuja (FCT)",
  "Lagos",
  "Rivers",
  "Oyo",
  "Kano",
  "Ogun",
  "Kaduna",
  "Enugu",
  "Delta",
  "Other",
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function OrderForm3() {
  const [sets, setSets] = useState<SetOption>("1");
  const [oil, setOil] = useState<OilOption>("0");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const setPricing = SET_PRICING[sets];
  const oilPricing = OIL_PRICING[oil];

  // Buy 5 machines, get 1 extra oil bottle free — applied automatically
  const freeOilGranted = sets === "5";
  const totalOilBottles = Number(oil) + (freeOilGranted ? 1 : 0);

  // Live running total — recalculates as either selection changes.
  // The free bottle from the 5-set rule never adds to the price.
  const total = useMemo(
    () => setPricing.price + oilPricing.price,
    [setPricing, oilPricing],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !state || !address.trim()) {
      setError("Please fill in all fields so we can confirm your order.");
      return;
    }

    setSubmitting(true);

    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "ScentMason Diffuser",
          value: total,
          currency: "NGN",
          num_items: sets,
        });
      }

      const res = await fetch("/api/track/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          state,
          address,
          sets,
          setPrice: setPricing.price,
          oilBottlesOrdered: Number(oil),
          oilBottlesFree: freeOilGranted ? 1 : 0,
          oilBottlesTotal: totalOilBottles,
          oilPrice: oilPricing.price,
          total,
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong sending your order. Please call or WhatsApp us on 0706 496 9603 to confirm.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div id="order-form-start" className="pt-6 text-center">
        <p className="text-[18px] font-semibold">Order Received ✅</p>
        <p className="mt-3 text-[14px] font-medium leading-6 text-black/70">
          Thank you, {name.split(" ")[0]}. A ScentMason sales rep will call
          you shortly on {phone} to confirm your order before dispatch.
        </p>
      </div>
    );
  }

  return (
    <div id="order-form-start" className="pt-6">
      <form onSubmit={handleSubmit} className="bg-white">
        {/* Big red warning */}
        <div className="rounded-xl border-2 border-red-600 bg-red-50 p-4">
          <p className="text-[14px] font-bold leading-6 text-red-700">
            IMPORTANT: PLEASE DO NOT fill this form if you don't have the
            money for it... OR if you're travelling in the next 2-4 days.
          </p>
        </div>

        {/* Packages — vertical list, 1 to 5 */}
        <p className="mt-6 text-[15px] font-semibold">Choose your package</p>

        <div className="mt-3 space-y-2">
          {(Object.keys(SET_PRICING) as SetOption[]).map((option) => {
            const data = SET_PRICING[option];
            const isActive = sets === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setSets(option)}
                className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left ${
                  isActive ? "border-black" : "border-black/10"
                }`}
              >
                <div>
                  <p className="text-[14px] font-semibold">{data.label}</p>
                  <p className="text-[12px] font-medium text-black/50">
                    Save {formatNaira(data.save)}
                  </p>
                </div>
                <p className="text-[16px] font-semibold">
                  {formatNaira(data.price)}
                </p>
              </button>
            );
          })}
        </div>

        {freeOilGranted && (
          <p className="mt-2 text-[12px] font-semibold text-green-700">
            🎉 You qualify for 1 free extra fragrance oil bottle with 5 sets!
          </p>
        )}

        {/* Extra oil — vertical list, 0 to 5 */}
        <p className="mt-6 text-[15px] font-semibold">Add extra oil</p>
        <p className="mt-1 text-[13px] font-medium text-black/60">
          Want extra fragrance oil with your order? Select how many extra
          bottles you'd like added.
        </p>

        <div className="mt-3 space-y-2">
          {(Object.keys(OIL_PRICING) as OilOption[]).map((option) => {
            const data = OIL_PRICING[option];
            const isActive = oil === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setOil(option)}
                className={`flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left ${
                  isActive ? "border-black" : "border-black/10"
                }`}
              >
                <p className="text-[14px] font-semibold">{data.label}</p>
                <p className="text-[16px] font-semibold">
                  {data.price === 0 ? "₦0" : `+${formatNaira(data.price)}`}
                </p>
              </button>
            );
          })}
        </div>

        {/* Live order total */}
        <div className="mt-6 rounded-xl border-2 border-black px-4 py-4">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-black/50">
            Order Total
          </p>
          <p className="mt-1 text-[13px] font-medium text-black/70">
            {setPricing.label} ·{" "}
            {totalOilBottles > 0
              ? `${totalOilBottles} oil bottle${totalOilBottles > 1 ? "s" : ""}${freeOilGranted ? " (1 free)" : ""}`
              : "no extra oil"}
          </p>
          <p className="mt-2 text-[22px] font-semibold">
            {formatNaira(total)}
          </p>
        </div>

        {/* Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-[13px] font-medium text-black/70">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chioma Adeyemi"
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-black/70">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08012345678"
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[13px] font-medium text-black/70">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium outline-none focus:border-black"
            >
              <option value="">Select your state</option>
              {STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[13px] font-medium text-black/70">
              Delivery Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House number, street, area, landmark"
              rows={3}
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium outline-none focus:border-black"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-[13px] font-semibold text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-[#e8fbf0] px-6 py-4 text-center text-[16px] font-semibold text-black disabled:opacity-60"
        >
          {submitting
            ? "Sending Your Order..."
            : `YES I WANT THIS NOW — ${formatNaira(total)}`}
        </button>

        <p className="mt-4 text-center text-[12px] font-medium text-black/50">
          A sales rep will call to confirm before your order is dispatched.
        </p>
      </form>
    </div>
  );
}