import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32 lg:py-40">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Export to TheGates in One Click
            </h1>
            <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed text-balance max-w-3xl mx-auto">
              Instantly publish your Godot project to TheGates. Test with real users, gather feedback, and deploy
              updates instantly across Linux, Windows, and macOS.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Download Plugin
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
              View Documentation
            </Button>
          </div>

          <p className="text-sm text-foreground/60">
            ✓ Free and open-source • ✓ One-click deployment • ✓ Real-time updates
          </p>
        </div>
      </div>
    </section>
  )
}
