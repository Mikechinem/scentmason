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

  return `evt_${Date.now()}_${Math.random().toString(16).slice(2)}`;
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

  const eventId = generateEventId();

  const customData = {
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
  };

  trackMetaLead(eventId, customData);
  trackGA4Lead(customData);

  fetch("/api/track/lead", {
    method: "POST",
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId,
      eventName: "Lead",
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