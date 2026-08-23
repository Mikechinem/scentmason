import type {
  AttributionData,
} from "./types";

const STORAGE_KEY =
  "scentmason_attribution_v2";

type TouchData = NonNullable<
  AttributionData["firstTouch"]
>;

function cleanParam(
  value: string | null
): string | undefined {
  if (!value) {
    return undefined;
  }

  const cleaned = value.trim();

  return cleaned || undefined;
}

function hasCampaignData(
  data: TouchData | undefined
): boolean {
  if (!data) {
    return false;
  }

  return Boolean(
    data.utm_source ||
      data.utm_medium ||
      data.utm_campaign ||
      data.utm_term ||
      data.utm_content ||
      data.fbclid ||
      data.ttclid ||
      data.gclid ||
      data.msclkid
  );
}

function readTouchFromCurrentUrl(): TouchData {
  if (typeof window === "undefined") {
    return {};
  }

  const params =
    new URLSearchParams(
      window.location.search
    );

  return {
    utm_source: cleanParam(
      params.get("utm_source")
    ),

    utm_medium: cleanParam(
      params.get("utm_medium")
    ),

    utm_campaign: cleanParam(
      params.get("utm_campaign")
    ),

    utm_term: cleanParam(
      params.get("utm_term")
    ),

    utm_content: cleanParam(
      params.get("utm_content")
    ),

    fbclid: cleanParam(
      params.get("fbclid")
    ),

    ttclid: cleanParam(
      params.get("ttclid")
    ),

    gclid: cleanParam(
      params.get("gclid")
    ),

    msclkid: cleanParam(
      params.get("msclkid")
    ),

    landingPage:
      window.location.href,

    landingPagePath:
      window.location.pathname,

    referrer:
      document.referrer || undefined,

    capturedAt:
      new Date().toISOString(),
  };
}

function readStoredAttribution(): AttributionData {
  if (
    typeof window === "undefined"
  ) {
    return {};
  }

  try {
    const raw =
      window.localStorage.getItem(
        STORAGE_KEY
      );

    if (!raw) {
      return {};
    }

    return JSON.parse(
      raw
    ) as AttributionData;
  } catch {
    return {};
  }
}

function saveAttribution(
  attribution: AttributionData
): void {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(attribution)
    );
  } catch {
    // Tracking continues if storage is unavailable.
  }
}

/**
 * Capture attribution for the current visit.
 *
 * If campaign parameters exist in the URL:
 *
 * - firstTouch is created only if no first touch exists
 * - lastTouch is updated to the current attributable visit
 *
 * If the visitor arrives organically/directly:
 *
 * - existing campaign attribution is preserved
 * - lastTouch is not overwritten with an empty visit
 */
export function captureAttribution(): AttributionData {
  if (
    typeof window === "undefined"
  ) {
    return {};
  }

  const existing =
    readStoredAttribution();

  const current =
    readTouchFromCurrentUrl();

  const hasCurrentCampaign =
    hasCampaignData(current);

  let updated: AttributionData = {
    ...existing,
  };

  if (
    hasCurrentCampaign
  ) {
    /*
     * First touch:
     *
     * Never overwrite an existing first
     * attributable visit.
     */
    if (
      !hasCampaignData(
        existing.firstTouch
      )
    ) {
      updated.firstTouch =
        current;
    }

    /*
     * Last touch:
     *
     * Replace the entire touch record with
     * the current attributable visit.
     *
     * This prevents mixing:
     *
     * Campaign A + Click ID from Campaign B.
     */
    updated.lastTouch =
      current;
  }

  /*
   * If there is no campaign data at all,
   * establish a first-touch record only when
   * nothing exists yet.
   */
  if (
    !updated.firstTouch &&
    !updated.lastTouch
  ) {
    const initialTouch: TouchData = {
      landingPage:
        window.location.href,

      landingPagePath:
        window.location.pathname,

      referrer:
        document.referrer ||
        undefined,

      capturedAt:
        new Date().toISOString(),
    };

    updated.firstTouch =
      initialTouch;
  }

  saveAttribution(updated);

  return updated;
}

/**
 * Return whatever attribution is currently
 * stored for this browser.
 */
export function getStoredAttribution(): AttributionData {
  return readStoredAttribution();
}

/**
 * Get stored attribution, falling back to
 * the current URL if necessary.
 */
export function getAttribution(): AttributionData {
  if (
    typeof window === "undefined"
  ) {
    return {};
  }

  const stored =
    readStoredAttribution();

  if (
    stored.firstTouch ||
    stored.lastTouch
  ) {
    return stored;
  }

  return {
    firstTouch:
      readTouchFromCurrentUrl(),
  };
}

/**
 * Clear attribution.
 *
 * Do NOT call this after a normal form
 * submission. Attribution needs to remain
 * available through the purchase-confirmation
 * lifecycle.
 */
export function clearAttribution(): void {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  try {
    window.localStorage.removeItem(
      STORAGE_KEY
    );
  } catch {
    // Ignore storage errors.
  }
}