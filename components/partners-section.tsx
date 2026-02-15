"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

export function PartnersSection() {
  const t = useTranslations()
  const titleAnimation = useScrollAnimation({ animationType: "scale-up" })
  const cardsAnimation = useScrollAnimation({ animationType: "fade-left", delay: 200 })

  const partners = [
    { key: "partner1" },
    { key: "partner2" },
    { key: "partner3" },
  ]

  return (
    <section id="partners" className="py-20 px-4 bg-section-dark">
      <div className="max-w-7xl mx-auto">
        {/* Heading with accent line */}
        <div ref={titleAnimation.ref} className={`text-center mb-16 ${titleAnimation.animationClasses}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            {t("partners.title")}
          </h2>
          <div className="w-24 h-1 bg-secondary/50 mx-auto rounded-full"></div>
        </div>

        <div ref={cardsAnimation.ref} className={`grid md:grid-cols-3 gap-8 ${cardsAnimation.animationClasses}`}>
          {partners.map((partner) => (
            <div key={partner.key} className="p-8 bg-white rounded-xl border-2 border-primary/20 text-center hover:shadow-2xl hover:border-primary hover:scale-[1.02] transition-all duration-300">
              {/* Partner Image */}
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-primary/20 bg-gray-50">
                <Image
                  src={t(`partners.${partner.key}.image`)}
                  alt={t(`partners.${partner.key}.name`)}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">{t(`partners.${partner.key}.name`)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(`partners.${partner.key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
