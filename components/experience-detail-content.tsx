"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import type { Project, YouTubeBlock } from "@/lib/projects";

const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

const YouTubeEmbed = ({ videoId, title, caption }: YouTubeBlock) => {
  const id = getYouTubeVideoId(videoId);

  return (
    <div className="my-12">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
      {caption && (
        <p className="text-sm text-white/60 text-center mt-2">{caption}</p>
      )}
    </div>
  );
};

interface ExperienceDetailContentProps {
  project: Project;
}

export default function ExperienceDetailContent({
  project,
}: ExperienceDetailContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16">
        <div className="space-y-8">
          <Link
            href="/experiences"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">
              Back to experiences
            </span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            <p className="text-white/70">{project.subtitle}</p>
          </div>

          {project.repoUrl && (
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 space-x-2 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded-md button-animation"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px rgba(var(--accent), 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">view repo</span>
            </motion.a>
          )}

          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-white text-sm uppercase tracking-wider">
                experience info
              </h2>
              <br />
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/60 text-sm uppercase">TYPE</h3>
                  <p>{project.type}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm uppercase">YEAR</h3>
                  <p>{project.year}</p>
                </div>

                {project.demoUrl && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-white/60 text-sm uppercase">{project.title === "arXivisual" ? "WEBSITE" : "DEMO"}</h3>
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white/70 hover:text-gold transition-colors group"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>view link</span>
                    </motion.a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-white/60 text-sm uppercase tracking-wider">
                Contents
              </h2>
              <ul className="space-y-2">
                {project.contents.map((item, index) => (
                  <li key={index} className="text-white/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl text-center md:text-3xl font-bold uppercase">
          description
        </h2>

        <div className="text-white/80 space-y-8 leading-relaxed">
          {project.descriptionBlocks.map((block, index) => {
            if (block.type === "text") {
              return <p key={index}>{block.content}</p>;
            } else if (block.type === "image") {
              return (
                <div key={index} className="my-8 md:my-12 flex justify-center">
                  <div className={block.fullWidth ? "w-full" : "w-full max-w-full"}>
                    <div className="flex justify-center">
                      <Image
                        src={block.src || "/placeholder.svg"}
                        alt={block.alt}
                        width={block.width}
                        height={block.height}
                        className="rounded-lg object-contain max-w-full h-auto"
                      />
                    </div>
                    {block.caption && (
                      <p className="text-sm text-white/60 text-center mt-2">
                        {block.caption}
                      </p>
                    )}
                  </div>
                </div>
              );
            } else if (block.type === "youtube") {
              return <YouTubeEmbed key={index} {...block} />;
            }
            return null;
          })}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10 mt-16">
        © {new Date().getFullYear()} armaan gupta. all rights reserved.
      </footer>
    </motion.div>
  );
}

