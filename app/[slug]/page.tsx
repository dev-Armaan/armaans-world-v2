import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectsData, getProjectSlugs, getProject } from "@/lib/projects";
import ExperienceDetailContent from "@/components/experience-detail-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all experience pages
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for each experience page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Experience Not Found",
      description: "The requested experience could not be found.",
    };
  }

  // Get the first text block for description
  const firstTextBlock = project.descriptionBlocks.find(
    (block) => block.type === "text"
  );
  const description =
    firstTextBlock && firstTextBlock.type === "text"
      ? firstTextBlock.content.slice(0, 160) + "..."
      : project.subtitle;

  return {
    title: project.title,
    description: `${project.title} - ${project.subtitle}. ${description}`,
    keywords: [
      "Armaan Gupta",
      project.title,
      project.type,
      project.year,
      ...project.contents,
    ],
    openGraph: {
      title: `${project.title} | Armaan Gupta`,
      description: `${project.subtitle} - ${description}`,
      url: `https://www.armaan.world/${slug}`,
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Armaan Gupta`,
      description: project.subtitle,
      images: [project.image],
    },
    alternates: {
      canonical: `https://www.armaan.world/${slug}`,
    },
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ExperienceDetailContent project={project} />;
}
