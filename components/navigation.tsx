"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState(pathname)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      checkIfMobile()

      window.addEventListener("resize", checkIfMobile)

      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map(({ path, label }) => (
            <motion.div key={path} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={path}
                className="relative py-1.5 px-3 text-sm tracking-wider font-space-grotesk rounded-md transition-all duration-200"
                onMouseEnter={() => setHoveredPath(path)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                <span
                  className={`relative z-10 gold-highlight ${
                    pathname === path ? "text-white font-semibold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {label}
                </span>

                {hoveredPath === path && (
                  <motion.div
                    className="absolute inset-0 bg-gold/10 rounded-md -z-10"
                    layoutId="navbar-highlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {pathname === path && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gold w-full"
                    layoutId="navbar-underline"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile navigation dropdown */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              {links.map(({ path, label }, index) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="w-4/5"
                >
                  <Link
                    href={path}
                    className={`relative py-3 px-4 w-full flex justify-center items-center text-center text-sm tracking-wider font-space-grotesk rounded-md ${
                      pathname === path
                        ? "bg-gold/20 text-white"
                        : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                    } transition-all duration-200`}
                  >
                    <span className="relative z-10 gold-highlight font-medium">{label}</span>

                    {pathname === path && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gold w-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

