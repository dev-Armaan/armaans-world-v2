import type { Metadata } from "next";
import ContactContent from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Armaan Gupta - Software Engineer at University of Waterloo. Reach out via email, GitHub, or LinkedIn for opportunities and collaborations.",
  keywords: [
    "Contact Armaan Gupta",
    "Armaan Gupta Email",
    "Armaan Gupta LinkedIn",
    "Armaan Gupta GitHub",
    "Hire Armaan Gupta",
    "Software Engineer Contact",
    "University of Waterloo Student",
  ],
  openGraph: {
    title: "Contact Armaan Gupta | Software Engineer",
    description:
      "Get in touch with Armaan Gupta for opportunities, collaborations, or just to chat.",
    url: "https://www.armaan.world/contact",
    type: "website",
  },
  twitter: {
    title: "Contact Armaan Gupta | Software Engineer",
    description:
      "Get in touch with Armaan Gupta for opportunities, collaborations, or just to chat.",
  },
  alternates: {
    canonical: "https://www.armaan.world/contact",
  },
};

export default function Contact() {
  return <ContactContent />;
}
