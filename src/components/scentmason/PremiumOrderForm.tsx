"use client";

import { useState, useEffect, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { generateEventId } from "@/lib/tracking/event-id";
import { trackMetaLead } from "@/components/tracking/MetaPixel";

type SetOption = "1" | "2" | "3" | "4" | "5";
type OilOption = "0" | "1" | "2" | "3" | "4" | "5";

const SET_PRICING: Record<
  SetOption,
  { label: string; price: number; save: number }
> = {
  "1": { label: "1 Set", price: 28000, save: 11000 },
  "2": { label: "2 Sets", price: 54000, save: 24000 },
  "3": { label: "3 Sets", price: 80000, save: 37000 },
  "4": { label: "4 Sets", price: 105000, save: 42000 },
  "5": { label: "5 Sets", price: 132000, save: 55000 },
};

const OIL_PRICING: Record<
  OilOption,
  { label: string; price: number }
> = {
  "0": { label: "No extra oil", price: 0 },
  "1": { label: "+1 Extra Oil Bottle", price: 10000 },
  "2": { label: "+2 Extra Oil Bottles", price: 17500 },
  "3": { label: "+3 Extra Oil Bottles", price: 24500 },
  "4": { label: "+4 Extra Oil Bottles", price: 34500 },
  "5": { label: "+5 Extra Oil Bottles", price: 42500 },
};

const STATES = [
  "Abia",
  "Abuja (FCT)",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Kaduna",
  "Kano",
  "Sokoto",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
];

function formatNaira(amount: number) {
  return `₦${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default function PremiumOrderForm() {
  const [sets, setSets] = useState<SetOption>("1");
  const [oil, setOil] = useState<OilOption>("0");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [willAccept, setWillAccept] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const setPricing = SET_PRICING[sets];
  const oilPricing = OIL_PRICING[oil];

  const freeOilGranted = sets === "5";
  const totalOilBottles =
    Number(oil) + (freeOilGranted ? 1 : 0);
  const total =
    setPricing.price + oilPricing.price;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (submitted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [submitted]);

  useEffect(() => {
    if (error) {
      const errorEl = document.getElementById(
        "premium-form-error-message"
      );

      if (errorEl) {
        errorEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [error]);

  const getCookie = (cookieName: string) => {
    if (typeof document === "undefined") return undefined;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }

    return undefined;
  };

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (submitting) return;

    setError("");

    const finalSets =
      (document.getElementById(
        "premium-hidden-sets"
      ) as HTMLInputElement)?.value || sets;

    const finalOil =
      (document.getElementById(
        "premium-hidden-oil"
      ) as HTMLInputElement)?.value || oil;

    const currentTotal =
      SET_PRICING[
        finalSets as SetOption
      ].price +
      OIL_PRICING[
        finalOil as OilOption
      ].price;

    const cleanPhone = phone.trim();
    const cleanName = name.trim();
    const cleanCity = city.trim();
    const cleanAddress = address.trim();

    if (
      !cleanName ||
      !cleanPhone ||
      !state ||
      !cleanCity ||
      !cleanAddress
    ) {
      setError(
        "Please fill in all fields so we can confirm your order."
      );
      return;
    }

    if (!willAccept) {
      setError(
        "😞Please tick “I WILL ACCEPT” to confirm you’re ready to receive your order. Then submit the form again."
      );
      return;
    }

    const orderFingerprint =
      `sm_order_${cleanPhone}_${finalSets}_${finalOil}`;

    if (
      typeof window !== "undefined" &&
      localStorage.getItem(orderFingerprint)
    ) {
      console.warn(
        "Duplicate submission blocked. Forwarding customer safely to success view."
      );

      setSubmitted(true);
      return;
    }

    setSubmitting(true);

    /*
     * ============================================================
     * TRACKING ENGINE
     *
     * Order Event ID:
     * Used for the order itself and the later Purchase flow.
     *
     * Lead Event ID:
     * Used by BOTH:
     *
     * Browser Meta Pixel -> Lead
     * Server Meta CAPI   -> Lead
     *
     * The same Lead Event ID is intentionally sent to both
     * destinations so Meta can deduplicate them.
     * ============================================================
     */

    const sharedEventId =
      generateEventId("premium");

    const leadEventId =
      generateEventId("premium_lead");

    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : "";

    /*
     * ============================================================
     * REUSABLE ATTRIBUTION ENGINE
     * ============================================================
     */

    let attribution = {};
    let browserIdentifiers = {};

    if (typeof window !== "undefined") {
      try {
        const {
          getAttribution,
        } = await import(
          "@/lib/tracking/attribution"
        );

        const {
          getBrowserIdentifiers,
        } = await import(
          "@/lib/tracking/cookies"
        );

        attribution =
          getAttribution();

        browserIdentifiers =
          getBrowserIdentifiers();
      } catch (trackingError) {
        console.warn(
          "[Premium Order] Tracking context could not be loaded:",
          trackingError
        );
      }
    }

    /*
     * ============================================================
     * UNIFIED ORDER PAYLOAD
     *
     * eventId     = permanent order identity
     * leadEventId = browser/server Lead identity
     * ============================================================
     */

    const unifiedOrderPayload = {
      eventName: "PremiumOrder",

      eventId: sharedEventId,

      leadEventId,

      eventSourceUrl: currentUrl,

      referrer:
        typeof document !== "undefined"
          ? document.referrer
          : undefined,

      /*
       * Customer information
       */
      name: cleanName,
      phone: cleanPhone,
      whatsapp: whatsapp.trim(),

      state,
      city: cleanCity,
      address: cleanAddress,

      /*
       * Order information
       */
      sets: finalSets,

      setPrice:
        SET_PRICING[
          finalSets as SetOption
        ].price,

      oilBottlesOrdered:
        Number(finalOil),

      oilBottlesFree:
        finalSets === "5"
          ? 1
          : 0,

      oilBottlesTotal:
        Number(finalOil) +
        (finalSets === "5"
          ? 1
          : 0),

      oilPrice:
        OIL_PRICING[
          finalOil as OilOption
        ].price,

      total:
        Number(currentTotal) || 0,

      willAccept,

      /*
       * Reusable attribution data
       */
      attribution,

      /*
       * Browser identifiers
       */
      browserIdentifiers,
    };

    try {
      /*
       * ============================================================
       * CUSTOMER SUBMISSION
       *
       * NO Purchase event is fired here.
       *
       * Purchase remains reserved for the rep-confirmed
       * payment stage.
       * ============================================================
       */

      const metaResponse =
        await fetch(
          "/api/track/premium-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              unifiedOrderPayload
            ),
          }
        );

      const responseData =
        await metaResponse
          .json()
          .catch(() => null);

      if (!metaResponse.ok) {
        throw new Error(
          responseData?.message ||
            "Premium order ingestion failed."
        );
      }

      /*
       * ============================================================
       * BROWSER META LEAD
       *
       * The server has already accepted the order.
       *
       * The SAME leadEventId was sent to the server, which used it
       * for Meta CAPI Lead.
       *
       * We now send that exact same ID through the browser Pixel.
       *
       * Meta can therefore deduplicate:
       *
       * Browser Lead
       * +
       * Server Lead
       *
       * instead of counting two separate Leads.
       * ============================================================
       */

      const leadTracked =
        trackMetaLead(
          leadEventId,
          {
            content_name:
              "ScentMason Premium Order",

            content_category:
              "Premium",

            value:
              Number(currentTotal) || 0,

            currency:
              "NGN",

            eventSourceUrl:
              currentUrl,

            orderEventId:
              sharedEventId,
          }
        );

      if (!leadTracked) {
        console.warn(
          "[Premium Order] Browser Meta Lead could not be fired. Server-side Lead was still attempted."
        );
      }

      /*
       * Mark this browser/order combination as submitted
       * only after the primary order ingestion succeeded.
       */

      if (
        typeof window !== "undefined"
      ) {
        localStorage.setItem(
          orderFingerprint,
          "true"
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(
        "Premium order submission error:",
        err
      );

      setError(
        "Something went wrong sending your order. Please call or WhatsApp us on 0706 496 9603 to confirm."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const fallbackSets =
    typeof document !== "undefined"
      ? (document.getElementById(
          "premium-hidden-sets"
        ) as HTMLInputElement)?.value
      : sets;

  const fallbackOil =
    typeof document !== "undefined"
      ? (document.getElementById(
          "premium-hidden-oil"
        ) as HTMLInputElement)?.value
      : oil;

  const selectedPackageLabel =
    SET_PRICING[
      fallbackSets as SetOption
    ]?.label ||
    "Order Package";

  const chosenOilLabel =
    OIL_PRICING[
      fallbackOil as OilOption
    ]?.label ||
    "No extra oil";

  const successMessageText = `Hello ScentMason, I just successfully completed my order form online!

📦 Package Selection: ${selectedPackageLabel}
💧 Fragrance Addon: ${chosenOilLabel}
👤 Customer Name: ${name}
📞 Phone Line: ${phone}
📍 Delivery Destination: ${address}, ${state} State.

Please verify my delivery data details and speed up my dispatch assembly!`;

  const whatsappUrl =
    `https://wa.me/2347064969603?text=` +
    encodeURIComponent(
      successMessageText
    );

  return (
    <div
      id="premium-order-form-container"
      className="
        relative
        w-full
        pt-4
        text-[#17120e]
        scroll-mt-28
      "
    >
      <input
        type="hidden"
        id="premium-hidden-sets"
        defaultValue={sets}
      />

      <input
        type="hidden"
        id="premium-hidden-oil"
        defaultValue={oil}
      />

      <form
        onSubmit={handleSubmit}
        action="javascript:void(0)"
        className="w-full"
      >
        {/* =================================================
            PREMIUM FORM HEADER
        ================================================= */}

        <div className="mb-6 text-center">
          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#A67C00]
            "
          >
            Complete Your Order
          </p>

          <h2
            className="
              mt-2
              text-[28px]
              font-semibold
              leading-tight
              tracking-[-0.03em]
              text-[#1e1008]

              sm:text-[34px]
            "
          >
            Bring ScentMason Home
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              text-[16px]
              font-medium
              leading-6
              text-black/55
            "
          >
            Choose your package, enter your delivery details,
            and we&apos;ll take care of the rest.
          </p>
        </div>

        {/* =================================================
            IMPORTANT NOTICE
        ================================================= */}

        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            px-4
            py-4
          "
        >
          <p
            className="
              text-[16px]
              font-bold
              leading-6
              text-red-700
            "
          >
            IMPORTANT: ONLY FILL THIS FORM IF YOU&apos;RE READY TO RECEIVE YOUR ORDER.

            Please do not order if you won&apos;t have the money available
            or if you&apos;ll be travelling within the next 2-4 days.

            After filling this form, click &quot;I WILL ACCEPT&quot; to confirm
            you&apos;re ready to receive your order.
          </p>
        </div>

        {/* =================================================
            PACKAGE SELECTION
        ================================================= */}

        <div className="mt-7">
          <div className="mb-3">
            <p className="text-[16px] font-bold text-[#1e1008]">
              Choose your package
            </p>

            <p className="mt-1 text-[14px] font-medium text-black/50">
              Select how many machines you&apos;d like.
            </p>
          </div>

          <div
            className="space-y-2"
            id="premium-package-buttons-wrapper"
          >
            {(
              Object.keys(
                SET_PRICING
              ) as SetOption[]
            ).map(
              (option) => {
                const data =
                  SET_PRICING[
                    option
                  ];

                const isActive =
                  sets === option;

                return (
                  <button
                    type="button"
                    key={option}
                    data-option-type="package"
                    data-value={option}
                    data-price={data.price}
                    data-label={data.label}
                    onClick={() =>
                      setSets(option)
                    }
                    className={`
                      premium-selectable-btn
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      border
                      px-4
                      py-3.5
                      text-left
                      transition-all

                      ${
                        isActive
                          ? "border-[#A67C00] bg-[#A67C00]/[0.06] shadow-sm"
                          : "border-black/10 bg-white hover:border-[#A67C00]/40"
                      }
                    `}
                  >
                    <div>
                      <p className="text-[14px] font-bold text-[#1e1008]">
                        {data.label}
                      </p>

                      <p className="mt-0.5 text-[12px] font-medium text-black/45">
                        Save{" "}
                        {formatNaira(
                          data.save
                        )}
                      </p>
                    </div>

                    <p className="text-[15px] font-bold text-[#1e1008]">
                      {formatNaira(
                        data.price
                      )}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* =================================================
            EXTRA OIL
        ================================================= */}

        <div className="mt-7">
          <div className="mb-3">
            <p className="text-[15px] font-bold text-[#1e1008]">
              Add extra oil
            </p>

            <p className="mt-1 text-[12px] font-medium leading-5 text-black/50">
              Want additional fragrance oil? Choose how many
              extra bottles you&apos;d like.
            </p>
          </div>

          <div
            className="space-y-2"
            id="premium-oil-buttons-wrapper"
          >
            {(
              Object.keys(
                OIL_PRICING
              ) as OilOption[]
            ).map(
              (option) => {
                const data =
                  OIL_PRICING[
                    option
                  ];

                const isActive =
                  oil === option;

                return (
                  <button
                    type="button"
                    key={option}
                    data-option-type="oil"
                    data-value={option}
                    data-price={data.price}
                    onClick={() =>
                      setOil(option)
                    }
                    className={`
                      premium-selectable-btn
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      border
                      px-4
                      py-3.5
                      text-left
                      transition-all

                      ${
                        isActive
                          ? "border-[#A67C00] bg-[#A67C00]/[0.06] shadow-sm"
                          : "border-black/10 bg-white hover:border-[#A67C00]/40"
                      }
                    `}
                  >
                    <p className="text-[14px] font-semibold text-[#1e1008]">
                      {data.label}
                    </p>

                    <p className="text-[15px] font-bold text-[#1e1008]">
                      {data.price ===
                      0
                        ? "₦0"
                        : `+${formatNaira(
                            data.price
                          )}`}
                    </p>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* =================================================
            ORDER SUMMARY
        ================================================= */}

        <div
          className="
            mt-7
            rounded-2xl
            bg-[#1e1008]
            px-5
            py-5
            text-white
            shadow-[0_12px_30px_rgba(30,16,8,0.12)]
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#A67C00]
                "
              >
                Order Total
              </p>

              <p
                className="
                  mt-1
                  text-[13px]
                  font-medium
                  text-white/60
                "
                id="premium-display-summary"
              >
                {setPricing.label} ·{" "}
                {totalOilBottles > 0
                  ? `${totalOilBottles} bottles`
                  : "no extra oil"}
              </p>
            </div>

            <p
              className="
                text-[24px]
                font-bold
                tracking-tight
              "
              id="premium-display-total"
            >
              {formatNaira(
                total
              )}
            </p>
          </div>

          {freeOilGranted && (
            <div
              className="
                mt-4
                border-t
                border-white/10
                pt-3
                text-[12px]
                font-semibold
                text-[#A67C00]
              "
            >
              🎁 1 extra fragrance oil bottle added FREE
            </div>
          )}
        </div>

        {/* =================================================
            CUSTOMER DETAILS
        ================================================= */}

        <div className="mt-7">
          <p className="text-[15px] font-bold text-[#1e1008]">
            Delivery details
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <label className="text-[12px] font-bold uppercase tracking-wide text-black/50">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="e.g. Chioma Adeyemi"
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  px-4
                  py-3.5
                  text-[15px]
                  font-medium
                  text-black
                  outline-none
                  transition
                  focus:border-[#A67C00]
                  focus:ring-2
                  focus:ring-[#A67C00]/10
                "
              />
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase tracking-wide text-black/50">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="08012345678"
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  px-4
                  py-3.5
                  text-[15px]
                  font-medium
                  text-black
                  outline-none
                  transition
                  focus:border-[#A67C00]
                  focus:ring-2
                  focus:ring-[#A67C00]/10
                "
              />
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase tracking-wide text-black/50">
                WhatsApp Number
              </label>

              <input
                type="tel"
                value={whatsapp}
                onChange={(e) =>
                  setWhatsapp(
                    e.target.value
                  )
                }
                placeholder="08012345678"
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  px-4
                  py-3.5
                  text-[15px]
                  font-medium
                  text-black
                  outline-none
                  transition
                  focus:border-[#A67C00]
                  focus:ring-2
                  focus:ring-[#A67C00]/10
                "
              />
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase tracking-wide text-black/50">
                State
              </label>

              <select
                value={state}
                onChange={(e) =>
                  setState(
                    e.target.value
                  )
                }
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  px-4
                  py-3.5
                  text-[15px]
                  font-medium
                  text-black
                  outline-none
                  transition
                  focus:border-[#A67C00]
                  focus:ring-2
                  focus:ring-[#A67C00]/10
                "
              >
                <option value="">
                  Select your state
                </option>

                {STATES.map(
                  (s) => (
                    <option
                      key={s}
                      value={s}
                    >
                      {s}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase tracking-wide text-black/50">
                Town / City
              </label>

              <input
                type="text"
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
                placeholder="e.g. Ikeja"
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  px-4
                  py-3.5
                  text-[15px]
                  font-medium
                  text-black
                  outline-none
                  transition
                  focus:border-[#A67C00]
                  focus:ring-2
                  focus:ring-[#A67C00]/10
                "
              />
            </div>

            <div>
              <label className="text-[12px] font-bold uppercase tracking-wide text-black/50">
                Delivery Address
              </label>

              <textarea
                value={address}
                onChange={(e) =>
                  setAddress(
                    e.target.value
                  )
                }
                placeholder="House number, street, area, landmark"
                rows={3}
                className="
                  mt-1.5
                  w-full
                  rounded-xl
                  border
                  border-black/10
                  bg-white
                  px-4
                  py-3.5
                  text-[15px]
                  font-medium
                  text-black
                  outline-none
                  transition
                  focus:border-[#A67C00]
                  focus:ring-2
                  focus:ring-[#A67C00]/10
                "
              />
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <p
            id="premium-form-error-message"
            className="
              mt-4
              scroll-mt-28
              text-[13px]
              font-semibold
              text-red-600
            "
          >
            {error}
          </p>
        )}

        {/* =================================================
            I'LL ACCEPT-BOX
        ================================================= */}

        <div className="mt-6 rounded-xl border border-red-200 bg-red-50/70 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={willAccept}
              onChange={(e) => {
                setWillAccept(
                  e.target.checked
                );

                if (
                  e.target.checked
                ) {
                  setError("");
                }
              }}
              className="mt-1 h-5 w-5 shrink-0 accent-red-600"
            />

            <span className="text-[15px] font-bold leading-6 text-gray-800">
              I WILL ACCEPT — I am ready to receive my order when contacted for
              delivery confirmation.
            </span>
          </label>
        </div>

        {/* =================================================
            SUBMIT-BUTTON
        ================================================= */}

        <button
          type="submit"
          disabled={
            submitting ||
            !mounted
          }
          id="premium-submit-btn"
          className="
            mt-7
            flex
            min-h-[62px]
            w-full
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            px-6
            py-4
            text-center
            text-[16px]
            font-extrabold
            tracking-[0.01em]
            text-white
            shadow-[0_12px_30px_rgba(37,211,102,0.22)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#20bd5a]
            hover:shadow-[0_16px_35px_rgba(37,211,102,0.30)]
            active:translate-y-0
            disabled:opacity-60
          "
        >
          {!mounted
            ? "Loading..."
            : submitting
              ? "Sending Your Order..."
              : `YES I WANT THIS NOW — ${formatNaira(
                  total
                )}`}
        </button>

        <div className="mt-4 text-center">
          <p className="text-[15px] font-medium leading-5 text-black/45">
            A sales rep will call to confirm before your
            order is dispatched.
          </p>

          <p className="mt-2 text-[20px] font-semibold text-[#A67C00]">
            Payment on delivery available
          </p>
        </div>
      </form>

      {/* =================================================
          SUCCESS MODAL
      ================================================= */}

      {mounted &&
        submitted &&
        createPortal(
          <div
            className="
              fixed
              inset-0
              z-[9999999]
              flex
              items-center
              justify-center
              bg-black/60
              p-4
              backdrop-blur-sm
            "
          >
            <div
              className="
                relative
                w-full
                max-w-md
                rounded-2xl
                border
                border-black/5
                bg-white
                p-6
                text-center
                text-black
                shadow-2xl
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-emerald-100
                  text-emerald-600
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>

              <h3 className="mt-4 text-[21px] font-bold tracking-tight">
                Order Received Successfully! ✅
              </h3>

              <p className="mt-2 px-2 text-[14px] font-medium leading-relaxed text-black/70">
                Thank you{" "}
                <span className="font-bold text-black">
                  {name.split(" ")[0]}
                </span>
                , if you want your order delivered faster,
                please inform us on WhatsApp.
              </p>

              <div
                className="
                  mt-4
                  rounded-xl
                  border
                  border-amber-200
                  bg-amber-50/80
                  p-4
                  text-left
                "
              >
                <p className="text-[13px] font-bold leading-relaxed text-amber-950">
                  ⚠️ WHAT NEXT? A ScentMason customer care
                  representative will call you shortly on{" "}
                  <span className="font-extrabold underline">
                    {phone}
                  </span>{" "}
                  to verify your destination details before
                  your order is delivered.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#25D366]
                  px-6
                  py-4
                  text-center
                  text-[16px]
                  font-bold
                  text-white
                  shadow-md
                  transition-all
                  hover:scale-[1.01]
                  active:scale-100
                "
              >
                <svg
                  viewBox="0 0 32 32"
                  className="h-5 w-5 shrink-0"
                  fill="#ffffff"
                >
                  <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.385.694 4.6 1.885 6.466L4 29l7.73-1.838A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.629 28 15.001 28 8.373 22.629 3 16.001 3zm6.992 16.99c-.295.83-1.452 1.59-2.31 1.762-.797.158-1.5.225-3.193-.42-2.726-1.04-4.484-3.78-4.62-3.95-.137-.17-1.103-1.47-.95-2.255.246-.27.535-.337.713-.337.178 0 .357-.008.513.008.165.008.387-.063.605.462.224.54.762 1.86.83 1.994.067.135.112.293.022.47-.09.178-.135.288-.27.443-.135.157-.284.35-.405.47-.135.135-.276.282-.118.55.157.27.7 1.155 1.504 1.873 1.04.927 1.917 1.213 2.187 1.348.27.135.428.113.586-.067.157-.18.674-.785.854-1.055.18-.27.36-.225.605-.135.246.09 1.564.738 1.832.872.27.135.45.202.516.315.067.113.067.652-.227 1.483z" />
                </svg>

                Chat Us On WhatsApp
              </a>
            </div>
          </div>,
          document.body
        )}

      {/* =================================================
          VANILLA FALLBACK ENGINE
      ================================================= */}

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var container = document.getElementById("premium-order-form-container");
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

                var oilText =
                  totalOil > 0
                    ? totalOil + " bottle" + (totalOil > 1 ? "s" : "")
                    : "no extra oil";

                var displaySummary =
                  document.getElementById("premium-display-summary");

                var displayTotal =
                  document.getElementById("premium-display-total");

                var submitBtn =
                  document.getElementById("premium-submit-btn");

                if (displaySummary) {
                  displaySummary.innerText =
                    currentPkgLabel + " · " + oilText;
                }

                if (displayTotal) {
                  displayTotal.innerText = formatMoney(total);
                }

                if (
                  submitBtn &&
                  !submitBtn.innerText.includes("Sending")
                ) {
                  submitBtn.innerText =
                    "YES I WANT THIS NOW — " + formatMoney(total);
                }

                var hiddenSets =
                  document.getElementById("premium-hidden-sets");

                var hiddenOil =
                  document.getElementById("premium-hidden-oil");

                if (hiddenSets) {
                  hiddenSets.value = currentPkgValue;
                }

                if (hiddenOil) {
                  hiddenOil.value = currentOilValue;
                }
              }

              container.addEventListener(
                "click",
                function(e) {
                  var btn = e.target.closest(
                    ".premium-selectable-btn"
                  );

                  if (!btn) return;

                  var type =
                    btn.getAttribute("data-option-type");

                  var val =
                    btn.getAttribute("data-value");

                  var price =
                    parseInt(
                      btn.getAttribute("data-price"),
                      10
                    );

                  if (type === "package") {
                    currentPkgValue = val;
                    currentPkgPrice = price;
                    currentPkgLabel =
                      btn.getAttribute("data-label");

                    var wrapper =
                      document.getElementById(
                        "premium-package-buttons-wrapper"
                      );

                    if (wrapper) {
                      var buttons =
                        wrapper.getElementsByClassName(
                          "premium-selectable-btn"
                        );

                      for (
                        var i = 0;
                        i < buttons.length;
                        i++
                      ) {
                        buttons[i].classList.remove(
                          "border-[#A67C00]",
                          "bg-[#A67C00]/[0.06]"
                        );

                        buttons[i].classList.add(
                          "border-black/10",
                          "bg-white"
                        );
                      }
                    }
                  } else if (type === "oil") {
                    currentOilValue = val;
                    currentOilPrice = price;

                    var wrapper =
                      document.getElementById(
                        "premium-oil-buttons-wrapper"
                      );

                    if (wrapper) {
                      var buttons =
                        wrapper.getElementsByClassName(
                          "premium-selectable-btn"
                        );

                      for (
                        var i = 0;
                        i < buttons.length;
                        i++
                      ) {
                        buttons[i].classList.remove(
                          "border-[#A67C00]",
                          "bg-[#A67C00]/[0.06]"
                        );

                        buttons[i].classList.add(
                          "border-black/10",
                          "bg-white"
                        );
                      }
                    }
                  }

                  btn.classList.remove(
                    "border-black/10",
                    "bg-white"
                  );

                  btn.classList.add(
                    "border-[#A67C00]",
                    "bg-[#A67C00]/[0.06]"
                  );

                  updateDOMCalculations();
                },
                true
              );
            })();
          `,
        }}
      />
    </div>
  );
}