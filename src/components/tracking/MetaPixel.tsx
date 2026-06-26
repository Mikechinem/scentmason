"use client";

import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

// 1. Gather all pixel IDs dynamically.
// We keep your old variable as a fallback so nothing breaks if it's still named that way!
const pixelIds = [
  process.env.NEXT_PUBLIC_META_PIXEL_ID_1 || process.env.NEXT_PUBLIC_META_PIXEL_ID,
  process.env.NEXT_PUBLIC_META_PIXEL_ID_2,
  process.env.NEXT_PUBLIC_META_PIXEL_ID_3,
].filter(Boolean) as string[];

export default function MetaPixel() {
  // If no environment variables are defined, render nothing
  if (pixelIds.length === 0) return null;

  // 2. Generate the config lines dynamically for each pixel ID
  const initScripts = pixelIds
    .map(
      (id) => `
        fbq('set', 'autoConfig', 'false', '${id}');
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

      {/* 3. Render noscript fallback images for every active pixel ID */}
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