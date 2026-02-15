import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // Ensure content folder is included in serverless functions
  serverExternalPackages: ['@keystatic/core'],
  // Include content folder in output file tracing for Vercel
  experimental: {
    outputFileTracingIncludes: {
      '/[locale]': ['./content/**/*'],
    },
  },
}

export default withNextIntl(nextConfig)
