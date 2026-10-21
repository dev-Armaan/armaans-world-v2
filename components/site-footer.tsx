"use client"

import Link from "next/link"
import { email, socials, OPEN_COMMAND_MENU } from "@/lib/site"

const links = [
  { label: "github", href: socials.github.href },
  { label: "linkedin", href: socials.linkedin.href },
  { label: "x", href: socials.x.href },
  { label: "email", href: `mailto:${email}` },
]

export default function SiteFooter() {
  return (
    <footer className="mt-32 mb-10 pt-6 border-t border-white/10 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between text-sm text-white/50">
      <span>© {new Date().getFullYear()} armaan gupta</span>

      <div className="flex items-center gap-6">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hover:text-white transition-colors"
          >
            {label}
          </a>
        ))}
        <Link href="/resume" className="hover:text-white transition-colors">
          resume
        </Link>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_MENU))}
          className="hidden md:inline-flex items-center gap-1.5 hover:text-white transition-colors"
          aria-label="Open command menu"
        >
          <kbd className="font-dm-sans text-[11px] leading-none px-1.5 py-1 rounded border border-white/15">⌘K</kbd>
        </button>
      </div>
    </footer>
  )
}
