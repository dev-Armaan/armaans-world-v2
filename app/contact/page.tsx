"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Send, Github, Linkedin, Mail } from "lucide-react"
import emailjs from "emailjs-com"

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

    try {
      console.log("Sending email with EmailJS...")
      await emailjs.send(
        "service_mtvk7f6",
        "template_h7aqgzd", 
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        "MXYvgb2zQcUQGjL4G"
      )

      console.log("✅ Email sent successfully!")
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error("❌ Email sending error:", error)
    } finally {
      setIsSubmitting(false)
    }
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
        <p className="text-white max-w-2xl text-lg">
          Feel free to reach out about opportunities, collaborations, or just to chat.
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
              href="mailto:a585gupt@uwaterloo.ca"
              className="flex items-center space-x-3 text-white/70 hover:text-white transition-all group"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
              <Mail className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              <span>a585gupt@uwaterloo.ca</span>
            </motion.a>

            <motion.a
              href="https://github.com/dev-Armaan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/70 hover:text-white transition-all group"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
              <Github className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              <span>github.com/dev-Armaan</span>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/gupta-armaan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/70 hover:text-white transition-all group"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            >
              <Linkedin className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              <span>linkedin.com/in/gupta-armaan</span>
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-white/70 uppercase tracking-wider font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-white/20 px-4 py-2 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-white/70 uppercase tracking-wider font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-white/20 px-4 py-2 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm text-white/70 uppercase tracking-wider font-bold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-transparent border border-white/20 px-4 py-2 focus:outline-none resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-3 border border-gold text-gold hover:text-black hover:bg-gold transition-all duration-300 disabled:opacity-50"
            >
              <span>{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
              <Send className="h-4 w-4" />
            </motion.button>

            {isSubmitted && (
              <motion.div
                className="text-center text-gold font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p>Message Sent!</p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>

      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10">
        © {new Date().getFullYear()} Armaan Gupta. All rights reserved.
      </footer>
    </motion.div>
  )
}