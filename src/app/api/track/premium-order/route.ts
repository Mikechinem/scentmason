import { NextRequest, NextResponse } from "next/server";

import {
  cleanString,
  normalizePhone,
  removeEmptyValues,
} from "@/lib/tracking/normalize";

import type {
  AttributionData,
  BrowserIdentifiers,
  PremiumOrderData,
} from "@/lib/tracking/types";

export const runtime = "nodejs";

/**
 * ============================================================
 * PREMIUM ORDER INGESTION
 * ============================================================
 *
 * This route records a Premium order submission.
 *
 * IMPORTANT:
 *
 * This route does NOT fire Meta Purchase.
 *
 * Purchase is reserved for the separate:
 *
 * /api/track/premium-purchase
 *
 * route, which will only fire after the sales representative
 * confirms the order as paid.
 *
 * ============================================================
 */

function getClientIp(
  req: NextRequest
): string | undefined {
  const forwardedFor =
    req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const firstIp = forwardedFor
      .split(",")
      .map((ip) => ip.trim())
      .find(Boolean);

    if (firstIp) {
      return firstIp;
    }
  }

  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

function parseNumber(
  value: unknown,
  fallback = 0
): number {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned =
      value.replace(/[^0-9.-]/g, "");

    const parsed = Number(cleaned);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function parseBoolean(
  value: unknown
): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized =
      value.trim().toLowerCase();

    return (
      normalized === "true" ||
      normalized === "yes"
    );
  }

  return false;
}

/**
 * ------------------------------------------------------------
 * Attribution cleaning
 * ------------------------------------------------------------
 *
 * AttributionData contains:
 *
 * firstTouch
 * lastTouch
 *
 * Therefore we clean each touch independently.
 */

function cleanTouch(
  touch:
    | NonNullable<AttributionData["firstTouch"]>
    | undefined
) {
  if (!touch) {
    return undefined;
  }

  return removeEmptyValues({
    utm_source:
      cleanString(touch.utm_source),

    utm_medium:
      cleanString(touch.utm_medium),

    utm_campaign:
      cleanString(touch.utm_campaign),

    utm_term:
      cleanString(touch.utm_term),

    utm_content:
      cleanString(touch.utm_content),

    fbclid:
      cleanString(touch.fbclid),

    ttclid:
      cleanString(touch.ttclid),

    gclid:
      cleanString(touch.gclid),

    msclkid:
      cleanString(touch.msclkid),

    landingPage:
      cleanString(touch.landingPage),

    landingPagePath:
      cleanString(touch.landingPagePath),

    referrer:
      cleanString(touch.referrer),

    capturedAt:
      cleanString(touch.capturedAt),
  });
}

function cleanAttribution(
  attribution:
    | AttributionData
    | undefined
): AttributionData {
  if (!attribution) {
    return {};
  }

  return removeEmptyValues({
    firstTouch:
      cleanTouch(attribution.firstTouch),

    lastTouch:
      cleanTouch(attribution.lastTouch),
  }) as AttributionData;
}

/**
 * ------------------------------------------------------------
 * Browser identifier cleaning
 * ------------------------------------------------------------
 */

function cleanBrowserIdentifiers(
  identifiers:
    | BrowserIdentifiers
    | undefined
): BrowserIdentifiers {
  if (!identifiers) {
    return {};
  }

  return removeEmptyValues({
    fbp:
      cleanString(identifiers.fbp),

    fbc:
      cleanString(identifiers.fbc),

    ttp:
      cleanString(identifiers.ttp),

    ttclid:
      cleanString(identifiers.ttclid),
  }) as BrowserIdentifiers;
}

/**
 * ------------------------------------------------------------
 * POST
 * ------------------------------------------------------------
 */

export async function POST(
  req: NextRequest
) {
  try {
    console.log(
      "=================================================="
    );

    console.log(
      "🟡 PREMIUM ORDER INGESTION STARTED"
    );

    /**
     * ========================================================
     * 1. GOOGLE SHEETS CONFIGURATION
     * ========================================================
     */

    const googleSheetsUrl =
      cleanString(
        process.env
          .GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL
      );

    if (!googleSheetsUrl) {
      console.error(
        "❌ GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL is missing."
      );

      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          message:
            "Premium Google Sheets configuration is missing.",
        },
        { status: 500 }
      );
    }

    /**
     * ========================================================
     * 2. READ REQUEST BODY
     * ========================================================
     */

    const rawBody =
      await req.json().catch(
        () => null
      );

    if (
      !rawBody ||
      typeof rawBody !== "object"
    ) {
      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          message:
            "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const body =
      rawBody as Partial<PremiumOrderData>;

    /**
     * ========================================================
     * 3. EVENT ID
     * ========================================================
     *
     * The browser-generated event ID becomes the permanent
     * identifier connecting:
     *
     * Form submission
     *      ↓
     * Google Sheet row
     *      ↓
     * Rep confirmation
     *      ↓
     * Meta Purchase
     *
     * We therefore NEVER generate a replacement ID here.
     */

    const eventId =
      cleanString(body.eventId);

    if (!eventId) {
      console.error(
        "❌ Premium order rejected: missing eventId."
      );

      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          message:
            "Missing eventId.",
        },
        { status: 400 }
      );
    }

    /**
     * ========================================================
     * 4. REQUIRED ORDER DATA
     * ========================================================
     */

    const name =
      cleanString(body.name);

    const phone =
      cleanString(body.phone);

    const state =
      cleanString(body.state);

    const address =
      cleanString(body.address);

    const sets =
      cleanString(body.sets);

    if (
      !name ||
      !phone ||
      !state ||
      !address ||
      !sets
    ) {
      console.error(
        "❌ Premium order rejected: missing required fields."
      );

      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          message:
            "Missing required customer or order fields.",
        },
        { status: 400 }
      );
    }

    /**
     * ========================================================
     * 5. NORMALIZE PHONE
     * ========================================================
     */

    const normalizedPhone =
      normalizePhone(phone);

    /**
     * ========================================================
     * 6. SERVER REQUEST CONTEXT
     * ========================================================
     */

    const clientIp =
      getClientIp(req);

    const userAgent =
      req.headers.get(
        "user-agent"
      ) || undefined;

    /**
     * ========================================================
     * 7. ATTRIBUTION
     * ========================================================
     *
     * IMPORTANT:
     *
     * We preserve the full first-touch / last-touch structure.
     *
     * We do NOT flatten attribution here.
     */

    const attribution =
      cleanAttribution(
        body.attribution
      );

    /**
     * ========================================================
     * 8. BROWSER IDENTIFIERS
     * ========================================================
     */

    const browserIdentifiers =
      cleanBrowserIdentifiers(
        body.browserIdentifiers
      );

    /**
     * ========================================================
     * 9. CLEAN ORDER VALUES
     * ========================================================
     */

    const whatsapp =
      cleanString(
        body.whatsapp
      ) || "";

    const city =
      cleanString(
        body.city
      ) || "";

    const setPrice =
      parseNumber(
        body.setPrice
      );

    const oilBottlesOrdered =
      parseNumber(
        body.oilBottlesOrdered
      );

    const oilBottlesFree =
      parseNumber(
        body.oilBottlesFree
      );

    const oilBottlesTotal =
      parseNumber(
        body.oilBottlesTotal
      );

    const oilPrice =
      parseNumber(
        body.oilPrice
      );

    const total =
      parseNumber(
        body.total
      );

    const willAccept =
      parseBoolean(
        body.willAccept
      );

    /**
     * ========================================================
     * 10. EVENT SOURCE URL
     * ========================================================
     */

    const eventSourceUrl =
      cleanString(
        body.eventSourceUrl
      ) ||
      attribution.lastTouch
        ?.landingPage ||
      attribution.firstTouch
        ?.landingPage ||
      process.env
        .NEXT_PUBLIC_SITE_URL ||
      "https://scentmason.vercel.app";

    /**
     * ========================================================
     * 11. GOOGLE SHEETS PAYLOAD
     * ========================================================
     *
     * The sheet receives both first-touch and last-touch
     * attribution.
     *
     * This is deliberate.
     *
     * It allows independent landing-page comparison without
     * tying the attribution engine to Premium specifically.
     */

    const sheetsPayload =
      removeEmptyValues({
        /**
         * ----------------------------------------------------
         * Order identity / status
         * ----------------------------------------------------
         */

        eventId,

        orderStatus:
          "Pending",

        /**
         * ----------------------------------------------------
         * Customer
         * ----------------------------------------------------
         */

        name,

        phone,

        normalizedPhone,

        whatsapp,

        state,

        city,

        address,

        /**
         * ----------------------------------------------------
         * Order
         * ----------------------------------------------------
         */

        sets,

        setPrice,

        oilBottlesOrdered,

        oilBottlesFree,

        oilBottlesTotal,

        oilPrice,

        total,

        willAccept:
          willAccept
            ? "Yes"
            : "No",

        /**
         * ----------------------------------------------------
         * Event / browser context
         * ----------------------------------------------------
         */

        eventSourceUrl,

        clientIp:
          clientIp || "",

        userAgent:
          userAgent || "",

        fbp:
          browserIdentifiers.fbp,

        fbc:
          browserIdentifiers.fbc,

        ttp:
          browserIdentifiers.ttp,

        /**
         * ----------------------------------------------------
         * FIRST TOUCH
         * ----------------------------------------------------
         */

        first_utm_source:
          attribution.firstTouch
            ?.utm_source,

        first_utm_medium:
          attribution.firstTouch
            ?.utm_medium,

        first_utm_campaign:
          attribution.firstTouch
            ?.utm_campaign,

        first_utm_term:
          attribution.firstTouch
            ?.utm_term,

        first_utm_content:
          attribution.firstTouch
            ?.utm_content,

        first_fbclid:
          attribution.firstTouch
            ?.fbclid,

        first_ttclid:
          attribution.firstTouch
            ?.ttclid,

        first_gclid:
          attribution.firstTouch
            ?.gclid,

        first_msclkid:
          attribution.firstTouch
            ?.msclkid,

        first_landingPage:
          attribution.firstTouch
            ?.landingPage,

        first_landingPagePath:
          attribution.firstTouch
            ?.landingPagePath,

        first_referrer:
          attribution.firstTouch
            ?.referrer,

        first_capturedAt:
          attribution.firstTouch
            ?.capturedAt,

        /**
         * ----------------------------------------------------
         * LAST TOUCH
         * ----------------------------------------------------
         */

        last_utm_source:
          attribution.lastTouch
            ?.utm_source,

        last_utm_medium:
          attribution.lastTouch
            ?.utm_medium,

        last_utm_campaign:
          attribution.lastTouch
            ?.utm_campaign,

        last_utm_term:
          attribution.lastTouch
            ?.utm_term,

        last_utm_content:
          attribution.lastTouch
            ?.utm_content,

        last_fbclid:
          attribution.lastTouch
            ?.fbclid,

        last_ttclid:
          attribution.lastTouch
            ?.ttclid,

        last_gclid:
          attribution.lastTouch
            ?.gclid,

        last_msclkid:
          attribution.lastTouch
            ?.msclkid,

        last_landingPage:
          attribution.lastTouch
            ?.landingPage,

        last_landingPagePath:
          attribution.lastTouch
            ?.landingPagePath,

        last_referrer:
          attribution.lastTouch
            ?.referrer,

        last_capturedAt:
          attribution.lastTouch
            ?.capturedAt,
      });

    /**
     * ========================================================
     * 12. SEND ORDER TO GOOGLE SHEETS
     * ========================================================
     */

    console.log(
      "📤 Sending Premium order to Google Sheets:",
      {
        eventId,
        total,
        orderStatus:
          "Pending",
      }
    );

    const sheetsResponse =
      await fetch(
        googleSheetsUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              sheetsPayload
            ),

          signal:
            AbortSignal.timeout(
              15000
            ),
        }
      );

    const responseText =
      await sheetsResponse.text();

    let sheetsResult: unknown =
      null;

    try {
      sheetsResult =
        JSON.parse(
          responseText
        );
    } catch {
      sheetsResult =
        responseText;
    }

    /**
     * ========================================================
     * 13. HTTP FAILURE
     * ========================================================
     */

    if (!sheetsResponse.ok) {
      console.error(
        "❌ PREMIUM GOOGLE SHEETS HTTP FAILURE:",
        {
          status:
            sheetsResponse.status,

          eventId,

          response:
            sheetsResult,
        }
      );

      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          googleSheets:
            "failed",

          googleSheetsStatus:
            sheetsResponse.status,

          googleSheetsResult:
            sheetsResult,

          eventId,
        },
        { status: 502 }
      );
    }

    /**
     * ========================================================
     * 14. APPS SCRIPT ERROR
     * ========================================================
     *
     * Apps Script may return HTTP 200 while its own response
     * says result: "error".
     *
     * We therefore inspect the response body too.
     */

    if (
      sheetsResult &&
      typeof sheetsResult ===
        "object" &&
      "result" in sheetsResult &&
      (
        sheetsResult as {
          result?: unknown;
        }
      ).result ===
        "error"
    ) {
      console.error(
        "❌ PREMIUM GOOGLE SHEETS REPORTED AN ERROR:",
        {
          eventId,
          result:
            sheetsResult,
        }
      );

      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          googleSheets:
            "failed",

          googleSheetsStatus:
            sheetsResponse.status,

          googleSheetsResult:
            sheetsResult,

          eventId,
        },
        { status: 502 }
      );
    }

    /**
     * ========================================================
     * 15. SUCCESS
     * ========================================================
     */

    console.log(
      "🟢 PREMIUM ORDER CAPTURED:",
      {
        eventId,
        orderStatus:
          "Pending",
      }
    );

    console.log(
      "ℹ️ Meta Purchase was NOT fired."
    );

    console.log(
      "Purchase remains reserved for sales confirmation."
    );

    console.log(
      "=================================================="
    );

    return NextResponse.json({
      success: true,

      orderCaptured:
        true,

      orderStatus:
        "Pending",

      googleSheets:
        "success",

      metaPurchase:
        "not_fired",

      eventId,
    });
  } catch (error) {
    console.error(
      "🔴 PREMIUM ORDER ROUTE CRASHED:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        orderCaptured:
          false,

        message:
          "Premium order could not be processed.",

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}