"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

export type ExperienceCard = {
  slug: string
  title: string
  summary: string
  tags: string[]
  type: string
  year: number
  image: string
  imageFit: "cover" | "contain"
}

export default function ExperiencesContent({ experiences }: { experiences: ExperienceCard[] }) {
  // Group by year, newest first, keeping the curated order within each year
  const years = Array.from(new Set(experiences.map((e) => e.year))).sort((a, b) => b - a)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-16">
      <div className="space-y-6">
        <div className="flex justify-center w-full">
          <h1 className="text-4xl font-bold relative inline-block">
            Experiences
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </h1>
        </div>
        <p className="text-white/80 max-w-2xl mx-auto text-center">
          a selection of internships, projects, and programs i&apos;ve done
        </p>
      </div>

      <div className="space-y-20">
        {years.map((year) => (
          <section key={year} className="space-y-8" aria-labelledby={`year-${year}`}>
            <div className="flex items-center gap-4">
              <h2 id={`year-${year}`} className="text-sm font-bold text-gold tracking-[0.2em]">
                {year}
              </h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {experiences
                .filter((e) => e.year === year)
                .map((project, index) => (
                  <motion.div
                    key={project.slug}
                    data-reveal
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/${project.slug}`}
                      className="group flex flex-col h-full border border-white/10 rounded-lg overflow-hidden transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.03]"
                    >
                      <div className="relative aspect-video overflow-hidden border-b border-white/10">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className={`${project.imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <div className="text-xs uppercase tracking-[0.18em] text-white/40 mb-2">{project.type}</div>
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="text-xl font-medium">{project.title}</h3>
                          <ArrowUpRight className="h-5 w-5 shrink-0 text-white/50 transition-all duration-200 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-white/70 leading-relaxed text-pretty mb-6">{project.summary}</p>
                        <ul className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies">
                          {project.tags.map((tag) => (
                            <li key={tag} className="text-xs px-2.5 py-1 border border-white/10 rounded-full text-white/55">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  )
}
