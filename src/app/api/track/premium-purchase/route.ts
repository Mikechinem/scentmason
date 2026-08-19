import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type PurchaseRequestBody = {
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  phone?: string;
  whatsapp?: string;

  customData?: Record<string, unknown>;

  name?: string;
  state?: string;
  city?: string;
  address?: string;
  sets?: string | number;
  setPrice?: string | number;
  oilBottlesOrdered?: number;
  oilBottlesFree?: number;
  oilBottlesTotal?: number;
  oilPrice?: number;
  total?: string | number;
  willAccept?: boolean;
};

function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }

      if (Array.isArray(value) && value.length === 0) {
        return false;
      }

      return true;
    })
  );
}

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

function normalizeNigerianPhone(phone?: string) {
  if (!phone) return "";

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = `234${cleaned.slice(1)}`;
  } else if (cleaned.startsWith("2340")) {
    cleaned = `234${cleaned.slice(4)}`;
  } else if (!cleaned.startsWith("234") && cleaned.length >= 9) {
    cleaned = `234${cleaned}`;
  }

  return cleaned;
}

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function getMetaEnv() {
  const datasetId =
    process.env.META_DATASET_ID ||
    process.env.META_PIXEL_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const accessToken =
    process.env.META_ACCESS_TOKEN ||
    process.env.META_CAPI_ACCESS_TOKEN;

  const graphVersion =
    process.env.META_GRAPH_API_VERSION || "v25.0";

  const testEventCode =
    process.env.META_TEST_EVENT_CODE;

  return {
    datasetId,
    accessToken,
    graphVersion,
    testEventCode,
  };
}

/**
 * GET
 *
 * Browser diagnostic endpoint.
 *
 * IMPORTANT:
 * This uses the EXACT same environment variable name
 * that the POST handler uses.
 */
export async function GET() {
  const {
    datasetId,
    accessToken,
    graphVersion,
    testEventCode,
  } = getMetaEnv();

  const googleSheetsUrl =
    process.env.GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL;

  return NextResponse.json({
    status: "ok",

    message:
      "ScentMason Premium Purchase route is active.",

    envCheck: {
      hasDatasetId: Boolean(datasetId),
      hasAccessToken: Boolean(accessToken),

      hasPremiumGoogleSheetsUrl:
        Boolean(googleSheetsUrl),

      graphVersion,

      hasTestEventCode:
        Boolean(testEventCode),
    },

    googleSheetsVariable:
      "GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL",
  });
}

/**
 * POST
 */
export async function POST(req: NextRequest) {
  try {
    console.log(
      "=================================================="
    );

    console.log(
      "🟡 PREMIUM PURCHASE ROUTE STARTED"
    );

    // ============================================================
    // 1. ENVIRONMENT
    // ============================================================

    const {
      datasetId,
      accessToken,
      graphVersion,
      testEventCode,
    } = getMetaEnv();

    /**
     * IMPORTANT:
     *
     * This is the ONLY Google Sheets environment variable
     * used by this route.
     *
     * It exactly matches your .env.local:
     *
     * GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL
     */
    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL;

    console.log(
      "📊 Premium Google Sheets webhook configured:",
      Boolean(googleSheetsUrl)
    );

    // ============================================================
    // 2. META PIXEL ACCOUNTS
    // ============================================================

    const activeAccounts = [
      {
        id:
          process.env.NEXT_PUBLIC_META_PIXEL_ID_1 ||
          datasetId,

        token:
          process.env.META_ACCESS_TOKEN_1 ||
          accessToken,
      },

      {
        id:
          process.env.NEXT_PUBLIC_META_PIXEL_ID_2,

        token:
          process.env.META_ACCESS_TOKEN_2,
      },

      {
        id:
          process.env.NEXT_PUBLIC_META_PIXEL_ID_3,

        token:
          process.env.META_ACCESS_TOKEN_3,
      },
    ].filter(
      (
        account
      ): account is {
        id: string;
        token: string;
      } =>
        Boolean(account.id) &&
        Boolean(account.token)
    );

    console.log(
      "🎯 Active Meta accounts:",
      activeAccounts.length
    );

    // ============================================================
    // 3. READ REQUEST BODY
    // ============================================================

    const body =
      (await req
        .json()
        .catch(() => ({}))) as PurchaseRequestBody;

    console.log(
      "📦 Premium purchase received:",
      {
        eventId: body.eventId,
        name: body.name,
        state: body.state,
        city: body.city,
        sets: body.sets,
        total: body.total,
      }
    );

    if (!body.eventId) {
      console.error(
        "❌ Premium purchase rejected: missing eventId"
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Missing eventId for deduplication.",
        },
        { status: 400 }
      );
    }

    // ============================================================
    // 4. BASIC CUSTOMER / ORDER DATA
    // ============================================================

    const eventName = "Purchase";

    const eventId =
      body.eventId;

    const userAgent =
      req.headers.get("user-agent") ||
      undefined;

    const clientIp =
      getClientIp(req);

    // ============================================================
    // 5. PHONE NORMALIZATION
    // ============================================================

    const normalizedPhone =
      normalizeNigerianPhone(
        body.phone
      );

    const hashedPhone =
      normalizedPhone
        ? sha256(normalizedPhone)
        : undefined;

    // ============================================================
    // 6. NAME
    // ============================================================

    const nameParts =
      (body.name || "")
        .trim()
        .split(/\s+/);

    const firstName =
      nameParts[0] || "";

    const lastName =
      nameParts
        .slice(1)
        .join(" ") || "";

    const hashedFirstName =
      firstName
        ? sha256(firstName)
        : undefined;

    const hashedLastName =
      lastName
        ? sha256(lastName)
        : undefined;

    // ============================================================
    // 7. STATE
    // ============================================================

    const hashedState =
      body.state
        ? sha256(body.state)
        : undefined;

    // ============================================================
    // 8. COUNTRY
    // ============================================================

    const hashedCountry =
      sha256("ng");

    // ============================================================
    // 9. CITY
    // ============================================================

    /**
     * Premium form explicitly sends city.
     *
     * If city is somehow missing, fall back to extracting
     * it from the address.
     */

    const rawCity =
      body.city ||
      (() => {
        if (!body.address) {
          return "";
        }

        const addressParts =
          body.address
            .split(",")
            .map(
              (part) =>
                part.trim()
            );

        return addressParts.length > 1
          ? addressParts[
              addressParts.length - 2
            ]
          : addressParts[0];
      })();

    const hashedCity =
      rawCity
        ? sha256(rawCity)
        : undefined;

    // ============================================================
    // 10. META USER DATA
    // ============================================================

    const userData =
      removeEmptyValues({
        client_ip_address:
          clientIp,

        client_user_agent:
          userAgent,

        fbp:
          body.fbp,

        fbc:
          body.fbc,

        ph:
          hashedPhone
            ? [hashedPhone]
            : undefined,

        fn:
          hashedFirstName
            ? [hashedFirstName]
            : undefined,

        ln:
          hashedLastName
            ? [hashedLastName]
            : undefined,

        st:
          hashedState
            ? [hashedState]
            : undefined,

        ct:
          hashedCity
            ? [hashedCity]
            : undefined,

        country:
          [hashedCountry],
      });

    // ============================================================
    // 11. META VALUE
    // ============================================================

    const rawValue =
      String(
        body.total ||
          body.customData?.value ||
          "0"
      );

    const cleanedValue =
      rawValue.replace(
        /[^0-9.]/g,
        ""
      );

    const numericValue =
      cleanedValue
        ? parseFloat(
            cleanedValue
          )
        : 0;

    // ============================================================
    // 12. META EVENT PAYLOAD
    // ============================================================

    const eventPayload = {
      data: [
        {
          event_name:
            eventName,

          event_time:
            Math.floor(
              Date.now() / 1000
            ),

          event_id:
            eventId,

          action_source:
            "website",

          event_source_url:
            body.eventSourceUrl ||
            process.env
              .NEXT_PUBLIC_SITE_URL ||
            "https://scentmason.vercel.app",

          user_data:
            userData,

          custom_data:
            removeEmptyValues({
              content_name:
                "ScentMason Diffuser",

              content_type:
                "product",

              num_items:
                Number(
                  body.sets
                ) || 1,

              ...body.customData,

              currency:
                "NGN",

              value:
                numericValue,
            }),
        },
      ],

      ...(testEventCode
        ? {
            test_event_code:
              testEventCode,
          }
        : {}),
    };

    // ============================================================
    // 13. GOOGLE SHEETS PAYLOAD
    // ============================================================

    const sheetsPayload = {
      eventId:
        body.eventId || "",

      name:
        body.name || "",

      phone:
        body.phone || "",

      whatsapp:
        body.whatsapp || "",

      state:
        body.state || "",

      city:
        body.city ||
        rawCity ||
        "",

      address:
        body.address || "",

      sets:
        body.sets || "",

      setPrice:
        body.setPrice || "",

      oilBottlesOrdered:
        body.oilBottlesOrdered || 0,

      oilBottlesFree:
        body.oilBottlesFree || 0,

      oilBottlesTotal:
        body.oilBottlesTotal || 0,

      oilPrice:
        body.oilPrice || 0,

      total:
        body.total || "",
        
        willAccept:
          body.willAccept ? "Yes" : "No",
    };

    // ============================================================
    // 14. GOOGLE SHEETS
    // ============================================================

    let sheetsSuccess =
      false;

    let sheetsStatus:
      number | null =
      null;

    let sheetsResult:
      unknown = null;

    if (!googleSheetsUrl) {
      console.error(
        "❌ PREMIUM GOOGLE SHEETS URL IS MISSING."
      );

      console.error(
        "Expected environment variable:",
        "GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL"
      );
    } else {
      try {
        console.log(
          "📤 Sending premium order to NEW Google Sheet..."
        );

        const sheetsResponse =
          await fetch(
            googleSheetsUrl,
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  sheetsPayload
                ),

              /**
               * Google Apps Script can sometimes take
               * several seconds to respond.
               */
              signal:
                AbortSignal.timeout(
                  15000
                ),
            }
          );

        sheetsStatus =
          sheetsResponse.status;

        const responseText =
          await sheetsResponse.text();

        try {
          sheetsResult =
            JSON.parse(
              responseText
            );
        } catch {
          sheetsResult =
            responseText;
        }

        sheetsSuccess =
          sheetsResponse.ok;

        if (sheetsSuccess) {
          console.log(
            "✅ PREMIUM GOOGLE SHEETS: SUCCESS",
            {
              status:
                sheetsStatus,

              eventId:
                body.eventId,
            }
          );
        } else {
          console.error(
            "❌ PREMIUM GOOGLE SHEETS: FAILED",
            {
              status:
                sheetsStatus,

              response:
                sheetsResult,
            }
          );
        }
      } catch (sheetError) {
        console.error(
          "❌ PREMIUM GOOGLE SHEETS CONNECTION FAILED:",
          sheetError
        );
      }
    }

    // ============================================================
    // 15. META CAPI
    // ============================================================

    let metaSuccess =
      false;

    const metaResults: Array<{
      pixelId: string;
      ok: boolean;
      status?: number;
      result?: unknown;
      error?: string;
    }> = [];

    if (activeAccounts.length === 0) {
      console.error(
        "⚠️ No active Meta accounts configured."
      );
    } else {
      console.log(
        "📤 Sending Purchase event to Meta CAPI..."
      );

      const capiPromises =
        activeAccounts.map(
          async (
            account
          ) => {
            const metaUrl =
              `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`;

            try {
              const response =
                await fetch(
                  metaUrl,
                  {
                    method:
                      "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body:
                      JSON.stringify(
                        eventPayload
                      ),

                    /**
                     * Do not allow a Meta network
                     * problem to hang the order form.
                     */
                    signal:
                      AbortSignal.timeout(
                        10000
                      ),
                  }
                );

              const result =
                await response
                  .json()
                  .catch(
                    () => null
                  );

              const resultRecord =
                {
                  pixelId:
                    account.id,

                  ok:
                    response.ok,

                  status:
                    response.status,

                  result,
                };

              metaResults.push(
                resultRecord
              );

              if (response.ok) {
                console.log(
                  "✅ META CAPI SUCCESS:",
                  account.id
                );
              } else {
                console.error(
                  "❌ META CAPI REJECTED:",
                  {
                    pixelId:
                      account.id,

                    status:
                      response.status,

                    result,
                  }
                );
              }

              return response.ok;
            } catch (metaError) {
              const errorMessage =
                metaError instanceof Error
                  ? metaError.message
                  : "Unknown Meta error";

              console.error(
                "⚠️ META CAPI CONNECTION FAILED:",
                {
                  pixelId:
                    account.id,

                  error:
                    errorMessage,
                }
              );

              metaResults.push({
                pixelId:
                  account.id,

                ok: false,

                error:
                  errorMessage,
              });

              return false;
            }
          }
        );

      const capiResults =
        await Promise.all(
          capiPromises
        );

      metaSuccess =
        capiResults.some(
          Boolean
        );
    }

    // ============================================================
    // 16. FINAL ORDER INGESTION DECISION
    // ============================================================

    /**
     * IMPORTANT:
     *
     * Meta failure is NOT considered an order-form failure.
     *
     * Google Sheets is the operational order record.
     *
     * Therefore:
     *
     * Google Sheet success = successful order ingestion.
     *
     * Meta can fail temporarily without causing the
     * customer to see "Primary ingestion engine failed".
     */

    if (sheetsSuccess) {
      console.log(
        "🟢 PREMIUM ORDER INGESTION SUCCESSFUL"
      );

      console.log(
        "Google Sheets:",
        "SUCCESS"
      );

      console.log(
        "Meta CAPI:",
        metaSuccess
          ? "SUCCESS"
          : "FAILED / UNAVAILABLE"
      );

      console.log(
        "Event ID:",
        eventId
      );

      console.log(
        "=================================================="
      );

      return NextResponse.json({
        success: true,

        orderCaptured:
          true,

        googleSheets:
          "success",

        metaCapi:
          metaSuccess
            ? "success"
            : "unavailable",

        eventId,
      });
    }

    // ============================================================
    // 17. GOOGLE SHEETS FAILURE
    // ============================================================

    console.error(
      "🔴 PREMIUM ORDER INGESTION FAILED."
    );

    console.error(
      "The new Google Sheet did not confirm receipt."
    );

    console.log(
      "=================================================="
    );

    return NextResponse.json(
      {
        success: false,

        orderCaptured:
          false,

        message:
          "Premium order could not be written to the Google Sheet.",

        googleSheets:
          "failed",

        googleSheetsStatus:
          sheetsStatus,

        googleSheetsResult:
          sheetsResult,

        metaCapi:
          metaSuccess
            ? "success"
            : "failed",

        eventId,
      },
      {
        status: 502,
      }
    );
  } catch (error) {
    console.error(
      "🔴 PREMIUM PURCHASE ROUTE CRASHED:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        orderCaptured:
          false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      {
        status: 500,
      }
    );
  }
}