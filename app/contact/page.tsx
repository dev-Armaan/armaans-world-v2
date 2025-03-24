"use client"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react"

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
          <h2 className="text-2xl font-bold text-gold">GET IN TOUCH</h2>

          <div className="space-y-6 flex flex-col">
            <motion.a
              href="mailto:a585gupt@uwaterloo.ca"
              className="flex items-center space-x-3 text-white/80 hover:text-white transition-all group text-lg bg-white/5 hover:bg-white/10 p-4 rounded-lg border border-transparent hover:border-gold/30"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            >
              <div className="bg-gold/20 p-2 rounded-full">
                <Mail className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              </div>
              <span className="flex-1">a585gupt@uwaterloo.ca</span>
              <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </motion.a>

            <motion.a
              href="https://github.com/dev-Armaan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/80 hover:text-white transition-all group text-lg bg-white/5 hover:bg-white/10 p-4 rounded-lg border border-transparent hover:border-gold/30"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            >
              <div className="bg-gold/20 p-2 rounded-full">
                <Github className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              </div>
              <span className="flex-1">github.com/dev-Armaan</span>
              <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/gupta-armaan/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-white/80 hover:text-white transition-all group text-lg bg-white/5 hover:bg-white/10 p-4 rounded-lg border border-transparent hover:border-gold/30"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
            >
              <div className="bg-gold/20 p-2 rounded-full">
                <Linkedin className="h-5 w-5 text-gold group-hover:scale-110 transition-transform" />
              </div>
              <span className="flex-1">linkedin.com/in/gupta-armaan</span>
              <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-lg">
            <img src="/spinglobe.gif" alt="Contact animation" className="w-full h-auto" />
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
