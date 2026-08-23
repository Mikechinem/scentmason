export type AttributionData = {
  // First-touch attribution
  firstTouch?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;

    fbclid?: string;
    ttclid?: string;
    gclid?: string;
    msclkid?: string;

    landingPage?: string;
    landingPagePath?: string;
    referrer?: string;
    capturedAt?: string;
  };

  // Last-touch / most recent attributable visit
  lastTouch?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;

    fbclid?: string;
    ttclid?: string;
    gclid?: string;
    msclkid?: string;

    landingPage?: string;
    landingPagePath?: string;
    referrer?: string;
    capturedAt?: string;
  };
};

export type BrowserIdentifiers = {
  fbp?: string;
  fbc?: string;
  ttp?: string;
  ttclid?: string;
};

export type TrackingContext = {
  eventId: string;
  eventSourceUrl: string;
  attribution: AttributionData;
  browserIdentifiers: BrowserIdentifiers;
};

export type PremiumOrderData = {
  eventId: string;
  eventSourceUrl: string;

  name: string;
  phone: string;
  whatsapp?: string;

  state: string;
  city?: string;
  address: string;

  sets: string;
  setPrice: number;

  oilBottlesOrdered: number;
  oilBottlesFree: number;
  oilBottlesTotal: number;
  oilPrice: number;

  total: number;
  willAccept: boolean;

  attribution?: AttributionData;
  browserIdentifiers?: BrowserIdentifiers;
};