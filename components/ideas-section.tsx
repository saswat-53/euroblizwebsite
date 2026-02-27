"use client"

import { useTranslations } from "next-intl"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { Lightbulb, Zap, Handshake } from "lucide-react"

const IconWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white ${className}`}>
    {children}
  </div>
)

export function IdeasSection() {
  const t = useTranslations()
  const cardsAnimation = useScrollAnimation({ animationType: "fade-up", delay: 150 })

  const ideas = [
    {
      id: "1",
      titleKey: "vision.title",
      descKey: "vision.description",
      Icon: Lightbulb,
    },
    {
      id: "2",
      titleKey: "innovation.title",
      descKey: "innovation.description",
      Icon: Zap,
    },
    {
      id: "3",
      titleKey: "partnership.title",
      descKey: "partnership.description",
      Icon: Handshake,
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div ref={cardsAnimation.ref as React.RefObject<HTMLDivElement>} className={`grid md:grid-cols-3 gap-8 ${cardsAnimation.animationClasses}`}>
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="group p-10 bg-white rounded-2xl text-center shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-primary/20 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-8">
                <IconWrapper className="w-16 h-16 flex items-center justify-center">
                  <idea.Icon className="w-10 h-10 transition-transform duration-500" />
                </IconWrapper>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors duration-300">
                {t(idea.titleKey as any)}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {t(idea.descKey as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}