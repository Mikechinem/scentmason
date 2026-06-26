import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

type PurchaseRequestBody = {
  eventId?: string;
  eventSourceUrl?: string;
  fbp?: string;
  fbc?: string;
  phone?: string;
  whatsapp?: string;
  
  // Custom tracking data object
  customData?: Record<string, unknown>;

  // Flat Order Form fields mapping directly to Google Sheets
  name?: string;
  state?: string;
  address?: string;
  sets?: string | number;
  setPrice?: string | number;
  oilBottlesOrdered?: number;
  oilBottlesFree?: number;
  oilBottlesTotal?: number;
  oilPrice?: number;
  total?: string | number;
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

  return { datasetId, accessToken, graphVersion, testEventCode };
}

export async function GET() {
  const { datasetId, accessToken, graphVersion, testEventCode } = getMetaEnv();
  return NextResponse.json({
    status: "ok",
    message: "ScentMason Meta CAPI Purchase & Google Sheets route is active.", // Aligned label
    envCheck: {
      hasDatasetId: Boolean(datasetId),
      hasAccessToken: Boolean(accessToken),
      hasGoogleSheetsUrl: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { datasetId, accessToken, graphVersion, testEventCode } = getMetaEnv();
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!datasetId || !accessToken) {
      return NextResponse.json(
        { success: false, message: "Missing Meta environment variables." },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as PurchaseRequestBody;

    if (!body.eventId) {
      return NextResponse.json(
        { success: false, message: "Missing eventId for deduplication." },
        { status: 400 }
      );
    }

    // --- 1. RUN META CAPI TRACKING LOGIC ---
    const eventName = "Purchase"; // Aligned explicitly for core purchase conversions
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
            value: body.total,
            ...body.customData,
          }),
        },
      ],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
    };

    const metaUrl = `https://graph.facebook.com/${graphVersion}/${datasetId}/events?access_token=${accessToken}`;

    const metaResponse = await fetch(metaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    });

    const metaResult = await metaResponse.json().catch(() => null);

    // --- 2. GOOGLE SHEETS DISPATCH ---
    if (googleSheetsUrl) {
      try {
        const sheetsPayload = {
          eventId: body.eventId, 
          name: body.name || "",
          phone: body.phone || "",
          whatsapp: body.whatsapp || "", 
          state: body.state || "",
          address: body.address || "",
          sets: body.sets || "",
          setPrice: body.setPrice || "",
          oilBottlesOrdered: body.oilBottlesOrdered || 0,
          oilBottlesFree: body.oilBottlesFree || 0,
          oilBottlesTotal: body.oilBottlesTotal || 0,
          oilPrice: body.oilPrice || 0,
          total: body.total || "",
        };

        await fetch(googleSheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetsPayload),
        });
      } catch (sheetErr) {
        console.error("Google Sheets background synchronization failed:", sheetErr);
      }
    } else {
      console.warn("Google Sheets synchronization skipped: Missing GOOGLE_SHEETS_WEBHOOK_URL variable.");
    }

    if (!metaResponse.ok) {
      console.error("Meta CAPI execution dropped:", metaResult);
      return NextResponse.json(
        { success: false, message: "Meta tracking transaction failed.", metaResult },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Purchase pixel captured and sheet synchronised.",
      eventId,
    });
  } catch (error) {
    console.error("Tracking transaction engine crashed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown breakdown" },
      { status: 500 }
    );
  }
}