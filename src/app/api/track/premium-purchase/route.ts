import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type PurchaseRequestBody = {
  eventId?: string;
  eventSourceUrl?: string;

  fbp?: string;
  fbc?: string;
  ttp?: string;
  ttclid?: string;

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

  attribution?: Record<string, unknown>;
  browserIdentifiers?: {
    fbp?: string;
    fbc?: string;
    ttp?: string;
    ttclid?: string;
  };
};

type MetaAccount = {
  id: string;
  token: string;
};

type MetaResult = {
  pixelId: string;
  ok: boolean;
  status?: number;
  result?: unknown;
  error?: string;
};

function removeEmptyValues<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        return false;
      }

      if (
        Array.isArray(value) &&
        value.length === 0
      ) {
        return false;
      }

      return true;
    })
  ) as Partial<T>;
}

function getClientIp(
  req: NextRequest
): string | undefined {
  const forwardedFor =
    req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor
      .split(",")[0]
      ?.trim();
  }

  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    undefined
  );
}

function normalizeNigerianPhone(
  phone?: string
): string {
  if (!phone) {
    return "";
  }

  let cleaned =
    phone.replace(/\D/g, "");

  if (
    cleaned.startsWith("2340")
  ) {
    cleaned =
      `234${cleaned.slice(4)}`;
  } else if (
    cleaned.startsWith("0")
  ) {
    cleaned =
      `234${cleaned.slice(1)}`;
  } else if (
    !cleaned.startsWith("234") &&
    cleaned.length >= 9
  ) {
    cleaned =
      `234${cleaned}`;
  }

  return cleaned;
}

function sha256(
  value: string
): string {
  return crypto
    .createHash("sha256")
    .update(
      value.trim().toLowerCase()
    )
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
    process.env.META_GRAPH_API_VERSION ||
    "v25.0";

  const testEventCode =
    process.env.META_TEST_EVENT_CODE;

  const webhookSecret =
    process.env.PREMIUM_PURCHASE_WEBHOOK_SECRET;

  return {
    datasetId,
    accessToken,
    graphVersion,
    testEventCode,
    webhookSecret,
  };
}

/**
 * GET
 *
 * Diagnostic endpoint.
 *
 * Does NOT expose secret values.
 */
export async function GET() {
  const {
    datasetId,
    accessToken,
    graphVersion,
    testEventCode,
    webhookSecret,
  } = getMetaEnv();

  return NextResponse.json({
    status: "ok",

    message:
      "ScentMason Premium Purchase route is active.",

    envCheck: {
      hasDatasetId:
        Boolean(datasetId),

      hasAccessToken:
        Boolean(accessToken),

      graphVersion,

      hasTestEventCode:
        Boolean(testEventCode),

      hasWebhookSecret:
        Boolean(webhookSecret),
    },

    multiPixelConfiguration: {
      pixel1:
        Boolean(
          process.env.NEXT_PUBLIC_META_PIXEL_ID_1 &&
            process.env.META_ACCESS_TOKEN_1
        ),

      pixel2:
        Boolean(
          process.env.NEXT_PUBLIC_META_PIXEL_ID_2 &&
            process.env.META_ACCESS_TOKEN_2
        ),

      pixel3:
        Boolean(
          process.env.NEXT_PUBLIC_META_PIXEL_ID_3 &&
            process.env.META_ACCESS_TOKEN_3
        ),
    },
  });
}

/**
 * POST
 *
 * Called ONLY by the authorized Google Apps Script
 * after a sales representative changes:
 *
 * Pending → Paid
 */
export async function POST(
  req: NextRequest
) {
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
      webhookSecret,
    } = getMetaEnv();

    // ============================================================
    // 2. WEBHOOK AUTHENTICATION
    // ============================================================

    const suppliedSecret =
      req.headers.get(
        "X-ScentMason-Webhook-Secret"
      );

    if (
      !webhookSecret
    ) {
      console.error(
        "❌ PREMIUM PURCHASE WEBHOOK SECRET IS NOT CONFIGURED."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Purchase webhook is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (
      !suppliedSecret
    ) {
      console.error(
        "❌ PREMIUM PURCHASE REQUEST REJECTED: MISSING WEBHOOK SECRET."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized purchase request.",
        },
        {
          status: 401,
        }
      );
    }

    const suppliedBuffer =
      Buffer.from(
        suppliedSecret,
        "utf8"
      );

    const expectedBuffer =
      Buffer.from(
        webhookSecret,
        "utf8"
      );

    if (
      suppliedBuffer.length !==
      expectedBuffer.length
    ) {
      console.error(
        "❌ PREMIUM PURCHASE REQUEST REJECTED: INVALID WEBHOOK SECRET."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized purchase request.",
        },
        {
          status: 401,
        }
      );
    }

    if (
      !crypto.timingSafeEqual(
        suppliedBuffer,
        expectedBuffer
      )
    ) {
      console.error(
        "❌ PREMIUM PURCHASE REQUEST REJECTED: INVALID WEBHOOK SECRET."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized purchase request.",
        },
        {
          status: 401,
        }
      );
    }

    console.log(
      "🔐 Purchase webhook authentication: SUCCESS"
    );

    // ============================================================
    // 3. META ACCOUNTS
    // ============================================================

    const activeAccounts: MetaAccount[] =
      [
        {
          id:
            process.env
              .NEXT_PUBLIC_META_PIXEL_ID_1 ||
            datasetId ||
            "",

          token:
            process.env
              .META_ACCESS_TOKEN_1 ||
            accessToken ||
            "",
        },

        {
          id:
            process.env
              .NEXT_PUBLIC_META_PIXEL_ID_2 ||
            "",

          token:
            process.env
              .META_ACCESS_TOKEN_2 ||
            "",
        },

        {
          id:
            process.env
              .NEXT_PUBLIC_META_PIXEL_ID_3 ||
            "",

          token:
            process.env
              .META_ACCESS_TOKEN_3 ||
            "",
        },
      ].filter(
        (
          account
        ): account is MetaAccount =>
          Boolean(
            account.id &&
              account.token
          )
      );

    console.log(
      "🎯 Active Meta accounts:",
      activeAccounts.length
    );

    if (
      activeAccounts.length === 0
    ) {
      console.error(
        "❌ No active Meta Pixel/Dataset accounts configured."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "No Meta CAPI account is configured.",
        },
        {
          status: 500,
        }
      );
    }

    // ============================================================
    // 4. READ REQUEST BODY
    // ============================================================

    const body =
      (await req
        .json()
        .catch(() => ({}))) as PurchaseRequestBody;

    console.log(
      "📦 Premium purchase received:",
      {
        eventId:
          body.eventId,

        name:
          body.name,

        state:
          body.state,

        city:
          body.city,

        sets:
          body.sets,

        total:
          body.total,
      }
    );

    if (
      !body.eventId
    ) {
      console.error(
        "❌ Missing eventId."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Missing eventId for deduplication.",
        },
        {
          status: 400,
        }
      );
    }

    // ============================================================
    // 5. BASIC EVENT DATA
    // ============================================================

    const eventName =
      "Purchase";

    const eventId =
      body.eventId;

    const userAgent =
      req.headers.get(
        "user-agent"
      ) ||
      undefined;

    const clientIp =
      getClientIp(req);

    // ============================================================
    // 6. BROWSER IDENTIFIERS
    // ============================================================

    const browserIdentifiers =
      body.browserIdentifiers ||
      {};

    const fbp =
      body.fbp ||
      browserIdentifiers.fbp;

    const fbc =
      body.fbc ||
      browserIdentifiers.fbc;

    // ============================================================
    // 7. PHONE NORMALIZATION
    // ============================================================

    const normalizedPhone =
      normalizeNigerianPhone(
        body.phone
      );

    const hashedPhone =
      normalizedPhone
        ? sha256(
            normalizedPhone
          )
        : undefined;

    // ============================================================
    // 8. NAME
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
    // 9. STATE
    // ============================================================

    const hashedState =
      body.state
        ? sha256(body.state)
        : undefined;

    // ============================================================
    // 10. COUNTRY
    // ============================================================

    const hashedCountry =
      sha256("ng");

    // ============================================================
    // 11. CITY
    // ============================================================

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

        return addressParts.length >
          1
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
    // 12. META USER DATA
    // ============================================================

    const userData =
      removeEmptyValues({
        client_ip_address:
          clientIp,

        client_user_agent:
          userAgent,

        fbp,

        fbc,

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
    // 13. PURCHASE VALUE
    // ============================================================

    const rawValue =
      String(
        body.total ??
          body.customData?.value ??
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

    if (
      !Number.isFinite(
        numericValue
      ) ||
      numericValue < 0
    ) {
      console.error(
        "❌ Invalid Purchase value:",
        rawValue
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Purchase value.",
          eventId,
        },
        {
          status: 400,
        }
      );
    }

    // ============================================================
    // 14. META CUSTOM DATA
    // ============================================================

    const customData =
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
      });

    // ============================================================
    // 15. META EVENT PAYLOAD
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
            "https://www.massonstore.com",

          user_data:
            userData,

          custom_data:
            customData,
        },
      ],

      /*
       * During our controlled Meta verification,
       * this is included when configured.
       *
       * Remove META_TEST_EVENT_CODE from production
       * environment variables after testing.
       */
      ...(testEventCode
        ? {
            test_event_code:
              testEventCode,
          }
        : {}),
    };

    console.log(
      "📦 Meta Purchase prepared:",
      {
        eventName,

        eventId,

        value:
          numericValue,

        currency:
          "NGN",

        testEvent:
          Boolean(
            testEventCode
          ),

        activePixelCount:
          activeAccounts.length,
      }
    );

    // ============================================================
    // 16. SEND PURCHASE TO ALL CONFIGURED META ACCOUNTS
    // ============================================================

    const metaResults: MetaResult[] =
      [];

    for (
      const account of
        activeAccounts
    ) {
      const metaUrl =
        `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`;

      try {
        console.log(
          "📤 Sending Purchase to Meta:",
          account.id
        );

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

        const metaResult:
          MetaResult = {
            pixelId:
              account.id,

            ok:
              response.ok,

            status:
              response.status,

            result,
          };

        metaResults.push(
          metaResult
        );

        if (
          response.ok
        ) {
          console.log(
            "✅ META CAPI SUCCESS:",
            {
              pixelId:
                account.id,

              status:
                response.status,

              result,
          });
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
      } catch (
        metaError
      ) {
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

          ok:
            false,

          error:
            errorMessage,
        });
      }
    }

    // ============================================================
    // 17. META RESULT SUMMARY
    // ============================================================

    const successfulMetaAccounts =
      metaResults.filter(
        (
          result
        ) =>
          result.ok
      );

    const failedMetaAccounts =
      metaResults.filter(
        (
          result
        ) =>
          !result.ok
      );

    const allMetaAccountsSucceeded =
      metaResults.length > 0 &&
      failedMetaAccounts.length ===
        0;

    const someMetaAccountsSucceeded =
      successfulMetaAccounts.length >
      0;

    console.log(
      "📊 META PURCHASE RESULT:",
      {
        totalAccounts:
          metaResults.length,

        successful:
          successfulMetaAccounts.length,

        failed:
          failedMetaAccounts.length,

        allSucceeded:
          allMetaAccountsSucceeded,

        eventId,
      }
    );

    // ============================================================
    // 18. FINAL RESPONSE
    // ============================================================

    /*
     * Important:
     *
     * This endpoint is called after the order has already
     * been marked Paid in the operational spreadsheet.
     *
     * Therefore we return success only when every configured
     * Meta account accepted the Purchase.
     *
     * If one Pixel fails, Apps Script will mark Purchase
     * Status as Failed, allowing us to retry deliberately.
     */

    if (
      allMetaAccountsSucceeded
    ) {
      console.log(
        "🟢 PREMIUM PURCHASE SUCCESSFUL ON ALL META ACCOUNTS"
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

        purchase:
          "sent",

        eventName,

        eventId,

        value:
          numericValue,

        currency:
          "NGN",

        metaAccounts:
          metaResults.map(
            (
              result
            ) => ({
              pixelId:
                result.pixelId,

              success:
                result.ok,

              status:
                result.status,
            })
          ),
      });
    }

    console.error(
      "🔴 PREMIUM PURCHASE DID NOT SUCCEED ON ALL META ACCOUNTS.",
      {
        eventId,

        successful:
          successfulMetaAccounts.length,

        failed:
          failedMetaAccounts.length,
      }
    );

    return NextResponse.json(
      {
        success: false,

        purchase:
          someMetaAccountsSucceeded
            ? "partial"
            : "failed",

        eventName,

        eventId,

        value:
          numericValue,

        currency:
          "NGN",

        metaAccounts:
          metaResults.map(
            (
              result
            ) => ({
              pixelId:
                result.pixelId,

              success:
                result.ok,

              status:
                result.status,

              error:
                result.error,
            })
          ),
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

        purchase:
          "failed",

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