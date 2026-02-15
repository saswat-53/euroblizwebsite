"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import Image from "next/image"

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-trial-1.png"
                alt="Eurobliz Logo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <h3 className="text-2xl font-bold">
                Eurobl<span className="text-red-600">i</span>z
              </h3>
            </div>
            <p className="text-sm text-primary-foreground/80">{t("footer.tagline")}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t("footer.quick_links")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/" className="hover:text-primary-foreground transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-primary-foreground transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-primary-foreground transition-colors">
                  {t("nav.testimonials")}
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-primary-foreground transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="#partners" className="hover:text-primary-foreground transition-colors">
                  {t("nav.partners")}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-primary-foreground transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t("footer.contact_us")}</h4>
            <p className="text-sm text-primary-foreground/80">{t("footer.phone")}</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://x.com/eurobliz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="Twitter/X"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/eurobliz/?originalSubdomain=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 mt-8 text-center">
          <p className="text-sm text-primary-foreground/80">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
