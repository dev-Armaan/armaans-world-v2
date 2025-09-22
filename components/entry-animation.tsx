"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface EntryAnimationProps {
  onComplete: () => void
}

export default function EntryAnimation({ onComplete }: EntryAnimationProps) {
  const [text, setText] = useState("")
  const fullText = "WELCOME TO ARMAAN'S WORLD"
  const animationCompleteRef = useRef(false)

  useEffect(() => {
    // More pronounced scramble effect
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/"
    const letterDuration = 150 // 0.150 seconds per letter
    const finalPause = 500 // 1 second pause at the end

    let currentIndex = 0
    let isComplete = false

    // Function to scramble the current letter
    const scrambleLetter = () => {
      if (currentIndex >= fullText.length) {
        if (!isComplete) {
          isComplete = true
          // Wait 1 second after all letters are revealed
          setTimeout(() => {
            if (!animationCompleteRef.current) {
              animationCompleteRef.current = true
              onComplete()
            }
          }, finalPause)
        }
        return
      }

      // Number of scramble iterations per letter
      const iterationsPerLetter = 15
      let iteration = 0

      const interval = setInterval(() => {
        iteration++

        let scrambledText = ""

        for (let i = 0; i < fullText.length; i++) {
          if (i < currentIndex) {
            scrambledText += fullText[i]
          }
          else if (i === currentIndex) {
            if (iteration === iterationsPerLetter) {
              scrambledText += fullText[i]
            }
            else if (fullText[i] === " ") {
              scrambledText += " "
            } else {
              scrambledText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          else if (fullText[i] === " ") {
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
    }

    // Start the scramble effect
    scrambleLetter()

    // Cleanup function
    return () => {
      animationCompleteRef.current = true
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center space-y-8">
        <div className="relative w-64 h-64">
          <Image
            src="/spinglobe.gif"
            alt="Digital Globe Animation"
            fill
            className="object-contain"
          />
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

