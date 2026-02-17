import type { Metadata } from "next";
import AboutContent from "@/components/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo. Background, skills, and work experience at Ford, Baba, WATonomous, and more.",
  keywords: [
    "Armaan Gupta",
    "About Armaan Gupta",
    "Software Engineer Background",
    "University of Waterloo Student",
    "CS Student",
    "AI Developer",
    "Full Stack Developer Skills",
    "Python",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "About Armaan Gupta | Software Engineer",
    description:
      "Learn about Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo.",
    url: "https://www.armaan.world/about",
    type: "profile",
  },
  twitter: {
    title: "About Armaan Gupta | Software Engineer",
    description:
      "Learn about Armaan Gupta - Software Engineer studying Computer Science & AI at University of Waterloo.",
  },
  alternates: {
    canonical: "https://www.armaan.world/about",
  },
};

export default function About() {
  return <AboutContent />;
}
