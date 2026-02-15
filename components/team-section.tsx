"use client"

import { useTranslations } from "next-intl"

// --- Placeholder Components ---
// Replace this with your actual Image component (e.g., next/image)
const TeamImagePlaceholder = ({ name }: { name: string }) => (
  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border border-border">
    {/* In a real scenario, use a high-res professional headshot */}
    <span className="text-xl font-bold text-gray-500">{name.charAt(0)}</span>
  </div>
)

// Placeholder for a testimonial display
const TestimonialCard = ({ client, quote }: { client: string, quote: string }) => (
  <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary mt-6">
    <p className="text-sm italic text-gray-700">"{quote}"</p>
    <p className="text-xs font-semibold mt-2 text-primary">- {client}</p>
  </div>
);
// ------------------------------

export function TeamSection() {
  const t = useTranslations()

  // NOTE: You need to add 'role' and 'imageKey' (or image URL) to your team members
  const teamMembers = [
    {
      key: "mayukh",
      name: t("team.mayukh"),
      role: "Founder & CEO", // Add this to your translation file or keep it static
      imageKey: "/images/mayukh.jpg"
    },
    {
      key: "aditya",
      name: t("team.aditya"),
      role: "Lead Developer", // Add this to your translation file or keep it static
      imageKey: "/images/aditya.jpg"
    },
  ]

  return (
    <section id="team" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">{t("team.title")}</h2>

        {/* Client Success/Testimonial Section (New element for credibility) */}
        <h3 className="text-2xl font-bold text-center mb-10 text-primary">Client Success Stories</h3>
        <div className="max-w-4xl mx-auto mb-16">
          <TestimonialCard
            client="R. Paul, Local eCommerce Startup"
            quote="Eurobliz delivered our entire platform ahead of schedule. The quality and communication were exceptional!"
          />
        </div>


        {/* Team Grid (Updated for 2 members to be centered) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-xl mx-auto"> {/* KEY CHANGES: lg:grid-cols-2 and max-w-xl mx-auto */}
          {teamMembers.map((member) => (
            <div key={member.key} className="bg-card rounded-xl overflow-hidden shadow-lg border border-border/50 transition-shadow hover:shadow-xl">
              <TeamImagePlaceholder name={member.name} />

              <div className="p-5 text-center space-y-1">
                <h4 className="text-xl font-extrabold text-foreground">{member.name}</h4>
                <p className="text-sm font-semibold text-primary">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Removed the 'Join Us' card to keep the focus purely on the two team members */}
        
      </div>
    </section>
  )
}