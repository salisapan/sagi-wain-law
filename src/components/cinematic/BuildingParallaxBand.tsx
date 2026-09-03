import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import buildingPhoto from '@/assets/home/building-parallax.jpg'
import { cn } from '@/lib/utils'

/**
 * A quieter version of the Home hero's building parallax, sized for a
 * normal-height section (page heroes, the About block) rather than a
 * pinned 900vh track. Tracks its own element's scroll progress.
 */
export function BuildingParallaxBand({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.16])

  return (
    <div ref={ref} aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <motion.img
        src={buildingPhoto}
        alt=""
        style={{ y, scale }}
        className="h-full w-full object-cover object-[50%_18%] opacity-[0.22] [filter:grayscale(0.55)_contrast(1.15)_brightness(0.7)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
    </div>
  )
}
