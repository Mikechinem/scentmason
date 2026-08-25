import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type BrowserIdentifiers = {
  fbp?: string;
  fbc?: string;
};

type TouchData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  fbclid?: string;
  ttclid?: string;
  gclid?: string;
  msclkid?: string;

  landingPage?: string;
  landingPagePath?: string;
  referrer?: string;
  capturedAt?: string;
};

type StoryOrderBody = {
  sourcePage?: string;

  eventSourceUrl?: string;

  order?: {
    packageId?: string;
    packageName?: string;
    machines?: number;
    packagePrice?: number;

    includedOils?: number;

    extraOilQuantity?: number;
    extraOilPrice?: number;

    totalOils?: number;

    total?: number;

    currency?: string;
  };

  customer?: {
    name?: string;
    phone?: string;
    whatsapp?: string;

    state?: string;
    city?: string;
    address?: string;

    willAccept?: boolean;
  };

  tracking?: {
    sharedEventId?: string;

    completeRegistrationEventId?: string;

    attribution?: {
      firstTouch?: TouchData;
      lastTouch?: TouchData;
    };

    browserIdentifiers?: BrowserIdentifiers;

    userAgent?: string;
  };
};

/* =========================================================
   HELPERS
========================================================= */

function cleanValue(
  value: unknown
): string | undefined {
  if (
    typeof value !== "string"
  ) {
    return undefined;
  }

  const cleaned =
    value.trim();

  return cleaned || undefined;
}

function removeEmptyValues<
  T extends Record<string, unknown>
>(obj: T) {
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
  );
}

function sha256(
  value: string
) {
  return crypto
    .createHash("sha256")
    .update(
      value.trim().toLowerCase()
    )
    .digest("hex");
}

/* =========================================================
   NIGERIAN PHONE NORMALIZATION

   Meta expects the phone number without
   spaces, + sign or leading zero.

   Example:

   08012345678
        ↓
   2348012345678
========================================================= */

function normalizeNigerianPhone(
  phone?: string
) {
  if (!phone) {
    return "";
  }

  let cleaned =
    phone.replace(
      /\D/g,
      ""
    );

  if (
    cleaned.startsWith("234")
  ) {
    return cleaned;
  }

  if (
    cleaned.startsWith("0")
  ) {
    return `234${cleaned.slice(
      1
    )}`;
  }

  if (
    cleaned.length >= 9
  ) {
    return `234${cleaned}`;
  }

  return cleaned;
}

/* =========================================================
   CLIENT IP
========================================================= */

function getClientIp(
  req: NextRequest
) {
  const forwardedFor =
    req.headers.get(
      "x-forwarded-for"
    );

  if (forwardedFor) {
    return forwardedFor
      .split(",")[0]
      ?.trim();
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

/* =========================================================
   META ENVIRONMENT
========================================================= */

function getMetaEnvironment() {
  const defaultDatasetId =
    process.env
      .META_DATASET_ID ||
    process.env
      .META_PIXEL_ID ||
    process.env
      .NEXT_PUBLIC_META_PIXEL_ID;

  const defaultAccessToken =
    process.env
      .META_ACCESS_TOKEN ||
    process.env
      .META_CAPI_ACCESS_TOKEN;

  const graphVersion =
    process.env
      .META_GRAPH_API_VERSION ||
    "v25.0";

  const testEventCode =
    process.env
      .META_TEST_EVENT_CODE;

  return {
    defaultDatasetId,
    defaultAccessToken,
    graphVersion,
    testEventCode,
  };
}

/* =========================================================
   GET — HEALTH CHECK
========================================================= */

export async function GET() {
  const {
    defaultDatasetId,
    defaultAccessToken,
    graphVersion,
  } = getMetaEnvironment();

  return NextResponse.json({
    status: "ok",

    message:
      "ScentMason Story Order tracking route is active.",

    envCheck: {
      hasDefaultMetaDataset:
        Boolean(
          defaultDatasetId
        ),

      hasDefaultMetaToken:
        Boolean(
          defaultAccessToken
        ),

      hasStoryGoogleSheetsUrl:
        Boolean(
          process.env
            .GOOGLE_SHEETS_STORYPAGE_WEBHOOK_URL
        ),

      graphVersion,
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
    /* =====================================================
       ENVIRONMENT
    ===================================================== */

    const {
      defaultDatasetId,
      defaultAccessToken,
      graphVersion,
      testEventCode,
    } =
      getMetaEnvironment();

    const googleSheetsUrl =
      process.env
        .GOOGLE_SHEETS_STORYPAGE_WEBHOOK_URL;

    if (!googleSheetsUrl) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Missing Story Google Sheets webhook URL.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       META ACCOUNTS

       Supports the same multi-pixel architecture
       used by the existing ScentMason tracking system.
    ===================================================== */

    const activeAccounts = [
      {
        id:
          process.env
            .NEXT_PUBLIC_META_PIXEL_ID_1 ||
          defaultDatasetId,

        token:
          process.env
            .META_ACCESS_TOKEN_1 ||
          defaultAccessToken,
      },

      {
        id:
          process.env
            .NEXT_PUBLIC_META_PIXEL_ID_2,

        token:
          process.env
            .META_ACCESS_TOKEN_2,
      },

      {
        id:
          process.env
            .NEXT_PUBLIC_META_PIXEL_ID_3,

        token:
          process.env
            .META_ACCESS_TOKEN_3,
      },
    ].filter(
      (
        account
      ): account is {
        id: string;
        token: string;
      } =>
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
            "Missing Meta environment variables.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       READ REQUEST
    ===================================================== */

    const body =
      (await req
        .json()
        .catch(
          () => ({})
        )) as StoryOrderBody;

    const order =
      body.order;

    const customer =
      body.customer;

    const tracking =
      body.tracking;

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (
      !order ||
      !customer
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Missing order or customer data.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !tracking?.sharedEventId
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Missing shared event ID.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !tracking
        .completeRegistrationEventId
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Missing CompleteRegistration event ID.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !customer.name ||
      !customer.phone ||
      !customer.state ||
      !customer.city ||
      !customer.address
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Missing required customer information.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      customer.willAccept !== true
    ) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Customer has not confirmed order acceptance.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       ORDER VALUES
    ===================================================== */

    const packagePrice =
      Number(
        order.packagePrice || 0
      );

    const extraOilPrice =
      Number(
        order.extraOilPrice || 0
      );

    const total =
      Number(
        order.total || 0
      );

    const machines =
      Number(
        order.machines || 0
      );

    const includedOils =
      Number(
        order.includedOils || 0
      );

    const extraOilQuantity =
      Number(
        order.extraOilQuantity || 0
      );

    const totalOils =
      Number(
        order.totalOils || 0
      );

    /* =====================================================
       CUSTOMER DATA
    ===================================================== */

    const normalizedPhone =
      normalizeNigerianPhone(
        customer.phone
      );

    const hashedPhone =
      normalizedPhone
        ? sha256(
            normalizedPhone
          )
        : undefined;

    const nameParts =
      customer.name
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
        ? sha256(
            firstName
          )
        : undefined;

    const hashedLastName =
      lastName
        ? sha256(
            lastName
          )
        : undefined;

    const hashedState =
      customer.state
        ? sha256(
            customer.state
          )
        : undefined;

    const hashedCity =
      customer.city
        ? sha256(
            customer.city
          )
        : undefined;

    const hashedCountry =
      sha256("ng");

    /* =====================================================
       BROWSER IDENTIFIERS

       These come from:

       getBrowserIdentifiers()

       in StoryOrderForm.tsx

       We do NOT try to recreate them
       from fbclid.
    ===================================================== */

    const browserIdentifiers =
      tracking
        .browserIdentifiers ||
      {};

    const fbp =
      cleanValue(
        browserIdentifiers.fbp
      );

    const fbc =
      cleanValue(
        browserIdentifiers.fbc
      );

    /* =====================================================
       USER AGENT / IP
    ===================================================== */

    const userAgent =
      cleanValue(
        tracking.userAgent
      ) ||
      req.headers.get(
        "user-agent"
      ) ||
      undefined;

    const clientIp =
      getClientIp(req);

    /* =====================================================
       META USER DATA
    ===================================================== */

    const commonUserData =
      removeEmptyValues({
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

        country: [
          hashedCountry,
        ],

        client_ip_address:
          clientIp,

        client_user_agent:
          userAgent,

        fbp,

        fbc,
      });

    /* =====================================================
       EVENT SOURCE URL
    ===================================================== */

    const eventSourceUrl =
      cleanValue(
        body.eventSourceUrl
      ) ||
      "https://www.massonstore.com/comparison/story";

    /* =====================================================
       COMPLETE REGISTRATION

       IMPORTANT:

       Story submits ONLY:

       CompleteRegistration

       NO Lead
       NO Purchase
    ===================================================== */

    const eventId =
      tracking
        .completeRegistrationEventId;

    const eventTime =
      Math.floor(
        Date.now() / 1000
      );

    const metaEvent = {
      event_name:
        "CompleteRegistration",

      event_time:
        eventTime,

      event_id:
        eventId,

      action_source:
        "website",

      event_source_url:
        eventSourceUrl,

      user_data:
        commonUserData,

      custom_data: {
        currency:
          order.currency ||
          "NGN",

        value:
          total,

        content_name:
          order.packageName ||
          "ScentMason Story Offer",

        content_category:
          "ScentMason",

        content_type:
          "product",

        content_ids: [
          order.packageId ||
            "story-offer",
        ],

        num_items:
          machines,
      },
    };

    const metaPayload = {
      data: [
        metaEvent,
      ],

      ...(testEventCode
        ? {
            test_event_code:
              testEventCode,
          }
        : {}),
    };

    /* =====================================================
       ATTRIBUTION
    ===================================================== */

    const firstTouch =
      tracking
        .attribution
        ?.firstTouch ||
      {};

    const lastTouch =
      tracking
        .attribution
        ?.lastTouch ||
      {};

    /* =====================================================
       GOOGLE SHEETS PAYLOAD

       This is the schema the NEW Story Apps Script
       will receive.
    ===================================================== */

    const sheetsPayload = {
      eventId:
        tracking.sharedEventId,

      completeRegistrationEventId:
        tracking
          .completeRegistrationEventId,

      eventName:
        "CompleteRegistration",

      sourcePage:
        body.sourcePage ||
        "story",

      eventSourceUrl,

      /* CUSTOMER */

      name:
        customer.name.trim(),

      phone:
        customer.phone.trim(),

      whatsapp:
        customer.whatsapp?.trim() ||
        "",

      state:
        customer.state.trim(),

      city:
        customer.city.trim(),

      address:
        customer.address.trim(),

      /* PACKAGE */

      packageId:
        order.packageId ||
        "",

      packageName:
        order.packageName ||
        "",

      machines,

      packagePrice,

      /* OILS */

      includedOils,

      extraOilQuantity,

      extraOilPrice,

      totalOils,

      /* TOTAL */

      total,

      currency:
        order.currency ||
        "NGN",

      willAccept:
        customer.willAccept
          ? "Yes"
          : "No",

      /* ATTRIBUTION */

      utm_source:
        firstTouch
          .utm_source ||
        "",

      utm_medium:
        firstTouch
          .utm_medium ||
        "",

      utm_campaign:
        firstTouch
          .utm_campaign ||
        "",

      utm_term:
        firstTouch
          .utm_term ||
        "",

      utm_content:
        firstTouch
          .utm_content ||
        "",

      fbclid:
        firstTouch
          .fbclid ||
        "",

      ttclid:
        firstTouch
          .ttclid ||
        "",

      gclid:
        firstTouch
          .gclid ||
        "",

      msclkid:
        firstTouch
          .msclkid ||
        "",

      landingPage:
        firstTouch
          .landingPage ||
        "",

      landingPagePath:
        firstTouch
          .landingPagePath ||
        "",

      referrer:
        firstTouch
          .referrer ||
        "",

      firstTouch:
        JSON.stringify(
          firstTouch
        ),

      lastTouch:
        JSON.stringify(
          lastTouch
        ),

      submittedAt:
        new Date().toISOString(),
    };

    /* =====================================================
       GOOGLE SHEETS REQUEST
    ===================================================== */

    const sheetsPromise =
      fetch(
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
        }
      )
        .then(
          async (
            response
          ) => {
            const responseText =
              await response
                .text()
                .catch(
                  () => ""
                );

            if (
              !response.ok
            ) {
              console.error(
                "Story Google Sheets returned an error:",
                response.status,
                responseText
              );
            }

            return {
              ok:
                response.ok,

              status:
                response.status,

              body:
                responseText,
            };
          }
        )
        .catch(
          (error) => {
            console.error(
              "Story Google Sheets synchronization failed:",
              error
            );

            return {
              ok: false,

              status: 0,

              body: "",
            };
          }
        );

    /* =====================================================
       META CAPI REQUESTS
    ===================================================== */

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
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body:
                    JSON.stringify(
                      metaPayload
                    ),
                }
              );

            const json =
              await response
                .json()
                .catch(
                  () => null
                );

            if (
              !response.ok
            ) {
              console.error(
                `Story Meta CAPI failed for dataset ${account.id}:`,
                json
              );
            }

            return {
              ok:
                response.ok,

              datasetId:
                account.id,

              json,
            };
          } catch (error) {
            console.error(
              `Story Meta CAPI request failed for dataset ${account.id}:`,
              error
            );

            return {
              ok: false,

              datasetId:
                account.id,

              json: null,
            };
          }
        }
      );

    /* =====================================================
       FIRE BOTH SYSTEMS
    ===================================================== */

    const [
      sheetsResult,
      ...capiResults
    ] =
      await Promise.all([
        sheetsPromise,
        ...capiPromises,
      ]);

    /* =====================================================
       META RESULT
    ===================================================== */

    const metaSucceeded =
      capiResults.some(
        (
          result
        ) =>
          result.ok
      );

    /* =====================================================
       IMPORTANT:

       The order must not be silently reported as
       successful if the Google Sheet failed.

       We need the operational order record.
    ===================================================== */

    if (
      !sheetsResult.ok
    ) {
      console.error(
        "Story order was not written to Google Sheets:",
        sheetsResult
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Your order could not be saved. Please try again.",

          eventId,

          sheetSaved: false,

          metaTracked:
            metaSucceeded,
        },
        {
          status: 500,
        }
      );
    }

    if (
      !metaSucceeded
    ) {
      console.error(
        "Story CompleteRegistration failed across all Meta accounts:",
        capiResults
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Your order was saved, but tracking could not be completed.",

          eventId,

          sheetSaved: true,

          metaTracked: false,

          metaResults:
            capiResults,
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Story order captured successfully.",

        eventId,

        sheetSaved: true,

        metaTracked: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Story order tracking engine crashed:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unknown tracking error",
      },
      {
        status: 500,
      }
    );
  }
}