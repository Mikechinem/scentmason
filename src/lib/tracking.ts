export function trackEvent(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  console.log("[tracking]", eventName, data || {});
}

export function trackLead(data?: Record<string, unknown>) {
  trackEvent("Lead", data);
}
