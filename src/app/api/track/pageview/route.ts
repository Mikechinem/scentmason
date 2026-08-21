import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function getClientIp(req: NextRequest) {
  // Prefer the first IP from the forwarding chain.
  const forwardedFor = req.headers.get("x-forwarded-for");

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

function getCookie(req: NextRequest, name: string) {
  return req.cookies.get(name)?.value || undefined;
}

function cleanOptionalValue(value: unknown) {
  if (typeof value !== "string") return undefined;

  const trimmed = value.trim();

  return trimmed || undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

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

    /*
     * ============================================================
     * META CONFIGURATION
     * ============================================================
     */

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

    /*
     * ============================================================
     * ACTIVE META ACCOUNTS
     *
     * Keeps your existing multi-pixel setup intact.
     * ============================================================
     */

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

    /*
     * ============================================================
     * REQUEST / BROWSER DATA
     * ============================================================
     */

    const clientIp = getClientIp(req);

    const clientUserAgent =
      req.headers.get("user-agent") || undefined;

    /*
     * These are extremely important for Meta event matching.
     *
     * _fbp = Meta browser identifier
     * _fbc = Meta click identifier when available
     *
     * We read them server-side from the request cookies so they
     * don't have to be manually trusted from the request body.
     */

    const fbp = getCookie(req, "_fbp");
    const fbc = getCookie(req, "_fbc");

    /*
     * ============================================================
     * EVENT SOURCE URL
     * ============================================================
     */

    const eventSourceUrl =
      cleanOptionalValue(body?.eventSourceUrl) ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://scentmason.vercel.app";

    /*
     * ============================================================
     * USER DATA
     *
     * IMPORTANT:
     *
     * We do NOT put name/phone/address from a later order form
     * into PageView automatically.
     *
     * PageView happens before the customer necessarily submits
     * anything. The Purchase event is where we will send the
     * richer customer information.
     * ============================================================
     */

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

    /*
     * ============================================================
     * META CAPI PAYLOAD
     * ============================================================
     */

    const payload = {
      data: [
        {
          event_name: "PageView",

          event_time: Math.floor(Date.now() / 1000),

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

    /*
     * ============================================================
     * SEND TO ALL ACTIVE META ACCOUNTS
     * ============================================================
     */

    const results = await Promise.all(
      activeAccounts.map(async (account) => {
        try {
          const response = await fetch(
            `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`,
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(payload),

              cache: "no-store",
            }
          );

          const responseText = await response.text();

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
      })
    );

    /*
     * We preserve the existing endpoint behavior:
     * the frontend receives success when the ingestion request
     * itself completed, while failures are logged server-side.
     */

    const successfulAccounts = results.filter(
      (result) => result.success
    ).length;

    if (successfulAccounts === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Meta PageView delivery failed.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("PageView CAPI error:", error);

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