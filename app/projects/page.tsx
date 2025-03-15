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
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management.",
      tags: ["React", "Node.js", "MongoDB", "WebSockets"],
      image: "/placeholder.svg?height=600&width=800",
      link: "/projects/e-commerce",
    },
    {
      title: "AI Content Generator",
      description: "Web application that leverages AI to generate marketing content.",
      tags: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel"],
      image: "/placeholder.svg?height=600&width=800",
      link: "/projects/ai-generator",
    },
    {
      title: "Financial Dashboard",
      description: "Interactive dashboard for visualizing financial data with customizable charts.",
      tags: ["TypeScript", "D3.js", "Express", "PostgreSQL"],
      image: "/placeholder.svg?height=600&width=800",
      link: "/projects/dashboard",
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform mobile application for tracking workouts and nutrition.",
      tags: ["React Native", "Firebase", "Redux", "Expo"],
      image: "/placeholder.svg?height=600&width=800",
      link: "/projects/fitness-app",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="text-white/70 max-w-2xl">
          A selection of projects I've worked on, showcasing my skills and interests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
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
                      transition={{ duration: 0.1 }} // Faster animation
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
      <br />
      <br />
      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10">
        © {new Date().getFullYear()} Armaan Gupta. All rights reserved.
      </footer>
    </motion.div>
  )
}

