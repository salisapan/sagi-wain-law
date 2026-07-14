import { ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface PlaceholderImageProps {
  label: string
  className?: string
  ratio?: string
}

/**
 * Visible placeholder for image slots pending real photos from the client.
 * Swap for a real <img> once assets are supplied — no other refactor needed.
 */
export function PlaceholderImage({ label, className, ratio = 'aspect-[4/5]' }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gold/40 bg-navy/5 p-8 text-center',
        ratio,
        className,
      )}
    >
      <ImageIcon className="h-8 w-8 text-gold" strokeWidth={1.5} />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-xs text-muted-foreground/70">ממתין לתמונה מהלקוח</p>
    </div>
  )
}
