"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Send, Github, Linkedin, Mail } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeInput, setActiveInput] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-16">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold relative inline-block">
          CONTACT
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-gold"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </h1>
        <p className="text-white/70 max-w-2xl text-lg">
          Feel free to reach out for collaborations or just a friendly hello.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gold">GET IN TOUCH</h2>

          <div className="space-y-6">
            <motion.a
              href="mailto:hello@example.com"
              className="flex items-center space-x-3 text-white/70 hover:text-white transition-all group"
              whileHover={{ x: 5 }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Mail className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              <span>hello@example.com</span>
            </motion.a>

            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/70 hover:text-white transition-all group"
              whileHover={{ x: 5 }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Github className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              <span>github.com/username</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/70 hover:text-white transition-all group"
              whileHover={{ x: 5 }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <Linkedin className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              <span>linkedin.com/in/username</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-white/70 uppercase tracking-wider font-ki-bold">
                Name
              </label>
              <motion.div
                className={`relative border ${activeInput === "name" ? "border-gold" : "border-white/20"} transition-colors duration-300`}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  onFocus={() => setActiveInput("name")}
                  onBlur={() => setActiveInput(null)}
                  required
                  className="w-full bg-transparent border-0 px-4 py-2 focus:outline-none"
                />
                {activeInput === "name" && (
                  <motion.span
                    layoutId="form-highlight"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-white/70 uppercase tracking-wider font-ki-bold">
                Email
              </label>
              <motion.div
                className={`relative border ${activeInput === "email" ? "border-gold" : "border-white/20"} transition-colors duration-300`}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setActiveInput("email")}
                  onBlur={() => setActiveInput(null)}
                  required
                  className="w-full bg-transparent border-0 px-4 py-2 focus:outline-none"
                />
                {activeInput === "email" && (
                  <motion.span
                    layoutId="form-highlight"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-white/70 uppercase tracking-wider font-ki-bold">
                Message
              </label>
              <motion.div
                className={`relative border ${activeInput === "message" ? "border-gold" : "border-white/20"} transition-colors duration-300`}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setActiveInput("message")}
                  onBlur={() => setActiveInput(null)}
                  required
                  rows={5}
                  className="w-full bg-transparent border-0 px-4 py-2 focus:outline-none resize-none"
                />
                {activeInput === "message" && (
                  <motion.span
                    layoutId="form-highlight"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="button-animation magnetic-button font-ki-bold flex items-center space-x-2 px-6 py-3 border border-gold text-gold hover:text-black hover:bg-gold transition-all duration-300 disabled:opacity-50 disabled:hover:text-gold disabled:hover:bg-transparent"
              whileHover={{
                boxShadow: "0 0 15px rgba(var(--accent), 0.4)",
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0 0 5px rgba(var(--accent), 0.7)",
              }}
            >
              <span className="uppercase text-sm tracking-wider">{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
              <Send className="h-4 w-4" />
            </motion.button>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold uppercase text-sm tracking-wider font-ki-bold"
              >
                Message sent successfully!
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10">
        © {new Date().getFullYear()} Armaan Gupta. All rights reserved.
      </footer>
    </motion.div>
  )
}

