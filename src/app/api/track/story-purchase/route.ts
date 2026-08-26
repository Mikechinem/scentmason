import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type StoryPurchaseRequestBody = {
  eventId?: string;
  eventSourceUrl?: string;

  fbp?: string;
  fbc?: string;
  ttp?: string;
  ttclid?: string;

  phone?: string;
  whatsapp?: string;

  name?: string;
  state?: string;
  city?: string;
  address?: string;

  packageId?: string;
  packageName?: string;

  machines?: number;
  packagePrice?: number;

  includedOils?: number;
  extraOilQuantity?: number;
  extraOilPrice?: number;
  totalOils?: number;

  total?: string | number;
  currency?: string;

  paymentStatus?: string;

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

function removeEmptyValues<
  T extends Record<string, unknown>
>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => {
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
      }
    )
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
    process.env.STORY_PURCHASE_WEBHOOK_SECRET;

  return {
    datasetId,
    accessToken,
    graphVersion,
    testEventCode,
    webhookSecret,
  };
}

/* =========================================================
   GET
========================================================= */

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
      "ScentMason Story Purchase route is active.",

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
          process.env
            .NEXT_PUBLIC_META_PIXEL_ID_1 &&
          process.env.META_ACCESS_TOKEN_1
        ),

      pixel2:
        Boolean(
          process.env
            .NEXT_PUBLIC_META_PIXEL_ID_2 &&
          process.env.META_ACCESS_TOKEN_2
        ),

      pixel3:
        Boolean(
          process.env
            .NEXT_PUBLIC_META_PIXEL_ID_3 &&
          process.env.META_ACCESS_TOKEN_3
        ),
    },
  });
}

/* =========================================================
   POST
========================================================= */

export async function POST(
  req: NextRequest
) {
  try {
    const {
      datasetId,
      accessToken,
      graphVersion,
      testEventCode,
      webhookSecret,
    } = getMetaEnv();

    /* =====================================================
       WEBHOOK SECRET
    ===================================================== */

    const suppliedSecret =
      req.headers.get(
        "X-ScentMason-Webhook-Secret"
      );

    if (!webhookSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Story Purchase webhook is not configured.",
        },
        { status: 500 }
      );
    }

    if (!suppliedSecret) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized Story Purchase request.",
        },
        { status: 401 }
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
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized Story Purchase request.",
        },
        { status: 401 }
      );
    }

    if (
      !crypto.timingSafeEqual(
        suppliedBuffer,
        expectedBuffer
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized Story Purchase request.",
        },
        { status: 401 }
      );
    }

    /* =====================================================
       META ACCOUNTS
    ===================================================== */

    const activeAccounts: MetaAccount[] =
      [
        {
          id:
            process.env
              .NEXT_PUBLIC_META_PIXEL_ID_1 ||
            datasetId ||
            "",

          token:
            process.env.META_ACCESS_TOKEN_1 ||
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

    if (
      activeAccounts.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No Meta CAPI account is configured.",
        },
        { status: 500 }
      );
    }

    /* =====================================================
       BODY
    ===================================================== */

    const body =
      (await req
        .json()
        .catch(() => ({}))) as StoryPurchaseRequestBody;

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

    /* =====================================================
       PAID SAFETY CHECK
    ===================================================== */

    if (
      body.paymentStatus !== "Paid"
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Purchase requires a Paid order.",

          eventId:
            body.eventId,
        },
        { status: 400 }
      );
    }

    /* =====================================================
       IDENTIFIERS
    ===================================================== */

    const browserIdentifiers =
      body.browserIdentifiers || {};

    const fbp =
      body.fbp ||
      browserIdentifiers.fbp;

    const fbc =
      body.fbc ||
      browserIdentifiers.fbc;

    const ttp =
      body.ttp ||
      browserIdentifiers.ttp;

    const ttclid =
      body.ttclid ||
      browserIdentifiers.ttclid;

    /* =====================================================
       CUSTOMER
    ===================================================== */

    const normalizedPhone =
      normalizeNigerianPhone(
        body.phone
      );

    const hashedPhone =
      normalizedPhone
        ? sha256(normalizedPhone)
        : undefined;

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

    /* =====================================================
       USER DATA
    ===================================================== */

    const userData =
      removeEmptyValues({
        client_ip_address:
          getClientIp(req),

        client_user_agent:
          req.headers.get(
            "user-agent"
          ) || undefined,

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

        country: [
          hashedCountry,
        ],
      });

    /* =====================================================
       VALUE
    ===================================================== */

    const numericValue =
      Number(body.total);

    if (
      !Number.isFinite(
        numericValue
      ) ||
      numericValue <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid Purchase value.",
          eventId:
            body.eventId,
        },
        { status: 400 }
      );
    }

    /* =====================================================
       PURCHASE CUSTOM DATA
    ===================================================== */

    const customData =
      removeEmptyValues({
        content_name:
          body.packageName ||
          "ScentMason Diffuser",

        content_type:
          "product",

        content_ids:
          body.packageId
            ? [body.packageId]
            : undefined,

        num_items:
          Number(body.machines) || 1,

        order_id:
          body.eventId,

        package_id:
          body.packageId,

        package_name:
          body.packageName,

        machines:
          Number(body.machines) || 0,

        package_price:
          Number(body.packagePrice) || 0,

        included_oils:
          Number(body.includedOils) || 0,

        extra_oil_quantity:
          Number(body.extraOilQuantity) || 0,

        extra_oil_price:
          Number(body.extraOilPrice) || 0,

        total_oils:
          Number(body.totalOils) || 0,

        currency:
          body.currency || "NGN",

        value:
          numericValue,
      });

    /* =====================================================
       PURCHASE EVENT
    ===================================================== */

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
            body.eventId,

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

      ...(testEventCode
        ? {
            test_event_code:
              testEventCode,
          }
        : {}),
    };

    /* =====================================================
       SEND TO ALL META ACCOUNTS
    ===================================================== */

    const metaResults: MetaResult[] =
      [];

    for (
      const account of activeAccounts
    ) {
      const metaUrl =
        `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`;

      try {
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

              signal:
                AbortSignal.timeout(
                  10000
                ),
            }
          );

        const result =
          await response
            .json()
            .catch(() => null);

        metaResults.push({
          pixelId:
            account.id,

          ok:
            response.ok,

          status:
            response.status,

          result,
        });
      } catch (error) {
        metaResults.push({
          pixelId:
            account.id,

          ok: false,

          status: 0,

          error:
            error instanceof Error
              ? error.message
              : "Unknown Meta error",
        });
      }
    }

    /* =====================================================
       ALL ACCOUNTS MUST SUCCEED
    ===================================================== */

    const allSucceeded =
      metaResults.length > 0 &&
      metaResults.every(
        (result) =>
          result.ok
      );

    if (!allSucceeded) {
      return NextResponse.json(
        {
          success: false,

          purchase:
            "failed",

          eventName:
            "Purchase",

          eventId:
            body.eventId,

          value:
            numericValue,

          currency:
            body.currency || "NGN",

          metaAccounts:
            metaResults.map(
              (result) => ({
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
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,

      purchase: "sent",

      eventName:
        "Purchase",

      eventId:
        body.eventId,

      value:
        numericValue,

      currency:
        body.currency || "NGN",

      metaAccounts:
        metaResults.map(
          (result) => ({
            pixelId:
              result.pixelId,

            success:
              result.ok,

            status:
              result.status,
          })
        ),
    });
  } catch (error) {
    console.error(
      "STORY PURCHASE ROUTE CRASHED:",
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
      { status: 500 }
    );
  }
}