import type { ReactNode } from 'react'

import { Reveal } from '@/components/shared/Reveal'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-black/40 py-20 text-white backdrop-blur-sm sm:py-28">
      <Reveal as="section" className="container relative">
        <div className="max-w-3xl space-y-4">
          {eyebrow && (
            <span className="inline-block text-sm font-semibold uppercase tracking-wide text-gold-light">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
          {description && <p className="text-lg leading-relaxed text-white/80">{description}</p>}
          {children}
        </div>
      </Reveal>
    </section>
  )
}
