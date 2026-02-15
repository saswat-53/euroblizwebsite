"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "./language-switcher"
import { useState } from "react"
import Image from "next/image"

export function Navigation() {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-primary shadow-lg md:opacity-90 opacity-100 rounded-b-2xl md:rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-trial-1.png" alt="Eurobliz Logo" width={40} height={40} className="rounded-full" />
            <span className="text-2xl font-bold bg-linear-to-r bg-secondary bg-clip-text text-transparent">
             Eurobl<span className="text-red-600">i</span>z
            </span>
          </Link>

          <div className="hidden md:flex  items-center gap-8 text-white">
            <Link href="/" className="text-md font-medium text-gray-300 hover:text-white transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="#services" className="text-md font-medium text-gray-300 hover:text-white transition-colors">
              {t("nav.services")}
            </Link>
            {/* <Link href="#team" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t("nav.team")}
            </Link> */}
            <Link href="#testimonials" className="text-md font-medium text-gray-300 hover:text-white transition-colors">
              {t("nav.testimonials")}
            </Link>
            <Link href="#blog" className="text-md font-medium text-gray-300 hover:text-white transition-colors">
              {t("nav.blog")}
            </Link>
            <Link href="#partners" className="text-md font-medium text-gray-300 hover:text-white transition-colors">
              {t("nav.partners")}
            </Link>
            <Link href="#contact" className="text-md font-medium text-gray-300 hover:text-white transition-colors">
              {t("nav.contact")}
            </Link>
            <LanguageSwitcher />
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-gray-900/95 rounded-b-lg">
            <Link
              href="/"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="#services"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.services")}
            </Link>
            {/* <Link
              href="#team"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.team")}
            </Link> */}
            <Link
              href="#testimonials"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.testimonials")}
            </Link>
            <Link
              href="#blog"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.blog")}
            </Link>
            <Link
              href="#partners"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.partners")}
            </Link>
            <Link
              href="#contact"
              className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {t("nav.contact")}
            </Link>
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
