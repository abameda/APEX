import type { Metadata } from "next";
import { Jost, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "APEX | Premium Shopify Theme for Modern Brands",
  description:
    "The most customizable, feature-rich Shopify theme. Luxury design, lightning-fast performance, and SEO-optimized. Built for brands that want to stand out.",
  keywords: [
    "Shopify theme",
    "premium theme",
    "luxury Shopify",
    "e-commerce theme",
    "customizable theme",
    "SEO Shopify",
  ],
  authors: [{ name: "APEX Themes" }],
  openGraph: {
    title: "APEX | Premium Shopify Theme for Modern Brands",
    description:
      "The most customizable, feature-rich Shopify theme. Built for brands that want to stand out.",
    type: "website",
    locale: "en_US",
    siteName: "APEX Theme",
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX | Premium Shopify Theme",
    description: "The most customizable, feature-rich Shopify theme.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${bodoni.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
