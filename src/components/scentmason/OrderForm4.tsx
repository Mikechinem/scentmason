"use client";

import { useState, useEffect, type FormEvent } from "react";

type SetOption = "1" | "2" | "3" | "4" | "5";
type OilOption = "0" | "1" | "2" | "3" | "4" | "5";

const SET_PRICING: Record<SetOption, { label: string; price: number; save: number }> = {
  "1": { label: "1 Set", price: 28000, save: 11000 },
  "2": { label: "2 Sets", price: 54000, save: 24000 },
  "3": { label: "3 Sets", price: 80000, save: 37000 },
  "4": { label: "4 Sets", price: 105000, save: 42000 },
  "5": { label: "5 Sets", price: 132000, save: 55000 },
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

  useEffect(() => {
    if (submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [submitted]);

  useEffect(() => {
    if (error) {
      const errorEl = document.getElementById("form-error-message");
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [error]);

  const getCookie = (cookieName: string) => {
    if (typeof document === "undefined") return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return; 
    setError("");

    const finalSets = (document.getElementById("native-hidden-sets") as HTMLInputElement)?.value || sets;
    const finalOil = (document.getElementById("native-hidden-oil") as HTMLInputElement)?.value || oil;
    const currentTotal = SET_PRICING[finalSets as SetOption].price + OIL_PRICING[finalOil as OilOption].price;

    const cleanPhone = phone.trim();
    const cleanName = name.trim();

    if (!cleanName || !cleanPhone || !state || !address.trim()) {
      setError("Please fill in all fields so we can confirm your order.");
      return;
    }

    const orderFingerprint = `sm_order_${cleanPhone}_${finalSets}_${finalOil}`;
    if (typeof window !== "undefined" && localStorage.getItem(orderFingerprint)) {
      console.warn("Duplicate submission blocked. Forwarding customer safely to success view.");
      setSubmitted(true);
      return;
    }

    setSubmitting(true);

    const sharedEventId = `sm_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Purchase", {
          content_name: "ScentMason Diffuser",
          value: currentTotal,
          currency: "NGN",
          num_items: Number(finalSets),
        }, { eventID: sharedEventId });
      }

      if (typeof window !== "undefined" && (window as any).ttq) {
        (window as any).ttq.identify({
          phone_number: cleanPhone,
        });
          
        (window as any).ttq.track("Purchase", {
          content_name: "ScentMason Diffuser",
          value: currentTotal,
          currency: "NGN",
          quantity: Number(finalSets),
        }, { event_id: sharedEventId });
      }

      const unifiedOrderPayload = {
        eventName: "Purchase", 
        eventId: sharedEventId,
        eventSourceUrl: currentUrl,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        name: cleanName,
        phone: cleanPhone,
        whatsapp,
        state,
        address: address.trim(),
        sets: finalSets,
        setPrice: SET_PRICING[finalSets as SetOption].price,
        oilBottlesOrdered: Number(finalOil),
        oilBottlesFree: finalSets === "5" ? 1 : 0,
        oilBottlesTotal: Number(finalOil) + (finalSets === "5" ? 1 : 0),
        oilPrice: OIL_PRICING[finalOil as OilOption].price,
        total: currentTotal,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        ttp: getCookie("_ttp"),
        ttclid: getCookie("ttclid"),
      };

      const [metaResponse] = await Promise.all([
        fetch("/api/track/purchase", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(unifiedOrderPayload),
        }),
        fetch("/api/track/tiktok/purchase", { 
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(unifiedOrderPayload),
        }).catch((err) => {
          console.error("TikTok pipeline async suppression background block:", err);
          return null; 
        })
      ]);

      if (!metaResponse || !metaResponse.ok) throw new Error("Primary ingestion engine failed");
      
      if (typeof window !== "undefined") {
        localStorage.setItem(orderFingerprint, "true");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Order submission tracking loop exception:", err);
      setError("Something went wrong sending your order. Please call or WhatsApp us on 0706 496 9603 to confirm.");
    } finally {
      setSubmitting(false);
    }
  }

  const fallbackSets = typeof document !== "undefined" ? (document.getElementById("native-hidden-sets") as HTMLInputElement)?.value : sets;
  const fallbackOil = typeof document !== "undefined" ? (document.getElementById("native-hidden-oil") as HTMLInputElement)?.value : oil;
  
  const selectedPackageLabel = SET_PRICING[fallbackSets as SetOption]?.label || "Order Package";
  const chosenOilLabel = OIL_PRICING[fallbackOil as OilOption]?.label || "No extra oil";

  const successMessageText = `Hello ScentMason, I just successfully completed my order form online! 

📦 Package Selection: ${selectedPackageLabel}
💧 Fragrance Addon: ${chosenOilLabel}
👤 Customer Name: ${name}
📞 Phone Line: ${phone}
📍 Delivery Destination: ${address}, ${state} State.

Please verify my delivery data details and speed up my dispatch assembly!`;

  const whatsappUrl = `https://wa.me/2347064969603?text=${encodeURIComponent(successMessageText)}`;

  return (
    <div className="relative z-[999999] pt-6 w-full box-border" id="unbreakable-form-container">
      <input type="hidden" id="native-hidden-sets" defaultValue={sets} />
      <input type="hidden" id="native-hidden-oil" defaultValue={oil} />

      {/* Premium Outer Card wrapper fixes the chopping/clipping layout constraint */}
      <form onSubmit={handleSubmit} className="bg-white text-slate-900 w-full rounded-2xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/60 box-border">
        
        {/* Urgent Alert Box */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-[14px] font-bold leading-6 text-red-700">
            IMPORTANT: PLEASE DO NOT fill this form if you don&apos;t have the money for it... OR if you&apos;re travelling in the next 2-4 days.
          </p>
        </div>

        {/* Packages Layout */}
        <p className="mt-6 text-[15px] font-bold text-slate-900">Choose your package</p>
        <div className="mt-3 space-y-2.5" id="package-buttons-wrapper">
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
                className={`native-selectable-btn flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                  isActive ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <p className="text-[14px] font-bold text-slate-900">{data.label}</p>
                  <p className="text-[12px] font-medium text-slate-400">Save {formatNaira(data.save)}</p>
                </div>
                <p className="text-[16px] font-bold text-slate-900">{formatNaira(data.price)}</p>
              </button>
            );
          })}
        </div>

        {/* Extra oil Layout */}
        <p className="mt-6 text-[15px] font-bold text-slate-900">Add extra oil</p>
        <p className="mt-1 text-[13px] font-medium text-slate-500">
          Want extra fragrance oil added to your order? Select how many extra bottles you&apos;d like.
        </p>
        <div className="mt-3 space-y-2.5" id="oil-buttons-wrapper">
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
                className={`native-selectable-btn flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all duration-200 ${
                  isActive ? "border-slate-900 bg-slate-50 ring-1 ring-slate-900" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <p className="text-[14px] font-bold text-slate-900">{data.label}</p>
                <p className="text-[16px] font-bold text-slate-900">
                  {data.price === 0 ? "₦0" : `+${formatNaira(data.price)}`}
                </p>
              </button>
            );
          })}
        </div>

        {/* Total Summary Box */}
        <div className="mt-6 rounded-xl border border-slate-200 px-4 py-4 bg-slate-50/70">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Order Total</p>
          <p className="mt-0.5 text-[13px] font-semibold text-slate-600" id="native-display-summary">
            {setPricing.label} · {totalOilBottles > 0 ? `${totalOilBottles} bottles` : "no extra oil"}
          </p>
          <p className="mt-1.5 text-[24px] font-bold text-slate-900 tracking-tight" id="native-display-total">
            {formatNaira(total)}
          </p>
        </div>

        {/* Premium Form Fields Layout */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-[13px] font-semibold text-slate-600">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Chioma Adeyemi" className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400" />
          </div>
          <div>
            <label className="text-[13px] font-semibold text-slate-600">Phone Number</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400" />
          </div>
          <div>
            <label className="text-[13px] font-semibold text-slate-600">WhatsApp Number</label>
            <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="08012345678" className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400" />
          </div>
          <div>
            <label className="text-[13px] font-semibold text-slate-600">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all">
              <option value="">Select your state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[13px] font-semibold text-slate-600">Delivery Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House number, street, area, landmark" rows={3} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] font-medium text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all placeholder:text-slate-400" />
          </div>
        </div>

        {error && (
          <p id="form-error-message" className="mt-4 text-[13px] font-bold text-red-600 scroll-mt-20">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          id="native-submit-btn"
          className="mt-6 w-full rounded-full bg-[#25D366] px-6 py-4 text-center text-[17px] font-bold text-white disabled:opacity-60 shadow-md shadow-emerald-200 active:scale-[0.99] transition-transform"
        >
          {submitting ? "Sending Your Order..." : `YES I WANT THIS NOW — ${formatNaira(total)}`}
        </button>

        <p className="mt-4 text-center text-[12px] font-medium text-slate-400">
          A sales rep will call to confirm before your order is dispatched.
        </p>
      </form>

      {/* PREMIUM THANK YOU MODAL OVERLAY */}
      {submitted && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 text-center shadow-2xl border border-slate-100">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="mt-4 text-[21px] font-bold text-slate-900 tracking-tight">Order Received Successfully! ✅</h3>
            
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-slate-600 px-2">
              Thank you <span className="font-bold text-slate-900">{name.split(" ")[0]}</span>, if you want your order delivered faster, please inform us on WhatsApp.
            </p>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
              <p className="text-[13px] font-bold text-amber-900 leading-relaxed">
                ⚠️ WHAT NEXT? A ScentMason customer care representative will call you shortly on <span className="underline font-extrabold text-slate-950">{phone}</span> to verify your destination details before your order is delivered.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-center text-[16px] font-bold text-white shadow-md hover:scale-[1.01] active:scale-100 transition-all"
            >
              <svg viewBox="0 0 32 32" className="h-5 w-5 shrink-0" fill="#ffffff">
                <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.385.694 4.6 1.885 6.466L4 29l7.73-1.838A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.629 28 15.001 28 8.373 22.629 3 16.001 3zm6.992 16.99c-.295.83-1.452 1.59-2.31 1.762-.797.158-1.5.225-3.193-.42-2.726-1.04-4.484-3.78-4.62-3.95-.137-.17-1.103-1.47-1.103-2.8 0-1.33.7-1.984.95-2.255.246-.27.535-.337.713-.337.178 0 .357 0 .513.008.165.008.387-.063.605.462.224.54.762 1.86.83 1.994.067.135.112.293.022.47-.09.178-.135.288-.27.443-.135.157-.284.35-.405.47-.135.135-.276.282-.118.55.157.27.7 1.155 1.504 1.873 1.04.927 1.917 1.213 2.187 1.348.27.135.428.113.586-.067.157-.18.674-.785.854-1.055.18-.27.36-.225.605-.135.246.09 1.564.738 1.832.872.27.135.45.202.516.315.067.113.067.652-.227 1.483z" />
              </svg>
              Chat Us On WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* VANILLA FALLBACK ENGINE - Synced flawlessly to transition light premium classes */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var container = document.getElementById("unbreakable-form-container");
          if (!container) return;

          var currentPkgPrice = 28000;
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
                  buttons[i].classList.remove("border-slate-900", "bg-slate-50", "ring-1", "ring-slate-900");
                  buttons[i].classList.add("border-slate-200", "bg-white");
                }
              }
            } else if (type === "oil") {
              currentOilValue = val;
              currentOilPrice = price;

              var wrapper = document.getElementById("oil-buttons-wrapper");
              if (wrapper) {
                var buttons = wrapper.getElementsByClassName("native-selectable-btn");
                for (var i = 0; i < buttons.length; i++) {
                  buttons[i].classList.remove("border-slate-900", "bg-slate-50", "ring-1", "ring-slate-900");
                  buttons[i].classList.add("border-slate-200", "bg-white");
                }
              }
            }

            btn.classList.remove("border-slate-200", "bg-white");
            btn.classList.add("border-slate-900", "bg-slate-50", "ring-1", "ring-slate-900");
            
            updateDOMCalculations();
          }, true);
        })();
      `}} />
    </div>
  );
}