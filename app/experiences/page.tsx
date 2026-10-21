import type { Metadata } from "next";
import ExperiencesContent from "@/components/experiences-content";
import { getExperiences, getStartYear } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Explore Armaan Gupta's professional experiences, projects, and internships. Software engineering work at Shopify, Ford, Baba, WATonomous, Environment Canada, and personal projects.",
  keywords: [
    "Armaan Gupta Projects",
    "Armaan Gupta Experience",
    "Armaan Gupta Work",
    "Armaan Gupta Internships",
    "Software Engineering Projects",
    "AI Projects",
    "Machine Learning Projects",
    "Shopify",
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
  const experiences = getExperiences().map((p) => ({
    slug: p.slug,
    title: p.shortTitle ?? p.title,
    summary: p.summary,
    tags: p.tags,
    type: p.type,
    year: getStartYear(p),
    image: p.cardImage ?? p.image,
    imageFit: p.imageFit ?? "cover",
  }));

  return <ExperiencesContent experiences={experiences} />;
}
