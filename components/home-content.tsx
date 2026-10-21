"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import EntryAnimation from "@/components/entry-animation"
import BinaryGlobe from "@/components/binary-globe"
import { socials } from "@/lib/site"

export type FeaturedProject = {
  slug: string
  title: string
  summary: string
  stat: string | null
  year: string
  type: string
  image: string
  imageFit: "cover" | "contain"
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const heroLinks = [
  { label: "github", href: socials.github.href, external: true },
  { label: "linkedin", href: socials.linkedin.href, external: true },
]

export default function HomeContent({ featured }: { featured: FeaturedProject[] }) {
  const [ready, setReady] = useState(false)
  const [globeSize, setGlobeSize] = useState(320)

  useEffect(() => {
    const updateGlobeSize = () => {
      setGlobeSize(window.innerWidth < 768 ? 220 : 320)
    }
    updateGlobeSize()
    window.addEventListener("resize", updateGlobeSize)
    return () => window.removeEventListener("resize", updateGlobeSize)
  }, [])

  return (
    <>
      <EntryAnimation onComplete={() => setReady(true)} />

      <motion.div
        className="flex flex-col space-y-24 md:space-y-28"
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        variants={container}
      >
        <motion.section variants={item} data-reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                ARMAAN
                <br />
                <span className="inline-block relative">
                  GUPTA
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gold origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: ready ? 1 : 0 }}
                    transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </h1>
              <p className="text-base font-dm-sans text-white/90 leading-relaxed max-w-2xl mt-8">
                studying cs + ai @ <strong className="font-medium text-white">uwaterloo</strong>
                <br />
                swe @ <strong className="font-medium text-white">shopify</strong>
                <br />
                looking for <strong className="font-medium text-white">summer 2027</strong> internships
              </p>

              <div className="flex items-center gap-6 mt-8">
                {heroLinks.map(({ label, href, external }) => {
                  const content = (
                    <>
                      {label}
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )
                  const className =
                    "group inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-white/50 hover:text-white transition-colors"
                  return external ? (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <Link key={label} href={href} className={className}>
                      {content}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-[220px] h-[220px] md:w-80 md:h-80 flex items-center justify-center">
                <BinaryGlobe size={globeSize} />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={item} data-reveal className="space-y-16 md:space-y-20">
          <div className="flex justify-center w-full">
            <h2 className="text-3xl font-bold text-center relative inline-block">
              featured works
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gold origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
            </h2>
          </div>

          <div className="space-y-16 md:space-y-24">
            {featured.map((project) => (
              <Link href={`/${project.slug}`} key={project.slug} className="block group">
                <motion.article
                  data-reveal
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center project-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="order-2 md:order-1 space-y-3">
                    <div className="text-sm">
                      <span className="text-gold font-medium">{project.year}</span>
                      <span className="text-white/40"> · {project.type}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                    <p className="text-white/70 leading-relaxed text-pretty max-w-md">{project.summary}</p>
                    {project.stat && (
                      <div className="flex items-center gap-3 text-sm text-white pt-1">
                        <span className="h-px w-4 bg-gold" aria-hidden="true" />
                        {project.stat}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-white/50 group-hover:text-white transition-colors pt-2">
                      <span className="text-xs uppercase tracking-[0.18em]">view experience</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  <div className="relative aspect-video md:aspect-[4/3] overflow-hidden rounded-sm order-1 md:order-2">
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className={`${project.imageFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
                    />
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/experiences"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/50 hover:text-white transition-colors"
            >
              all experiences
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.section>
      </motion.div>
    </>
  )
}
