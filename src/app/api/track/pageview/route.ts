import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function getClientIp(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim();
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip") || undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (!body.eventId) {
      return NextResponse.json({ success: false, message: "Missing eventId" }, { status: 400 });
    }

    const datasetId = process.env.META_DATASET_ID || process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN || process.env.META_CAPI_ACCESS_TOKEN;
    const graphVersion = process.env.META_GRAPH_API_VERSION || "v25.0";
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    const activeAccounts = [
      { id: process.env.NEXT_PUBLIC_META_PIXEL_ID_1 || datasetId, token: process.env.META_ACCESS_TOKEN_1 || accessToken },
      { id: process.env.NEXT_PUBLIC_META_PIXEL_ID_2, token: process.env.META_ACCESS_TOKEN_2 },
      { id: process.env.NEXT_PUBLIC_META_PIXEL_ID_3, token: process.env.META_ACCESS_TOKEN_3 },
    ].filter(acc => acc.id && acc.token);

    if (activeAccounts.length === 0) {
      return NextResponse.json({ success: false, message: "Missing Meta environment variables." }, { status: 500 });
    }

    const payload = {
      data: [{
        event_name: "PageView",
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId,
        action_source: "website",
        event_source_url: body.eventSourceUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://scentmason.vercel.app",
        user_data: {
          client_ip_address: getClientIp(req),
          client_user_agent: req.headers.get("user-agent") || undefined,
        },
      }],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
    };

    await Promise.all(activeAccounts.map(acc =>
      fetch(`https://graph.facebook.com/${graphVersion}/${acc.id}/events?access_token=${acc.token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => null)
    ));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PageView CAPI error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}