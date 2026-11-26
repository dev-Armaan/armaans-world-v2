"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import ZoomableImage from "@/components/zoomable-image";
import type { ContentBlock, Project, YouTubeBlock } from "@/lib/projects";

// Prose keeps a readable measure; media sits wider, and wider still when it earns it
const PROSE = "mx-auto max-w-[68ch]";
const MEDIA = "mx-auto !my-12";
const CAPTION = "mx-auto mt-3 max-w-[68ch] text-center text-sm leading-relaxed text-white/50 text-pretty";

const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

const YouTubeEmbed = ({ videoId, title, caption }: YouTubeBlock) => {
  const id = getYouTubeVideoId(videoId);

  return (
    <figure className={`${MEDIA} max-w-3xl`}>
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg border border-white/10">
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
        <figcaption className={CAPTION}>{caption}</figcaption>
      )}
    </figure>
  );
};

const Block = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case "text":
      return <p className={PROSE}>{block.content}</p>;
    case "youtube":
      return <YouTubeEmbed {...block} />;
    case "image": {
      const { fullWidth, narrow, caption, ...picture } = block;
      const sizes = fullWidth ? "(min-width: 1024px) 1024px, 100vw" : undefined;
      return (
        <figure className={`${MEDIA} ${fullWidth ? "max-w-5xl" : "max-w-3xl"}`}>
          {narrow ? (
            <>
              <ZoomableImage {...narrow} className="sm:hidden" />
              <ZoomableImage {...picture} sizes={sizes} className="hidden sm:block" />
            </>
          ) : (
            <ZoomableImage {...picture} sizes={sizes} />
          )}
          {caption && <figcaption className={CAPTION}>{caption}</figcaption>}
        </figure>
      );
    }
    case "gallery":
      return (
        <figure className={`${MEDIA} max-w-5xl`}>
          <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
            {block.items.map((picture) => (
              // Growing each picture by its aspect ratio lands them all on one height
              <div
                key={picture.src}
                className="min-w-0 sm:flex-[var(--ratio)_1_0%]"
                style={{ "--ratio": picture.width / picture.height } as CSSProperties}
              >
                <ZoomableImage {...picture} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </div>
          {block.caption && <figcaption className={CAPTION}>{block.caption}</figcaption>}
        </figure>
      );
  }
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
            {project.stat && (
              <div className="col-span-2 space-y-1">
                <dt className="text-xs uppercase tracking-[0.18em] text-white/45">result</dt>
                <dd className="text-white/90">{project.stat}</dd>
              </div>
            )}
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

      <article className="space-y-6 border-t border-white/10 pt-14 md:pt-16 text-white/80 leading-[1.8] text-pretty">
        <h2 className="sr-only">Write-up</h2>
        {project.descriptionBlocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
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
