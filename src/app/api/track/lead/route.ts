import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type LeadRequestBody = {
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  phone?: string;
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

function normalizeNigerianPhone(phone?: string) {
  if (!phone) return "";

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = `234${cleaned.slice(1)}`;
  }

  if (cleaned.startsWith("2340")) {
    cleaned = `234${cleaned.slice(4)}`;
  }

  return cleaned;
}

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function getMetaEnv() {
  const datasetId =
    process.env.META_DATASET_ID ||
    process.env.META_PIXEL_ID ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID;

  const accessToken =
    process.env.META_ACCESS_TOKEN || process.env.META_CAPI_ACCESS_TOKEN;

  const graphVersion = process.env.META_GRAPH_API_VERSION || "v25.0";
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  return {
    datasetId,
    accessToken,
    graphVersion,
    testEventCode,
  };
}

export async function GET() {
  const { datasetId, accessToken, graphVersion, testEventCode } = getMetaEnv();

  return NextResponse.json({
    status: "ok",
    message: "ScentMason Meta CAPI Lead route is active.",
    envCheck: {
      hasDatasetId: Boolean(datasetId),
      hasAccessToken: Boolean(accessToken),
      graphVersion,
      hasTestEventCode: Boolean(testEventCode),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { datasetId, accessToken, graphVersion, testEventCode } = getMetaEnv();

    if (!datasetId || !accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing Meta environment variables.",
          envCheck: {
            hasDatasetId: Boolean(datasetId),
            hasAccessToken: Boolean(accessToken),
            graphVersion,
          },
        },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as LeadRequestBody;

    /**
     * Important:
     * The frontend must generate this same eventId and use it for:
     * 1. Browser Pixel Lead eventID
     * 2. Server CAPI event_id
     *
     * This prevents Meta from counting browser Lead and server Lead as two leads.
     */
    if (!body.eventId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing eventId. Browser Pixel Lead and CAPI Lead must share the same eventId for deduplication.",
        },
        { status: 400 }
      );
    }

    const eventName = "Lead";
    const eventId = body.eventId;
    const userAgent = req.headers.get("user-agent") || undefined;
    const clientIp = getClientIp(req);
    const normalizedPhone = normalizeNigerianPhone(body.phone);

    const userData = removeEmptyValues({
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbp: body.fbp,
      fbc: body.fbc,
      ph: normalizedPhone ? [sha256(normalizedPhone)] : undefined,
      external_id: normalizedPhone ? [sha256(normalizedPhone)] : undefined,
    });

    const eventPayload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url:
            body.eventSourceUrl ||
            process.env.NEXT_PUBLIC_SITE_URL ||
            "https://scentmason.vercel.app",
          user_data: userData,
          custom_data: removeEmptyValues({
            currency: "NGN",
            ...body.customData,
          }),
        },
      ],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
    };

    const metaUrl = `https://graph.facebook.com/${graphVersion}/${datasetId}/events?access_token=${accessToken}`;

    const response = await fetch(metaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventPayload),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Meta CAPI failed:", {
        status: response.status,
        result,
      });

      return NextResponse.json(
        {
          success: false,
          message: "Meta CAPI request failed.",
          metaStatus: response.status,
          metaResult: result,
          debug: {
            hasDatasetId: Boolean(datasetId),
            hasAccessToken: Boolean(accessToken),
            graphVersion,
            eventName,
            eventId,
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Meta CAPI Lead event sent.",
      metaStatus: response.status,
      eventName,
      eventId,
      result,
    });
  } catch (error) {
    console.error("Lead tracking route crashed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Lead tracking route crashed.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}