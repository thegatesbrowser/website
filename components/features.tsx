import { Zap, Cpu, Rocket, Users } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "One-Click Publishing",
    description: "Skip the complex deployment process. Publish directly from Godot with a single click",
  },
  {
    icon: Cpu,
    title: "Native Performance",
    description: "Share your game with players on Linux, Windows, and macOS with native performance",
  },
  {
    icon: Rocket,
    title: "Instant Updates",
    description: "Fix bugs and deploy updates instantly. All players get the latest version automatically",
  },
  {
    icon: Users,
    title: "Free Hosting",
    description: "Host your project on TheGates servers for free and reach players faster",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Why TheGates Export?
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Streamline your Godot development workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
