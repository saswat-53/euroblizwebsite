"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useLocale } from "next-intl"
import { usePathname, Link } from "@/i18n/routing"
import { Globe } from "lucide-react"
import { useState } from "react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const currentPath = pathname || "/"
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "Français" },
  ]

  return (
    <div className="relative">
      <DropdownMenu.Root onOpenChange={setOpen} modal={false}>
        {/* Trigger */}
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-300 hover:text-white rounded-md border border-blue-500 hover:bg-blue-600 transition-colors focus:outline-none focus-visible:outline-none"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{locale}</span>
            <svg
              className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </DropdownMenu.Trigger>

        {/* Content */}
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className="w-40 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl p-1 z-9999"
            onEscapeKeyDown={() => setOpen(false)}
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {languages.map((lang) => (
              <DropdownMenu.Item key={lang.code} asChild>
                <Link
                  href={currentPath}
                  locale={lang.code}
                  className={`block px-3 py-2 text-sm rounded-md cursor-pointer outline-none transition-colors ${
                    locale === lang.code
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {lang.name}
                </Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}
