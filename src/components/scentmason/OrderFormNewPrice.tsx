"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";

type SetOption = "1" | "2" | "3" | "4";
type OilOption = "0" | "1" | "2" | "3" | "4" | "5";

const SET_PRICING: Record<SetOption, { label: string; price: number; save: number; description: string }> = {
  "1": { label: "1 Set", price: 26990, save: 0, description: "1 Machine + 1 × 80ml Fragrance Oil" },
  "2": { label: "2 Sets", price: 49990, save: 3990, description: "2 Machines + 2 × 80ml Fragrance Oils" },
  "3": { label: "3 Sets", price: 72990, save: 7980, description: "3 Machines + 3 × 80ml Fragrance Oils" },
  "4": { label: "4 Sets", price: 94990, save: 12970, description: "4 Machines + 4 × 80ml Fragrance Oils" },
};

const OIL_PRICING: Record<OilOption, { label: string; price: number; duration: string }> = {
  "0": { label: "No extra oil", price: 0, duration: "" },
  "1": { label: "+1 Extra Oil Bottle", price: 9490, duration: "≈ 1.5 months" },
  "2": { label: "+2 Extra Oil Bottles", price: 17490, duration: "≈ 3 months" },
  "3": { label: "+3 Extra Oil Bottles", price: 21490, duration: "≈ 4.5 months" },
  "4": { label: "+4 Extra Oil Bottles", price: 32490, duration: "≈ 6 months" },
  "5": { label: "+5 Extra Oil Bottles", price: 42490, duration: "≈ 7.5 months" },
};

const STATES = [
  "Abia", "Abuja (FCT)", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Gombe", "Imo", "Kaduna", "Kano", "Sokoto", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
];

function formatNaira(amount: number) {
  return `₦${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function OrderFormNewPrice() {
  const [sets, setSets] = useState<SetOption>("1");
  const [oil, setOil] = useState<OilOption>("0");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [willAccept, setWillAccept] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedTotal, setSubmittedTotal] = useState<number | null>(null);
  const [submittedPackage, setSubmittedPackage] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const setPricing = SET_PRICING[sets];
  const oilPricing = OIL_PRICING[oil];
  const totalOilBottles = Number(oil) ;
  const total = setPricing.price + oilPricing.price;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (submitted) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [submitted]);

  useEffect(() => {
    if (error) {
      const errorEl = document.getElementById("form-error-message");
      if (errorEl) errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
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
    const currentTotal =
      SET_PRICING[finalSets as SetOption].price +
      OIL_PRICING[finalOil as OilOption].price;

    const cleanPhone = phone.trim();
    const cleanName = name.trim();
    const cleanAddress = address.trim();

    if (!cleanName || !cleanPhone || !state || !cleanAddress) {
      setError("Please fill in all fields so we can confirm your order.");
      return;
    }

    if (!willAccept) {
      setError('😞Please tick “I WILL ACCEPT” to confirm you’re ready to receive your order. Then submit the form again.');
      return;
    }

    const orderFingerprint = `sm_order_${cleanPhone}_${finalSets}_${finalOil}`;
    if (typeof window !== "undefined" && localStorage.getItem(orderFingerprint)) {
      setSubmittedTotal(currentTotal);
      setSubmittedPackage(SET_PRICING[finalSets as SetOption].label);
      setSubmitted(true);
      return;
    }

    setSubmitting(true);

    const sharedEventId = `sm_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      let cleanTikTokPhone = cleanPhone.replace(/\D/g, "");
      if (cleanTikTokPhone.startsWith("0")) cleanTikTokPhone = "234" + cleanTikTokPhone.slice(1);
      else if (!cleanTikTokPhone.startsWith("234")) cleanTikTokPhone = "234" + cleanTikTokPhone;
      cleanTikTokPhone = "+" + cleanTikTokPhone;

      const addressParts = cleanAddress.split(",").map((part) => part.trim());
      const extractedCity =
        addressParts.length > 1 ? addressParts[addressParts.length - 2] : addressParts[0] || "";

      const unifiedOrderPayload = {
        eventName: "Purchase",
        eventId: sharedEventId,
        eventSourceUrl: currentUrl,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
        name: cleanName,
        phone: cleanPhone,
        whatsapp: whatsapp.trim(),
        state,
        city: extractedCity,
        address: cleanAddress,
        sets: finalSets,
        setPrice: SET_PRICING[finalSets as SetOption].price,
        oilBottlesOrdered: Number(finalOil),
        oilBottlesFree: 0,
        oilBottlesTotal: Number(finalOil),
        oilPrice: OIL_PRICING[finalOil as OilOption].price,
        total: Number(currentTotal) || 0,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        ttp: getCookie("_ttp"),
        ttclid: getCookie("ttclid"),
        willAccept: true,
      };

      const metaResponse = await fetch("/api/track/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(unifiedOrderPayload),
      });

      if (!metaResponse.ok) throw new Error("Primary order recording engine failed");

      const metaResult = await metaResponse.json();
      if (!metaResult?.success || !metaResult?.orderRecorded) {
        throw new Error("Order was not confirmed as recorded");
      }

      const numericValue = Number(currentTotal) || 0;

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq(
          "track",
          "Purchase",
          {
            content_name: "ScentMason Diffuser",
            value: numericValue,
            currency: "NGN",
            num_items: Number(finalSets),
          },
          { eventID: sharedEventId }
        );
      }

      if (typeof window !== "undefined" && (window as any).ttq) {
        (window as any).ttq.identify({ phone_number: cleanTikTokPhone });
        (window as any).ttq.track(
          "Purchase",
          {
            content_name: "ScentMason Diffuser",
            content_id: "scentmason_diffuser",
            value: numericValue,
            currency: "NGN",
            quantity: Number(finalSets),
          },
          { event_id: sharedEventId }
        );
      }

      if (typeof window !== "undefined") localStorage.setItem(orderFingerprint, "true");

      setSubmittedTotal(numericValue);
      setSubmittedPackage(SET_PRICING[finalSets as SetOption].label);
      setSubmitted(true);
    } catch (err) {
      console.error("Order submission tracking loop exception:", err);
      setError("Something went wrong sending your order. Please call or WhatsApp us on 0706 496 9603 to confirm.");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedPackageLabel = SET_PRICING[sets].label;
  const chosenOilLabel = OIL_PRICING[oil].label;

  const successMessageText = `Hello ScentMason, I just successfully completed my order form online!

📦 Package Selection: ${selectedPackageLabel}
💧 Fragrance Addon: ${chosenOilLabel}
💰 Order Total: ${formatNaira(submittedTotal ?? total)}
👤 Customer Name: ${name}
📞 Phone: ${phone}
📍 Delivery Destination: ${address}, ${state} State.

Please verify my delivery data details and speed up my dispatch assembly!`;

  const whatsappUrl = `https://wa.me/2347064969603?text=${encodeURIComponent(successMessageText)}`;

  return (
    <div className="relative z-[999999] pt-6" id="unbreakable-form-container">
      <input type="hidden" id="native-hidden-sets" defaultValue={sets} />
      <input type="hidden" id="native-hidden-oil" defaultValue={oil} />

      <form onSubmit={handleSubmit} action="javascript:void(0)" className="bg-white text-black">
        <div className="rounded-xl border-2 border-red-600 bg-red-50 p-4">
          <p className="rounded-md border border-red-200 bg-red-50 p-4 text-[17px] font-medium leading-7 text-red-700">
            <span className="font-bold">PLEASE NOTE:</span> Failed deliveries cost us a lot of money.
            Please fill out this form <span className="font-bold underline text-red-800">ONLY</span> if you are
            <span className="font-bold"> fully ready to receive your order</span> and
            <span className="font-bold"> pay upon delivery</span>.
            Our team will call you to confirm your order details before dispatching. Thank you for respecting our business!
          </p>
        </div>

        <p className="mt-7 text-[20px] font-bold">Choose your package</p>
        <div className="mt-3 space-y-3" id="package-buttons-wrapper">
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
                className={`native-selectable-btn flex w-full items-center justify-between gap-4 rounded-xl border-2 px-4 py-4 text-left transition-all ${
                  isActive ? "border-black bg-black/[0.04]" : "border-black/10 bg-white"
                }`}
              >
                <div className="min-w-0">
                  <p className="text-[17px] font-bold text-black sm:text-[18px]">{data.label}</p>
                  <p className="mt-1 text-[14px] font-medium leading-5 text-black/60 sm:text-[15px]">{data.description}</p>
                  {data.save > 0 && (
                    <p className="mt-1 text-[14px] font-bold text-emerald-700 sm:text-[15px]">Save {formatNaira(data.save)}</p>
                  )}
                </div>
                <p className="shrink-0 text-[21px] font-bold text-black sm:text-[22px]">{formatNaira(data.price)}</p>
              </button>
            );
          })}
        </div>

        <p className="mt-7 text-[20px] font-bold">Add extra oil</p>
        <p className="mt-1 text-[17px] font-medium leading-6 text-black/60">
          Each set already includes one 80ml fragrance oil. Add more only if you want extra fragrance supply.
        </p>

        <div className="mt-3 space-y-3" id="oil-buttons-wrapper">
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
                className={`native-selectable-btn flex w-full items-center justify-between gap-4 rounded-xl border-2 px-4 py-4 text-left transition-all ${
                  isActive ? "border-black bg-black/[0.04]" : "border-black/10 bg-white"
                }`}
              >
                <div>
                  <p className="text-[16px] font-bold text-black sm:text-[17px]">{data.label}</p>
                  {data.duration && <p className="mt-0.5 text-[14px] font-medium text-black/55">{data.duration}</p>}
                </div>
                <p className="shrink-0 text-[19px] font-bold text-black sm:text-[20px]">
                  {data.price === 0 ? "₦0" : `+${formatNaira(data.price)}`}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-7 rounded-xl border-2 border-black bg-white px-4 py-5">
          <p className="text-[14px] font-bold uppercase tracking-wide text-black/50">Order Total</p>
          <p className="mt-1 text-[16px] font-semibold text-black/70" id="native-display-summary">
            {setPricing.label} · {setPricing.description}
            {totalOilBottles > 0 ? ` · +${totalOilBottles} extra oil` : ""}
          </p>
          <p className="mt-2 text-[30px] font-bold text-black" id="native-display-total">{formatNaira(total)}</p>
        </div>

        
        
         <div className="mt-7 space-y-5">
  {[
    ["Full Name", name, setName, "e.g. Chioma Adeyemi", "text"],
    ["Phone Number", phone, setPhone, "08012345678", "tel"],
    ["WhatsApp Number", whatsapp, setWhatsapp, "08012345678", "tel"],
  ].map(([label, value, setter, placeholder, inputType]) => (
    <div key={String(label)}>
      <label className="text-[15px] font-medium text-black/70">
        {String(label)}
      </label>

      <input
        type={String(inputType)}
        inputMode={inputType === "tel" ? "tel" : "text"}
        value={String(value)}
        onChange={(e) =>
          (setter as (value: string) => void)(e.target.value)
        }
        placeholder={String(placeholder)}
        autoComplete={label === "Full Name" ? "name" : "tel"}
        className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3.5 text-[17px] font-medium text-black outline-none focus:border-black"
      />
    </div>
  ))}

          <div>
            <label className="text-[15px] font-medium text-black/70">State</label>
            <select value={state} onChange={(e) => setState(e.target.value)} className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3.5 text-[17px] font-medium text-black outline-none focus:border-black">
              <option value="">Select your state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[15px] font-medium text-black/70">Delivery Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House number, street, area, landmark" rows={3} className="mt-1 w-full rounded-lg border border-black/15 bg-white px-4 py-3.5 text-[17px] font-medium text-black outline-none focus:border-black" />
          </div>
        </div>

        {error && <p id="form-error-message" className="mt-5 text-[15px] font-semibold leading-6 text-red-600 scroll-mt-20">{error}</p>}

        <div className="mt-7 rounded-xl border border-red-200 bg-red-50/70 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={willAccept} onChange={(e) => { setWillAccept(e.target.checked); if (e.target.checked) setError(""); }} className="mt-1 h-5 w-5 shrink-0 accent-red-600" />
            <span className="text-[16px] font-bold leading-6 text-gray-800">
              I WILL ACCEPT — I am ready to receive my order when contacted for delivery confirmation.
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting || !mounted}
          id="native-submit-btn"
          className="mt-7 w-full rounded-full bg-[#25D366] px-6 py-4 text-center text-[18px] font-bold text-white disabled:opacity-60"
        >
          {!mounted
            ? "Loading..."
            : submitting
              ? "Sending Your Order..."
              : submittedTotal !== null && submitted
                ? `ORDER PLACED — ${formatNaira(submittedTotal)} ✓`
                : `YES I WANT THIS NOW — ${formatNaira(total)}`}
        </button>

        <p className="mt-4 text-center text-[13px] font-medium leading-5 text-black/50">
          A sales rep will call to confirm before your order is dispatched.
        </p>
      </form>

      {mounted && submitted && createPortal(
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md transform rounded-2xl border border-black/5 bg-white p-6 text-center text-black shadow-2xl animate-scaleIn">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="mt-4 text-[25px] font-bold tracking-tight text-black">
              Order Received Successfully! ✅
            </h3>

            <p className="mt-3 px-2 text-[16px] font-medium leading-7 text-black/70">
              Thank you{" "}
              <span className="font-bold text-black">{name.split(" ")[0]}</span>,
              if you want your order delivered faster, please inform us on WhatsApp.
            </p>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left">
              <p className="text-[15px] font-bold leading-6 text-amber-950">
                ⚠️ WHAT NEXT? A ScentMason customer care representative will call you shortly on{" "}
                <span className="font-extrabold underline">{phone}</span>{" "}
                to verify your destination details before your order is delivered.
              </p>
            </div>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-center text-[17px] font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-100">
              <svg viewBox="0 0 32 32" className="h-5 w-5 shrink-0" fill="#ffffff">
                <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.385.694 4.6 1.885 6.466L4 29l7.73-1.838A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.629 28 15.001 28 8.373 22.629 3 16.001 3zm6.992 16.99c-.295.83-1.452 1.59-2.31 1.762-.797.158-1.5.225-3.193-.42-2.726-1.04-4.484-3.78-4.62-3.95-.137-.17-.2.288-.2.443-.135.157-.284.35-.405.47-.135.135-.276.282-.118.55.157.27.7 1.155 1.504 1.873 1.04.927 1.917 1.213 2.187 1.348.27.135.428.113.586-.067.157-.18.674-.785.854-1.055.18-.27.36-.225.605-.135.246.09 1.564.738 1.832.872.27.135.45.202.516.315.067.113.067.652-.227 1.483z" />
              </svg>
              Chat Us On WhatsApp
            </a>
          </div>
        </div>,
        document.body
      )}

      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          var container = document.getElementById("unbreakable-form-container");
          if (!container) return;

          var currentPkgPrice = 26990;
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
            var oilText = oilNum > 0 ? "+" + oilNum + " extra oil" : "no extra oil";

            var displaySummary = document.getElementById("native-display-summary");
            var displayTotal = document.getElementById("native-display-total");
            var submitBtn = document.getElementById("native-submit-btn");

            if (displaySummary) displaySummary.innerText = currentPkgLabel + " · " + oilText;
            if (displayTotal) displayTotal.innerText = formatMoney(total);
            if (submitBtn && !submitBtn.innerText.includes("Sending") && !submitBtn.innerText.includes("ORDER PLACED")) {
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
