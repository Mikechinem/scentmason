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

  // Used only for frontend validation.
  // It is NOT required in the Google Sheet.
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

export async function GET() {
  const {
    datasetId,
    accessToken,
  } = getMetaEnv();

  return NextResponse.json({
    status: "ok",

    message:
      "ScentMason Meta CAPI Purchase & Google Sheets route is active.",

    envCheck: {
      hasDatasetId: Boolean(datasetId),

      hasAccessToken:
        Boolean(accessToken),

      hasGoogleSheetsUrl:
        Boolean(
          process.env.GOOGLE_SHEETS_WEBHOOK_URL
        ),
    },
  });
}

export async function POST(
  req: NextRequest
) {
  try {
    const {
      datasetId,
      accessToken,
      graphVersion,
      testEventCode,
    } = getMetaEnv();

    const googleSheetsUrl =
      process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    // ========================================================
    // ACTIVE META PIXELS
    // ========================================================

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
        acc
      ): acc is {
        id: string;
        token: string;
      } =>
        Boolean(acc.id && acc.token)
    );

    if (
      activeAccounts.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing Meta environment variables.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // READ REQUEST
    // ========================================================

    const body =
      (await req.json().catch(() => ({}))) as PurchaseRequestBody;

    // ========================================================
    // EVENT ID
    //
    // This ID originates from the browser.
    //
    // It will be used for:
    //
    // Browser Pixel Purchase
    //        +
    // Server CAPI Purchase
    //
    // SAME ID = DEDUPLICATION
    // ========================================================

    if (!body.eventId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing eventId for deduplication.",
        },
        { status: 400 }
      );
    }

    const eventId = body.eventId;

    // ========================================================
    // BASIC REQUEST DATA
    // ========================================================

    const userAgent =
      req.headers.get("user-agent") ||
      undefined;

    const clientIp =
      getClientIp(req);

    const normalizedPhone =
      normalizeNigerianPhone(
        body.phone
      );

    const hashedPhone =
      normalizedPhone
        ? sha256(normalizedPhone)
        : undefined;

    // ========================================================
    // NAME MATCHING
    // ========================================================

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

    // ========================================================
    // LOCATION MATCHING
    // ========================================================

    const hashedState =
      body.state
        ? sha256(body.state)
        : undefined;

    const hashedCountry =
      sha256("ng");

    const rawCity =
      body.city ||
      (() => {
        if (!body.address) {
          return "";
        }

        const addressParts =
          body.address
            .split(",")
            .map((part) =>
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

    // ========================================================
    // META USER DATA
    // ========================================================

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

    // ========================================================
    // PURCHASE VALUE
    // ========================================================

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

    const purchaseValue =
      cleanedValue
        ? parseFloat(cleanedValue)
        : 0;

    // ========================================================
    // META PURCHASE PAYLOAD
    //
    // IMPORTANT:
    //
    // event_id = browser event ID
    //
    // DO NOT generate another ID here.
    // ========================================================

    const eventPayload = {
      data: [
        {
          event_name:
            "Purchase",

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
            process.env.NEXT_PUBLIC_SITE_URL ||
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
                Number(body.sets) || 1,

              ...body.customData,

              currency:
                "NGN",

              value:
                purchaseValue,
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

    // ========================================================
    // 1. GOOGLE SHEETS — MUST COMPLETE FIRST
    // ========================================================
    //
    // We intentionally DO NOT fire Meta CAPI yet.
    //
    // We wait for Google Sheets to respond successfully.
    //
    // The Apps Script should only respond after it has
    // successfully appended the order.
    // ========================================================

    if (!googleSheetsUrl) {
      console.error(
        "Google Sheets synchronization unavailable: missing GOOGLE_SHEETS_WEBHOOK_URL."
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Order could not be recorded because the order database is unavailable.",

          purchaseFired:
            false,
        },
        { status: 503 }
      );
    }

    const sheetsPayload = {
      eventId:
        body.eventId,

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

      // Kept for compatibility.
      // Your operational sheet does not need a column for it.
      willAccept:
        body.willAccept
          ? "Yes"
          : "No",
    };

    let sheetsResponse: Response;

    try {
      sheetsResponse =
        await fetch(
          googleSheetsUrl,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              sheetsPayload
            ),

            cache:
              "no-store",
          }
        );
    } catch (sheetError) {
      console.error(
        "Google Sheets request failed:",
        sheetError
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Your order was not recorded. Please try again.",

          purchaseFired:
            false,
        },
        { status: 502 }
      );
    }

    const sheetsResponseText =
      await sheetsResponse
        .text()
        .catch(() => "");

    // ========================================================
    // GOOGLE SHEETS FAILURE = NO PURCHASE
    // ========================================================

    if (!sheetsResponse.ok) {
      console.error(
        "Google Sheets rejected order:",
        {
          status:
            sheetsResponse.status,

          response:
            sheetsResponseText,
        }
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Your order could not be recorded. Please try again.",

          purchaseFired:
            false,
        },
        { status: 502 }
      );
    }

    console.log(
      "✅ Google Sheets confirmed order recording.",
      {
        eventId,
        status:
          sheetsResponse.status,
      }
    );

    // ========================================================
    // 2. NOW FIRE META CAPI PURCHASE
    // ========================================================
    //
    // Google Sheets has already accepted the order.
    //
    // This is the FIRST point at which Purchase is allowed.
    // ========================================================

    const capiResults =
      await Promise.all(
        activeAccounts.map(
          async (account) => {
            try {
              const metaUrl =
                `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`;

              const response =
                await fetch(
                  metaUrl,
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body:
                      JSON.stringify(
                        eventPayload
                      ),

                    cache:
                      "no-store",
                  }
                );

              const json =
                await response
                  .json()
                  .catch(() => null);

              if (!response.ok) {
                console.error(
                  `Meta Purchase CAPI failed for account ${account.id}:`,
                  response.status,
                  json
                );
              }

              return {
                accountId:
                  account.id,

                ok:
                  response.ok,

                json,
              };
            } catch (error) {
              console.error(
                `Meta Purchase CAPI request error for account ${account.id}:`,
                error
              );

              return {
                accountId:
                  account.id,

                ok:
                  false,

                json:
                  null,
              };
            }
          }
        )
      );

    const successfulMetaAccounts =
      capiResults.filter(
        (result) =>
          result.ok
      ).length;

    // ========================================================
    // META FAILURE
    //
    // IMPORTANT:
    //
    // The order HAS already been recorded.
    //
    // We therefore do NOT tell the customer the order failed.
    // We simply report that Meta tracking had an issue.
    //
    // The Google Sheet remains the source of truth for the
    // actual order.
    // ========================================================

    if (
      successfulMetaAccounts === 0
    ) {
      console.error(
        "⚠️ Order recorded successfully, but all Meta CAPI Purchase requests failed.",
        {
          eventId,
        }
      );

      return NextResponse.json({
        success: true,

        orderRecorded:
          true,

        purchaseReady:
          true,

        capiSuccess:
          false,

        eventId,

        message:
          "Order recorded successfully.",
      });
    }

    // ========================================================
    // FINAL SUCCESS
    // ========================================================

    console.log(
      "✅ Purchase transaction completed.",
      {
        eventId,

        orderRecorded:
          true,

        successfulMetaAccounts,
      }
    );

    return NextResponse.json({
      success: true,

      orderRecorded:
        true,

      purchaseReady:
        true,

      capiSuccess:
        true,

      successfulMetaAccounts,

      eventId,

      deduplication: {
        enabled:
          true,

        browserEventId:
          eventId,

        serverEventId:
          eventId,

        sameEventId:
          true,
      },

      message:
        "Order recorded and Purchase tracking completed.",
    });
  } catch (error) {
    console.error(
      "Tracking transaction engine crashed:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        purchaseFired:
          false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown breakdown",
      },
      {
        status: 500,
      }
    );
  }
}