import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "ScentMason fulfilment request route is active.",
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  return NextResponse.json({
    success: true,
    message: "Fulfilment request received.",
    data: body,
  });
}
