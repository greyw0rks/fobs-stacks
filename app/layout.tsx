import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Two self-hosted variable fonts, carried over from the original fobs build:
 * Geist for text, GeistMono for every price, count and address (with
 * tabular-nums). Both expose themselves as CSS variables, so globals.css stays
 * the single place that decides what anything is set in.
 */
const geist = localFont({
  src: "./fonts/Geist.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap"
});

const geistMono = localFont({
  src: "./fonts/GeistMono.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap"
});

export const metadata: Metadata = {
  title: "fobs — a social market",
  description:
    "fobs is a social market. Leave your email to request an invite."
};

export const viewport = {
  themeColor: "#f4f3ef",
  colorScheme: "light"
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
