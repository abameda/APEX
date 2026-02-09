import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
