import { NextRequest, NextResponse } from "next/server";

import {
  cleanString,
  normalizePhone,
  removeEmptyValues,
} from "@/lib/tracking/normalize";

import type {
  AttributionData,
  BrowserIdentifiers,
} from "@/lib/tracking/types";

export const runtime = "nodejs";

type NewPricePurchasePayload = {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  referrer?: string;

  phone?: string;
  name?: string;
  whatsapp?: string;
  state?: string;
  city?: string;
  address?: string;

  sets?: string | number;
  setPrice?: number;

  oilBottlesOrdered?: number;
  oilBottlesFree?: number;
  oilBottlesTotal?: number;
  oilPrice?: number;

  total?: number;
  willAccept?: boolean;

  attribution?: AttributionData;
  browserIdentifiers?: BrowserIdentifiers;

  fbp?: string;
  fbc?: string;
  ttp?: string;
  ttclid?: string;
};

type MetaAccount = {
  pixelId: string;
  accessToken: string;
};

function getMetaAccounts(): MetaAccount[] {
  const accounts: MetaAccount[] = [];

  for (let i = 1; i <= 3; i++) {
    const pixelId = cleanString(
      process.env[`NEXT_PUBLIC_META_PIXEL_ID_${i}`]
    );

    const accessToken = cleanString(
      process.env[`META_ACCESS_TOKEN_${i}`]
    );

    if (pixelId && accessToken) {
      accounts.push({
        pixelId,
        accessToken,
      });
    }
  }

  /*
   * Fallback to the original single-account configuration.
   */
  if (accounts.length === 0) {
    const fallbackPixelId =
      cleanString(process.env.META_DATASET_ID) ||
      cleanString(process.env.NEXT_PUBLIC_META_PIXEL_ID);

    const fallbackAccessToken =
      cleanString(process.env.META_ACCESS_TOKEN);

    if (fallbackPixelId && fallbackAccessToken) {
      accounts.push({
        pixelId: fallbackPixelId,
        accessToken: fallbackAccessToken,
      });
    }
  }

  return accounts;
}

function normalizeNigeriaPhone(phone: string): string {
  const normalized = normalizePhone(phone);

  if (normalized) {
    return normalized;
  }

  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("234")) {
    return `+${digits}`;
  }

  if (digits.startsWith("0")) {
    return `+234${digits.slice(1)}`;
  }

  return `+234${digits}`;
}

async function hashValue(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();

  const data = new TextEncoder().encode(normalized);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function sendMetaPurchase(
  account: MetaAccount,
  eventId: string,
  eventSourceUrl: string,
  payload: NewPricePurchasePayload,
  request: NextRequest
) {
 const phone = normalizeNigeriaPhone(
  cleanString(payload.phone ?? "") ?? ""
);

  const name = cleanString(payload.name ?? "");
  const state = cleanString(payload.state ?? "");
  const city = cleanString(payload.city ?? "");

  const [
    hashedPhone,
    hashedName,
    hashedState,
    hashedCity,
    hashedCountry,
  ] = await Promise.all([
    phone ? hashValue(phone) : "",
    name ? hashValue(name) : "",
    state ? hashValue(state) : "",
    city ? hashValue(city) : "",
    hashValue("ng"),
  ]);

  const userData: Record<string, unknown> = removeEmptyValues({
    ph: hashedPhone,

    fn: hashedName,

    st: hashedState,

    ct: hashedCity,

    country: hashedCountry,

    client_ip_address:
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined,

    client_user_agent:
      request.headers.get("user-agent") ||
      undefined,

    fbp:
      cleanString(payload.fbp ?? "") ||
      cleanString(payload.browserIdentifiers?.fbp ?? ""),

    fbc:
      cleanString(payload.fbc ?? "") ||
      cleanString(payload.browserIdentifiers?.fbc ?? ""),
  });

  const customData = removeEmptyValues({
    currency: "NGN",

    value: Number(payload.total) || 0,

    content_name: "ScentMason Diffuser",

    content_type: "product",

    content_ids: [
      "scentmason_diffuser",
    ],

    num_items:
      Number(payload.sets) || 1,
  });

  const body = {
    data: [
      {
        event_name: "Purchase",

        event_time:
          Math.floor(Date.now() / 1000),

        event_id: eventId,

        event_source_url:
          eventSourceUrl ||
          "https://www.massonstore.com/comparison/new-price-premium",

        action_source: "website",

        user_data: userData,

        custom_data: customData,
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/v21.0/${account.pixelId}/events?access_token=${encodeURIComponent(
      account.accessToken
    )}`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(body),
    }
  );

  const responseText =
    await response.text();

  let responseJson: any = null;

  try {
    responseJson =
      JSON.parse(responseText);
  } catch {
    responseJson = null;
  }

  if (!response.ok) {
    throw new Error(
      `Meta Purchase failed for pixel ${account.pixelId}: ${responseText}`
    );
  }

  return {
    success: true,

    pixelId:
      account.pixelId,

    eventName:
      "Purchase",

    response:
      responseJson,
  };
}

export async function POST(
  request: NextRequest
) {
  try {
    /*
     * =========================================================
     * WEBHOOK AUTHENTICATION
     * =========================================================
     */

    const configuredSecret =
      cleanString(
        process.env.NEW_PRICE_PURCHASE_WEBHOOK_SECRET
      );

    if (!configuredSecret) {
      console.error(
        "NEW_PRICE_PURCHASE_WEBHOOK_SECRET is not configured."
      );

      return NextResponse.json(
        {
          success: false,

          error:
            "Purchase webhook is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const incomingSecret =
      cleanString(
        request.headers.get(
          "X-ScentMason-Webhook-Secret"
        ) ?? ""
      );

    if (!incomingSecret) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * Timing-safe secret comparison.
     */
    const encoder =
      new TextEncoder();

    const expectedBytes =
      encoder.encode(
        configuredSecret
      );

    const incomingBytes =
      encoder.encode(
        incomingSecret
      );

    if (
      expectedBytes.length !==
      incomingBytes.length
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    let difference = 0;

    for (
      let i = 0;
      i < expectedBytes.length;
      i++
    ) {
      difference |=
        expectedBytes[i] ^
        incomingBytes[i];
    }

    if (difference !== 0) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    /*
     * =========================================================
     * READ PAYLOAD
     * =========================================================
     */

    const payload =
      (await request.json()) as NewPricePurchasePayload;

    /*
     * =========================================================
     * REQUIRED DATA
     * =========================================================
     */

    const eventId =
      cleanString(
        payload.eventId ?? ""
      );

    const phone =
      cleanString(
        payload.phone ?? ""
      );

    const name =
      cleanString(
        payload.name ?? ""
      );

    const total =
      Number(payload.total) || 0;

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Missing eventId.",
        },
        {
          status: 400,
        }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Missing customer phone number.",
        },
        {
          status: 400,
        }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Missing customer name.",
        },
        {
          status: 400,
        }
      );
    }

    if (total <= 0) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Invalid order total.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================================
     * EVENT SOURCE
     * =========================================================
     */

    const eventSourceUrl =
      cleanString(
        payload.eventSourceUrl ?? ""
      ) ||
      "https://www.massonstore.com/comparison/new-price-premium";

    /*
     * =========================================================
     * META ACCOUNTS
     * =========================================================
     */

    const metaAccounts =
      getMetaAccounts();

    if (
      metaAccounts.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "No Meta Pixel credentials are configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * =========================================================
     * SEND PURCHASE
     * =========================================================
     */

    const purchaseResults: any[] =
      [];

    for (
      const account of metaAccounts
    ) {
      const result =
        await sendMetaPurchase(
          account,
          eventId,
          eventSourceUrl,
          payload,
          request
        );

      purchaseResults.push(
        result
      );
    }

    /*
     * =========================================================
     * SUCCESS
     * =========================================================
     */

    return NextResponse.json({
      success: true,

      purchaseRecorded: true,

      eventName:
        "Purchase",

      eventId,

      orderStatus:
        "Paid",

      metaPurchase:
        "success",

      metaPurchaseResults:
        purchaseResults,

      total,

      currency:
        "NGN",
    });
  } catch (error) {
    console.error(
      "NewPrice Purchase route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unexpected purchase tracking error.",
      },
      {
        status: 500,
      }
    );
  }
}