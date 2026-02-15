"use client"

import { useTranslations } from "next-intl"
import { Star, Quote } from "lucide-react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface Testimonial {
  slug: string
  name: string
  quote: string
  position: string
  rating: number | null
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const t = useTranslations()
  const titleAnimation = useScrollAnimation({ animationType: "fade-up" })
  const cardsAnimation = useScrollAnimation({ animationType: "zoom-in", delay: 300 })

  return (
    // Background is dark (bg-primary)
    <section id="testimonials" className="py-20 px-4 bg-section-dark"> {/* Use the site's dark background color */}
      <div className="max-w-7xl mx-auto">
        <div ref={titleAnimation.ref} className={`text-center mb-16 ${titleAnimation.animationClasses}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">{t("testimonials.title")}</h2>
          {/* Subtitle color changed to light gray for contrast */}
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>

        <div ref={cardsAnimation.ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${cardsAnimation.animationClasses}`}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.slug}
              // KEY CHANGE 1: Card Styling - Brighter background, stronger shadow, subtle hover lift, flex column to push footer down
              className="relative bg-white rounded-xl p-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] border-t-4 border-primary flex flex-col h-full"
            >

              {/* Decorative Element / Floating Icon */}
              <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10" />

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  // KEY CHANGE 2: Star Color - Use the site's primary color for contrast
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote Text - Made larger and bolder for prominence */}
              <p className="text-xl font-semibold text-foreground mb-6 leading-snug italic grow">
                {testimonial.quote}
              </p>

              {/* Separator Line - Always at bottom */}
              <div className="border-t border-gray-100 pt-6 mt-auto">
                {/* Name and Position */}
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.position}</p> {/* Position in primary color */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}