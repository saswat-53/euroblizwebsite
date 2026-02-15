"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  const t = useTranslations()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-primary/20 to-slate-900"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT — TEXT */}
          <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary border border-primary rounded-full text-white text-sm font-semibold backdrop-blur-sm shadow-lg shadow-primary/30">
              <Sparkles className="w-4 h-4 text-white" />
              <span>Digital Innovation Experts</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-extrabold text-white leading-tight">
              {t("hero.tagline")}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
              >
                {t("hero.cta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 transition-all hover:bg-white/20 hover:scale-105"
              >
                Learn More
              </a>
            </div>

            {/* Stats or features */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-1">50+</div>
                <div className="text-sm text-gray-200 font-medium">Projects</div>
              </div>
              <div className="text-center lg:text-left p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-1">30+</div>
                <div className="text-sm text-gray-200 font-medium">Clients</div>
              </div>
              <div className="text-center lg:text-left p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-1">100%</div>
                <div className="text-sm text-gray-200 font-medium">Satisfaction</div>
              </div>
            </div> */}
          </div>

          {/* RIGHT — IMAGE */}
          <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative w-full h-[400px] lg:h-[600px]">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary to-blue-500 rounded-3xl blur-2xl opacity-30"></div>

              {/* Main image */}
              <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3"
                  alt="Web services illustration"
                  fill
                  priority
                  className="object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/50 via-transparent to-transparent"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
