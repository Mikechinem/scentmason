import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type TikTokOrderRequestBody = {
  eventId?: string;
  leadEventId?: string;
  completeRegistrationEventId?: string;

  eventSourceUrl?: string;
  referrer?: string;

  ttp?: string;
  ttclid?: string;

  phone?: string;
  name?: string;
  state?: string;
  city?: string;
  address?: string;

  sets?: string;
  setPrice?: number;

  oilBottlesOrdered?: number;
  oilBottlesFree?: number;
  oilBottlesTotal?: number;
  oilPrice?: number;

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

  return `+${cleaned}`;
}

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function getTikTokEnv() {
  const pixelCode =
    process.env.TIKTOK_PIXEL_CODE ||
    process.env.NEXT_PUBLIC_TIKTOK_PIXEL_CODE;

  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE;

  return {
    pixelCode,
    accessToken,
    testEventCode,
  };
}

async function sendTikTokStandardEvent(
  eventName: "Lead" | "CompleteRegistration",
  eventId: string,
  body: TikTokOrderRequestBody,
  req: NextRequest
) {
  const { pixelCode, accessToken, testEventCode } = getTikTokEnv();

  if (!pixelCode || !accessToken) {
    throw new Error("Missing TikTok environment variables.");
  }

  const userAgent = req.headers.get("user-agent") || undefined;
  const clientIp = getClientIp(req);
  const normalizedPhone = normalizeNigerianPhoneForTikTok(body.phone);

  const customData = removeEmptyValues({
    currency: "NGN",
    value: Number(body.total) || 0,
    content_name: "ScentMason Diffuser",
    content_type: "product",
    content_id: "scentmason_diffuser",
    quantity: Number(body.sets) || 1,
    num_items: Number(body.sets) || 1,
    set_price: Number(body.setPrice) || 0,
    oil_bottles_ordered: Number(body.oilBottlesOrdered) || 0,
    oil_bottles_free: Number(body.oilBottlesFree) || 0,
    oil_bottles_total: Number(body.oilBottlesTotal) || 0,
    oil_price: Number(body.oilPrice) || 0,
    ...body.customData,
  });

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
          phone: normalizedPhone
            ? sha256(normalizedPhone)
            : undefined,
        }),

        page: removeEmptyValues({
          url:
            body.eventSourceUrl ||
            process.env.NEXT_PUBLIC_SITE_URL ||
            "https://scentmason.vercel.app",
          referrer: body.referrer,
        }),

        properties: customData,
      },
    ],

    ...(testEventCode
      ? { test_event_code: testEventCode }
      : {}),
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
      eventName,
      eventId,
      status: response.status,
      result,
    });

    throw new Error(
      `TikTok ${eventName} event failed with status ${response.status}.`
    );
  }

  return {
    success: true,
    eventName,
    eventId,
    tiktokStatus: response.status,
    result,
  };
}

export async function GET() {
  const { pixelCode, accessToken, testEventCode } = getTikTokEnv();

  return NextResponse.json({
    status: "ok",
    message:
      "ScentMason TikTok Events API Type 2 order route is active.",
    envCheck: {
      hasPixelCode: Boolean(pixelCode),
      hasAccessToken: Boolean(accessToken),
      hasTestEventCode: Boolean(testEventCode),
    },
    purchase: "not_fired",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body =
      (await req.json().catch(() => ({}))) as TikTokOrderRequestBody;

    const eventId = body.eventId?.trim();
    const leadEventId = body.leadEventId?.trim();
    const completeRegistrationEventId =
      body.completeRegistrationEventId?.trim();

    if (
      !eventId ||
      !leadEventId ||
      !completeRegistrationEventId
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing event IDs required for TikTok Type 2 tracking.",
          required: [
            "eventId",
            "leadEventId",
            "completeRegistrationEventId",
          ],
        },
        { status: 400 }
      );
    }

    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const state = body.state?.trim();
    const address = body.address?.trim();

    if (!name || !phone || !state || !address || !body.sets) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required customer/order information.",
        },
        { status: 400 }
      );
    }

    const eventSourceUrl =
      body.eventSourceUrl?.trim() ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://scentmason.vercel.app";

    const referrer = body.referrer?.trim() || undefined;

    const leadResult = await sendTikTokStandardEvent(
      "Lead",
      leadEventId,
      {
        ...body,
        eventSourceUrl,
        referrer,
        name,
        phone,
        state,
      },
      req
    );

    const completeRegistrationResult =
      await sendTikTokStandardEvent(
        "CompleteRegistration",
        completeRegistrationEventId,
        {
          ...body,
          eventSourceUrl,
          referrer,
          name,
          phone,
          state,
        },
        req
      );

    return NextResponse.json({
      success: true,

      orderStatus: "Pending",

      tiktokPurchase: "not_fired",

      tiktokLead: "success",
      tiktokCompleteRegistration: "success",

      eventId,
      leadEventId,
      completeRegistrationEventId,

      tiktokLeadResult: leadResult,
      tiktokCompleteRegistrationResult:
        completeRegistrationResult,

      customer: {
        name,
        phone,
        state,
        city: body.city?.trim() || "",
        address,
        sets: body.sets,
        total: Number(body.total) || 0,
      },
    });
  } catch (error) {
    console.error(
      "ScentMason TikTok Type 2 order route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "TikTok Type 2 order tracking failed.",
        error:
          error instanceof Error
            ? error.message
            : "Unexpected TikTok order tracking error.",
      },
      { status: 500 }
    );
  }
}
