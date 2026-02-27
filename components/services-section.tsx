"use client"

import { useTranslations } from "next-intl"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { 
  Globe, 
  Smartphone, 
  Cloud, 
  Wifi, 
  Search, 
  BarChart3, 
  CircuitBoard, 
  Link as LinkIcon, 
  Brain,
} from "lucide-react"

const ServiceIcon = ({ icon: Icon }: { icon: any }) => (
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
        <Icon className="w-6 h-6" />
    </div>
);

export function ServicesSection() {
  const t = useTranslations()
  const titleAnimation = useScrollAnimation({ animationType: "fade-down" })
  const cardsAnimation = useScrollAnimation({ animationType: "fade-up", delay: 200 })

  const services = [
    { key: "web", icon: Globe, taglineKey: "services.web.tagline" },
    { key: "hybrid", icon: Smartphone, taglineKey: "services.hybrid.tagline" },
    { key: "cloud", icon: Cloud, taglineKey: "services.cloud.tagline" },
    { key: "iot", icon: Wifi, taglineKey: "services.iot.tagline" },
    { key: "seo", icon: Search, taglineKey: "services.seo.tagline" },
    { key: "analytics", icon: BarChart3, taglineKey: "services.analytics.tagline" },
    { key: "embedded", icon: CircuitBoard, taglineKey: "services.embedded.tagline" },
    { key: "blockchain", icon: LinkIcon, taglineKey: "services.blockchain.tagline" },
    { key: "ai", icon: Brain, taglineKey: "services.ai.tagline" },
  ]

  return (
    <section id="services" className="py-24 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Title section */}
        <div ref={titleAnimation.ref} className={`text-center mb-16 max-w-3xl mx-auto ${titleAnimation.animationClasses}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">
            {t("services.title")}
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div ref={cardsAnimation.ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${cardsAnimation.animationClasses}`}>
          {services.map((service) => (
            <div
              key={service.key}
              className="group flex flex-col p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <ServiceIcon icon={service.icon} />

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors duration-300">
                {t(`services.${service.key}.title` as any)}
              </h3>

              {/* Tagline */}
              <p className="text-xs font-bold text-primary/80 uppercase tracking-wider mb-4">
                {t(service.taglineKey as any)}
              </p>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {t(`services.${service.key}.description` as any)}
              </p>
              

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}