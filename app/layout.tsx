import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/navigation";
import SiteFooter from "@/components/site-footer";
import CommandMenu from "@/components/command-menu";
import MotionProvider from "@/components/motion-provider";
import { Analytics } from "@vercel/analytics/react";
import { getExperiences } from "@/lib/projects";

// Self-hosted so builds never depend on fetching from Google Fonts
const spaceGrotesk = localFont({
  src: "../assets/fonts/space-grotesk-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-space-grotesk",
});

const dmSans = localFont({
  src: [
    { path: "../assets/fonts/dm-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/dm-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.armaan.world"),
  title: {
    default: "Armaan Gupta | University of Waterloo Engineer",
    template: "%s | Armaan Gupta",
  },
  description:
    "Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo. Software engineer at Shopify, previously at Ford, Baba, and WATonomous.",
  keywords: [
    "Armaan Gupta",
    "Armaan",
    "Gupta",
    "Software Engineer",
    "AI Developer",
    "University of Waterloo",
    "UWaterloo",
    "Waterloo Intern",
    "Waterloo Co-op",
    "Shopify",
    "Computer Science",
    "Machine Learning",
    "Full Stack Developer",
    "Ford",
    "WATonomous",
    "Baba",
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
      "Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo. Software engineer at Shopify, previously at Ford, Baba, and WATonomous.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Armaan Gupta | Software Engineer & AI Developer",
    description:
      "Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo.",
    creator: "@armaangupt0",
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
      name: "Shopify",
      url: "https://www.shopify.com",
    },
    {
      "@type": "Organization",
      name: "Ford Motor Company",
      url: "https://www.ford.com",
    },
    {
      "@type": "Organization",
      name: "Baba",
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
    "https://x.com/armaangupt0",
  ],
};

// Runs before first paint so returning visitors never see a flash of the intro
const introScript = `try{if(sessionStorage.getItem("hasVisited")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-intro-seen","")}catch(e){document.documentElement.setAttribute("data-intro-seen","")}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`.intro-overlay{display:none}[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-dm-sans bg-black text-white antialiased`}>
        <MotionProvider>
          <div className="min-h-screen max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col">
            <Navigation />
            <main className="pt-24 flex-1">{children}</main>
            <SiteFooter />
          </div>
          <CommandMenu
            experiences={getExperiences().map(({ slug, title, shortTitle, year, type }) => ({
              slug,
              title: shortTitle ?? title,
              year,
              type,
            }))}
          />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}