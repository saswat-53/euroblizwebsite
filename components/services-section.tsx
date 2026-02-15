"use client"

import { useTranslations } from "next-intl"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

const ServiceIcon = ({ icon }: { icon: string }) => (
    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-white transition-all duration-300 group-hover:scale-110 shadow-md">
        <span className="text-2xl">{icon}</span>
    </div>
);

export function ServicesSection() {
  const t = useTranslations()
  const titleAnimation = useScrollAnimation({ animationType: "fade-down" })
  const cardsAnimation = useScrollAnimation({ animationType: "fade-up", delay: 200 })

  const services = [
    { key: "web", icon: "🌐", taglineKey: "services.web.tagline" },
    { key: "hybrid", icon: "📱", taglineKey: "services.hybrid.tagline" },
    { key: "cloud", icon: "☁️", taglineKey: "services.cloud.tagline" },
    { key: "iot", icon: "🔌", taglineKey: "services.iot.tagline" },
    { key: "seo", icon: "🔍", taglineKey: "services.seo.tagline" },
    { key: "analytics", icon: "📊", taglineKey: "services.analytics.tagline" },
    { key: "embedded", icon: "⚙️", taglineKey: "services.embedded.tagline" },
    { key: "blockchain", icon: "⛓️", taglineKey: "services.blockchain.tagline" },
    { key: "ai", icon: "🤖", taglineKey: "services.ai.tagline" },
  ]

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Title section with accent line */}
        <div ref={titleAnimation.ref} className={`text-center mb-12 ${titleAnimation.animationClasses}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            {t("services.title")}
          </h2>
          <div className="w-24 h-1 bg-secondary/50 mx-auto rounded-full"></div>
        </div>

        <div ref={cardsAnimation.ref} className={`grid md:grid-cols-3 gap-6 ${cardsAnimation.animationClasses}`}>
          {services.map((service) => (
            <div
              key={service.key}
              className="group relative p-5 bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-3">
                    <ServiceIcon icon={service.icon} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {t(`services.${service.key}.title` as any)}
                </h3>

                {/* Tagline */}
                <p className="text-primary text-xs font-semibold mb-2 uppercase tracking-wide">
                  {t(service.taglineKey as any)}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`services.${service.key}.description` as any)}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}