import { ArrowRight } from "lucide-react"

export default function Workflow() {
  return (
    <section id="workflow" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            From Editor to Live Game
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            See how simple it is to export and publish your project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          {/* Step 1: Editor */}
          <div className="space-y-4">
            <div className="relative bg-card border border-border rounded-xl overflow-hidden flex items-center justify-center aspect-video">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-23QuHW6N3wvWxB4hIvMGMnlCistDwY.png"
                alt="Godot Editor with TheGates Exporter"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">Step 1: Open Exporter</h3>
              <p className="text-sm text-foreground/60">Access the TheGates Exporter panel in your Godot editor</p>
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
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Y30wpccKgNVUDFeUhCFgSwQhmjQQU1.png"
                alt="TheGates Game World"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2">Step 2: Live on TheGates</h3>
              <p className="text-sm text-foreground/60">Your game is instantly available to players worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
