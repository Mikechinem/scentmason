import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";

export const runtime = "nodejs";

// ============================================================
// CLIENT IP
// ============================================================
//
// IMPORTANT:
// - Prefer the original client IP supplied by Cloudflare.
// - If unavailable, inspect forwarded IPs.
// - Prefer IPv6 when a valid IPv6 address is available.
// - Never manufacture/convert an IPv4 address into IPv6.
// - Fall back to other standard proxy headers.
//
// ============================================================

function cleanIp(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  let ip = value.trim();

  if (!ip) {
    return undefined;
  }

  // Remove surrounding quotes sometimes added by proxies.
  ip = ip.replace(/^["']|["']$/g, "").trim();

  // Handle bracketed IPv6 values such as:
  // [2001:db8::1]
  if (ip.startsWith("[") && ip.includes("]")) {
    ip = ip.slice(1, ip.indexOf("]"));
  }

  // Handle IPv4 values that may contain a port:
  // 123.123.123.123:443
  //
  // Do NOT apply this to IPv6 because IPv6 contains colons.
  if (ip.includes(".") && ip.includes(":")) {
    const possibleIpv4 = ip.split(":")[0];

    if (isIP(possibleIpv4) === 4) {
      ip = possibleIpv4;
    }
  }

  return isIP(ip) ? ip : undefined;
}

function getClientIp(req: NextRequest): string | undefined {
  // ==========================================================
  // 1. CLOUDFLARE ORIGINAL CLIENT IP
  // ==========================================================
  //
  // When Cloudflare is in front of the application,
  // CF-Connecting-IP is the original visitor IP.
  //
  // If the visitor is IPv6-enabled and Cloudflare provides
  // their IPv6 address, preserve it exactly.
  //
  const cloudflareIp = cleanIp(
    req.headers.get("cf-connecting-ip")
  );

  if (cloudflareIp) {
    return cloudflareIp;
  }

  // ==========================================================
  // 2. X-FORWARDED-FOR
  // ==========================================================
  //
  // x-forwarded-for may contain multiple addresses:
  //
  // client, proxy1, proxy2
  //
  // We inspect all valid addresses and prefer IPv6 when
  // available.
  //
  const forwardedFor = req.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const forwardedIps = forwardedFor
      .split(",")
      .map((ip) => cleanIp(ip))
      .filter((ip): ip is string => Boolean(ip));

    // Prefer a valid IPv6 address.
    const ipv6 = forwardedIps.find(
      (ip) => isIP(ip) === 6
    );

    if (ipv6) {
      return ipv6;
    }

    // Otherwise use the first valid IPv4 address.
    const ipv4 = forwardedIps.find(
      (ip) => isIP(ip) === 4
    );

    if (ipv4) {
      return ipv4;
    }
  }

  // ==========================================================
  // 3. X-REAL-IP
  // ==========================================================

  const realIp = cleanIp(
    req.headers.get("x-real-ip")
  );

  if (realIp) {
    return realIp;
  }

  // ==========================================================
  // 4. NO VALID CLIENT IP AVAILABLE
  // ==========================================================

  return undefined;
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