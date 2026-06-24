"use client";

import { useState, type FormEvent } from "react";

type SetOption = "1" | "2" | "3" | "4" | "5";
type OilOption = "0" | "1" | "2" | "3" | "4" | "5";

const SET_PRICING: Record<SetOption, { label: string; price: number; save: number }> = {
  "1": { label: "1 Set", price: 34000, save: 11000 },
  "2": { label: "2 Sets", price: 66000, save: 24000 },
  "3": { label: "3 Sets", price: 98000, save: 37000 },
  "4": { label: "4 Sets", price: 130000, save: 42000 },
  "5": { label: "5 Sets", price: 160000, save: 55000 },
};

const OIL_PRICING: Record<OilOption, { label: string; price: number }> = {
  "0": { label: "No extra oil", price: 0 },
  "1": { label: "+1 Extra Oil Bottle", price: 10000 },
  "2": { label: "+2 Extra Oil Bottles", price: 17500 },
  "3": { label: "+3 Extra Oil Bottles", price: 24500 },
  "4": { label: "+4 Extra Oil Bottles", price: 34500 },
  "5": { label: "+5 Extra Oil Bottles", price: 42500 },
};

const STATES = [
  "Abia", "Abuja (FCT)", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers",
];

function formatNaira(amount: number) {
  return `₦${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function OrderForm3() {
  const [sets, setSets] = useState<SetOption>("1");
  const [oil, setOil] = useState<OilOption>("0");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const setPricing = SET_PRICING[sets];
  const oilPricing = OIL_PRICING[oil];
  const freeOilGranted = sets === "5";
  const totalOilBottles = Number(oil) + (freeOilGranted ? 1 : 0);
  const total = setPricing.price + oilPricing.price;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Read values directly from the DOM elements to ensure accurate fallback data
    const finalSets = (document.getElementById("native-hidden-sets") as HTMLInputElement)?.value || sets;
    const finalOil = (document.getElementById("native-hidden-oil") as HTMLInputElement)?.value || oil;
    const currentTotal = SET_PRICING[finalSets as SetOption].price + OIL_PRICING[finalOil as OilOption].price;

    if (!name.trim() || !phone.trim() || !state || !address.trim()) {
      setError("Please fill in all fields so we can confirm your order.");
      return;
    }

    setSubmitting(true);
    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "ScentMason Diffuser",
          value: currentTotal,
          currency: "NGN",
          num_items: finalSets,
        });
      }

      const res = await fetch("/api/track/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, phone, whatsapp, state, address, 
          sets: finalSets,
          setPrice: SET_PRICING[finalSets as SetOption].price,
          oilBottlesOrdered: Number(finalOil),
          oilBottlesFree: finalSets === "5" ? 1 : 0,
          oilBottlesTotal: Number(finalOil) + (finalSets === "5" ? 1 : 0),
          oilPrice: OIL_PRICING[finalOil as OilOption].price,
          total: currentTotal,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your order. Please call or WhatsApp us on 0706 496 9603 to confirm.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="pt-6 text-center">
        <p className="text-[18px] font-semibold">Order Received ✅</p>
        <p className="mt-3 text-[14px] font-medium leading-6 text-black/70">
          Thank you, {name.split(" ")[0]}. A ScentMason sales rep will call you shortly on {phone} to confirm your order.
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-[999999] pt-6" id="unbreakable-form-container">
      {/* Hidden trackers for safe Vanilla-to-React data transfer */}
      <input type="hidden" id="native-hidden-sets" value={sets} onChange={() => {}} />
      <input type="hidden" id="native-hidden-oil" value={oil} onChange={() => {}} />

      <form onSubmit={handleSubmit} className="bg-white text-black">
        <div className="rounded-xl border-2 border-red-600 bg-red-50 p-4">
          <p className="text-[14px] font-bold leading-6 text-red-700">
            IMPORTANT: PLEASE DO NOT fill this form if you don&apos;t have the money for it... OR if you&apos;re travelling in the next 2-4 days.
          </p>
        </div>

        {/* Packages Layout */}
        <p className="mt-6 text-[15px] font-semibold">Choose your package</p>
        <div className="mt-3 space-y-2" id="package-buttons-wrapper">
          {(Object.keys(SET_PRICING) as SetOption[]).map((option) => {
            const data = SET_PRICING[option];
            const isActive = sets === option;

            return (
              <button
                type="button"
                key={option}
                data-option-type="package"
                data-value={option}
                data-price={data.price}
                data-label={data.label}
                onClick={() => setSets(option)}
                className={`native-selectable-btn flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all ${
                  isActive ? "border-black bg-black/[0.04]" : "border-black/10 bg-white"
                }`}
              >
                <div>
                  <p className="text-[14px] font-semibold text-black">{data.label}</p>
                  <p className="text-[12px] font-medium text-black/50">Save {formatNaira(data.save)}</p>
                </div>
                <p className="text-[16px] font-semibold text-black">{formatNaira(data.price)}</p>
              </button>
            );
          })}
        </div>

        {/* Extra oil Layout */}
        <p className="mt-6 text-[15px] font-semibold">Add extra oil</p>
        <p className="mt-1 text-[13px] font-medium text-black/60">
          Want extra fragrance oil added to your order? Select how many extra bottles you&apos;d like.
        </p>
        <div className="mt-3 space-y-2" id="oil-buttons-wrapper">
          {(Object.keys(OIL_PRICING) as OilOption[]).map((option) => {
            const data = OIL_PRICING[option];
            const isActive = oil === option;

            return (
              <button
                type="button"
                key={option}
                data-option-type="oil"
                data-value={option}
                data-price={data.price}
                onClick={() => setOil(option)}
                className={`native-selectable-btn flex w-full items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all ${
                  isActive ? "border-black bg-black/[0.04]" : "border-black/10 bg-white"
                }`}
              >
                <p className="text-[14px] font-semibold text-black">{data.label}</p>
                <p className="text-[16px] font-semibold text-black">
                  {data.price === 0 ? "₦0" : `+${formatNaira(data.price)}`}
                </p>
              </button>
            );
          })}
        </div>

        {/* Total Summary Box */}
        <div className="mt-6 rounded-xl border-2 border-black px-4 py-4 bg-white">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-black/50">Order Total</p>
          <p className="mt-1 text-[13px] font-medium text-black/70" id="native-display-summary">
            {setPricing.label} · {totalOilBottles > 0 ? `${totalOilBottles} bottles` : "no extra oil"}
          </p>
          <p className="mt-2 text-[22px] font-semibold text-black" id="native-display-total">
            {formatNaira(total)}
          </p>
        </div>

        {/* Fields */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-[13px] font-medium text-black/70">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Chioma Adeyemi" className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium text-black outline-none focus:border-black" />
          </div>
          <div>
            <label className="text-[13px] font-medium text-black/70">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium text-black outline-none focus:border-black" />
          </div>
          <div>
            <label className="text-[13px] font-medium text-black/70">WhatsApp Number</label>
            <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="08012345678" className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium text-black outline-none focus:border-black" />
          </div>
          <div>
            <label className="text-[13px] font-medium text-black/70">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium text-black outline-none focus:border-black">
              <option value="">Select your state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[13px] font-medium text-black/70">Delivery Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House number, street, area, landmark" rows={3} className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-[15px] font-medium text-black outline-none focus:border-black" />
          </div>
        </div>

        {error && <p className="mt-4 text-[13px] font-semibold text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          id="native-submit-btn"
          className="mt-6 w-full rounded-full bg-[#25D366] px-6 py-4 text-center text-[17px] font-semibold text-white disabled:opacity-60"
        >
          {submitting ? "Sending Your Order..." : `YES I WANT THIS NOW — ${formatNaira(total)}`}
        </button>

        <p className="mt-4 text-center text-[12px] font-medium text-black/50">
          A sales rep will call to confirm before your order is dispatched.
        </p>
      </form>

      {/* VANILLA FALLBACK ENGINE */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var container = document.getElementById("unbreakable-form-container");
          if (!container) return;

          var currentPkgPrice = 34000;
          var currentOilPrice = 0;
          var currentPkgValue = "1";
          var currentOilValue = "0";
          var currentPkgLabel = "1 Set";

          function formatMoney(num) {
            return "₦" + String(num).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
          }

          function updateDOMCalculations() {
            var total = currentPkgPrice + currentOilPrice;
            var oilNum = parseInt(currentOilValue, 10);
            var freeOil = currentPkgValue === "5" ? 1 : 0;
            var totalOil = oilNum + freeOil;
            var oilText = totalOil > 0 ? totalOil + " bottle" + (totalOil > 1 ? "s" : "") : "no extra oil";
            
            var displaySummary = document.getElementById("native-display-summary");
            var displayTotal = document.getElementById("native-display-total");
            var submitBtn = document.getElementById("native-submit-btn");
            
            if (displaySummary) displaySummary.innerText = currentPkgLabel + " · " + oilText;
            if (displayTotal) displayTotal.innerText = formatMoney(total);
            if (submitBtn && !submitBtn.innerText.includes("Sending")) {
              submitBtn.innerText = "YES I WANT THIS NOW — " + formatMoney(total);
            }

            var hiddenSets = document.getElementById("native-hidden-sets");
            var hiddenOil = document.getElementById("native-hidden-oil");
            if (hiddenSets) hiddenSets.value = currentPkgValue;
            if (hiddenOil) hiddenOil.value = currentOilValue;
          }

          container.addEventListener("click", function(e) {
            var btn = e.target.closest(".native-selectable-btn");
            if (!btn) return;
            
            e.preventDefault();
            e.stopPropagation();

            var type = btn.getAttribute("data-option-type");
            var val = btn.getAttribute("data-value");
            var price = parseInt(btn.getAttribute("data-price"), 10);

            if (type === "package") {
              currentPkgValue = val;
              currentPkgPrice = price;
              currentPkgLabel = btn.getAttribute("data-label");
              
              var wrapper = document.getElementById("package-buttons-wrapper");
              if (wrapper) {
                var buttons = wrapper.getElementsByClassName("native-selectable-btn");
                for (var i = 0; i < buttons.length; i++) {
                  buttons[i].classList.remove("border-black", "bg-black/[0.04]");
                  buttons[i].classList.add("border-black/10", "bg-white");
                }
              }
            } else if (type === "oil") {
              currentOilValue = val;
              currentOilPrice = price;

              var wrapper = document.getElementById("oil-buttons-wrapper");
              if (wrapper) {
                var buttons = wrapper.getElementsByClassName("native-selectable-btn");
                for (var i = 0; i < buttons.length; i++) {
                  buttons[i].classList.remove("border-black", "bg-black/[0.04]");
                  buttons[i].classList.add("border-black/10", "bg-white");
                }
              }
            }

            btn.classList.remove("border-black/10", "bg-white");
            btn.classList.add("border-black", "bg-black/[0.04]");
            
            updateDOMCalculations();
          }, true);
        })();
      `}} />
    </div>
  );
}