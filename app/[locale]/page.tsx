import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { IdeasSection } from "@/components/ideas-section"
import { ServicesSection } from "@/components/services-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BlogSection } from "@/components/blog-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { createReader } from '@keystatic/core/reader'
import readerConfig from '@/keystatic.config.reader'

// Generate static pages for all locales at build time
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}

// Force static generation (no revalidate = fully static, no serverless functions)
export const dynamic = 'force-static'

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params
  const locale = params.locale

  const reader = createReader(process.cwd(), readerConfig)

  // Fetch testimonials from Keystatic
  const testimonialsData = await reader.collections.testimonials.all()
  const testimonials = testimonialsData.map((testimonial) => ({
    slug: testimonial.slug,
    name: testimonial.entry.name,
    quote: locale === 'en' ? testimonial.entry.quote_en : testimonial.entry.quote_fr,
    position: locale === 'en' ? testimonial.entry.position_en : testimonial.entry.position_fr,
    rating: testimonial.entry.rating,
  }))

  // Fetch blog posts from Keystatic
  const postsData = await reader.collections.posts.all()
  const posts = postsData.map((post) => ({
    slug: post.slug,
    title: locale === 'en' ? post.entry.title_en : post.entry.title_fr,
    excerpt: locale === 'en' ? post.entry.excerpt_en : post.entry.excerpt_fr,
    content: locale === 'en' ? post.entry.content_en : post.entry.content_fr,
    image: post.entry.image,
    date: post.entry.date,
    readTime: post.entry.readTime,
  }))

  return (
    <main>
      <Navigation />
      <Hero />
      <IdeasSection />
      <ServicesSection />
      {/* <TeamSection /> */}
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={posts} />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
