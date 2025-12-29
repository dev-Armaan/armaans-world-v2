import type { Metadata } from "next";
import ExperiencesContent from "@/components/experiences-content";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Explore Armaan Gupta's professional experiences, projects, and internships. Software engineering work at Ford, Baba Care, WATonomous, Environment Canada, and personal projects.",
  keywords: [
    "Armaan Gupta Projects",
    "Armaan Gupta Experience",
    "Armaan Gupta Work",
    "Armaan Gupta Internships",
    "Software Engineering Projects",
    "AI Projects",
    "Machine Learning Projects",
    "Ford Internship",
    "WATonomous",
    "assembl3D",
    "PrepPal",
  ],
  openGraph: {
    title: "Armaan Gupta's Experiences & Projects",
    description:
      "Explore Armaan Gupta's professional experiences, projects, and internships in software engineering and AI.",
    url: "https://www.armaan.world/experiences",
    type: "website",
  },
  twitter: {
    title: "Armaan Gupta's Experiences & Projects",
    description:
      "Explore Armaan Gupta's professional experiences, projects, and internships in software engineering and AI.",
  },
  alternates: {
    canonical: "https://www.armaan.world/experiences",
  },
};

export default function Experiences() {
  return <ExperiencesContent />;
}
