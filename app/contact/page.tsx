"use client"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"
import BinaryGlobe from "@/components/binary-globe"

export default function Contact() {
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
          feel free to reach out about opportunities, collaborations, or just to chat
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          className="space-y-8 flex flex-col justify-center h-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white/90">GET IN TOUCH</h2>

          <div className="space-y-8 flex flex-col">
            <motion.a
              href="mailto:a585gupt@uwaterloo.ca"
              className="group relative inline-flex items-center space-x-4 text-white hover:text-gold transition-colors duration-300 py-2"
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                <Mail className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-lg">Email</span>
                <span className="text-sm text-white/70 group-hover:text-gold/80 transition-colors duration-300">
                  a585gupt@uwaterloo.ca
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500 ease-out" />
            </motion.a>

            <motion.a
              href="https://github.com/dev-Armaan"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-4 text-white hover:text-gold transition-colors duration-300 py-2"
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                <Github className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-lg">GitHub</span>
                <span className="text-sm text-white/70 group-hover:text-gold/80 transition-colors duration-300">
                  github.com/dev-Armaan
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500 ease-out" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/gupta-armaan/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-4 text-white hover:text-gold transition-colors duration-300 py-2"
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                <Linkedin className="h-5 w-5 text-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-lg">LinkedIn</span>
                <span className="text-sm text-white/70 group-hover:text-gold/80 transition-colors duration-300">
                  linkedin.com/in/gupta-armaan
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500 ease-out" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-lg flex items-center justify-center">
            <BinaryGlobe size={384} />
          </div>
        </motion.div>
        <br />
        <br />
      </div>
      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10">
        © {new Date().getFullYear()} armaan gupta. all rights reserved.
      </footer>
    </motion.div>
  )
}

