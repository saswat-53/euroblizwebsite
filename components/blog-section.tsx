"use client"

import { useTranslations } from "next-intl"
import { Calendar, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { BlogModal } from "./blog-modal"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: any
  image: string | null
  date: string
  readTime: string
}

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  const t = useTranslations()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null)
  const titleAnimation = useScrollAnimation({ animationType: "fade-up" })
  const cardsAnimation = useScrollAnimation({ animationType: "scale-up", delay: 250 })

  const itemsPerSlide = 3
  const totalSlides = Math.ceil(posts.length / itemsPerSlide)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 10000)

    return () => clearInterval(timer)
  }, [totalSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const visibleBlogs = posts.slice(currentSlide * itemsPerSlide, (currentSlide + 1) * itemsPerSlide)

  const handleBlogClick = (index: number) => {
    setSelectedBlog(currentSlide * itemsPerSlide + index)
  }

  return (
    <section id="blog" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div ref={titleAnimation.ref} className={`text-center mb-16 ${titleAnimation.animationClasses}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{t("blog.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("blog.subtitle")}</p>
        </div>

        <div ref={cardsAnimation.ref} className={`relative ${cardsAnimation.animationClasses}`}>
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={prevSlide}
            className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous blogs"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next blogs"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Blog Grid - Scrollable on mobile, grid on desktop */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-8 pb-4 scrollbar-hide">
            {visibleBlogs.map((post, index) => (
              <article
                key={post.slug}
                onClick={() => handleBlogClick(index)}
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer w-[85vw] sm:w-[70vw] md:w-auto md:min-w-0 snap-center shrink-0"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">{post.title}</h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <button
                    onClick={() => handleBlogClick(index)}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    {t("blog.readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedBlog !== null && (
        <BlogModal
          isOpen={selectedBlog !== null}
          onClose={() => setSelectedBlog(null)}
          blog={posts[selectedBlog]}
        />
      )}
    </section>
  )
}
