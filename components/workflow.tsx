"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

type ActiveImage = {
  src: string
  alt: string
  width: number
  height: number
}

export default function Workflow() {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)

  useEffect(() => {
    if (!activeImage) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeImage])

  const previewImage = (image: ActiveImage) => {
    setActiveImage(image)
  }

  const closePreview = () => {
    setActiveImage(null)
  }

  return (
    <section id="workflow" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground sm:text-balance text-pretty">
            From Editor to Live Game
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto sm:text-balance text-pretty">
            See how simple it is to export and publish your project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Step 1: Editor */}
          <div className="space-y-4">
            <div className="relative bg-card border border-border rounded-xl overflow-hidden flex items-center justify-center aspect-video">
              <Image
                src="/export-plugin/assets/workflow-step1.png"
                alt="Godot Editor with TheGates Exporter"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                unoptimized
              />
              <button
                type="button"
                onClick={() =>
                  previewImage({
                    src: "/export-plugin/assets/workflow-step1.png",
                    alt: "Godot Editor with TheGates Exporter",
                    width: 1920,
                    height: 1080,
                  })
                }
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label="Preview Godot Editor with TheGates Exporter"
              >
                <span className="sr-only">Open preview</span>
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">Step 1: Publish from Godot</h3>
              <p className="text-sm text-foreground/60">Open the TheGates Exporter in Godot and click Publish</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center md:hidden">
            <ArrowRight className="w-6 h-6 text-primary rotate-90" />
          </div>

          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2 pointer-events-none">
            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="w-8 h-8 text-primary" />
              <span className="text-xs text-foreground/60 font-medium">Export</span>
            </div>
          </div>

          {/* Step 2: Game */}
          <div className="space-y-4">
            <div className="relative bg-card border border-border rounded-xl overflow-hidden flex items-center justify-center aspect-video">
              <Image
                src="/export-plugin/assets/workflow-step2.png"
                alt="TheGates Game World"
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
                unoptimized
              />
              <button
                type="button"
                onClick={() =>
                  previewImage({
                    src: "/export-plugin/assets/workflow-step2.png",
                    alt: "TheGates Game World",
                    width: 1920,
                    height: 1080,
                  })
                }
                className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                aria-label="Preview TheGates Game World"
              >
                <span className="sr-only">Open preview</span>
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">Step 2: Live on TheGates</h3>
              <p className="text-sm text-foreground/60">Your game is instantly available to players worldwide</p>
            </div>
          </div>
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closePreview}
        >
          <div
            className="relative w-full max-w-[min(90vw,1400px)]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width}
              height={activeImage.height}
              className="w-full h-auto max-h-[95vh] rounded-xl border border-border bg-card"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </section>
  )
}
