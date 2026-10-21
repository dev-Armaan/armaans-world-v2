"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const skills = [
  { label: "languages", items: ["python", "java", "typescript", "go", "c++", "rust", "c", "c#", "kotlin", "swift", "sql", "javascript"] },
  { label: "frameworks", items: ["react", "next.js", "node.js", "spring boot", "fastapi", "flask", "angular", "three.js"] },
  { label: "infrastructure", items: ["kubernetes", "docker", "terraform", "kafka", "redis", "postgresql", "grpc", "graphql", "aws", "gcp", "azure", "datadog", "linux"] },
  { label: "machine learning", items: ["pytorch", "tensorflow", "scikit-learn", "pandas", "numpy", "opencv"] },
]

// Newest first
const roles = [
  { title: "Software Engineer", company: "shopify", period: "2026 – present", slug: "shopify" },
  { title: "Software Engineer", company: "ford", period: "2026", slug: "ford" },
  { title: "Member of Technical Staff", company: "baba", period: "2025 – 2026", slug: "baba" },
  { title: "Software Engineer", company: "watonomous", period: "2025", slug: "watonomous" },
  { title: "Software Engineer", company: "environment and climate change canada", period: "2025", slug: "govcanada" },
  { title: "Founder & CEO", company: "landingx", period: "2024", slug: "landingx" },
  { title: "Sensei & Camp Leader", company: "code ninjas", period: "2024", slug: "codeninjas" },
  { title: "AI Innovator", company: "tks (the knowledge society)", period: "2023 – 2024", slug: "tks" },
  { title: "Curriculum Developer", company: "hippocampus learning", period: "2022", slug: "hippocampus" },
]

export default function AboutContent() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-12">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold relative inline-block">
          ABOUT
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-gold origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </h1>
        <p className="text-white/90 max-w-2xl text-lg">constantly building my way in and out of trouble</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16 md:gap-16">
        <div className="space-y-16">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">BACKGROUND</h2>
            <p className="text-white/80 leading-relaxed text-pretty">
              i&apos;ve been building software for 5 years, starting with simple web apps and slowly moving into
              machine learning, infrastructure, and systems work. the common thread isn&apos;t a specific domain,
              it&apos;s intentionally throwing myself into places where i&apos;m learning faster than i&apos;m
              comfortable with.
            </p>
            <p className="text-white/80 leading-relaxed text-pretty">
              i gravitate toward fast-paced teams and high-ownership roles: student engineering teams, federal research
              groups, early-stage startups, and my own company. i like being slightly in over my head, taking on
              ambiguous problems, and using that discomfort as fuel to grow, learn as much as i can, and keep leveling
              up how i think, build, and work with others.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold">SKILLS</h2>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {skills.map(({ label, items }) => (
                <div key={label} className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6 py-4">
                  <dt className="text-xs uppercase tracking-[0.18em] text-white/45 sm:pt-1">{label}</dt>
                  <dd className="text-white/85 leading-relaxed">{items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">EXPERIENCE</h2>
          <ol className="space-y-2">
            {roles.map((role, index) => {
              const body = (
                <>
                  <div className="text-white/50 text-sm tabular-nums">{role.period}</div>
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    {role.title}
                    {role.slug && (
                      <ArrowUpRight className="h-4 w-4 text-white/0 transition-all duration-200 group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    )}
                  </h3>
                  <p className="text-white/75">{role.company}</p>
                </>
              )
              const className =
                "group block space-y-1 border-l-2 pl-4 py-2 transition-colors duration-200 " +
                (index === 0 ? "border-gold" : "border-white/20")
              return (
                <motion.li
                  key={`${role.company}-${role.period}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + 0.05 * index, duration: 0.4 }}
                >
                  {role.slug ? (
                    <Link href={`/${role.slug}`} className={`${className} hover:border-gold`}>
                      {body}
                    </Link>
                  ) : (
                    <div className={className}>{body}</div>
                  )}
                </motion.li>
              )
            })}
          </ol>
        </section>
      </div>
    </motion.div>
  )
}
