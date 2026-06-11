"use client";

import Script from "next/script";

const TIKTOK_PIXEL_CODE = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_CODE;
console.log("TikTok Pixel ENV:", TIKTOK_PIXEL_CODE);

export default function TikTokPixel() {
  if (!TIKTOK_PIXEL_CODE) return null;

  return (
    <Script
      id="tiktok-pixel-base"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];

            ttq.methods = [
              "page",
              "track",
              "identify",
              "instances",
              "debug",
              "on",
              "off",
              "once",
              "ready",
              "alias",
              "group",
              "enableCookie",
              "disableCookie",
              "holdConsent",
              "revokeConsent",
              "grantConsent"
            ];

            ttq.setAndDefer = function (target, method) {
              target[method] = function () {
                target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
              };
            };

            for (var i = 0; i < ttq.methods.length; i++) {
              ttq.setAndDefer(ttq, ttq.methods[i]);
            }

            ttq.instance = function (pixelCode) {
              var instance = ttq._i[pixelCode] || [];
              for (var i = 0; i < ttq.methods.length; i++) {
                ttq.setAndDefer(instance, ttq.methods[i]);
              }
              return instance;
            };

            ttq.load = function (pixelCode, options) {
              var scriptUrl = "https://analytics.tiktok.com/i18n/pixel/events.js";

              ttq._i = ttq._i || {};
              ttq._i[pixelCode] = [];
              ttq._i[pixelCode]._u = scriptUrl;

              ttq._t = ttq._t || {};
              ttq._t[pixelCode] = +new Date();

              ttq._o = ttq._o || {};
              ttq._o[pixelCode] = options || {};

              var script = d.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src = scriptUrl + "?sdkid=" + pixelCode + "&lib=" + t;

              var firstScript = d.getElementsByTagName("script")[0];
              firstScript.parentNode.insertBefore(script, firstScript);
            };

            ttq.load("${TIKTOK_PIXEL_CODE}");
            ttq.page();
          }(window, document, "ttq");
        `,
      }}
    />
  );
}