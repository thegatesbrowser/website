import { Zap, Users, Rocket } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "One-Click Publishing",
    description: "Launch your Godot project to TheGates instantly. No complex setup or configuration needed.",
  },
  {
    icon: Users,
    title: "Native Performance Testing",
    description: "Test your project with users on Linux, Windows, and macOS with native performance.",
  },
  {
    icon: Rocket,
    title: "Instant Updates",
    description: "Deploy bug fixes and new features instantly. All users get updates automatically.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            What This Plugin Does
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Streamline your Godot development workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
