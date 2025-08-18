"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const projects = [
    {
      title: "Software Engineer @ WATonomous",
      description: "[internship] worked on cloud computing and infra",
      tags: [],
      image: "/wato.png",
      link: "/experiences/watonomous",
      year: 2025,
    },
    {
      title: "Software Engineer @ environment canada",
      description:
        "[internship] worked on climate reanalysis models, and visualization tools",
      tags: [],
      image: "/gov.png",
      link: "/experiences/govcanada",
      year: 2025,
    },
    {
      title: "ASD Prediction Model",
      description:
        "[project] machine learning model that achieved 93% accuracy in diagnosing autism spectrum disorder (asd), outperforming professional teams",
      tags: ["pandas", "sklearn", "numpy", "matplotlib", "python"],
      image: "/asd2.png",
      link: "/experiences/asd",
      year: 2025,
    },
    {
      title: "Real-Time Traffic Analysis",
      description:
        "[project] cnn model that tracks vehicles & estimates speed amongst other metrics for real-time traffic analysis",
      tags: ["opencv", "ultralytics", "numpy", "supervision", "python"],
      image: "/vtracker.png",
      link: "/experiences/traffic",
      year: 2025,
    },
    {
      title: "PrepPal",
      description:
        "[project] ai-powered interview prep assistant with real-time feedback, boosting user readiness by 40% and gaining 100+ users in two weeks",
      tags: ["sql", "react", "flask", "gcp", "mongodb"],
      image: "/preppal.png",
      link: "/experiences/preppal",
      year: 2025,
    },
    {
      title: "Armaan's World [v2]",
      description:
        "[project] second iteration of my personal website, featuring a new design and improved performance",
      tags: ["react", "next.js", "typescript", "tailwind", "vercel"],
      image: "/aworld.png",
      link: "/experiences/v2world",
      year: 2025,
    },
    {
      title: "FOUNDER @ LANDINGX",
      description: "[job] developed, optimized & shipped responsive web apps using modern frameworks for clients",
      tags: ["npm", "aws", "react", "next.js", "typescript"],
      image: "/landingx.png",
      link: "/experiences/landingx",
      year: 2024,
    },
    {
      title: "sensai & camp leader @ code ninjas",
      description: "[job] developed an interactive lua-based curriculum in Roblox Studio",
      tags: ["lua", "scripting apis", "edtech", "game development"],
      image: "/cninjas.png",
      link: "/experiences/codeninjas",
      year: 2024,
    },
    {
      title: "Armaan's World [v1]",
      description: "[project] first iteration of my personal website, complete with 3d models and hosted on aws",
      tags: ["3d modelling", "aws", "react", "next.js", "tailwind"],
      image: "/v1aworld.png",
      link: "/experiences/v1world",
      year: 2024,
    },
    {
      title: "AI INNOVATOR @ TKS",
      description: "[program] optimized NLP and CV models + personally consulted mastercard foundation & cibc execs on separate occasions",
      tags: ["neural networks", "nlp", "mobile app development", "git"],
      image: "/tks.png",
      link: "/experiences/tks",
      year: 2023,
    },
    {
      title: "cirriculum dev @ hippocampus",
      description: "[job] developed programming cirriculum for students in grades 1-8",
      tags: ["scratch", "python", "ms office", "google suite"],
      image: "/hcampus2.jpg",
      link: "/experiences/hippocampus",
      year: 2022,
    },
  ]

  // Group projects by year
  const projectsByYear = projects.reduce(
    (acc, project) => {
      const year = project.year
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(project)
      return acc
    },
    {} as Record<number, typeof projects>,
  )

  // Sort years in descending order
  const years = Object.keys(projectsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-12">
      <div className="space-y-4">
        <div className="flex justify-center w-full">
          <motion.h1
            className="text-4xl font-bold relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Experiences
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </motion.h1>
        </div>
        <p className="text-white max-w-2xl mx-auto text-center">
          a selection of internships + projects + programs i've done
        </p>
      </div>

      <div className="space-y-16">
        {years.map((year) => (
          <div key={year} className="space-y-8">
            <div className="flex justify-start w-full">
              <motion.h2
                className="text-2xl font-bold relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {year}
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsByYear[year].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={project.link} className="block">
                    <div className="border border-white/10 rounded-lg overflow-hidden h-full transition-colors hover:bg-white/5">
                      <div className="relative aspect-video">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-medium">{project.title}</h2>
                          <motion.div
                            animate={{
                              rotate: hoveredIndex === index ? 45 : 0,
                            }}
                            transition={{ duration: 0.1 }}
                          >
                            <ArrowUpRight className="h-5 w-5 text-white/60" />
                          </motion.div>
                        </div>
                        <p className="text-white/70 mb-6">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <br /><br /><br />
      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10">
        © {new Date().getFullYear()} armaan gupta. all rights reserved.
      </footer>
    </motion.div>
  )
}