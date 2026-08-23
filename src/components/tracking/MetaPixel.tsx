// src/components/tracking/MetaPixel.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// ============================================================
// ACTIVE META PIXELS
// ============================================================

const pixelIds = [
  process.env.NEXT_PUBLIC_META_PIXEL_ID_1 ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID,

  process.env.NEXT_PUBLIC_META_PIXEL_ID_2,

  process.env.NEXT_PUBLIC_META_PIXEL_ID_3,
].filter(Boolean) as string[];

// ============================================================
// META TEST EVENT CODE
// ============================================================

const testEventCode =
  process.env.NEXT_PUBLIC_META_TEST_EVENT_CODE;

// ============================================================
// REUSABLE META LEAD TRACKER
// ============================================================
//
// This is intentionally exported so forms/components can use
// the same Meta Pixel implementation.
//
// IMPORTANT:
// - Lead is a browser event.
// - It is NOT the Purchase event.
// - Purchase remains server-side and is triggered only after
//   Payment Status changes from Pending → Paid.
// ============================================================

export function trackMetaLead(
  eventId: string,
  parameters?: Record<string, unknown>
) {
  if (
    typeof window === "undefined"
  ) {
    console.warn(
      "[Meta Pixel] Lead tracking skipped: window unavailable."
    );

    return false;
  }

  if (
    !window.fbq
  ) {
    console.error(
      "[Meta Pixel] Lead tracking failed: fbq is unavailable."
    );

    return false;
  }

  if (
    !eventId
  ) {
    console.error(
      "[Meta Pixel] Lead tracking failed: missing eventId."
    );

    return false;
  }

  /*
   * Use trackSingle so every configured Pixel receives
   * the Lead explicitly.
   *
   * This keeps the multi-Pixel architecture intact.
   */

  pixelIds.forEach(
    (pixelId) => {
      const options =
        testEventCode
          ? {
              eventID: eventId,
              testEventCode,
            }
          : {
              eventID: eventId,
            };

      window.fbq!(
        "trackSingle",
        pixelId,
        "Lead",
        parameters || {},
        options
      );
    }
  );

  console.log(
    "[Meta Pixel] Lead fired.",
    {
      eventId,
      pixelCount:
        pixelIds.length,
      testMode:
        Boolean(testEventCode),
    }
  );

  return true;
}


// ============================================================
// META PIXEL COMPONENT
// ============================================================

export default function MetaPixel() {

  useEffect(() => {

    console.log(
      "⚙️ [Meta Pixel] Component mounted. Active tracking IDs:",
      pixelIds
    );

    if (
      testEventCode
    ) {
      console.log(
        `[Meta Pixel] Active Testing Session! Route Code matched: ${testEventCode}`
      );
    }

    if (
      pixelIds.length === 0
    ) {
      console.warn(
        "⚠️ [Meta Pixel] Tracking aborted: No pixel IDs discovered in environment variables."
      );

      return;
    }

    const midEngagementTime =
      15000;

    const highEngagementTime =
      30000;

    // ========================================================
    // MID ENGAGEMENT — 15 SECONDS
    // ========================================================

    const midTimer =
      setTimeout(
        () => {

          if (
            window.fbq
          ) {

            pixelIds.forEach(
              (id) => {

                const options =
                  testEventCode
                    ? {
                        testEventCode,
                      }
                    : undefined;

                window.fbq!(
                  "trackSingleCustom",
                  id,
                  "MidEngagementReader",
                  {
                    timeSpent:
                      "15s",

                    page:
                      window.location.pathname,
                  },
                  options
                );
              }
            );

            console.log(
              `[Meta Pixel] Fired 'MidEngagementReader'. Production-Safe Mode: ${!testEventCode}`
            );

          } else {

            console.error(
              "❌ [Meta Pixel] 15s reached, but window.fbq is missing."
            );
          }

        },
        midEngagementTime
      );


    // ========================================================
    // HIGH ENGAGEMENT — 30 SECONDS
    // ========================================================

    const highTimer =
      setTimeout(
        () => {

          if (
            window.fbq
          ) {

            pixelIds.forEach(
              (id) => {

                const options =
                  testEventCode
                    ? {
                        testEventCode,
                      }
                    : undefined;

                window.fbq!(
                  "trackSingleCustom",
                  id,
                  "HighEngagementReader",
                  {
                    timeSpent:
                      "30s",

                    page:
                      window.location.pathname,
                  },
                  options
                );
              }
            );

            console.log(
              `[Meta Pixel] Fired 'HighEngagementReader'. Production-Safe Mode: ${!testEventCode}`
            );

          } else {

            console.error(
              "❌ [Meta Pixel] 30s reached, but window.fbq is missing."
            );
          }

        },
        highEngagementTime
      );


    return () => {

      clearTimeout(
        midTimer
      );

      clearTimeout(
        highTimer
      );
    };

  }, []);


  if (
    pixelIds.length === 0
  ) {
    return null;
  }


  // ==========================================================
  // PIXEL INITIALIZATION
  // ==========================================================

  const initScripts =
    pixelIds
      .map(
        (id) => `
          fbq('set', 'autoConfig', false, '${id}');
          fbq('init', '${id}');
        `
      )
      .join("\n");


  return (
    <>
      <Script
        id="meta-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            ${initScripts}

            var pageViewEventId =
              (window.crypto && crypto.randomUUID)
                ? crypto.randomUUID()
                : ('pv_' + Date.now() + '_' + Math.random().toString(16).slice(2));

            console.log(
              '🆔 [Meta Pixel] PageView eventId generated:',
              pageViewEventId
            );

            fbq(
              'track',
              'PageView',
              {},
              {
                eventID:
                  pageViewEventId
              }
            );

            fetch(
              '/api/track/pageview',
              {
                method:
                  'POST',

                keepalive:
                  true,

                headers: {
                  'Content-Type':
                    'application/json'
                },

                body:
                  JSON.stringify({
                    eventId:
                      pageViewEventId,

                    eventSourceUrl:
                      window.location.href
                  })
              }
            )
              .then(
                function(res) {
                  return res.json();
                }
              )
              .then(
                function(data) {
                  console.log(
                    '✅ [Meta Pixel] /api/track/pageview response:',
                    data
                  );
                }
              )
              .catch(
                function(err) {
                  console.error(
                    '❌ [Meta Pixel] /api/track/pageview fetch failed:',
                    err
                  );
                }
              );
          `,
        }}
      />

      {pixelIds.map(
        (id) => (
          <noscript
            key={id}
          >
            <img
              height="1"
              width="1"
              style={{
                display:
                  "none",
              }}
              src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )
      )}
    </>
  );
}