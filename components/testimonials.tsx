import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    content:
      "StreamLine has transformed how our team collaborates. We've cut our project timelines by 40% and everyone loves the intuitive interface.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "CEO at StartupHub",
    content:
      "The automation features alone have saved us hundreds of hours every month. It's like having an extra team member working 24/7.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Lead at GlobalTech",
    content:
      "Best investment we've made for our operations. The ROI was immediate, and the customer support team is incredibly responsive.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Loved by Teams Worldwide
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            See what our customers have to say about StreamLine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-foreground/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
