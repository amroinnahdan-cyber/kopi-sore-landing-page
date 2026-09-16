import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kopi Sore — Order Coffee Online",
  description:
    "Kopi Sore: coffee shop minimalis dengan kopi premium & suasana cozy. Order online langsung dari website.",
  keywords: ["coffee shop", "kopi", "Kopi Sore", "Bekasi", "cafe"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${poppins.variable} ${dancing.variable}`}
    >
      <body className="font-[family-name:var(--font-poppins)] antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
