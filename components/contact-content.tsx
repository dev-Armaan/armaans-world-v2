"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Check, Copy, Github, Linkedin, Mail } from "lucide-react"
import BinaryGlobe from "@/components/binary-globe"
import XIcon from "@/components/icons/x-icon"
import { email, socials } from "@/lib/site"

const channels = [
  { label: "Email", handle: email, href: `mailto:${email}`, Icon: Mail },
  { ...socials.linkedin, Icon: Linkedin },
  { ...socials.github, Icon: Github },
  { ...socials.x, Icon: XIcon },
]

export default function ContactContent() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-16">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold relative inline-block">
          CONTACT
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-gold origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </h1>
        <p className="text-white/90 max-w-2xl text-lg">
          feel free to reach out about opportunities, collaborations, or just to chat
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.ul
          className="space-y-2 max-w-md"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {channels.map(({ label, handle, href, Icon }) => {
            const external = href.startsWith("http")
            return (
              <li key={label} className="flex items-center gap-3">
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative flex flex-1 min-w-0 items-center gap-4 py-3 text-white"
                >
                  <span className="flex items-center justify-center w-12 h-12 shrink-0 rounded-full border border-white/10 transition-colors duration-300 group-hover:border-gold/60">
                    <Icon className="h-5 w-5 text-white/70 transition-colors duration-300 group-hover:text-gold" />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="font-medium text-lg">{label}</span>
                    <span className="text-sm text-white/60 truncate transition-colors duration-300 group-hover:text-white/90">
                      {handle}
                    </span>
                  </span>
                </a>
                {label === "Email" && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 shrink-0 rounded-md px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                    aria-live="polite"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-gold" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "copied" : "copy"}
                  </button>
                )}
              </li>
            )
          })}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hidden md:flex items-center justify-center"
        >
          <BinaryGlobe size={384} />
        </motion.div>
      </div>
    </motion.div>
  )
}
