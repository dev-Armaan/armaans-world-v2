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
    const letterDuration = 100 // 0.100 seconds per letter
    const finalPause = 1000 // 1 second pause at the end

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

      // Interval for scrambling the current letter
      const interval = setInterval(() => {
        iteration++

        // Generate scrambled text
        let scrambledText = ""

        // For each character in the full text
        for (let i = 0; i < fullText.length; i++) {
          // Characters before current index are already revealed
          if (i < currentIndex) {
            scrambledText += fullText[i]
          }
          // Current character being scrambled
          else if (i === currentIndex) {
            // On last iteration, reveal the actual letter
            if (iteration === iterationsPerLetter) {
              scrambledText += fullText[i]
            }
            // Otherwise show a random character (unless it's a space)
            else if (fullText[i] === " ") {
              scrambledText += " "
            } else {
              scrambledText += chars[Math.floor(Math.random() * chars.length)]
            }
          }
          // Characters after current index show spaces if they are spaces, otherwise nothing
          else if (fullText[i] === " ") {
            scrambledText += " "
          } else {
            scrambledText += ""
          }
        }

        setText(scrambledText)

        // When we've completed all iterations for this letter
        if (iteration >= iterationsPerLetter) {
          clearInterval(interval)
          currentIndex++
          // Move to the next letter
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2c5ce3685b849230f1f843d868f74271-Bsu05KuYj7wLSRHsBUzmFuGZPTqa8m.gif"
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

