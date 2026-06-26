import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type TikTokPurchaseRequestBody = {
  eventId?: string;
  eventSourceUrl?: string;
  referrer?: string;
  ttp?: string;
  ttclid?: string;
  phone?: string;
  eventName?: string; 
  total?: string | number; 
  customData?: Record<string, unknown>;
};

function removeEmptyValues<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
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

function normalizeNigerianPhoneForTikTok(phone?: string) {
  if (!phone) return "";
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = `234${cleaned.slice(1)}`;
  }
  if (cleaned.startsWith("2340")) {
    cleaned = `234${cleaned.slice(4)}`;
  }
  if (!cleaned.startsWith("234")) {
    cleaned = `234${cleaned}`;
  }
  return `+${cleaned}`; // Crucial for TikTok E.164 hash matching
}

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function getTikTokEnv() {
  const pixelCode =
    process.env.TIKTOK_PIXEL_CODE || process.env.NEXT_PUBLIC_TIKTOK_PIXEL_CODE;
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE;

  return {
    pixelCode,
    accessToken,
    testEventCode,
  };
}

export async function GET() {
  const { pixelCode, accessToken, testEventCode } = getTikTokEnv();
  return NextResponse.json({
    status: "ok",
    message: "ScentMason TikTok Events API Purchase route is active.", // Aligned label
    envCheck: {
      hasPixelCode: Boolean(pixelCode),
      hasAccessToken: Boolean(accessToken),
      hasTestEventCode: Boolean(testEventCode),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { pixelCode, accessToken, testEventCode } = getTikTokEnv();

    if (!pixelCode || !accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing TikTok environment variables.",
          envCheck: {
            hasPixelCode: Boolean(pixelCode),
            hasAccessToken: Boolean(accessToken),
          },
        },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as TikTokPurchaseRequestBody;

    if (!body.eventId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing eventId. TikTok Pixel and Events API must share the same event_id for deduplication.",
        },
        { status: 400 }
      );
    }

    // Aligned: Dynamically reads payload "Purchase" event sent by frontend form
    const eventName = body.eventName || "Purchase"; 
    const eventId = body.eventId;
    const userAgent = req.headers.get("user-agent") || undefined;
    const clientIp = getClientIp(req);
    const normalizedPhone = normalizeNigerianPhoneForTikTok(body.phone);

    const eventPayload = {
      event_source: "web",
      event_source_id: pixelCode,
      data: [
        {
          event: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          user: removeEmptyValues({
            ip: clientIp,
            user_agent: userAgent,
            ttp: body.ttp,
            ttclid: body.ttclid,
            phone: normalizedPhone ? sha256(normalizedPhone) : undefined,
          }),
          page: removeEmptyValues({
            url:
              body.eventSourceUrl ||
              process.env.NEXT_PUBLIC_SITE_URL ||
              "https://scentmason.vercel.app",
            referrer: body.referrer,
          }),
          properties: removeEmptyValues({
            currency: "NGN",
            value: body.total, 
            ...body.customData,
          }),
        },
      ],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
    };

    const response = await fetch(
      "https://business-api.tiktok.com/open_api/v1.3/event/track/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": accessToken,
        },
        body: JSON.stringify(eventPayload),
      }
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("TikTok Events API failed:", {
        status: response.status,
        result,
      });

      return NextResponse.json(
        {
          success: false,
          message: "TikTok Events API request failed.",
          tiktokStatus: response.status,
          tiktokResult: result,
          debug: {
            hasPixelCode: Boolean(pixelCode),
            hasAccessToken: Boolean(accessToken),
            eventName,
            eventId,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `TikTok Events API ${eventName} event sent successfully.`, // Dynamic logging text alignment
      tiktokStatus: response.status,
      eventName,
      eventId,
      result,
    });
  } catch (error) {
    console.error("TikTok tracking route crashed:", error);
    return NextResponse.json(
      {
        success: false,
        message: "TikTok tracking route crashed.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}