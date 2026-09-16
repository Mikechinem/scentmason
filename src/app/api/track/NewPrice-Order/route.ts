import { NextRequest, NextResponse } from "next/server";

import {
  cleanString,
  normalizePhone,
  removeEmptyValues,
} from "@/lib/tracking/normalize";

import type {
  AttributionData,
  BrowserIdentifiers,
  PremiumOrderData,
} from "@/lib/tracking/types";

export const runtime = "nodejs";

type NewPriceOrderPayload = PremiumOrderData & {
  eventName?: string;
  eventId?: string;
  leadEventId?: string;
  completeRegistrationEventId?: string;
  eventSourceUrl?: string;
  referrer?: string;

  name?: string;
  phone?: string;
  whatsapp?: string;
  state?: string;
  city?: string;
  address?: string;

  sets?: string;
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

  if (accounts.length === 0) {
    const fallbackPixelId =
      cleanString(process.env.META_DATASET_ID) ||
      cleanString(process.env.NEXT_PUBLIC_META_PIXEL_ID);

    const fallbackAccessToken =
      cleanString(process.env.META_ACCESS_TOKEN);

    if (
      fallbackPixelId &&
      fallbackAccessToken
    ) {
      accounts.push({
        pixelId:
          fallbackPixelId,

        accessToken:
          fallbackAccessToken,
      });
    }
  }

  return accounts;
}

function normalizeNigeriaPhone(
  phone: string
): string {
  const normalized =
    normalizePhone(phone);

  if (normalized) {
    return normalized;
  }

  const digits =
    phone.replace(/\D/g, "");

  if (
    digits.startsWith("234")
  ) {
    return `+${digits}`;
  }

  if (
    digits.startsWith("0")
  ) {
    return `+234${digits.slice(1)}`;
  }

  return `+234${digits}`;
}

async function hashValue(
  value: string
): Promise<string> {
  const normalized =
    value.trim().toLowerCase();

  const data =
    new TextEncoder().encode(
      normalized
    );

  const hashBuffer =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  return Array.from(
    new Uint8Array(hashBuffer)
  )
    .map((byte) =>
      byte
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
}

async function sendMetaStandardEvent(
  account: MetaAccount,
  eventName:
    | "Lead"
    | "CompleteRegistration",
  eventId: string,
  eventSourceUrl: string,
  payload: NewPriceOrderPayload,
  request: NextRequest
) {
  const phone = normalizeNigeriaPhone(
  cleanString(payload.phone ?? "") ?? ""
);

  const name =
    cleanString(
      payload.name ?? ""
    );

  const state =
    cleanString(
      payload.state ?? ""
    );

  const city =
    cleanString(
      payload.city ?? ""
    );

  const [
    hashedPhone,
    hashedName,
    hashedState,
    hashedCity,
    hashedCountry,
  ] = await Promise.all([
    phone
      ? hashValue(phone)
      : "",

    name
      ? hashValue(name)
      : "",

    state
      ? hashValue(state)
      : "",

    city
      ? hashValue(city)
      : "",

    hashValue("ng"),
  ]);

  const userData: Record<
    string,
    unknown
  > = removeEmptyValues({
    ph:
      hashedPhone,

    fn:
      hashedName,

    st:
      hashedState,

    ct:
      hashedCity,

    country:
      hashedCountry,

    client_ip_address:
      request.headers
        .get(
          "x-forwarded-for"
        )
        ?.split(",")[0]
        ?.trim() ||
      request.headers.get(
        "x-real-ip"
      ) ||
      undefined,

    client_user_agent:
      request.headers.get(
        "user-agent"
      ) ||
      undefined,

    fbp:
      cleanString(
        payload.fbp ?? ""
      ) ||
      cleanString(
        payload
          .browserIdentifiers
          ?.fbp ?? ""
      ),

    fbc:
      cleanString(
        payload.fbc ?? ""
      ) ||
      cleanString(
        payload
          .browserIdentifiers
          ?.fbc ?? ""
      ),
  });

  const customData =
    removeEmptyValues({
      currency:
        "NGN",

      value:
        Number(
          payload.total
        ) || 0,

      content_name:
        "ScentMason Diffuser",

      content_type:
        "product",

      content_ids: [
        "scentmason_diffuser",
      ],

      num_items:
        Number(
          payload.sets
        ) || 1,
    });

  const body = {
    data: [
      {
        event_name:
          eventName,

        event_time:
          Math.floor(
            Date.now() / 1000
          ),

        event_id:
          eventId,

        event_source_url:
          eventSourceUrl ||
          "https://www.massonstore.com/comparison/new-price-premium",

        action_source:
          "website",

        user_data:
          userData,

        custom_data:
          customData,
      },
    ],
  };

  const response =
    await fetch(
      `https://graph.facebook.com/v21.0/${account.pixelId}/events?access_token=${encodeURIComponent(
        account.accessToken
      )}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          body
        ),
      }
    );

  const responseText =
    await response.text();

  let responseJson: any =
    null;

  try {
    responseJson =
      JSON.parse(
        responseText
      );
  } catch {
    responseJson =
      null;
  }

  if (!response.ok) {
    throw new Error(
      `Meta ${eventName} failed for pixel ${account.pixelId}: ${responseText}`
    );
  }

  return {
    success: true,

    pixelId:
      account.pixelId,

    eventName,

    response:
      responseJson,
  };
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request.json()) as NewPriceOrderPayload;

    /*
     * =========================================================
     * ENVIRONMENT
     * =========================================================
     */

    const googleSheetsUrl =
      cleanString(
        process.env
          .GOOGLE_SHEETS_PREMIUMPAGE_WEBHOOK_URL
      );

    if (!googleSheetsUrl) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Google Sheets webhook is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * =========================================================
     * REQUIRED TRACKING IDS
     * =========================================================
     */

    const eventId =
      cleanString(
        body.eventId ?? ""
      );

    const leadEventId =
      cleanString(
        body.leadEventId ?? ""
      );

    const completeRegistrationEventId =
      cleanString(
        body.completeRegistrationEventId ??
          ""
      );

    if (
      !eventId ||
      !leadEventId ||
      !completeRegistrationEventId
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Missing event IDs required for tracking.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================================
     * REQUIRED CUSTOMER DATA
     * =========================================================
     */

    const name =
      cleanString(
        body.name ?? ""
      );

    const phone =
      cleanString(
        body.phone ?? ""
      );

    const state =
      cleanString(
        body.state ?? ""
      );

    const address =
      cleanString(
        body.address ?? ""
      );

    const sets =
      cleanString(
        body.sets ?? ""
      );

    if (
      !name ||
      !phone ||
      !state ||
      !address ||
      !sets
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "Missing required order information.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * =========================================================
     * NORMALIZED VALUES
     * =========================================================
     */

    const normalizedPhone =
      normalizeNigeriaPhone(
        phone
      );

    const eventSourceUrl =
      cleanString(
        body.eventSourceUrl ?? ""
      ) ||
      "https://www.massonstore.com/comparison/new-price-premium";

    const referrer =
      cleanString(
        body.referrer ?? ""
      );

    const city =
      cleanString(
        body.city ?? ""
      );

    const whatsapp =
      cleanString(
        body.whatsapp ?? ""
      );

    const total =
      Number(body.total) || 0;

    const setPrice =
      Number(body.setPrice) || 0;

    const oilBottlesOrdered =
      Number(
        body.oilBottlesOrdered
      ) || 0;

    const oilBottlesFree =
      Number(
        body.oilBottlesFree
      ) || 0;

    const oilBottlesTotal =
      Number(
        body.oilBottlesTotal
      ) || 0;

    const oilPrice =
      Number(
        body.oilPrice
      ) || 0;

    /*
     * =========================================================
     * REQUEST / BROWSER DATA
     * =========================================================
     */

    const ipAddress =
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() ||
      request.headers.get(
        "x-real-ip"
      ) ||
      "";

    const userAgent =
      request.headers.get(
        "user-agent"
      ) || "";

    const attribution =
      body.attribution ||
      undefined;

    const browserIdentifiers =
      body.browserIdentifiers ||
      undefined;

    /*
     * =========================================================
     * GOOGLE SHEETS PAYLOAD
     * =========================================================
     */

    const sheetsPayload =
      removeEmptyValues({
        eventName:
          cleanString(
            body.eventName ?? ""
          ) ||
          "NewPricePremiumOrder",

        eventId,

        leadEventId,

        completeRegistrationEventId,

        eventSourceUrl,

        referrer,

        name,

        phone:
          normalizedPhone,

        whatsapp,

        state,

        city,

        address,

        sets,

        setPrice,

        oilBottlesOrdered,

        oilBottlesFree,

        oilBottlesTotal,

        oilPrice,

        total,

        willAccept:
          body.willAccept ===
          true,

        attribution,

        browserIdentifiers,

        fbp:
          cleanString(
            body.fbp ?? ""
          ) ||
          cleanString(
            browserIdentifiers
              ?.fbp ?? ""
          ),

        fbc:
          cleanString(
            body.fbc ?? ""
          ) ||
          cleanString(
            browserIdentifiers
              ?.fbc ?? ""
          ),

        ttp:
          cleanString(
            body.ttp ?? ""
          ) ||
          cleanString(
            browserIdentifiers
              ?.ttp ?? ""
          ),

        ttclid:
          cleanString(
            body.ttclid ?? ""
          ) ||
          cleanString(
            browserIdentifiers
              ?.ttclid ?? ""
          ),

        ipAddress,

        userAgent,

        orderStatus:
          "Pending",

        orderSource:
          "NewPricePremium",
      });

    /*
     * =========================================================
     * GOOGLE SHEETS
     * =========================================================
     */

    const sheetsResponse =
      await fetch(
        googleSheetsUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            sheetsPayload
          ),
        }
      );

    const sheetsResponseText =
      await sheetsResponse.text();

    let sheetsResponseJson: any =
      null;

    try {
      sheetsResponseJson =
        JSON.parse(
          sheetsResponseText
        );
    } catch {
      sheetsResponseJson =
        null;
    }

    if (!sheetsResponse.ok) {
      console.error(
        "NewPrice Premium Google Sheets webhook failed:",
        {
          status:
            sheetsResponse.status,

          response:
            sheetsResponseText,
        }
      );

      return NextResponse.json(
        {
          success: false,

          error:
            "Order could not be recorded.",

          googleSheets:
            "failed",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * =========================================================
     * META
     * =========================================================
     */

    const metaAccounts =
      getMetaAccounts();

    const metaLeadResults: any[] =
      [];

    const metaCompleteRegistrationResults: any[] =
      [];

    if (
      metaAccounts.length > 0
    ) {
      for (
        const account of metaAccounts
      ) {
        const leadResult =
          await sendMetaStandardEvent(
            account,
            "Lead",
            leadEventId,
            eventSourceUrl,
            body,
            request
          );

        metaLeadResults.push(
          leadResult
        );
      }

      for (
        const account of metaAccounts
      ) {
        const completeRegistrationResult =
          await sendMetaStandardEvent(
            account,
            "CompleteRegistration",
            completeRegistrationEventId,
            eventSourceUrl,
            body,
            request
          );

        metaCompleteRegistrationResults.push(
          completeRegistrationResult
        );
      }
    }

    /*
     * =========================================================
     * SUCCESS
     * =========================================================
     *
     * Purchase is NOT fired here.
     *
     * Purchase belongs to:
     *
     * /api/track/NewPrice-purchase
     *
     * after the sales team confirms the order.
     */

    return NextResponse.json({
      success: true,

      orderCaptured:
        true,

      orderRecorded:
        true,

      orderStatus:
        "Pending",

      googleSheets:
        "success",

      googleSheetsResponse:
        sheetsResponseJson,

      metaPurchase:
        "not_fired",

      metaLead:
        metaAccounts.length > 0
          ? "success"
          : "not_configured",

      metaCompleteRegistration:
        metaAccounts.length > 0
          ? "success"
          : "not_configured",

      eventId,

      leadEventId,

      completeRegistrationEventId,

      metaLeadResults,

      metaCompleteRegistrationResults,
    });
  } catch (error) {
    console.error(
      "NewPrice Premium order route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unexpected order tracking error.",
      },
      {
        status: 500,
      }
    );
  }
}