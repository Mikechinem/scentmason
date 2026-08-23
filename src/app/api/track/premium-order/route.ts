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

// ============================================================
// CLIENT IP
// ============================================================

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

    if (firstIp) return firstIp;
  }

  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

// ============================================================
// NORMALIZATION
// ============================================================

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
    const cleaned = value.replace(
      /[^0-9.-]/g,
      ""
    );

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
    const normalized = value
      .trim()
      .toLowerCase();

    return (
      normalized === "true" ||
      normalized === "yes"
    );
  }

  return false;
}

// ============================================================
// ATTRIBUTION
// ============================================================

function cleanTouch(
  touch:
    | NonNullable<
        AttributionData["firstTouch"]
      >
    | undefined
) {
  if (!touch) return undefined;

  return removeEmptyValues({
    utm_source: cleanString(touch.utm_source),
    utm_medium: cleanString(touch.utm_medium),
    utm_campaign: cleanString(touch.utm_campaign),
    utm_term: cleanString(touch.utm_term),
    utm_content: cleanString(touch.utm_content),
    fbclid: cleanString(touch.fbclid),
    ttclid: cleanString(touch.ttclid),
    gclid: cleanString(touch.gclid),
    msclkid: cleanString(touch.msclkid),
    landingPage: cleanString(touch.landingPage),
    landingPagePath: cleanString(
      touch.landingPagePath
    ),
    referrer: cleanString(touch.referrer),
    capturedAt: cleanString(touch.capturedAt),
  });
}

function cleanAttribution(
  attribution:
    | AttributionData
    | undefined
): AttributionData {
  if (!attribution) return {};

  return removeEmptyValues({
    firstTouch: cleanTouch(
      attribution.firstTouch
    ),
    lastTouch: cleanTouch(
      attribution.lastTouch
    ),
  }) as AttributionData;
}

// ============================================================
// BROWSER IDENTIFIERS
// ============================================================

function cleanBrowserIdentifiers(
  identifiers:
    | BrowserIdentifiers
    | undefined
): BrowserIdentifiers {
  if (!identifiers) return {};

  return removeEmptyValues({
    fbp: cleanString(identifiers.fbp),
    fbc: cleanString(identifiers.fbc),
    ttp: cleanString(identifiers.ttp),
    ttclid: cleanString(
      identifiers.ttclid
    ),
  }) as BrowserIdentifiers;
}

// ============================================================
// META HELPERS
// ============================================================

function sha256(
  value: string
): string {
  const cryptoModule =
    require("crypto") as typeof import("crypto");

  return cryptoModule
    .createHash("sha256")
    .update(
      value.trim().toLowerCase()
    )
    .digest("hex");
}

function normalizeNigerianPhone(
  phone: string
): string {
  let cleaned = phone.replace(
    /\D/g,
    ""
  );

  if (cleaned.startsWith("0")) {
    cleaned =
      "234" +
      cleaned.slice(1);
  } else if (
    !cleaned.startsWith("234")
  ) {
    cleaned =
      "234" + cleaned;
  }

  return cleaned;
}

// ============================================================
// META ACCOUNT DISCOVERY
// ============================================================

function getMetaAccounts() {
  const accounts = [
    {
      id:
        process.env.NEXT_PUBLIC_META_PIXEL_ID_1 ||
        process.env.NEXT_PUBLIC_META_PIXEL_ID ||
        process.env.META_DATASET_ID ||
        "",

      token:
        process.env.META_ACCESS_TOKEN_1 ||
        process.env.META_ACCESS_TOKEN ||
        process.env.META_CAPI_ACCESS_TOKEN ||
        "",
    },

    {
      id:
        process.env.NEXT_PUBLIC_META_PIXEL_ID_2 ||
        "",

      token:
        process.env.META_ACCESS_TOKEN_2 ||
        "",
    },

    {
      id:
        process.env.NEXT_PUBLIC_META_PIXEL_ID_3 ||
        "",

      token:
        process.env.META_ACCESS_TOKEN_3 ||
        "",
    },
  ];

  return accounts.filter(
    (account) =>
      Boolean(
        account.id &&
        account.token
      )
  );
}

// ============================================================
// SERVER META STANDARD EVENT
// ============================================================
//
// Used for BOTH:
//   Lead
//   CompleteRegistration
//
// Each event has its own event ID.
// Browser and server copies of the SAME event share that ID.
// Lead and CompleteRegistration NEVER share an ID.
//

async function sendMetaStandardEvent(
  req: NextRequest,
  body: {
    eventName:
      | "Lead"
      | "CompleteRegistration";

    eventId: string;
    eventSourceUrl: string;

    name: string;
    phone: string;

    state: string;
    city: string;

    total: number;

    fbp?: string;
    fbc?: string;

    attribution:
      AttributionData;

    browserIdentifiers:
      BrowserIdentifiers;
  }
) {
  const accounts =
    getMetaAccounts();

  if (accounts.length === 0) {
    console.warn(
      `⚠️ Server ${body.eventName} skipped: no Meta CAPI accounts configured.`
    );

    return {
      status: "not_configured",
      totalAccounts: 0,
      successful: 0,
      failed: 0,
    };
  }

  const graphVersion =
    process.env.META_GRAPH_API_VERSION ||
    "v25.0";

  const testEventCode =
    process.env.META_TEST_EVENT_CODE;

  const clientIp =
    getClientIp(req);

  const userAgent =
    req.headers.get(
      "user-agent"
    ) || undefined;

  // ----------------------------------------------------------
  // PHONE
  // ----------------------------------------------------------

  const normalizedPhone =
    normalizeNigerianPhone(
      body.phone
    );

  const hashedPhone =
    normalizedPhone
      ? sha256(normalizedPhone)
      : undefined;

  // ----------------------------------------------------------
  // NAME
  // ----------------------------------------------------------

  const nameParts =
    body.name
      .trim()
      .split(/\s+/);

  const firstName =
    nameParts[0] || "";

  const lastName =
    nameParts
      .slice(1)
      .join(" ");

  const hashedFirstName =
    firstName
      ? sha256(firstName)
      : undefined;

  const hashedLastName =
    lastName
      ? sha256(lastName)
      : undefined;

  // ----------------------------------------------------------
  // LOCATION
  // ----------------------------------------------------------

  const hashedState =
    body.state
      ? sha256(body.state)
      : undefined;

  const hashedCity =
    body.city
      ? sha256(body.city)
      : undefined;

  const hashedCountry =
    sha256("ng");

  // ----------------------------------------------------------
  // USER DATA
  // ----------------------------------------------------------

  const userData =
    removeEmptyValues({
      client_ip_address:
        clientIp,

      client_user_agent:
        userAgent,

      fbp: body.fbp,

      fbc: body.fbc,

      ph: hashedPhone
        ? [hashedPhone]
        : undefined,

      fn: hashedFirstName
        ? [hashedFirstName]
        : undefined,

      ln: hashedLastName
        ? [hashedLastName]
        : undefined,

      st: hashedState
        ? [hashedState]
        : undefined,

      ct: hashedCity
        ? [hashedCity]
        : undefined,

      country: [hashedCountry],
    });

  // ----------------------------------------------------------
  // CUSTOM DATA
  // ----------------------------------------------------------

  const customData =
    removeEmptyValues({
      content_name:
        "ScentMason Premium Order",

      content_category:
        "Premium",

      value:
        body.total,

      currency:
        "NGN",
    });

  // ----------------------------------------------------------
  // META EVENT
  // ----------------------------------------------------------

  const eventPayload = {
    data: [
      {
        event_name:
          body.eventName,

        event_time:
          Math.floor(
            Date.now() / 1000
          ),

        /*
         * CRITICAL:
         *
         * Browser and CAPI copies of THIS event
         * use this exact same event ID.
         */
        event_id:
          body.eventId,

        action_source:
          "website",

        event_source_url:
          body.eventSourceUrl,

        user_data:
          userData,

        custom_data:
          customData,
      },
    ],

    ...(testEventCode
      ? {
          test_event_code:
            testEventCode,
        }
      : {}),
  };

  // ----------------------------------------------------------
  // SEND TO ALL CONFIGURED PIXELS
  // ----------------------------------------------------------

  const results =
    [] as Array<{
      pixelId: string;
      success: boolean;
      status?: number;
      result?: unknown;
      error?: string;
    }>;

  for (const account of accounts) {
    const url =
      `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`;

    try {
      const response =
        await fetch(url, {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              eventPayload
            ),

          signal:
            AbortSignal.timeout(
              10000
            ),
        });

      const result =
        await response
          .json()
          .catch(() => null);

      results.push({
        pixelId:
          account.id,

        success:
          response.ok,

        status:
          response.status,

        result,
      });

      if (response.ok) {
        console.log(
          `✅ SERVER META ${body.eventName} SUCCESS:`,
          {
            pixelId:
              account.id,

            eventId:
              body.eventId,

            status:
              response.status,
          }
        );
      } else {
        console.error(
          `❌ SERVER META ${body.eventName} REJECTED:`,
          {
            pixelId:
              account.id,

            eventId:
              body.eventId,

            status:
              response.status,

            result,
          }
        );
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown Meta error";

      results.push({
        pixelId:
          account.id,

        success:
          false,

        error:
          message,
      });

      console.error(
        `❌ SERVER META ${body.eventName} REQUEST FAILED:`,
        {
          pixelId:
            account.id,

          eventId:
            body.eventId,

          error:
            message,
        }
      );
    }
  }

  const successful =
    results.filter(
      (result) =>
        result.success
    ).length;

  const failed =
    results.length -
    successful;

  return {
    status:
      successful ===
      results.length
        ? "success"
        : successful > 0
        ? "partial"
        : "failed",

    totalAccounts:
      results.length,

    successful,

    failed,

    results,
  };
}

// ============================================================
// POST
// ============================================================

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

    // ========================================================
    // 1. GOOGLE APPS SCRIPT URL
    // ========================================================

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

    // ========================================================
    // 2. READ REQUEST BODY
    // ========================================================

    const rawBody =
      await req
        .json()
        .catch(() => null);

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
      rawBody as Partial<
        PremiumOrderData
      > & {
        leadEventId?: string;
        completeRegistrationEventId?: string;
      };

    // ========================================================
    // 3. ORDER EVENT ID
    // ========================================================

    const eventId =
      cleanString(body.eventId);

    if (!eventId) {
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

    // ========================================================
    // 4. LEAD EVENT ID
    // ========================================================

    const leadEventId =
      cleanString(
        body.leadEventId
      );

    if (!leadEventId) {
      console.error(
        "❌ Premium order rejected: missing leadEventId."
      );

      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          message:
            "Missing leadEventId.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // 5. COMPLETE REGISTRATION EVENT ID
    // ========================================================

    const completeRegistrationEventId =
      cleanString(
        body.completeRegistrationEventId
      );

    if (!completeRegistrationEventId) {
      console.error(
        "❌ Premium order rejected: missing completeRegistrationEventId."
      );

      return NextResponse.json(
        {
          success: false,
          orderCaptured: false,
          message:
            "Missing completeRegistrationEventId.",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // 6. REQUIRED ORDER FIELDS
    // ========================================================

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

    // ========================================================
    // 7. NORMALIZE ORDER DATA
    // ========================================================

    const normalizedPhone =
      normalizePhone(phone);

    const clientIp =
      getClientIp(req);

    const userAgent =
      req.headers.get(
        "user-agent"
      ) || undefined;

    // ========================================================
    // 8. ATTRIBUTION
    // ========================================================

    const attribution =
      cleanAttribution(
        body.attribution
      );

    // ========================================================
    // 9. BROWSER IDENTIFIERS
    // ========================================================

    const browserIdentifiers =
      cleanBrowserIdentifiers(
        body.browserIdentifiers
      );

    // ========================================================
    // 10. ORDER VALUES
    // ========================================================

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

    // ========================================================
    // 11. EVENT SOURCE URL
    // ========================================================

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
      "https://www.massonstore.com";

    // ========================================================
    // 12. GOOGLE SHEETS PAYLOAD
    // ========================================================

    const sheetsPayload = {
      eventId,

      name,

      phone:
        normalizedPhone ||
        phone,

      whatsapp,

      state,

      city,

      address,

      sets,

      setPrice,

      oilBottlesOrdered,

      oilBottlesFree,

      oilBottlesTotal,

      oilPrice,

      total,

      willAccept,

      eventSourceUrl,

      browserIdentifiers,

      attribution,

      clientIp,

      userAgent,
    };

    // ========================================================
    // 13. SEND ORDER TO GOOGLE APPS SCRIPT
    // ========================================================

    console.log(
      "📤 Sending Premium order to Google Apps Script:",
      {
        eventId,

        leadEventId,

        completeRegistrationEventId,

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

    // ========================================================
    // 14. READ APPS SCRIPT RESPONSE
    // ========================================================

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

    // ========================================================
    // 15. GOOGLE HTTP FAILURE
    // ========================================================

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

          metaLead:
            "not_fired",

          metaCompleteRegistration:
            "not_fired",

          eventId,

          leadEventId,

          completeRegistrationEventId,
        },
        { status: 502 }
      );
    }

    // ========================================================
    // 16. APPS SCRIPT APPLICATION ERROR
    // ========================================================

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

          metaLead:
            "not_fired",

          metaCompleteRegistration:
            "not_fired",

          eventId,

          leadEventId,

          completeRegistrationEventId,
        },
        { status: 502 }
      );
    }

    // ========================================================
    // 17. SERVER META LEAD
    // ========================================================

    let metaLeadResult:
      | Awaited<
          ReturnType<
            typeof sendMetaStandardEvent
          >
        >
      | undefined;

    try {
      metaLeadResult =
        await sendMetaStandardEvent(
          req,
          {
            eventName:
              "Lead",

            eventId:
              leadEventId,

            eventSourceUrl,

            name,

            phone,

            state,

            city,

            total,

            fbp:
              browserIdentifiers.fbp,

            fbc:
              browserIdentifiers.fbc,

            attribution,

            browserIdentifiers,
          }
        );
    } catch (metaError) {
      console.error(
        "❌ SERVER META LEAD PIPELINE FAILED:",
        metaError
      );

      metaLeadResult = {
        status: "failed",
        totalAccounts: 0,
        successful: 0,
        failed: 1,
      };
    }

    // ========================================================
    // 18. SERVER META COMPLETE REGISTRATION
    // ========================================================

    let metaCompleteRegistrationResult:
      | Awaited<
          ReturnType<
            typeof sendMetaStandardEvent
          >
        >
      | undefined;

    try {
      metaCompleteRegistrationResult =
        await sendMetaStandardEvent(
          req,
          {
            eventName:
              "CompleteRegistration",

            eventId:
              completeRegistrationEventId,

            eventSourceUrl,

            name,

            phone,

            state,

            city,

            total,

            fbp:
              browserIdentifiers.fbp,

            fbc:
              browserIdentifiers.fbc,

            attribution,

            browserIdentifiers,
          }
        );
    } catch (metaError) {
      console.error(
        "❌ SERVER META COMPLETE REGISTRATION PIPELINE FAILED:",
        metaError
      );

      metaCompleteRegistrationResult = {
        status: "failed",
        totalAccounts: 0,
        successful: 0,
        failed: 1,
      };
    }

    // ========================================================
    // 19. FINAL SUCCESS
    // ========================================================

    console.log(
      "🟢 PREMIUM ORDER CAPTURED:",
      {
        eventId,

        leadEventId,

        completeRegistrationEventId,

        orderStatus:
          "Pending",

        metaLead:
          metaLeadResult?.status,

        metaCompleteRegistration:
          metaCompleteRegistrationResult?.status,
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

      orderCaptured: true,

      orderStatus:
        "Pending",

      googleSheets:
        "success",

      metaLead:
        metaLeadResult?.status ||
        "unknown",

      metaLeadAccounts:
        metaLeadResult?.totalAccounts ||
        0,

      metaLeadSuccessful:
        metaLeadResult?.successful ||
        0,

      metaLeadFailed:
        metaLeadResult?.failed ||
        0,

      metaCompleteRegistration:
        metaCompleteRegistrationResult?.status ||
        "unknown",

      metaCompleteRegistrationAccounts:
        metaCompleteRegistrationResult?.totalAccounts ||
        0,

      metaCompleteRegistrationSuccessful:
        metaCompleteRegistrationResult?.successful ||
        0,

      metaCompleteRegistrationFailed:
        metaCompleteRegistrationResult?.failed ||
        0,

      leadEventId,

      completeRegistrationEventId,

      eventId,

      metaPurchase:
        "not_fired",
    });
  } catch (error) {
    console.error(
      "🔴 PREMIUM ORDER ROUTE CRASHED:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        orderCaptured: false,

        message:
          "Premium order could not be processed.",

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}