import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Join thousands of teams already using StreamLine to work smarter, not harder. Start your free trial today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
            Schedule a Demo
          </Button>
        </div>

        <p className="text-sm text-foreground/60">
          No credit card required. 14-day free trial. Full access to all features.
        </p>
      </div>
    </section>
  )
}
