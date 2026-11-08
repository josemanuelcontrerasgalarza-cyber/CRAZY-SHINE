import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display-face", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans-face", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-mono-face", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Crazy Shine — Detailing automotriz profesional",
    template: "%s — Crazy Shine",
  },
  description: siteConfig.description,
  keywords: [
    "detailing automotriz",
    "lavado de carros",
    "lavado premium",
    "corrección de pintura",
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
    title: "Crazy Shine — No es solo limpiar. Es hacerlo brillar.",
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image", title: "Crazy Shine — Detailing automotriz profesional", description: siteConfig.description },
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
