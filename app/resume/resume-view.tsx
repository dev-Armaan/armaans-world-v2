"use client";

import { motion } from "framer-motion";
import { Download, FileText, ExternalLink } from "lucide-react";

export default function ResumeView() {
  return (
    <>
      {/* Mobile: buttons to open/download (shown below md breakpoint) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-4 md:hidden"
      >
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <FileText className="w-10 h-10 text-gold" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">RESUME</h1>
          <p className="text-white/70 max-w-sm">
            View or download my resume as a PDF
          </p>
        </div>

        <div className="flex flex-col w-full max-w-xs gap-4">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-gold text-black font-medium rounded-lg transition-all duration-300"
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className="w-5 h-5" />
            <span>Open Resume</span>
          </motion.a>

          <motion.a
            href="/api/resume"
            className="flex items-center justify-center gap-3 px-6 py-4 border border-gold text-gold font-medium rounded-lg transition-all duration-300"
            whileTap={{ scale: 0.97 }}
          >
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </motion.a>
        </div>
      </motion.div>

      {/* Desktop: iframe embed with download button (hidden below md) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block space-y-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold relative inline-block">
            RESUME
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </h1>
          <motion.a
            href="/api/resume"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded-md text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </motion.a>
        </div>

        <div className="w-full h-[calc(100vh-12rem)] min-h-[600px] rounded-lg overflow-hidden bg-white/5">
          <iframe
            src="/resume.pdf"
            title="Armaan Gupta - Resume"
            className="w-full h-full border-0"
          />
        </div>
      </motion.div>
    </>
  );
}
