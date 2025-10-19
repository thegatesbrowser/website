import type { CSSProperties } from "react"

type CSSCustomProperties = CSSProperties & Record<`--${string}`, string | number>

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const badgeTheme: CSSCustomProperties = {
    "--hero-badge-bg": "oklch(0.5499 0.2495 280.17 / 60%)",
  }

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 text-center" style={badgeTheme}>
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight sm:text-balance text-pretty">
              <span className="inline-block rounded-md px-3 py-0" style={{ backgroundColor: "var(--hero-badge-bg)" }}>
                Launch
              </span>{' '}
              your Godot{' '}
              <br className="hidden sm:block" />
              project just in{' '}
              <span className="inline-block rounded-md px-3 py-0" style={{ backgroundColor: "var(--hero-badge-bg)" }}>
                One Click
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed sm:text-balance text-pretty max-w-3xl mx-auto">
              Instantly publish your Godot projects. Share with players, gather feedback, and deploy
              updates instantly across Linux, Windows, and macOS
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://godotengine.org/asset-library/asset/2882" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground w-full sm:w-auto">
                  View in Godot Asset Library
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="https://github.com/thegatesbrowser/thegates-export-plugin" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent w-full sm:w-auto">
                  GitHub Repository
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <p className="text-sm text-foreground/60 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>✓ One-click deployment</span>
              <span className="text-foreground/50">•</span>
              <span>✓ Instant updates</span>
              <span className="text-foreground/50">•</span>
              <span>✓ Native performance</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
