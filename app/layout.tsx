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
  metadataBase: new URL("https://www.armaan.world"),
  title: {
    default: "Armaan Gupta | Software Engineer & AI Developer",
    template: "%s | Armaan Gupta",
  },
  description:
    "Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo. Building innovative solutions at Ford, Baba Care, and WATonomous.",
  keywords: [
    "Armaan Gupta",
    "Armaan",
    "Gupta",
    "Software Engineer",
    "AI Developer",
    "University of Waterloo",
    "UWaterloo",
    "Computer Science",
    "Machine Learning",
    "Full Stack Developer",
    "Ford",
    "WATonomous",
    "Baba Care",
    "Portfolio",
    "Armaan's World",
  ],
  authors: [{ name: "Armaan Gupta", url: "https://www.armaan.world" }],
  creator: "Armaan Gupta",
  publisher: "Armaan Gupta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon-rbg.png",
    apple: "/favicon-rbg.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.armaan.world",
    siteName: "Armaan Gupta - Portfolio",
    title: "Armaan Gupta | Software Engineer & AI Developer",
    description:
      "Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo. Building innovative solutions at Ford, Baba Care, and WATonomous.",
    images: [
      {
        url: "/favicon-rbg.png",
        width: 1200,
        height: 630,
        alt: "Armaan Gupta - Software Engineer & AI Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Armaan Gupta | Software Engineer & AI Developer",
    description:
      "Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo.",
    images: ["/favicon-rbg.png"],
    creator: "@armaan",
  },
  alternates: {
    canonical: "https://www.armaan.world",
  },
  verification: {
    google: "fnzyrgGSy4C0Bk_zkhCvCTrlz9s4MUSoKUUJKscGN9o",
  },
};

// JSON-LD structured data for Person schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Armaan Gupta",
  url: "https://www.armaan.world",
  image: "https://www.armaan.world/favicon-rbg.png",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer studying Computer Science & AI at University of Waterloo. Building innovative solutions in AI, cloud infrastructure, and full-stack development.",
  worksFor: [
    {
      "@type": "Organization",
      name: "Ford Motor Company",
      url: "https://www.ford.com",
    },
    {
      "@type": "Organization",
      name: "Baba Care",
    },
    {
      "@type": "Organization",
      name: "WATonomous",
      url: "https://watonomous.ca",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Waterloo",
    url: "https://uwaterloo.ca",
  },
  knowsAbout: [
    "Software Engineering",
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
    "Full Stack Development",
    "Python",
    "TypeScript",
    "React",
    "Next.js",
  ],
  sameAs: [
    "https://github.com/dev-Armaan",
    "https://www.linkedin.com/in/gupta-armaan/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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