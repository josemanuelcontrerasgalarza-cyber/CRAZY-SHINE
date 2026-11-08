import type { Metadata, Viewport } from "next";
import { Big_Shoulders, JetBrains_Mono, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Big_Shoulders({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-display-face", display: "swap", adjustFontFallback: false });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans-face", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Crazy Shine — Premium Automotive Detailing",
    template: "%s — Crazy Shine",
  },
  description: siteConfig.description,
  keywords: [
    "detailing automotriz",
    "car detailing",
    "lavado de carros",
    "corrección de pintura",
    "paint correction",
    "limpieza de interiores",
    "protección de pintura",
    "Crazy Shine",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: "Crazy Shine — Your car. Our obsession.",
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: "Crazy Shine — Premium Automotive Detailing", description: siteConfig.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
