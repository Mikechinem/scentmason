// src/components/tracking/metapixels.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// Gather active pixel IDs
const pixelIds = [
  process.env.NEXT_PUBLIC_META_PIXEL_ID_1 || process.env.NEXT_PUBLIC_META_PIXEL_ID,
  process.env.NEXT_PUBLIC_META_PIXEL_ID_2,
  process.env.NEXT_PUBLIC_META_PIXEL_ID_3,
].filter(Boolean) as string[];

export default function MetaPixel() {
  
  useEffect(() => {
    // DIAGNOSTIC 1: Confirm the component mounted and check what IDs it found
    console.log("⚙️ [Meta Pixel] Component mounted. Active tracking IDs found:", pixelIds);

    if (pixelIds.length === 0) {
      console.warn("⚠️ [Meta Pixel] Tracking aborted: No pixel IDs discovered in environment variables.");
      return;
    }

    const midEngagementTime = 15000;  // 15 seconds
    const highEngagementTime = 30000; // 30 seconds

    // A. Timer for Mid Engagement (15s)
    const midTimer = setTimeout(() => {
      if (window.fbq) {
        // Loop through each initialized pixel to ensure reliable multi-tracking execution
        pixelIds.forEach((id) => {
          window.fbq!("trackSingleCustom", id, "MidEngagementReader", {
            timeSpent: "15s",
            page: window.location.pathname,
          });
        });
        console.log("🎯 [Meta Pixel] Fired 'MidEngagementReader' custom event for all pixels.");
      } else {
        console.error("❌ [Meta Pixel] 15s reached, but 'window.fbq' is completely missing from the window context!");
      }
    }, midEngagementTime);

    // B. Timer for High Engagement (30s)
    const highTimer = setTimeout(() => {
      if (window.fbq) {
        pixelIds.forEach((id) => {
          window.fbq!("trackSingleCustom", id, "HighEngagementReader", {
            timeSpent: "30s",
            page: window.location.pathname,
          });
        });
        console.log("🔥 [Meta Pixel] Fired 'HighEngagementReader' custom event for all pixels.");
      } else {
        console.error("❌ [Meta Pixel] 30s reached, but 'window.fbq' is completely missing from the window context!");
      }
    }, highEngagementTime);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(highTimer);
    };
  }, []);

  if (pixelIds.length === 0) return null;

  // Generate config setup. (Note: autoConfig expects a literal boolean false, not a string 'false')
  const initScripts = pixelIds
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
            fbq('track', 'PageView');
          `,
        }}
      />

      {pixelIds.map((id) => (
        <noscript key={id}>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      ))}
    </>
  );
}