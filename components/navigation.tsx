"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState(pathname)

  const links = [
    { path: "/", label: "HOME" },
    { path: "/experiences", label: "EXPERIENCES" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 py-6 flex justify-between items-center">
        <Link href="/" className="text-lg tracking-wider font-space-grotesk uppercase gold-highlight">
          <span className="sr-only">Home</span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden gold-shine"
          >
            ARMAAN&apos;S WORLD
            <motion.span
              className="absolute bottom-0 left-0 w-full h-[2px] bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            />
          </motion.div>
        </Link>

        <div className="flex items-center space-x-8">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className="relative py-1.5 px-1 text-sm tracking-wider font-space-grotesk"
              onMouseEnter={() => setHoveredPath(path)}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              <span className={`relative z-10 gold-highlight ${pathname === path ? "text-white" : "text-white/60"}`}>
                {label}
              </span>

              {hoveredPath === path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-gold w-full"
                  layoutId="navbar-underline"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

