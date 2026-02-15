"use client"

import { useEffect, useRef, useState } from "react"

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "scale-up"

interface UseScrollAnimationOptions {
  threshold?: number
  animationType?: AnimationType
  delay?: number
}

export function useScrollAnimation({
  threshold = 0.1,
  animationType = "fade-up",
  delay = 0
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      { threshold }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [threshold, delay])

  const getAnimationClasses = () => {
    const baseClasses = "transition-all duration-1000 ease-out"

    if (!isVisible) {
      switch (animationType) {
        case "fade-up":
          return `${baseClasses} opacity-0 translate-y-10`
        case "fade-down":
          return `${baseClasses} opacity-0 -translate-y-10`
        case "fade-left":
          return `${baseClasses} opacity-0 translate-x-10`
        case "fade-right":
          return `${baseClasses} opacity-0 -translate-x-10`
        case "zoom-in":
          return `${baseClasses} opacity-0 scale-95`
        case "scale-up":
          return `${baseClasses} opacity-0 scale-90`
        default:
          return `${baseClasses} opacity-0`
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return { ref, isVisible, animationClasses: getAnimationClasses() }
}
