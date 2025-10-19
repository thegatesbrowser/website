import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams getting started",
    features: ["Up to 5 team members", "5GB storage", "Basic automation", "Email support", "Core features"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For growing teams with advanced needs",
    features: [
      "Up to 25 team members",
      "500GB storage",
      "Advanced automation",
      "Priority support",
      "All Starter features",
      "Custom workflows",
      "API access",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations",
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Custom automation",
      "24/7 phone support",
      "All Professional features",
      "Dedicated account manager",
      "SLA guarantee",
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Choose the perfect plan for your team. Always flexible to scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? "border-primary bg-card ring-2 ring-primary/20 md:scale-105"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-foreground/60 text-sm">{plan.description}</p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-foreground/60">{plan.period}</span>
                  </div>
                </div>

                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border-border hover:bg-muted"
                  }`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  Get Started
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
