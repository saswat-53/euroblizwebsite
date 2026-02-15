"use client"

import { useTranslations } from "next-intl"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

// --- Placeholder Icon Components (Replace with your actual icon library) ---
// If you are using Lucide or Heroicons, you would import them here:
// import { Lightbulb, Layers, Handshake } from 'lucide-react'; 

const IconWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`p-4 rounded-full bg-primary/10 text-primary ${className}`}>
    {children}
  </div>
)

// The icons here are conceptual. Use actual SVG/Icon components.
const LightbulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .9-2.2 1.8-3.3c1.6-1.8 2.5-3.5 2.5-5.3c0-3.1-2.7-5-5-5s-5 1.9-5 5c0 1.7.9 3.5 2.5 5.3c.9 1.1 1.6 2.3 1.8 3.3" /><path d="M9 16.5v1.5c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-1.5" /></svg>; // Example Lightbulb
const LayersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="4" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></svg>; // Example Digital
const HandshakeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.5c-4.4 0-8-3.6-8-8c0-3.1 1.8-5.9 4.5-7.2l-1.5-1.5h10l-1.5 1.5c2.7 1.3 4.5 4.1 4.5 7.2c0 4.4-3.6 8-8 8z" /><path d="M12 10v4" /></svg>; // Example Creative

// -------------------------------------------------------------------------


export function IdeasSection() {
  const t = useTranslations()
  const cardsAnimation = useScrollAnimation({ animationType: "fade-up", delay: 150 })

  const ideas = [
    {
      id: "1",
      titleKey: "vision.title",
      descKey: "vision.description",
      Icon: LightbulbIcon, // The Big Ideas
    },
    {
      id: "2",
      titleKey: "innovation.title",
      descKey: "innovation.description",
      Icon: LayersIcon, // Digital Solutions
    },
    {
      id: "3",
      titleKey: "partnership.title",
      descKey: "partnership.description",
      Icon: HandshakeIcon, // Creative Solutions
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div ref={cardsAnimation.ref as React.RefObject<HTMLDivElement>} className={`grid md:grid-cols-3 gap-8 ${cardsAnimation.animationClasses}`}>
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="p-8 bg-card rounded-xl text-center shadow-md hover:shadow-xl transition-shadow duration-300 border border-border/50" // Added card styling
            >
              <div className="flex justify-center mb-6">
                <IconWrapper className="w-16 h-16 flex items-center justify-center text-3xl">
                  <idea.Icon /> {/* Icon placement */}
                </IconWrapper>
              </div>

              <h3 className="text-xl font-extrabold text-foreground mb-3">{t(idea.titleKey as any)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(idea.descKey as any)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}