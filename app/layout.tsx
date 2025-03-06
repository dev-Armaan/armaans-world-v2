import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"

// Load Space Grotesk font for headers (replacing Ki Bold)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
})

// Load DM Sans for body text (replacing PP Neue Montreal)
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Armaan's World",
  description: "Software Engineer Portfolio",
  icons: "/favicon-rbg.png",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-dm-sans bg-black text-white antialiased`}>
        <div className="min-h-screen max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24">
          <Navigation />
          <main className="pt-24 pb-20">{children}</main>
        </div>
      </body>
    </html>
  )
}



import './globals.css'