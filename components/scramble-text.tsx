"use client"

import { useEffect, useState } from "react"

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+-/<>"

// Resolves left to right out of random glyphs, like the intro
export default function ScrambleText({ text, duration = 900 }: { text: string; duration?: number }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const settled = Math.floor(progress * text.length)
      setDisplay(
        text
          .split("")
          .map((char, i) => (i < settled || char === " " ? char : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(""),
      )
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, duration])

  return (
    <span aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
