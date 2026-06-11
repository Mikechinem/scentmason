import type { Metadata } from "next";
import "./globals.css";
import { BRAND, SITE } from "@/lib/constants";
import MetaPixel from "@/components/tracking/MetaPixel";
import GoogleAnalytics from "@/components/tracking/GoogleAnalytics";
import TikTokPixel from "@/components/tracking/TikTokPixel";

export const metadata: Metadata = {
  title: `${BRAND.name} | Rechargeable Automatic Fragrance Diffuser`,
  description:
    "Order ScentMason, the rechargeable automatic fragrance diffuser for Nigerian homes that want a warm, hotel-like scent without spraying, drilling, or plugging in.",
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${BRAND.name} | Your Home, Always Smelling Like You Planned It`,
    description:
      "Set it once. Enjoy a warm, elevated home fragrance experience for weeks.",
    url: SITE.url,
    siteName: BRAND.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-NG">
      <body>  
        <MetaPixel />
        <GoogleAnalytics />
        <TikTokPixel />
        {children}
        </body>
    </html>
  );
}
