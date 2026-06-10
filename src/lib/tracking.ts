type OrderLeadPayload = {
  phone?: string;
  value?: number;
  currency?: string;
  packageName?: string;
  packagePrice?: string;
  extraOil?: string;
  extraOilPrice?: string;
  estimatedTotal?: string;
  state?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1] || "") : "";
}

function generateEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `lead_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function trackMetaLead(
  eventId: string,
  customData?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  window.fbq?.(
    "track",
    "Lead",
    {
      content_name: "ScentMason Order Lead",
      content_category: "Automatic Fragrance Machine",
      ...customData,
    },
    {
      eventID: eventId,
    }
  );
}

export function trackGA4Lead(customData?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "generate_lead", {
    currency: "NGN",
    ...customData,
  });
}

export function trackOrderLead(payload: OrderLeadPayload) {
  if (typeof window === "undefined") return;

  /**
   * One eventId is generated here and reused for:
   * 1. Browser Pixel Lead eventID
   * 2. Server CAPI Lead event_id
   *
   * This prevents Meta from counting browser Lead + server Lead as two separate leads.
   */
  const eventId = generateEventId();

  const customData = removeEmptyValues({
    currency: payload.currency || "NGN",
    value: payload.value || 0,
    content_name: "ScentMason Order Lead",
    content_category: "Automatic Fragrance Machine",
    package_name: payload.packageName,
    package_price: payload.packagePrice,
    extra_oil: payload.extraOil,
    extra_oil_price: payload.extraOilPrice,
    estimated_total: payload.estimatedTotal,
    delivery_state: payload.state,
  });

  // Browser-side Lead: visible in Chrome Meta Pixel Helper.
  trackMetaLead(eventId, customData);

  // GA4 lead event.
  trackGA4Lead(customData);

  // Server-side CAPI Lead: visible in Meta Events Manager.
  fetch("/api/track/lead", {
    method: "POST",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId,
      eventSourceUrl: window.location.href,
      fbp: getCookie("_fbp"),
      fbc: getCookie("_fbc"),
      phone: payload.phone,
      customData,
    }),
  }).catch(() => {
    // Silent fail so the buyer still reaches WhatsApp.
  });
}