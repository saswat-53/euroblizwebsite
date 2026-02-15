import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans"
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "Eurobliz - Digital Services for Businesses",
  description:
    "Transform your business with innovative digital solutions. Web development, apps, cloud, IoT, SEO, AI, and blockchain services.",
  icons: {
    icon: "/logo-trial-1.png",
    shortcut: "/logo-trial-1.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
