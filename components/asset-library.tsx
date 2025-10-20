import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function AssetLibrary() {
  return (
    <section id="asset-library" className="py-20 sm:py-32 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground sm:text-balance text-pretty">Get the Plugin</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto sm:text-balance text-pretty">
            Download TheGates Export Plugin from the official Godot Asset Library
          </p>

          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://godotengine.org/asset-library/asset/2882" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-primary-foreground w-full sm:w-auto">
                  View in Godot Asset Library
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="https://github.com/thegatesbrowser/thegates-export-plugin" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:bg-muted bg-transparent w-full sm:w-auto"
                >
                  GitHub Repository
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            <p className="text-sm text-foreground/60 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>Free</span>
              <span className="text-foreground/50">•</span>
              <span>Open Source</span>
              <span className="text-foreground/50">•</span>
              <span>Community Driven</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
