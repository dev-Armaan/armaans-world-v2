import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import ScrambleText from "@/components/scramble-text"

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center space-y-8">
      <div className="text-sm text-gold tracking-[0.2em] font-medium">404</div>
      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        <ScrambleText text="UNCHARTED" />
      </h1>
      <p className="text-white/70 text-lg max-w-md">
        this corner of the world hasn&apos;t been built yet.
      </p>
      <div className="flex items-center gap-8 pt-2">
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
        >
          back home
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/experiences"
          className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors"
        >
          see experiences
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
