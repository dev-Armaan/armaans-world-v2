"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import type { Project, YouTubeBlock } from "@/lib/projects";

const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

const YouTubeEmbed = ({ videoId, title, caption }: YouTubeBlock) => {
  const id = getYouTubeVideoId(videoId);

  return (
    <figure className="!my-12">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          loading="lazy"
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
      {caption && (
        <figcaption className="text-sm text-white/50 text-center mt-3">{caption}</figcaption>
      )}
    </figure>
  );
};

type ProjectLink = { slug: string; title: string };

const demoLabel = (url: string) => {
  if (/youtu\.?be/.test(url)) return "watch demo";
  if (url.includes("devpost.com")) return "view on devpost";
  return "visit site";
};

interface ExperienceDetailContentProps {
  project: Project;
  previous: ProjectLink | null;
  next: ProjectLink | null;
}

export default function ExperienceDetailContent({
  project,
  previous,
  next,
}: ExperienceDetailContentProps) {
  const details = [
    { label: "type", value: project.type },
    { label: "year", value: project.year },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        <div className="space-y-10">
          <Link
            href="/experiences"
            className="group inline-flex items-center text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="text-xs uppercase tracking-[0.18em]">all experiences</span>
          </Link>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">{project.title}</h1>
            <p className="text-white/70 text-lg">{project.subtitle}</p>
          </div>

          {(project.repoUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                  <ExternalLink className="h-4 w-4" />
                  {demoLabel(project.demoUrl)}
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white/50 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  {project.repoUrl.includes("github.com") ? "view repo" : "view portfolio"}
                </a>
              )}
            </div>
          )}

          <dl className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            {details.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</dt>
                <dd className="text-white/90">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.18em] text-white/45 font-dm-sans">highlights</h2>
            <ul className="space-y-2.5">
              {project.contents.map((item, index) => (
                <li key={index} className="flex gap-3 text-white/80">
                  <span className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden md:sticky md:top-28">
          <Image
            src={project.image}
            alt={`${project.title}: ${project.subtitle}`}
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-contain"
          />
        </div>
      </div>

      <article className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">description</h2>

        <div className="text-white/80 space-y-6 leading-[1.8] text-pretty">
          {project.descriptionBlocks.map((block, index) => {
            if (block.type === "text") {
              return <p key={index}>{block.content}</p>;
            } else if (block.type === "image") {
              return (
                <figure key={index} className="!my-12">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={block.width}
                    height={block.height}
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="rounded-lg w-full h-auto"
                  />
                  {block.caption && (
                    <figcaption className="text-sm text-white/50 text-center mt-3">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            } else if (block.type === "youtube") {
              return <YouTubeEmbed key={index} {...block} />;
            }
            return null;
          })}
        </div>
      </article>

      <nav
        aria-label="More experiences"
        className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8"
      >
        {previous ? (
          <Link href={`/${previous.slug}`} className="group space-y-2">
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/45">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              previous
            </span>
            <span className="block font-space-grotesk font-bold uppercase tracking-wider text-white/80 transition-colors group-hover:text-white">
              {previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link href={`/${next.slug}`} className="group space-y-2 text-right">
            <span className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-[0.18em] text-white/45">
              next
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
            <span className="block font-space-grotesk font-bold uppercase tracking-wider text-white/80 transition-colors group-hover:text-white">
              {next.title}
            </span>
          </Link>
        )}
      </nav>
    </motion.div>
  );
}
