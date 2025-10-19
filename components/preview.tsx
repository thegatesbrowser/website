export default function Preview() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">Plugin Preview</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Clean, intuitive interface integrated directly into Godot
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative rounded-xl border border-border overflow-hidden bg-card max-w-md">
            <img
              src="/assets/preview-plugin.png"
              alt="TheGates Exporter Plugin Interface"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
