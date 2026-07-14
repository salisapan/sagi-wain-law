import { testimonials } from '@/data/testimonials'

/**
 * A single floating row of client names only (no quotes), drifting
 * horizontally with each name bobbing on its own delay so the row reads as
 * a gentle wave passing one name after another.
 */
export function ClientNamesTicker() {
  if (testimonials.length === 0) return null

  const names = testimonials.map((t) => t.name)
  const items = [...names, ...names]

  return (
    <div
      dir="ltr"
      className="group relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div className="flex w-max animate-marquee-right items-center gap-10 group-hover:[animation-play-state:paused]">
        {items.map((name, i) => (
          <div key={`${name}-${i}`} dir="rtl" className="flex shrink-0 items-center gap-3">
            <span
              className="inline-block animate-float whitespace-nowrap font-display text-lg font-semibold text-gradient-gold sm:text-xl"
              style={{ animationDelay: `${(i % names.length) * 0.18}s` }}
            >
              {name}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
