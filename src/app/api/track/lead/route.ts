import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

type LeadRequestBody = {
  eventId?: string;
  eventName?: string;
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

function normalizePhone(phone?: string) {
  if (!phone) return "";

  return phone.replace(/\D/g, "");
}

function sha256(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "ScentMason Meta CAPI Lead route is active.",
    envCheck: {
      hasDatasetId: Boolean(process.env.META_DATASET_ID),
      hasAccessToken: Boolean(process.env.META_ACCESS_TOKEN),
      graphVersion: process.env.META_GRAPH_API_VERSION || "v25.0",
      hasTestEventCode: Boolean(process.env.META_TEST_EVENT_CODE),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const datasetId = process.env.META_DATASET_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;
    const graphVersion = process.env.META_GRAPH_API_VERSION || "v25.0";
    const testEventCode = process.env.META_TEST_EVENT_CODE;

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

    const eventName = body.eventName || "Lead";
    const eventId = body.eventId || `server_${Date.now()}`;
    const userAgent = req.headers.get("user-agent") || undefined;
    const clientIp = getClientIp(req);
    const normalizedPhone = normalizePhone(body.phone);

    const userData = removeEmptyValues({
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbp: body.fbp,
      fbc: body.fbc,
      ph: normalizedPhone ? [sha256(normalizedPhone)] : undefined,
    });

    const eventPayload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: body.eventSourceUrl || "https://scentmason.vercel.app",
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