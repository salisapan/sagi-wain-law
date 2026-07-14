import type { ReactNode } from 'react'

import { GradientBlobs } from '@/components/shared/GradientBlobs'
import { Reveal } from '@/components/shared/Reveal'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-radial py-20 text-white noise-overlay sm:py-28">
      <GradientBlobs variant="cta" />
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
