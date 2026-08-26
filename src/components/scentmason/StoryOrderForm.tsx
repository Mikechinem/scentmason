"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import { captureAttribution } from "@/lib/tracking/attribution";
import { getBrowserIdentifiers } from "@/lib/tracking/cookies";
import {
  trackMetaLead,
  trackMetaCompleteRegistration,
} from "@/components/tracking/MetaPixel";

type PackageOption = {
  id: string;
  name: string;
  shortName: string;
  machines: number;
  includedOils: number;
  price: number;
  badge?: string;
  description: string;
};

type OilOption = {
  quantity: number;
  price: number;
};

const PACKAGES: PackageOption[] = [
  {
    id: "one_set",
    name: "1 ScentMason Set",
    shortName: "1 Set",
    machines: 1,
    includedOils: 1,
    price: 28000,
    description:
      "Perfect if you want to try ScentMason.",
  },
  {
    id: "two_sets",
    name: "2 ScentMason Sets",
    shortName: "2 Sets",
    machines: 2,
    includedOils: 2,
    price: 56000,
    description:
      "Great for two rooms.",
  },
  {
    id: "three_sets",
    name: "3 ScentMason Sets",
    shortName: "3 Sets",
    machines: 3,
    includedOils: 3,
    price: 75000,
    badge: "BEST VALUE",
    description:
      "Use in your main rooms.",
  },
  {
    id: "five_sets",
    name: "5 ScentMason Sets",
    shortName: "5 Sets",
    machines: 5,
    includedOils: 6,
    price: 132000,
    badge: "BONUS OFFER",
    description:
      "5 sets + 1 FREE extra fragrance oil.",
  },
];

const OIL_OPTIONS: OilOption[] = [
  { quantity: 0, price: 0 },
  { quantity: 1, price: 10000 },
  { quantity: 2, price: 17500 },
  { quantity: 3, price: 24500 },
  { quantity: 4, price: 34500 },
  { quantity: 5, price: 42500 },
];

const STATES = [
  "Abia", "Abuja (FCT)", "Adamawa", "Akwa Ibom", "Anambra",
  "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
  "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
  "Imo", "Kaduna", "Kano", "Sokoto", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers",
];


function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function createEventId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export default function StoryOrderForm() {
  const [selectedPackageId, setSelectedPackageId] =
    useState("three_sets");

  const [extraOilQuantity, setExtraOilQuantity] =
    useState(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    state: "",
    city: "",
    address: "",
    willAccept: false,
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const selectedPackage = useMemo(
    () =>
      PACKAGES.find(
        (item) =>
          item.id === selectedPackageId
      ) ?? PACKAGES[2],
    [selectedPackageId]
  );

  const selectedOil = useMemo(
    () =>
      OIL_OPTIONS.find(
        (item) =>
          item.quantity === extraOilQuantity
      ) ?? OIL_OPTIONS[0],
    [extraOilQuantity]
  );

  const total =
    selectedPackage.price +
    selectedOil.price;

  const totalOils =
    selectedPackage.includedOils +
    selectedOil.quantity;

  function updateField(
    field: keyof typeof form,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    if (!form.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!form.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!form.state.trim()) {
      alert("Please select your state.");
      return;
    }

    if (!form.city.trim()) {
      alert("Please enter your city.");
      return;
    }

    if (!form.address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!form.willAccept) {
      alert(
        "Please confirm that you are ready to receive your order."
      );
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      /* =====================================================
         TRACKING
      ===================================================== */

      const attribution =
        captureAttribution();

      const browserIdentifiers =
        getBrowserIdentifiers();

      /*
       * One ID per Meta event.
       *
       * The exact Lead ID and CompleteRegistration ID
       * are sent to both:
       *
       * 1. Browser Pixel
       * 2. Server CAPI
       *
       * This allows Meta to deduplicate them.
       */

      const sharedEventId =
        createEventId("story_order");

      const leadEventId =
        createEventId("story_lead");

      const completeRegistrationEventId =
        createEventId(
          "story_complete_registration"
        );

      /* =====================================================
         PAYLOAD
      ===================================================== */

      const payload = {
        sourcePage: "story",

        eventSourceUrl:
          window.location.href,

        order: {
          packageId:
            selectedPackage.id,

          packageName:
            selectedPackage.name,

          machines:
            selectedPackage.machines,

          packagePrice:
            selectedPackage.price,

          includedOils:
            selectedPackage.includedOils,

          extraOilQuantity:
            selectedOil.quantity,

          extraOilPrice:
            selectedOil.price,

          totalOils,

          total,

          currency: "NGN",
        },

        customer: {
          name:
            form.name.trim(),

          phone:
            form.phone.trim(),

          whatsapp:
            form.whatsapp.trim(),

          state:
            form.state.trim(),

          city:
            form.city.trim(),

          address:
            form.address.trim(),

          willAccept:
            form.willAccept,
        },

        tracking: {
          sharedEventId,

          leadEventId,

          completeRegistrationEventId,

          attribution,

          browserIdentifiers,

          userAgent:
            typeof navigator !==
            "undefined"
              ? navigator.userAgent
              : "",
        },
      };

      /* =====================================================
         SERVER
      ===================================================== */

      const response =
        await fetch(
          "/api/track/story-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(payload),
          }
        );

      const result =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "We could not submit your order. Please try again."
        );
      }

      /* =====================================================
         BROWSER META EVENTS
         
         Fire only after the server confirms that:
         
         - Story order was saved
         - Server CAPI tracking succeeded
      ===================================================== */

      const eventParameters = {
        currency: "NGN",

        value: total,

        content_name:
          selectedPackage.name,

        content_category:
          "ScentMason",

        content_type:
          "product",

        content_ids: [
          selectedPackage.id,
        ],

        num_items:
          selectedPackage.machines,

        total_oils:
          totalOils,

        extra_oil_quantity:
          selectedOil.quantity,
      };

      trackMetaLead(
        leadEventId,
        eventParameters
      );

      trackMetaCompleteRegistration(
        completeRegistrationEventId,
        eventParameters
      );

      console.log(
        "[ScentMason Story] Browser Lead + CompleteRegistration fired.",
        {
          leadEventId,
          completeRegistrationEventId,
          value: total,
        }
      );

      setStatus("success");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Story order submission failed:",
        error
      );

      setStatus("error");

      alert(
        "We could not submit your order right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section
        id="order-form-start"
        className="bg-[#f7f5ef] px-4 py-14 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-5xl">

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#A67C00]">
              Your ScentMason
            </p>

            <h2 className="mt-3 text-[34px] font-black leading-[1.05] tracking-[-0.03em] text-black sm:text-[48px]">
              Choose Your Offer
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[17px] font-medium leading-[1.5] text-black/60 sm:text-[19px]">
              Choose the package that works best for your home.
              You can also add extra fragrance oil.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-4xl"
          >

            {/* PACKAGE OPTIONS */}

            <div className="grid gap-4 md:grid-cols-2">
              {PACKAGES.map((pkg) => {
                const isSelected =
                  selectedPackageId === pkg.id;

                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() =>
                      setSelectedPackageId(pkg.id)
                    }
                    className={[
                      "relative w-full rounded-3xl border-2 p-5 text-left transition-all sm:p-6",
                      isSelected
                        ? "border-[#A67C00] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.10)]"
                        : "border-black/10 bg-white hover:border-black/25",
                    ].join(" ")}
                  >
                    {pkg.badge && (
                      <div className="absolute right-4 top-4 rounded-full bg-[#A67C00] px-3 py-1 text-[11px] font-black tracking-wide text-white">
                        {pkg.badge}
                      </div>
                    )}

                    <div className="flex items-start gap-4">
                      <span
                        className={[
                          "mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                          isSelected
                            ? "border-[#A67C00]"
                            : "border-black/25",
                        ].join(" ")}
                      >
                        {isSelected && (
                          <span className="h-3 w-3 rounded-full bg-[#A67C00]" />
                        )}
                      </span>

                      <div className="min-w-0 pr-16">
                        <p className="text-[19px] font-black text-black sm:text-[21px]">
                          {pkg.name}
                        </p>

                        <p className="mt-1 text-[14px] font-medium leading-[1.45] text-black/50">
                          {pkg.description}
                        </p>

                        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-[28px] font-black leading-none text-black">
                            {formatNaira(pkg.price)}
                          </span>
                        </div>

                        <p className="mt-3 text-[14px] font-bold text-black/65">
                          {pkg.machines}{" "}
                          {pkg.machines === 1
                            ? "ScentMason"
                            : "ScentMason sets"}{" "}
                          +{" "}
                          {pkg.includedOils}{" "}
                          {pkg.includedOils === 1
                            ? "fragrance oil"
                            : "fragrance oils"}
                        </p>
                      </div>
                    </div>

                    {pkg.id === "five_sets" && (
                      <div className="mt-4 rounded-2xl bg-[#f7f5ef] px-4 py-3">
                        <p className="text-[14px] font-extrabold text-black">
                          5 oils included + 1 FREE oil
                        </p>

                        <p className="mt-1 text-[13px] font-medium text-black/50">
                          You receive 6 fragrance oils with this offer.
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* EXTRA OIL */}

            <div className="mt-6 rounded-3xl border border-black/10 bg-white p-6 sm:p-7">
              <div>
                <p className="text-[20px] font-black text-black">
                  Want extra fragrance oil?
                </p>

                <p className="mt-1 text-[14px] font-medium text-black/50">
                  You already get the oils included with your package.
                  Add more only if you want.
                </p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {OIL_OPTIONS.map((oil) => {
                  const selected =
                    extraOilQuantity === oil.quantity;

                  return (
                    <button
                      key={oil.quantity}
                      type="button"
                      onClick={() =>
                        setExtraOilQuantity(
                          oil.quantity
                        )
                      }
                      className={[
                        "rounded-2xl border-2 px-4 py-4 text-left transition-all",
                        selected
                          ? "border-[#A67C00] bg-[#fffaf0]"
                          : "border-black/10 bg-white hover:border-black/25",
                      ].join(" ")}
                    >
                      <p className="text-[16px] font-black text-black">
                        {oil.quantity === 0
                          ? "No extra oil"
                          : `${oil.quantity} ${
                              oil.quantity === 1
                                ? "bottle"
                                : "bottles"
                            }`}
                      </p>

                      <p className="mt-1 text-[14px] font-bold text-[#A67C00]">
                        {formatNaira(oil.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ORDER SUMMARY */}

            <div className="mt-6 rounded-3xl bg-black p-6 text-white sm:p-8">
              <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-white/45">
                Your order
              </p>

              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[18px] font-black">
                    {selectedPackage.name}
                  </p>

                  <p className="mt-1 text-[14px] font-medium text-white/50">
                    {selectedPackage.includedOils}{" "}
                    included{" "}
                    {selectedPackage.includedOils === 1
                      ? "oil"
                      : "oils"}

                    {selectedOil.quantity > 0 &&
                      ` + ${selectedOil.quantity} extra ${
                        selectedOil.quantity === 1
                          ? "oil"
                          : "oils"
                      }`}
                  </p>
                </div>

                <p className="whitespace-nowrap text-[24px] font-black">
                  {formatNaira(total)}
                </p>
              </div>

              {selectedOil.quantity > 0 && (
                <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-[14px]">
                  <span className="text-white/50">
                    Extra oil
                  </span>

                  <span className="font-bold">
                    +{formatNaira(selectedOil.price)}
                  </span>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1.5 text-[12px] font-extrabold text-black">
                  FREE DELIVERY
                </span>

                <span className="rounded-full bg-[#D6A63A] px-3 py-1.5 text-[12px] font-extrabold text-black">
                  PAYMENT ON DELIVERY
                </span>
              </div>
            </div>

            {/* CUSTOMER DETAILS */}

            <div className="mt-6 rounded-3xl bg-white p-6 sm:p-8">
              <h3 className="text-[24px] font-black text-black">
                Where should we deliver it?
              </h3>

              <p className="mt-2 text-[15px] font-medium text-black/50">
                We'll call to confirm your order before delivery.
              </p>

              <div className="mt-6 grid gap-5">

                <div>
                  <label
                    htmlFor="story-name"
                    className="mb-2 block text-[14px] font-extrabold text-black"
                  >
                    Full Name
                  </label>

                  <input
                    id="story-name"
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      updateField(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-black/15 bg-white px-4 py-4 text-[16px] font-medium outline-none transition focus:border-[#A67C00]"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="story-phone"
                      className="mb-2 block text-[14px] font-extrabold text-black"
                    >
                      Phone Number
                    </label>

                    <input
                      id="story-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        updateField(
                          "phone",
                          e.target.value
                        )
                      }
                      placeholder="08012345678"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-4 text-[16px] font-medium outline-none transition focus:border-[#A67C00]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="story-whatsapp"
                      className="mb-2 block text-[14px] font-extrabold text-black"
                    >
                      WhatsApp Number
                      <span className="ml-1 font-medium text-black/40">
                        (optional)
                      </span>
                    </label>

                    <input
                      id="story-whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) =>
                        updateField(
                          "whatsapp",
                          e.target.value
                        )
                      }
                      placeholder="08012345678"
                      autoComplete="tel"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-4 text-[16px] font-medium outline-none transition focus:border-[#A67C00]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="story-state"
                      className="mb-2 block text-[14px] font-extrabold text-black"
                    >
                      State
                    </label>

                    <select
                      id="story-state"
                      value={form.state}
                      onChange={(e) =>
                        updateField(
                          "state",
                          e.target.value
                        )
                      }
                      autoComplete="address-level1"
                      className="w-full appearance-none rounded-xl border border-black/15 bg-white px-4 py-4 text-[16px] font-medium outline-none transition focus:border-[#A67C00]"
                    >
                      <option value="" disabled>
                        Select your state
                      </option>

                      {STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="story-city"
                      className="mb-2 block text-[14px] font-extrabold text-black"
                    >
                      City / Area
                    </label>

                    <input
                      id="story-city"
                      type="text"
                      value={form.city}
                      onChange={(e) =>
                        updateField(
                          "city",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Ikeja"
                      autoComplete="address-level2"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-4 text-[16px] font-medium outline-none transition focus:border-[#A67C00]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="story-address"
                    className="mb-2 block text-[14px] font-extrabold text-black"
                  >
                    Delivery Address
                  </label>

                  <textarea
                    id="story-address"
                    value={form.address}
                    onChange={(e) =>
                      updateField(
                        "address",
                        e.target.value
                      )
                    }
                    placeholder="Enter the full address where you want the order delivered"
                    rows={4}
                    autoComplete="street-address"
                    className="w-full resize-none rounded-xl border border-black/15 bg-white px-4 py-4 text-[16px] font-medium outline-none transition focus:border-[#A67C00]"
                  />
                </div>

              </div>
            </div>

            {/* ACCEPTANCE */}

            <label className="mt-6 flex cursor-pointer items-start gap-4 rounded-2xl border border-black/10 bg-white p-5">
              <input
                type="checkbox"
                checked={form.willAccept}
                onChange={(e) =>
                  updateField(
                    "willAccept",
                    e.target.checked
                  )
                }
                className="mt-1 h-5 w-5 shrink-0 accent-[#A67C00]"
              />

              <span>
                <span className="block text-[15px] font-black text-black">
                  I'M READY TO RECEIVE MY ORDER
                </span>

                <span className="mt-1 block text-[13px] font-medium leading-[1.5] text-black/50">
                  Please tick this to indicate you are ready to receive
                  the order and pay if you like it when it arrives.
                </span>
              </span>
            </label>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 flex min-h-[62px] w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-[18px] font-black text-white shadow-lg transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "SUBMITTING ORDER..."
                : `ORDER NOW — ${formatNaira(total)}`}
            </button>

            <p className="mt-3 text-center text-[13px] font-medium leading-[1.5] text-black/45">
              Payment on delivery. You don't pay until your order arrives.
            </p>

            {/* ERROR */}

            {status === "error" && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
                <p className="text-[16px] font-black text-red-900">
                  Something went wrong.
                </p>

                <p className="mt-2 text-[14px] font-medium text-red-800">
                  Please try submitting your order again.
                </p>
              </div>
            )}

          </form>
        </div>
      </section>

      {/* =====================================================
          FULL-SCREEN ORDER CONFIRMATION
      ===================================================== */}

      {status === "success" && (
        <div
          className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-order-success-title"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-black/5 bg-white p-6 text-center text-black shadow-2xl sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
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

            <p className="mt-5 text-[13px] font-black uppercase tracking-[0.18em] text-[#A67C00]">
              Order Confirmed
            </p>

            <h3
              id="story-order-success-title"
              className="mt-3 text-[30px] font-black leading-[1.08] tracking-tight text-black sm:text-[34px]"
            >
              Order Received Successfully! ✅
            </h3>

            <p className="mt-3 px-2 text-[16px] font-black leading-relaxed text-black/80 sm:text-[17px]">
              Thank you{" "}
              <span className="font-black text-black">
                {form.name.split(" ")[0]}
              </span>
              , if you want your order delivered faster,
              please inform us on WhatsApp.
            </p>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left">
              <p className="text-[14px] font-black leading-relaxed text-amber-950 sm:text-[15px]">
                ⚠️ WHAT NEXT? A ScentMason customer care
                representative will call you shortly on{" "}
                <span className="font-black underline">
                  {form.phone}
                </span>{" "}
                to verify your destination details before
                your order is delivered.
              </p>
            </div>

            <a
              href={`https://wa.me/2347064969603?text=${encodeURIComponent(
                `Hello ScentMason, I just placed an order for ${selectedPackage.name}. My name is ${form.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-center text-[17px] font-black text-white shadow-md transition-all hover:scale-[1.01] active:scale-100"
            >
              <svg
                viewBox="0 0 32 32"
                className="h-5 w-5 shrink-0"
                fill="#ffffff"
                aria-hidden="true"
              >
                <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.385.694 4.6 1.885 6.466L4 29l7.73-1.838A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.629 28 15.001 28 8.373 22.629 3 16.001 3zm6.992 16.99c-.295.83-1.452 1.59-2.31 1.762-.797.158-1.5.225-3.193-.42-2.726-1.04-4.484-3.78-4.62-3.95-.137-.17-1.103-1.47-1.103-2.8 0-1.33.7-1.984.95-2.255.246-.27.535-.337.713-.337.178 0 .357 0 .513.008.165.008.387-.063.605.462.224.54.762 1.86.83 1.994.067.135.112.293.022.47-.09.178-.135.288-.27.443-.135.157-.284.35-.405.47-.135.135-.276.282-.118.55.157.27.7 1.155 1.504 1.873 1.04.927 1.917 1.213 2.187 1.348.27.135.428.113.586-.067.157-.18.674-.785.854-1.055.18-.27.36-.225.605-.135.246.09 1.564.738 1.832.872.27.135.45.202.516.315.067.113.067.652-.227 1.483z" />
              </svg>
              Chat Us On WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}