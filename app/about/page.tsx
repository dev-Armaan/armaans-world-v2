"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-8">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold relative inline-block">
          ABOUT
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </h1>
        <p className="text-white/90 max-w-2xl text-lg">
          constantly building my way in and out of trouble
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">BACKGROUND</h2>
            <p className="text-white/80 leading-relaxed">
              i've been building software for 5 years, starting with simple web apps and slowly moving into machine
              learning, infrastructure, and systems work. the common thread isn't a specific domain, it's
              intentionally throwing myself into places where i'm learning faster than i&apos;m comfortable with.
            </p>
            <p className="text-white/80 leading-relaxed">
              i gravitate toward fast-paced teams and high-ownership roles: student engineering teams, federal research
              groups, early-stage startups, and my own company. i like being slightly in over my head, taking on
              ambiguous problems, and using that discomfort as fuel to grow, learn as much as i can, and keep leveling
              up how i think, build, and work with others.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">SKILLS</h2>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-white/60 text-sm mb-4 uppercase tracking-wider">LANGUAGES</h3>
                <ul className="space-y-3">
                  {["python", "java", "c++", "c", "c#", "js/ts", "sql", "html/css", "swift"].map((skill, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center"
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-white/40 mr-2"></span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-4 uppercase tracking-wider">FRAMEWORKS</h3>
                <ul className="space-y-3">
                  {["react", "node.js", "next.js", "angular", "flask", "fastapi", "three.js"].map((skill, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center"
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-white/40 mr-2"></span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white/60 text-sm mb-4 uppercase tracking-wider">TOOLS</h3>
                <ul className="space-y-3">
                  {[
                    "git",
                    "aws",
                    "npm",
                    "pandas",
                    "numpy",
                    "mongodb",
                    "rest api",
                    "vite",
                    "gcp",
                    "azure",
                    "tailwind",
                    "linux",
                  ].map((skill, i) => (
                    <motion.li
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center"
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-white/40 mr-2"></span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">EXPERIENCE</h2>
            <div className="space-y-8">
              {[
                {
                  title: "SOFTWARE ENGINEER",
                  company: "ford",
                  period: "2026 (incoming)",
                },
                {
                  title: "PRODUCT SOFTWARE ENGINEER",
                  company: "baba care",
                  period: "2025",
                },
                {
                  title: "Founder & CEO",
                  company: "landingx",
                  period: "2024",
                },
                {
                  title: "Sensai & Camp Leader",
                  company: "code ninjas",
                  period: "2024",
                },
                {
                  title: "AI Innovator",
                  company: "tks (the knowledge society)",
                  period: "2023",
                },
                {
                  title: "Software Engineer",
                  company: "watonomous",
                  period: "2025",
                },
                {
                  title: "Software Engineer",
                  company: "environment and climate change canada",
                  period: "2025",
                },
                {
                  title: "Cirriculum Developer",
                  company: "hippocampus learning",
                  period: "2022",
                },
              ]
                .sort((a, b) => {
                  // Extract year from period (e.g., "2026 (incoming)" -> 2026, "2025" -> 2025)
                  const getYear = (period: string) => {
                    const match = period.match(/\d{4}/)
                    return match ? parseInt(match[0], 10) : 0
                  }
                  return getYear(b.period) - getYear(a.period)
                })
                .map((job, index) => (
                <motion.div
                  key={index}
                  className="space-y-1 border-l-2 border-white/30 pl-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index }}
                >
                  <div className="text-white/60 text-sm">{job.period}</div>
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <p className="text-white/80">{job.company}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10">
        © {new Date().getFullYear()} armaan gupta. all rights reserved.
      </footer>
    </motion.div>
  )
}