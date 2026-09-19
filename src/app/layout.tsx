import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import CartProvider from "@/components/CartProvider";
import LocalBusinessJsonLd from "@/components/LocalBusinessJsonLd";

// Self-hosted (subset latin) supaya `npm run build` tidak butuh internet.
const playfair = localFont({
  src: [
    { path: "./fonts/playfair-400-900.woff2", style: "normal" },
    { path: "./fonts/playfair-400-900-italic.woff2", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "./fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/poppins-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl = "https://kopi-sore-landing-page.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kopi Sore — Artisanal Coffee & Cozy Space di Bekasi",
    template: "%s | Kopi Sore",
  },
  description:
    "Kopi Sore: coffee shop minimalis di Bekasi dengan kopi specialty mulai Rp18.000, Wi-Fi 100 Mbps, dan suasana cozy. Pesan langsung via WhatsApp.",
  keywords: ["coffee shop", "kopi", "Kopi Sore", "Bekasi", "cafe", "WFC", "nugas"],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kopi Sore",
    title: "Kopi Sore — Artisanal Coffee & Cozy Space di Bekasi",
    description:
      "Kopi specialty mulai Rp18.000, Wi-Fi 100 Mbps, ruang hangat untuk kerja & santai. Buka setiap hari 08.00–22.00 WIB.",
    locale: "id_ID",
    images: [
      {
        url: "https://images.pexels.com/photos/38617194/pexels-photo-38617194.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
        width: 1200,
        height: 630,
        alt: "Interior coffee shop Kopi Sore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kopi Sore — Artisanal Coffee & Cozy Space di Bekasi",
    description: "Kopi specialty mulai Rp18.000, Wi-Fi 100 Mbps, buka 08.00–22.00 WIB.",
    images: [
      "https://images.pexels.com/photos/38617194/pexels-photo-38617194.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="font-[family-name:var(--font-poppins)] antialiased">
        <CartProvider>{children}</CartProvider>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
