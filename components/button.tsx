"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "gold"
}

export default function Button({ children, onClick, className = "", variant = "default" }: ButtonProps) {
  const getButtonStyles = () => {
    switch (variant) {
      case "gold":
        return "bg-gold text-black hover:bg-gold/90 hover:shadow-[0_0_15px_rgba(var(--accent),0.4)]"
      case "outline":
        return "bg-transparent border border-white/20 text-white hover:border-gold hover:text-gold"
      default:
        return "bg-white/10 hover:bg-white/20 text-white"
    }
  }

  return (
    <motion.button
      className={`button-animation magnetic-button relative inline-flex items-center justify-center px-4 py-2 font-space-grotesk overflow-hidden transition-all duration-300 ${getButtonStyles()} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </motion.button>
  )
}

