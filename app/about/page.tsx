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
              I've been developing software for over 5 years, with a focus on web technologies and user experiences. My
              journey began with front-end development, which evolved into a passion for building full-stack
              applications that are not only functional but also aesthetically pleasing and intuitive to use.
            </p>
            <p className="text-white/80 leading-relaxed">
              My approach combines technical expertise with a keen eye for design, ensuring that every project I work on
              meets both functional requirements and aesthetic standards.
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
                  title: "SENIOR SOFTWARE ENGINEER",
                  company: "Tech Company",
                  period: "2021 - Present",
                },
                {
                  title: "SOFTWARE ENGINEER",
                  company: "Startup Inc",
                  period: "2018 - 2021",
                },
                {
                  title: "JUNIOR DEVELOPER",
                  company: "Digital Agency",
                  period: "2016 - 2018",
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

