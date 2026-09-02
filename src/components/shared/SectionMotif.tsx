import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Oversized, faint line-art icon used as a background watermark within a
 * `relative overflow-hidden` section — a quiet nod to the firm's practice
 * areas instead of a generic dot-grid. Breathes at whisper level (9s cycle)
 * so a static section still reads as one living page, never a stacked slide.
 */
export function SectionMotif({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <Icon
      aria-hidden
      strokeWidth={0.5}
      className={cn('pointer-events-none absolute select-none animate-breathe text-gold-200', className)}
    />
  )
}
