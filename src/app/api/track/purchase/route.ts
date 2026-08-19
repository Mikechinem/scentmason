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
  
  // Custom tracking data object fallback
  customData?: Record<string, unknown>;

  // Flat Order Form fields mapping directly from front-end layout
  name?: string;
  state?: string;
  city?: string; // 💡 Added explicitly to allow clean frontend mapping
  address?: string;
  sets?: string | number;
  setPrice?: string | number;
  oilBottlesOrdered?: number;
  oilBottlesFree?: number;
  oilBottlesTotal?: number;
  oilPrice?: number;
  total?: string | number;
  willAccept?: boolean;
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

// Bulletproof normalization for all Nigerian user entries
function normalizeNigerianPhone(phone?: string) {
  if (!phone) return "";
  let cleaned = phone.replace(/\D/g, ""); // Remove non-numeric characters entirely

  if (cleaned.startsWith("0")) {
    cleaned = `234${cleaned.slice(1)}`;
  } else if (cleaned.startsWith("2340")) {
    cleaned = `234${cleaned.slice(4)}`;
  } else if (!cleaned.startsWith("234") && cleaned.length >= 9) {
    // Catch-all: handles users who skip both the country code and the leading 0 (e.g., '803...')
    cleaned = `234${cleaned}`;
  }
  return cleaned;
}

// Protect integrity against trailing spaces or case differences
function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
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
    message: "ScentMason Meta CAPI Purchase & Google Sheets route is active.",
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

    // --- Dynamic Multi-Pixel Array Definition ---
    const activeAccounts = [
      { id: process.env.NEXT_PUBLIC_META_PIXEL_ID_1 || datasetId, token: process.env.META_ACCESS_TOKEN_1 || accessToken },
      { id: process.env.NEXT_PUBLIC_META_PIXEL_ID_2, token: process.env.META_ACCESS_TOKEN_2 },
      { id: process.env.NEXT_PUBLIC_META_PIXEL_ID_3, token: process.env.META_ACCESS_TOKEN_3 },
    ].filter(acc => acc.id && acc.token);

    if (activeAccounts.length === 0) {
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

    // --- 1. COMPILE DATA AND CONSTRUCT EVENT PAYLOADS ---
    const eventName = "Purchase";
    const eventId = body.eventId;
    const userAgent = req.headers.get("user-agent") || undefined;
    const clientIp = getClientIp(req);
    const normalizedPhone = normalizeNigerianPhone(body.phone);
    const hashedPhone = normalizedPhone ? sha256(normalizedPhone) : undefined;

    // Extract, clean, and map extra high-converting match identifiers
    const nameParts = (body.name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const hashedFirstName = firstName ? sha256(firstName) : undefined;
    const hashedLastName = lastName ? sha256(lastName) : undefined;
    const hashedState = body.state ? sha256(body.state) : undefined;
    
    // 💡 Elite Match Fix 1: Properly pass the 2-letter ISO country code inside the 'country' key parameter array
    const hashedCountry = sha256("ng");

    // 💡 Elite Match Fix 2: Isolate city logic cleanly from the explicit property or fallback extraction
    const rawCity = body.city || (() => {
      if (!body.address) return "";
      const addressParts = body.address.split(",").map(part => part.trim());
      // Frequently, the second-to-last item before a trailing state in delivery fields represents the city
      return addressParts.length > 1 ? addressParts[addressParts.length - 2] : addressParts[0];
    })();
    const hashedCity = rawCity ? sha256(rawCity) : undefined;

    // Updated parameter assignment payload optimized for premium EMQ scores
    const userData = removeEmptyValues({
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      fbp: body.fbp,
      fbc: body.fbc,
      ph: hashedPhone ? [hashedPhone] : undefined,
      fn: hashedFirstName ? [hashedFirstName] : undefined,
      ln: hashedLastName ? [hashedLastName] : undefined,
      st: hashedState ? [hashedState] : undefined,
      ct: hashedCity ? [hashedCity] : undefined,       // 💡 Successfully reassigned City to its true 'ct' key
      country: [hashedCountry],                        // 💡 Restored correct Meta compliant naming parameter
      // 💡 Elite Match Fix 3: Removed redundant phone value from external_id to protect data optimization rules
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
          user_data: userData, // Tied compiled match identifiers directly into the transmission layout
          custom_data: removeEmptyValues({
            content_name: "ScentMason Diffuser",
            content_type: "product",
            num_items: Number(body.sets) || 1,
            ...body.customData, // Spread safe fallbacks first
            currency: "NGN",    // Hardcoded last so nothing can overwrite it
            value: (() => {
              // Extract raw string from total fallback chain
              const rawValue = String(body.total || body.customData?.value || "0");
              // Strip everything except numbers and decimal points (removes ₦, commas, letters)
              const cleanedValue = rawValue.replace(/[^0-9.]/g, "");
              return cleanedValue ? parseFloat(cleanedValue) : 0;
            })(),
          }),
        },
      ],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
    };

    // --- 2. PREPARE GOOGLE SHEETS ASYNCHRONOUSLY (NON-BLOCKING) ---
    let sheetsPromise: Promise<Response | null> = Promise.resolve(null);
    if (googleSheetsUrl) {
      const sheetsPayload = {
        eventId: body.eventId, 
        name: body.name || "",
        phone: body.phone || "",
        whatsapp: body.whatsapp || "", 
        state: body.state || "",
        city: body.city || rawCity || "", // Keep the spreadsheet synchronized with our structural data additions
        address: body.address || "",
        sets: body.sets || "",
        setPrice: body.setPrice || "",
        oilBottlesOrdered: body.oilBottlesOrdered || 0,
        oilBottlesFree: body.oilBottlesFree || 0,
        oilBottlesTotal: body.oilBottlesTotal || 0,
        oilPrice: body.oilPrice || 0,
        total: body.total || "",
        willAccept: body.willAccept ?? false,
      };

      // We attach a local catch handler to ensure sheet bugs can't crash the CAPI collection cycle
      sheetsPromise = fetch(googleSheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetsPayload),
      }).catch((sheetErr) => {
        console.error("Google Sheets background synchronization failed:", sheetErr);
        return null;
      });
    } else {
      console.warn("Google Sheets synchronization skipped: Missing GOOGLE_SHEETS_WEBHOOK_URL variable.");
    }

    // --- 3. PREPARE META CAPI ASYNCHRONOUSLY (NON-BLOCKING) ---
    const capiPromises = activeAccounts.map(async (account) => {
      const metaUrl = `https://graph.facebook.com/${graphVersion}/${account.id}/events?access_token=${account.token}`;
      const res = await fetch(metaUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventPayload),
      });
      const json = await res.json().catch(() => null);
      return { ok: res.ok, json };
    });

    // =========================================================================
    // 4. UNIFIED CONCURRENCY ENGINE: FIRE ALL CHANNELS SIMULTANEOUSLY
    // =========================================================================
    const [_, ...capiResults] = await Promise.all([
      sheetsPromise,
      ...capiPromises,
    ]);

    // Structural adapters to keep your downstream error handling perfectly intact
    const metaResponse = { ok: capiResults.some((r) => r.ok) };
    const metaResult = capiResults[0]?.json || null;

    // --- 5. ENFORCE ARCHITECTURAL VALIDATION RULES ---
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