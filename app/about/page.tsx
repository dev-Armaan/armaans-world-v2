"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-16">
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
        <p className="text-white/70 max-w-2xl text-lg">
          I'm a software engineer specializing in building exceptional digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-16">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">BACKGROUND</h2>
            <p className="text-white/80 leading-relaxed">
              i've been building software for 5 years, starting with web development and moving into machine learning. recently, i've been increasingly working on the intersection of ai and humanity's betterment. subsequently, i've built a ml model capable of diagnosing autism correctly 93% of the time, beating industry averages. i've also taken an internship position at eccc (federal agency) to improve environmental prediction models which will help government officials make better ecological decisions in the future.
            </p>
            <p className="text-white/80 leading-relaxed">
              we have one planet, and it's our responsibility to take care of it. i'm passionate about using technology to make the world a better place, and i'm excited to continue doing so in the future.
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
                  {["git","aws", "npm", "pandas", "numpy", "mongodb", "rest api", "vite", "gcp", "azure", "tailwind", "linux"].map((skill, i) => (
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
                  title: "SOFTWARE DEVELOPER",
                  company: "Government of Canada",
                  period: "2025 (incoming)",
                },
                {
                  title: "Founder & CEO",
                  company: "LandingX",
                  period: "2024",
                },
                {
                  title: "Sensai & Camp Leader",
                  company: "Code Ninjas",
                  period: "2024",
                },
                {
                  title: "AI Innovator",
                  company: "TKS (The Knowledge Society)",
                  period: "2023",
                },
                {
                  title: "Cirriculum Developer",
                  company: "Hippocampus Learning",
                  period: "2023",
                },
              ].map((job, index) => (
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
        © {new Date().getFullYear()} Armaan Gupta. All rights reserved.
      </footer>
    </motion.div>
  )
}

