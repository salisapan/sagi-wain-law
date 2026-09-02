import type { LucideIcon } from 'lucide-react'

export interface PracticeArea {
  slug: string
  navTitle: string
  title: string
  tagline: string
  summary: string
  icon: LucideIcon
  whatIncluded: string[]
  process: { title: string; description: string }[]
  faq: { question: string; answer: string }[]
}

export interface Testimonial {
  name: string
  role: string
  quote: string
  rating: number
}

export interface ArticleSection {
  heading: string
  paragraphs: string[]
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  body: string[]
  sections?: ArticleSection[]
  sources?: string[]
  keyTakeaways?: string[]
  published: boolean
  practiceAreaSlug?: string
}

export interface MediaItem {
  id: string
  platform: 'instagram' | 'tiktok'
  thumbnail: string
  caption: string
  views?: string
  href: string
}
