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
 * SCENTMASON PREMIUM ORDER INGESTION
 * ============================================================
 *
 * PURPOSE
 *
 * This route records a Premium order submission.
 *
 * It does NOT fire Meta Purchase.
 *
 * Purchase is reserved for:
 *
 * /api/track/premium-purchase
 *
 * which is called only after the sales representative changes:
 *
 * Payment Status
 * Pending → Paid
 *
 * ============================================================
 *
 * DATA FLOW
 *
 * Premium landing page
 *        ↓
 * captureAttribution()
 *        ↓
 * PremiumOrderForm
 *        ↓
 * /api/track/premium-order
 *        ↓
 * Google Apps Script
 *        ↓
 * Premium Orders sheet
 *        ↓
 * Pending
 *
 * ============================================================
 */


/**
 * ============================================================
 * CLIENT IP
 * ============================================================
 */

function getClientIp(
  req: NextRequest
): string | undefined {

  const forwardedFor =
    req.headers.get(
      "x-forwarded-for"
    );

  if (forwardedFor) {

    const firstIp =
      forwardedFor
        .split(",")
        .map((ip) => ip.trim())
        .find(Boolean);

    if (firstIp) {
      return firstIp;
    }
  }

  return (
    req.headers.get(
      "cf-connecting-ip"
    ) ||
    req.headers.get(
      "x-real-ip"
    ) ||
    undefined
  );
}


/**
 * ============================================================
 * NUMBER NORMALIZATION
 * ============================================================
 */

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

  if (
    typeof value === "string"
  ) {

    const cleaned =
      value.replace(
        /[^0-9.-]/g,
        ""
      );

    const parsed =
      Number(cleaned);

    if (
      Number.isFinite(parsed)
    ) {
      return parsed;
    }
  }

  return fallback;
}


/**
 * ============================================================
 * BOOLEAN NORMALIZATION
 * ============================================================
 */

function parseBoolean(
  value: unknown
): boolean {

  if (
    typeof value === "boolean"
  ) {
    return value;
  }

  if (
    typeof value === "string"
  ) {

    const normalized =
      value
        .trim()
        .toLowerCase();

    return (
      normalized === "true" ||
      normalized === "yes"
    );
  }

  return false;
}


/**
 * ============================================================
 * ATTRIBUTION CLEANING
 * ============================================================
 *
 * IMPORTANT:
 *
 * Attribution remains structured as:
 *
 * firstTouch
 * lastTouch
 *
 * We do NOT flatten it before sending to Apps Script.
 */

function cleanTouch(
  touch:
    | NonNullable<
        AttributionData["firstTouch"]
      >
    | undefined
) {

  if (!touch) {
    return undefined;
  }

  return removeEmptyValues({

    utm_source:
      cleanString(
        touch.utm_source
      ),

    utm_medium:
      cleanString(
        touch.utm_medium
      ),

    utm_campaign:
      cleanString(
        touch.utm_campaign
      ),

    utm_term:
      cleanString(
        touch.utm_term
      ),

    utm_content:
      cleanString(
        touch.utm_content
      ),

    fbclid:
      cleanString(
        touch.fbclid
      ),

    ttclid:
      cleanString(
        touch.ttclid
      ),

    gclid:
      cleanString(
        touch.gclid
      ),

    msclkid:
      cleanString(
        touch.msclkid
      ),

    landingPage:
      cleanString(
        touch.landingPage
      ),

    landingPagePath:
      cleanString(
        touch.landingPagePath
      ),

    referrer:
      cleanString(
        touch.referrer
      ),

    capturedAt:
      cleanString(
        touch.capturedAt
      ),
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
      cleanTouch(
        attribution.firstTouch
      ),

    lastTouch:
      cleanTouch(
        attribution.lastTouch
      ),

  }) as AttributionData;
}


/**
 * ============================================================
 * BROWSER IDENTIFIER CLEANING
 * ============================================================
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
      cleanString(
        identifiers.fbp
      ),

    fbc:
      cleanString(
        identifiers.fbc
      ),

    ttp:
      cleanString(
        identifiers.ttp
      ),

    ttclid:
      cleanString(
        identifiers.ttclid
      ),

  }) as BrowserIdentifiers;
}


/**
 * ============================================================
 * POST
 * ============================================================
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
     * 1. GOOGLE APPS SCRIPT URL
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
        {
          status: 500,
        }
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
        {
          status: 400,
        }
      );
    }

    const body =
      rawBody as Partial<PremiumOrderData>;


    /**
     * ========================================================
     * 3. EVENT ID
     * ========================================================
     *
     * The browser-generated Event ID is preserved.
     *
     * It is the permanent identity connecting:
     *
     * Form
     * ↓
     * Sheet
     * ↓
     * Paid confirmation
     * ↓
     * Purchase
     *
     * We NEVER generate a replacement ID here.
     */

    const eventId =
      cleanString(
        body.eventId
      );

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
        {
          status: 400,
        }
      );
    }


    /**
     * ========================================================
     * 4. REQUIRED ORDER FIELDS
     * ========================================================
     */

    const name =
      cleanString(
        body.name
      );

    const phone =
      cleanString(
        body.phone
      );

    const state =
      cleanString(
        body.state
      );

    const address =
      cleanString(
        body.address
      );

    const sets =
      cleanString(
        body.sets
      );

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
        {
          status: 400,
        }
      );
    }


    /**
     * ========================================================
     * 5. PHONE NORMALIZATION
     * ========================================================
     */

    const normalizedPhone =
      normalizePhone(
        phone
      );


    /**
     * ========================================================
     * 6. SERVER REQUEST CONTEXT
     * ========================================================
     */

    const clientIp =
      getClientIp(
        req
      );

    const userAgent =
      req.headers.get(
        "user-agent"
      ) || undefined;


    /**
     * ========================================================
     * 7. ATTRIBUTION
     * ========================================================
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
     * 9. ORDER VALUES
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
     * 11. BUILD APPS SCRIPT PAYLOAD
     * ========================================================
     *
     * IMPORTANT:
     *
     * This payload deliberately matches the Apps Script
     * structure we just installed.
     *
     * Apps Script expects:
     *
     * payload.attribution.firstTouch
     * payload.attribution.lastTouch
     *
     * payload.browserIdentifiers.fbp
     * payload.browserIdentifiers.fbc
     * payload.browserIdentifiers.ttp
     * payload.browserIdentifiers.ttclid
     *
     * ========================================================
     */

    const sheetsPayload = {

      /**
       * ------------------------------------------------------
       * Identity
       * ------------------------------------------------------
       */

      eventId,


      /**
       * ------------------------------------------------------
       * Customer
       * ------------------------------------------------------
       */

      name,

      phone,

      whatsapp,

      state,

      city,

      address,


      /**
       * ------------------------------------------------------
       * Order
       * ------------------------------------------------------
       */

      sets,

      setPrice,

      oilBottlesOrdered,

      oilBottlesFree,

      oilBottlesTotal,

      oilPrice,

      total,

      willAccept,


      /**
       * ------------------------------------------------------
       * Event source
       * ------------------------------------------------------
       */

      eventSourceUrl,


      /**
       * ------------------------------------------------------
       * Browser identifiers
       * ------------------------------------------------------
       */

      browserIdentifiers,


      /**
       * ------------------------------------------------------
       * Attribution
       * ------------------------------------------------------
       */

      attribution,


      /**
       * ------------------------------------------------------
       * Additional server context
       * ------------------------------------------------------
       *
       * These are retained in the payload for future server-side
       * matching, but Apps Script does not currently write them
       * into the spreadsheet.
       */

      clientIp:

        clientIp ||
        undefined,

      userAgent:

        userAgent ||
        undefined,
    };


    /**
     * ========================================================
     * 12. SEND TO GOOGLE APPS SCRIPT
     * ========================================================
     */

    console.log(
      "📤 Sending Premium order to Google Apps Script:",
      {
        eventId,

        total,

        hasAttribution:
          Boolean(
            attribution.firstTouch ||
            attribution.lastTouch
          ),

        hasFbp:
          Boolean(
            browserIdentifiers.fbp
          ),

        hasFbc:
          Boolean(
            browserIdentifiers.fbc
          ),

        hasTtp:
          Boolean(
            browserIdentifiers.ttp
          ),

        hasTtclid:
          Boolean(
            browserIdentifiers.ttclid
          ),
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


    /**
     * ========================================================
     * 13. READ APPS SCRIPT RESPONSE
     * ========================================================
     */

    const responseText =
      await sheetsResponse.text();

    let sheetsResult:
      | unknown
      | null = null;

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
     * 14. HTTP FAILURE
     * ========================================================
     */

    if (
      !sheetsResponse.ok
    ) {

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

          orderCaptured:
            false,

          googleSheets:
            "failed",

          googleSheetsStatus:
            sheetsResponse.status,

          googleSheetsResult:
            sheetsResult,

          eventId,
        },
        {
          status: 502,
        }
      );
    }


    /**
     * ========================================================
     * 15. APPS SCRIPT APPLICATION ERROR
     * ========================================================
     *
     * Apps Script can technically return HTTP 200 while
     * reporting:
     *
     * result: "error"
     *
     * Therefore inspect the response body.
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

          orderCaptured:
            false,

          googleSheets:
            "failed",

          googleSheetsStatus:
            sheetsResponse.status,

          googleSheetsResult:
            sheetsResult,

          eventId,
        },
        {
          status: 502,
        }
      );
    }


    /**
     * ========================================================
     * 16. SUCCESS
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