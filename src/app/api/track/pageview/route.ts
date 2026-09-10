import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// ============================================================
// CLIENT IP
// ============================================================

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");

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

// ============================================================
// COOKIE
// ============================================================

function getCookie(req: NextRequest, name: string) {
  return req.cookies.get(name)?.value || undefined;
}

// ============================================================
// CLEAN OPTIONAL VALUE
// ============================================================

function cleanOptionalValue(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed || undefined;
}

// ============================================================
// POST
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    // ========================================================
    // EVENT ID
    //
    // CRITICAL FOR DEDUPLICATION
    //
    // The browser Pixel generates this ID.
    // The browser sends the SAME ID to this endpoint.
    // This endpoint sends that SAME ID to Meta CAPI.
    //
    // Browser:
    //   PageView + eventID = X
    //
    // Server:
    //   PageView + event_id = X
    //
    // Meta can therefore deduplicate the two events.
    // ========================================================

    const eventId = cleanOptionalValue(body?.eventId);

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing eventId",
        },
        { status: 400 }
      );
    }

    // ========================================================
    // META CONFIGURATION
    // ========================================================

    const fallbackDatasetId =
      process.env.META_DATASET_ID ||
      process.env.META_PIXEL_ID ||
      process.env.NEXT_PUBLIC_META_PIXEL_ID;

    const fallbackAccessToken =
      process.env.META_ACCESS_TOKEN ||
      process.env.META_CAPI_ACCESS_TOKEN;

    const graphVersion =
      process.env.META_GRAPH_API_VERSION || "v25.0";

    const testEventCode =
      process.env.META_TEST_EVENT_CODE;

    // ========================================================
    // ACTIVE META ACCOUNTS
    //
    // Preserve existing 3-pixel configuration.
    // ========================================================

    const activeAccounts = [
      {
        id:
          process.env.NEXT_PUBLIC_META_PIXEL_ID_1 ||
          fallbackDatasetId,

        token:
          process.env.META_ACCESS_TOKEN_1 ||
          fallbackAccessToken,
      },

      {
        id: process.env.NEXT_PUBLIC_META_PIXEL_ID_2,

        token: process.env.META_ACCESS_TOKEN_2,
      },

      {
        id: process.env.NEXT_PUBLIC_META_PIXEL_ID_3,

        token: process.env.META_ACCESS_TOKEN_3,
      },
    ].filter(
      (
        account
      ): account is {
        id: string;
        token: string;
      } => Boolean(account.id && account.token)
    );

    if (activeAccounts.length === 0) {
      console.error(
        "PageView CAPI: no active Meta accounts configured."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Missing Meta environment variables.",
        },
        { status: 500 }
      );
    }

    // ========================================================
    // SERVER REQUEST DATA
    // ========================================================

    const clientIp = getClientIp(req);

    const clientUserAgent =
      cleanOptionalValue(
        req.headers.get("user-agent")
      );

    // ========================================================
    // META BROWSER IDENTIFIERS
    //
    // We prefer identifiers explicitly supplied by the
    // browser, then fall back to the cookies on the request.
    //
    // This gives us two ways to capture the identifiers.
    // ========================================================

    const browserFbp = cleanOptionalValue(
      body?.browserIdentifiers?.fbp
    );

    const browserFbc = cleanOptionalValue(
      body?.browserIdentifiers?.fbc
    );

    const cookieFbp = getCookie(req, "_fbp");

    const cookieFbc = getCookie(req, "_fbc");

    const fbp = browserFbp || cookieFbp;

    const fbc = browserFbc || cookieFbc;

    // ========================================================
    // EVENT SOURCE URL
    // ========================================================

    const eventSourceUrl =
      cleanOptionalValue(body?.eventSourceUrl) ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://scentmason.vercel.app";

    // ========================================================
    // USER DATA
    //
    // IMPORTANT:
    //
    // PageView happens before the customer submits the order.
    //
    // Therefore we DO NOT invent:
    // - phone
    // - email
    // - first name
    // - surname
    // - city
    // - postcode
    // - date of birth
    // - gender
    //
    // We use legitimate anonymous/browser identifiers instead.
    // ========================================================

    const userData: Record<string, string> = {};

    if (clientIp) {
      userData.client_ip_address = clientIp;
    }

    if (clientUserAgent) {
      userData.client_user_agent = clientUserAgent;
    }

    if (fbp) {
      userData.fbp = fbp;
    }

    if (fbc) {
      userData.fbc = fbc;
    }

    // ========================================================
    // DEBUG INFORMATION
    //
    // Does NOT expose the actual identifiers.
    // Only tells us whether they exist.
    // ========================================================

    console.log(
      "📊 [Meta PageView CAPI] Identity data:",
      {
        eventId,

        clientIp:
          clientIp
            ? "present"
            : "missing",

        clientUserAgent:
          clientUserAgent
            ? "present"
            : "missing",

        fbp:
          fbp
            ? "present"
            : "missing",

        fbc:
          fbc
            ? "present"
            : "missing",

        eventSourceUrl,
      }
    );

    // ========================================================
    // META CAPI PAYLOAD
    //
    // DEDUPLICATION:
    //
    // event_id MUST be exactly the same value as the browser
    // Pixel's eventID.
    //
    // Do NOT generate another UUID here.
    // ========================================================

    const payload = {
      data: [
        {
          event_name: "PageView",

          event_time: Math.floor(
            Date.now() / 1000
          ),

          event_id: eventId,

          action_source: "website",

          event_source_url: eventSourceUrl,

          user_data: userData,
        },
      ],

      ...(testEventCode
        ? {
            test_event_code: testEventCode,
          }
        : {}),
    };

    // ========================================================
    // SEND TO ALL ACTIVE META ACCOUNTS
    // ========================================================

    const results = await Promise.all(
      activeAccounts.map(
        async (account) => {
          try {
            const response = await fetch(
              `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`,
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify(
                  payload
                ),

                cache: "no-store",
              }
            );

            const responseText =
              await response.text();

            if (!response.ok) {
              console.error(
                `Meta PageView CAPI failed for account ${account.id}:`,
                response.status,
                responseText
              );

              return {
                success: false,
                status: response.status,
              };
            }

            console.log(
              `✅ [Meta PageView CAPI] Successfully sent to account ${account.id}.`,
              {
                eventId,
              }
            );

            return {
              success: true,
              status: response.status,
            };
          } catch (error) {
            console.error(
              `Meta PageView CAPI request error for account ${account.id}:`,
              error
            );

            return {
              success: false,
              status: 0,
            };
          }
        }
      )
    );

    // ========================================================
    // RESULTS
    // ========================================================

    const successfulAccounts =
      results.filter(
        (result) => result.success
      ).length;

    if (successfulAccounts === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Meta PageView delivery failed.",
        },
        { status: 502 }
      );
    }

    // ========================================================
    // SUCCESS
    // ========================================================

    return NextResponse.json({
      success: true,

      eventId,

      successfulAccounts,

      deduplication: {
        enabled: true,

        eventIdSource:
          "browser-generated",

        sameEventIdUsedForBrowserAndServer:
          true,
      },

      userData: {
        clientIp:
          Boolean(clientIp),

        clientUserAgent:
          Boolean(clientUserAgent),

        fbp:
          Boolean(fbp),

        fbc:
          Boolean(fbc),
      },
    });
  } catch (error) {
    console.error(
      "PageView CAPI error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}