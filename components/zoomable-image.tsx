"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

type ZoomableImageProps = {
  src: string
  alt: string
  width: number
  height: number
}

// Click a write-up image to see it full screen; click anywhere or press Esc to close
export default function ZoomableImage({ src, alt, width, height }: ZoomableImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button type="button" className="block w-full cursor-zoom-in rounded-lg" aria-label={`Enlarge image: ${alt}`}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 768px) 768px, 100vw"
            className="rounded-lg w-full h-auto"
          />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          aria-describedby={undefined}
          onClick={() => setOpen(false)}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain rounded-md"
          />
          <Dialog.Close
            className="absolute top-4 right-4 md:top-6 md:right-6 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
