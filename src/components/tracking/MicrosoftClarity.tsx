"use client";

import Script from "next/script";

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function MicrosoftClarity() {
  if (!CLARITY_PROJECT_ID) return null;

  return (
    <Script
      src={`https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`}
      strategy="afterInteractive"
    />
  );
}
