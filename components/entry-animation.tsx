"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import BinaryGlobe from "@/components/binary-globe"

interface EntryAnimationProps {
  onComplete: () => void
}

const markSeen = () => document.documentElement.setAttribute("data-intro-seen", "")

// Rendered on the server as an overlay on top of the real page, so crawlers and
// returning visitors (hidden by a pre-paint script in the layout) get content immediately
export default function EntryAnimation({ onComplete }: EntryAnimationProps) {
  const [phase, setPhase] = useState<"pending" | "playing" | "leaving" | "done">("pending")
  const [text, setText] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const fullText = "WELCOME TO ARMAAN'S WORLD"
  const onCompleteRef = useRef(onComplete)
  const animationCompleteRef = useRef(false)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-intro-seen")) {
      setPhase("done")
      onCompleteRef.current()
      return
    }
    try {
      sessionStorage.setItem("hasVisited", "true")
    } catch {}
    setPhase("playing")
  }, [])

  useEffect(() => {
    if (phase !== "playing") return
    animationCompleteRef.current = false

    const mobile = window.innerWidth < 768
    setIsMobile(mobile)

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/"
    const letterDuration = mobile ? 80 : 110
    const finalPause = 300
    const totalDuration = fullText.length * letterDuration

    let frame: number | undefined
    let finishTimeout: ReturnType<typeof setTimeout> | undefined

    const finish = () => {
      if (!animationCompleteRef.current) {
        animationCompleteRef.current = true
        setPhase("leaving")
        onCompleteRef.current()
      }
    }

    // Any click or key skips the intro
    window.addEventListener("pointerdown", finish)
    window.addEventListener("keydown", finish)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    // Time-based rather than timer-based, so the intro always takes the same
    // amount of time no matter how much the browser throttles timers
    const start = performance.now()
    const tick = (now: number) => {
      if (animationCompleteRef.current) return
      const elapsed = now - start
      const settled = Math.min(Math.floor(elapsed / letterDuration), fullText.length)

      let scrambledText = fullText.slice(0, settled)
      if (settled < fullText.length) {
        const current = fullText[settled]
        scrambledText += current === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
      }
      setText(scrambledText)

      if (elapsed < totalDuration) {
        frame = requestAnimationFrame(tick)
      } else {
        setText(fullText)
        finishTimeout = setTimeout(finish, finalPause)
      }
    }
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointerdown", finish)
      window.removeEventListener("keydown", finish)
      document.body.style.overflow = previousOverflow
      animationCompleteRef.current = true
      if (frame) cancelAnimationFrame(frame)
      clearTimeout(finishTimeout)
    }
  }, [phase])

  const globeSize = isMobile ? 220 : 320

  if (phase === "done") return null

  return (
    <motion.div
      className="intro-overlay fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: phase === "leaving" ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (phase === "leaving") {
          markSeen()
          setPhase("done")
        }
      }}
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="relative flex items-center justify-center"
          style={{ width: globeSize, height: globeSize }}
        >
          <BinaryGlobe size={globeSize} />
        </div>

        <motion.div
          className="h-9 text-2xl md:text-3xl font-space-grotesk text-gold tracking-wider text-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {text}
        </motion.div>
      </div>
    </motion.div>
  )
}

