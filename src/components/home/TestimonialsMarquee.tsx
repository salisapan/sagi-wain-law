import { Quote } from 'lucide-react'

import type { Testimonial } from '@/types/content'

/**
 * Infinite left-to-right ticker of testimonial cards. Renders nothing when
 * there are no real testimonials yet — see src/data/testimonials.ts.
 */
export function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null

  const items = [...testimonials, ...testimonials]

  return (
    <div
      dir="ltr"
      className="group relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee-right gap-6 group-hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            dir="rtl"
            className="w-80 shrink-0 rounded-xl border border-border/60 bg-white p-5 shadow-sm"
          >
            <Quote className="h-5 w-5 text-gold" />
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal">{t.quote}</p>
            <p className="mt-3 text-sm font-semibold text-primary">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
