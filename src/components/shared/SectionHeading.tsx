import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'start' | 'center'
  className?: string
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl space-y-3', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <span
          className={cn(
            'inline-block text-sm font-semibold uppercase tracking-wide text-gold',
            light && 'text-gold-light',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={cn('text-3xl font-bold tracking-tight sm:text-4xl', light ? 'text-white' : 'text-primary')}>
        {title}
      </h2>
      {description && (
        <p className={cn('text-lg leading-relaxed', light ? 'text-white/80' : 'text-muted-foreground')}>
          {description}
        </p>
      )}
    </div>
  )
}
