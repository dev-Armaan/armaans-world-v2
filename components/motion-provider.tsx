"use client"

import { MotionConfig } from "framer-motion"

// Respect the OS "reduce motion" setting across every framer-motion animation
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
