"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import BinaryGlobe from "@/components/binary-globe"

interface EntryAnimationProps {
  onComplete: () => void
}

export default function EntryAnimation({ onComplete }: EntryAnimationProps) {
  const [text, setText] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const fullText = "WELCOME TO ARMAAN'S WORLD"
  const onCompleteRef = useRef(onComplete)
  const animationCompleteRef = useRef(false)
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/"
    const letterDuration = mobile ? 80 : 110
    const iterationsPerLetter = mobile ? 8 : 15
    const finalPause = 300

    let currentIndex = 0
    let isComplete = false

    const finish = () => {
      if (!animationCompleteRef.current) {
        animationCompleteRef.current = true
        onCompleteRef.current()
      }
    }

    const scrambleLetter = () => {
      if (animationCompleteRef.current) return

      if (currentIndex >= fullText.length) {
        if (!isComplete) {
          isComplete = true
          const t = setTimeout(finish, finalPause)
          timeoutsRef.current.push(t)
        }
        return
      }

      let iteration = 0

      const interval = setInterval(() => {
        if (animationCompleteRef.current) {
          clearInterval(interval)
          return
        }

        iteration++

        let scrambledText = ""
        for (let i = 0; i < fullText.length; i++) {
          if (i < currentIndex) {
            scrambledText += fullText[i]
          } else if (i === currentIndex) {
            if (iteration === iterationsPerLetter) {
              scrambledText += fullText[i]
            } else if (fullText[i] === " ") {
              scrambledText += " "
            } else {
              scrambledText += chars[Math.floor(Math.random() * chars.length)]
            }
          } else if (fullText[i] === " ") {
            scrambledText += " "
          } else {
            scrambledText += ""
          }
        }

        setText(scrambledText)

        if (iteration >= iterationsPerLetter) {
          clearInterval(interval)
          currentIndex++
          scrambleLetter()
        }
      }, letterDuration / iterationsPerLetter)

      intervalsRef.current.push(interval)
    }

    scrambleLetter()

    const maxDuration = fullText.length * letterDuration + finalPause + 2000
    const safetyTimeout = setTimeout(finish, maxDuration)
    timeoutsRef.current.push(safetyTimeout)

    return () => {
      animationCompleteRef.current = true
      intervalsRef.current.forEach(clearInterval)
      timeoutsRef.current.forEach(clearTimeout)
      intervalsRef.current = []
      timeoutsRef.current = []
    }
  }, [])

  const globeSize = isMobile ? 220 : 320

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="relative flex items-center justify-center"
          style={{ width: globeSize, height: globeSize }}
        >
          <BinaryGlobe size={globeSize} />
        </div>

        <motion.div
          className="text-2xl md:text-3xl font-space-grotesk text-gold tracking-wider"
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

