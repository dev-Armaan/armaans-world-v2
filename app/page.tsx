"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import EntryAnimation from "@/components/entry-animation"

export default function Home() {
  const [showEntryAnimation, setShowEntryAnimation] = useState(true)

  // Check if this is the first visit to the site in this session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited")
    if (hasVisited) {
      setShowEntryAnimation(false)
    } else {
      sessionStorage.setItem("hasVisited", "true")
    }
  }, [])

  const handleAnimationComplete = () => {
    setShowEntryAnimation(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const projects = [
    {
      title: "ASD Prediction Model",
      description: "machine learning model that achieved 93% accuracy in diagnosing autism spectrum disorder (asd), outperforming professional teams",
      image: "/asd.png",
      year: "2025",
      link: "/experiences/asd",
    },
    {
      title: "Real-Time Traffic Analysis",
      description: "cnn model that tracks vehicles & estimates speed amongst other metrics for real-time traffic analysis",
      image: "/vtracker.png",
      year: "2025",
      link: "/experiences/traffic",
    },
    {
      title: "PrepPal",
      description: "ai-powered interview prep assistant with real-time feedback, boosting user readiness by 40% and gaining 100+ users in two weeks",
      image: "/preppal.png",
      year: "2025",
      link: "/experiences/preppal",
    },
    {
      title: "FOUNDER @ LANDINGX",
      description: "developed and optimized responsive web apps using modern frameworks for clients",
      image: "/landingx.png",
      year: "2023-2024",
      link: "/experiences/landingx",
    },
    {
      title: "AI INNOVATOR @ TKS",
      description: "optimized NLP and CV models + personally consulted mastercard foundation & cibc execs on separate occasions",
      image: "/tks.png",
      year: "2022-2023",
      link: "/experiences/tks",
    },
  ]

  if (showEntryAnimation) {
    return <EntryAnimation onComplete={handleAnimationComplete} />
  }

  return (
    <motion.div className="flex flex-col space-y-20" initial="hidden" animate="show" variants={container}>
      <motion.section className="space-y-6" variants={item}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              ARMAAN
              <br />
              <span className="inline-block relative">
                GUPTA
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
              </span>
            </h1>
            <p className="text-base md:text-base font-dm-sans text-white max-w-2xl mt-6">
            ai & software engineer studying  
            <strong> cs + ai @ uwaterloo 👨‍💻</strong>
            <br />
            incoming software dev @ <strong>government of canada 🇨🇦</strong>
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2c5ce3685b849230f1f843d868f74271-Bsu05KuYj7wLSRHsBUzmFuGZPTqa8m.gif"
                alt="Digital Globe Animation"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section variants={item} className="space-y-12">
      <div className="flex justify-center w-full">
        <motion.h2
          className="text-3xl font-bold text-center relative inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          featured works
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.h2>
      </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <Link href={project.link} key={index}>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center project-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="order-2 md:order-1">
                  <div className="space-y-2">
                    <div className="text-gold text-sm font-medium">{project.year}</div>
                    <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
                    <p className="text-white/70">{project.description}</p>
                    <div className="flex items-center space-x-2 text-white/60 group pt-2">
                      <span className="text-sm uppercase tracking-wider">View Experience</span>
                      <motion.div
                        whileHover={{
                          x: 5,
                          y: -5,
                          transition: { duration: 0.1 }, // Faster animation
                        }}
                        whileTap={{
                          scale: 0.9,
                          color: "rgb(var(--accent))",
                          transition: { duration: 0.1 },
                        }}
                      >
                        <ArrowUpRight className="h-4 w-4 transition-all" />
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div className="relative aspect-video md:aspect-[4/3] overflow-hidden order-1 md:order-2 group">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105" // Faster animation
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-black via-gold to-black transition-opacity duration-300"></div>{" "}
                  {/* Faster animation */}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <br />
        <br />
        <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10">
        © {new Date().getFullYear()} Armaan Gupta. All rights reserved.
      </footer>
      </motion.section>
    </motion.div>
  )
}

