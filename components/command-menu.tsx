"use client"

import { Command } from "cmdk"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUpRight, CornerDownLeft } from "lucide-react"
import { email, pages, socials, OPEN_COMMAND_MENU } from "@/lib/site"

export type CommandMenuExperience = { slug: string; title: string; year: string; type: string }

export default function CommandMenu({ experiences }: { experiences: CommandMenuExperience[] }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener(OPEN_COMMAND_MENU, onOpen)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener(OPEN_COMMAND_MENU, onOpen)
    }
  }, [])

  const go = (path: string) => {
    setOpen(false)
    router.push(path)
  }

  const visit = (href: string) => {
    setOpen(false)
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setOpen(false)
      }, 900)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      loop
      overlayClassName="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
      contentClassName="fixed z-50 left-1/2 top-[18vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-neutral-950 shadow-2xl"
    >
      <DialogTitle className="sr-only">Command menu</DialogTitle>
      <Command.Input
        placeholder="jump to a page, project, or link…"
        className="w-full bg-transparent px-5 py-4 text-[15px] text-white placeholder:text-white/35 outline-none border-b border-white/10"
      />
      <Command.List className="max-h-[50vh] overflow-y-auto overscroll-contain p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-white/40">nothing matches that</Command.Empty>

        <Command.Group heading="pages">
          {pages.map(({ path, label }) => (
            <Command.Item key={path} value={`page ${label}`} onSelect={() => go(path)}>
              <span>{label.toLowerCase()}</span>
              <CornerDownLeft className="cmdk-hint h-3.5 w-3.5" />
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="experiences">
          {experiences.map((e) => (
            <Command.Item key={e.slug} value={`${e.title} ${e.slug}`} keywords={[e.type, e.year]} onSelect={() => go(`/${e.slug}`)}>
              <span className="truncate">{e.title.toLowerCase()}</span>
              <span className="ml-auto shrink-0 pl-4 text-xs text-white/35 tabular-nums">{e.year}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="elsewhere">
          <Command.Item value="copy email address" onSelect={copyEmail}>
            <span>{copied ? "copied to clipboard" : "copy email"}</span>
            <span className="ml-auto pl-4 text-xs text-white/35">{email}</span>
          </Command.Item>
          {Object.values(socials).map((s) => (
            <Command.Item key={s.href} value={`${s.label} ${s.handle}`} onSelect={() => visit(s.href)}>
              <span>{s.label.toLowerCase()}</span>
              <ArrowUpRight className="cmdk-hint h-3.5 w-3.5" />
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
