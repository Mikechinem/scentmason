"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";

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
  "Gombe", "Imo", "Kaduna", "Kano","Sokoto", "Kogi",
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
  const [mounted, setMounted] = useState(false);

  const setPricing = SET_PRICING[sets];
  const oilPricing = OIL_PRICING[oil];
  const freeOilGranted = sets === "5";
  const totalOilBottles = Number(oil) + (freeOilGranted ? 1 : 0);
  const total = setPricing.price + oilPricing.price;

  // Track hydration mounting state to prevent Next.js SSR portal mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Manage body scroll layout lock when modal popup context is open
  useEffect(() => {
    if (submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [submitted]);

  // Smooth scroll sync handler exclusively optimized for error validations
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
    if (submitting) return; // UI LOCK: Stops immediate double submission rapid-clicks
    setError("");

    const finalSets = (document.getElementById("native-hidden-sets") as HTMLInputElement)?.value || sets;
    const finalOil = (document.getElementById("native-hidden-oil") as HTMLInputElement)?.value || oil;
    const currentTotal = SET_PRICING[finalSets as SetOption].price + OIL_PRICING[finalOil as OilOption].price;

    const cleanPhone = phone.trim();
    const cleanName = name.trim();
    const cleanAddress = address.trim();

    if (!cleanName || !cleanPhone || !state || !cleanAddress) {
      setError("Please fill in all fields so we can confirm your order.");
      return;
    }

    // LAYER 2 DEDUPLICATION: Check localStorage to prevent double lead entries
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
      // --- BULLETPROOF TRACKING INLINE FIXES ---
      const numericValue = Number(currentTotal) || 0;

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Purchase", {
          content_name: "ScentMason Diffuser",
          value: numericValue,
          currency: "NGN",
          num_items: Number(finalSets),
        }, { eventID: sharedEventId });
      }

      if (typeof window !== "undefined" && (window as any).ttq) {
        // Normalize phone format to E.164 locally to fix the console warning
        let cleanTikTokPhone = cleanPhone.replace(/\D/g, "");
        if (cleanTikTokPhone.startsWith("0")) {
          cleanTikTokPhone = "234" + cleanTikTokPhone.slice(1);
        } else if (!cleanTikTokPhone.startsWith("234")) {
          cleanTikTokPhone = "234" + cleanTikTokPhone;
        }
        cleanTikTokPhone = "+" + cleanTikTokPhone;

        (window as any).ttq.identify({
          phone_number: cleanTikTokPhone,
        });
          
        (window as any).ttq.track("Purchase", {
          content_name: "ScentMason Diffuser",
          content_id: "scentmason_diffuser",
          value: numericValue,
          currency: "NGN",
          quantity: Number(finalSets),
        }, { event_id: sharedEventId });
      }

      // 💡 Invisible Match Enhancement: Slices City details dynamically from delivery address for CAPI
      const addressParts = cleanAddress.split(",").map(part => part.trim());
      const extractedCity = addressParts.length > 1 ? addressParts[addressParts.length - 2] : addressParts[0] || "";

      const unifiedOrderPayload = {
        eventName: "Purchase", // Explicitly passed to sync backend tracking modules
        eventId: sharedEventId,
        eventSourceUrl: currentUrl,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        name: cleanName,
        phone: cleanPhone,
        whatsapp: whatsapp.trim(),
        state,
        city: extractedCity, // 💡 Extracted cleanly in the background to align with the new route expectations
        address: cleanAddress,
        sets: finalSets,
        setPrice: SET_PRICING[finalSets as SetOption].price,
        oilBottlesOrdered: Number(finalOil),
        oilBottlesFree: finalSets === "5" ? 1 : 0,
        oilBottlesTotal: Number(finalOil) + (finalSets === "5" ? 1 : 0),
        oilPrice: OIL_PRICING[finalOil as OilOption].price,
        total: numericValue, // Ensures server gets clean number format
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        ttp: getCookie("_ttp"),
        ttclid: getCookie("ttclid"),
      };

      // Execute track calls in parallel; gracefully capture TikTok network failures
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
      
      // Save order context locally to lock out secondary duplications
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

  // Pre-calculate target routing parameters for dynamic customer chat matching
  const fallbackSets = typeof document !== "undefined" ? (document.getElementById("native-hidden-sets") as HTMLInputElement)?.value : sets;
  const fallbackOil = typeof document !== "undefined" ? (document.getElementById("native-hidden-oil") as HTMLInputElement)?.value : oil;
  
  const selectedPackageLabel = SET_PRICING[fallbackSets as SetOption]?.label || "Order Package";
  const chosenOilLabel = OIL_PRICING[fallbackOil as OilOption]?.label || "No extra oil";

  // Highly conversion-optimized structural message string
  const successMessageText = `Hello ScentMason, I just successfully completed my order form online! 

📦 Package Selection: ${selectedPackageLabel}
💧 Fragrance Addon: ${chosenOilLabel}
👤 Customer Name: ${name}
📞 Phone Line: ${phone}
📍 Delivery Destination: ${address}, ${state} State.

Please verify my delivery data details and speed up my dispatch assembly!`;

  const whatsappUrl = `https://wa.me/2347064969603?text=${encodeURIComponent(successMessageText)}`;

  return (
    <div className="relative z-[999999] pt-6" id="unbreakable-form-container">
      <input type="hidden" id="native-hidden-sets" defaultValue={sets} />
      <input type="hidden" id="native-hidden-oil" defaultValue={oil} />

      <form onSubmit={handleSubmit} action="javascript:void(0)" className="bg-white text-black">
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

        {error && (
          <p id="form-error-message" className="mt-4 text-[13px] font-semibold text-red-600 scroll-mt-20">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !mounted}
          id="native-submit-btn"
          className="mt-6 w-full rounded-full bg-[#25D366] px-6 py-4 text-center text-[17px] font-semibold text-white disabled:opacity-60"
        >
          {!mounted ? "Loading..." : submitting ? "Sending Your Order..." : `YES I WANT THIS NOW — ${formatNaira(total)}`}
        </button>

        <p className="mt-4 text-center text-[12px] font-medium text-black/50">
          A sales rep will call to confirm before your order is dispatched.
        </p>
      </form>

      {/* PREMIUM THANK YOU MODAL OVERLAY (Safely Teleported to Body Element via Portal) */}
      {mounted && submitted && createPortal(
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 text-center shadow-2xl animate-scaleIn transition-all border border-black/5 text-black">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="mt-4 text-[21px] font-bold text-black tracking-tight">Order Received Successfully! ✅</h3>
            
            <p className="mt-2 text-[14px] font-medium leading-relaxed text-black/70 px-2">
              Thank you <span className="font-bold text-black">{name.split(" ")[0]}</span>, if you want your order delivered faster, please inform us on WhatsApp.
            </p>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left">
              <p className="text-[13px] font-bold text-amber-950 leading-relaxed">
                ⚠️ WHAT NEXT? A ScentMason customer care representative will call you shortly on <span className="underline font-extrabold">{phone}</span> to verify your destination details before your order is delivered.
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
        </div>,
        document.body
      )}

      {/* VANILLA FALLBACK ENGINE */}
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