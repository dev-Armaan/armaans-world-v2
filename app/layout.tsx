import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { Analytics } from "@vercel/analytics/react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Armaan's World",
  description: "Armaan Gupta - AI & Software Engineering Portfolio",
  icons: {
    icon: "/favicon-rbg.png",
  },
  openGraph: {
    title: "Armaan's World",
    description: "Armaan Gupta - AI & Software Engineering Portfolio",
    url: "https://www.armaan.world",
    siteName: "Armaan's World",
    images: [
      {
        url: "/favicon-rbg.jpg",
        width: 1200,
        height: 630,
        alt: "Armaan's World - AI & Software Engineering Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Armaan's World",
    description: "Armaan Gupta - AI & Software Engineering Portfolio",
    images: ["favicon-rbg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-dm-sans bg-black text-white antialiased`}>
        <div className="min-h-screen max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24">
          <Navigation />
          <main className="pt-24 pb-20">{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
