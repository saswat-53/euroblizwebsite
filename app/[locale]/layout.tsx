import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { routing } from "@/i18n/routing"
import "../globals.css"


const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans"
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}


export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  const messages = await getMessages({ locale })

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
