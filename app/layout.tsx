import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const bricolage = localFont({
  src: "./fonts/bricolage.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

const geist = localFont({
  src: "./fonts/geist.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revaliyo | Swap what you don't use, locally",
  description:
    "Revaliyo is a new local app. Swap the things you don't use for things you actually want, and reduce landfill at the same time.",
  applicationName: "Revaliyo",
  openGraph: {
    title: "Is your home full of unused treasures?",
    description:
      "Swap the things you don't use for things you actually want.",
    type: "website",
    locale: "en_GB",
    siteName: "Revaliyo",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eceee9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${bricolage.variable} ${geist.variable}`}>
      <body className="grain">{children}</body>
    </html>
  );
}
