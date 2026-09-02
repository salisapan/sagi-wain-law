import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type { ArticleSection } from '@/types/content'

/** A floating "on this page" rail for long-form articles, echoing the Home chapter rail. */
export function ArticleTOC({ sections }: { sections: ArticleSection[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const elements = sections
      .map((_, i) => document.getElementById(`section-${i}`))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = elements.indexOf(entry.target as HTMLElement)
          if (idx !== -1) setActiveIndex(idx)
        })
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="תוכן עניינים"
      className="pointer-events-none fixed start-10 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 xl:flex"
    >
      {sections.map((section, i) => {
        const active = activeIndex === i
        return (
          <a
            key={i}
            href={`#section-${i}`}
            className="group pointer-events-auto flex items-center gap-3"
          >
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-display text-[11px] font-semibold transition-all duration-300',
                active
                  ? 'scale-110 border-gold-200 bg-gold-200 text-navy shadow-gold'
                  : 'border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white/70',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'max-w-[9rem] truncate text-xs font-medium transition-all duration-300',
                active
                  ? 'translate-x-0 text-gold-200 opacity-100'
                  : '-translate-x-1 text-white/60 opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
              )}
            >
              {section.heading}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
