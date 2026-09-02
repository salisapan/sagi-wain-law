import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import { easeInOut } from '@/lib/motion'

/**
 * A gold flourish that draws itself like a pen signing, once in view.
 * Echoes "לפני שאתם חותמים" — the site's recurring "before you sign" line.
 * Pass `active` to drive it externally (e.g. a pinned slide's own active
 * state) instead of the default scroll-into-view trigger.
 */
export function SignatureDraw({ className, active }: { className?: string; active?: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  const scrolledIntoView = useInView(ref, { once: true, margin: '-80px' })
  const inView = active ?? scrolledIntoView

  return (
    <svg ref={ref} viewBox="0 0 240 70" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="sig-gradient" x1="0" y1="0" x2="240" y2="0">
          <stop offset="0%" stopColor="#9CC3EC" />
          <stop offset="45%" stopColor="#4A7FC9" />
          <stop offset="100%" stopColor="#9CC3EC" />
        </linearGradient>
      </defs>
      <motion.path
        d="M8 48 C 20 18, 34 18, 40 40 C 45 58, 56 58, 62 36 C 68 12, 84 12, 90 40 C 95 62, 106 62, 113 38 C 118 20, 130 16, 140 32 C 147 43, 156 43, 163 30 C 168 21, 176 20, 182 30"
        stroke="url(#sig-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.3, ease: easeInOut }}
      />
      <motion.path
        d="M190 46 L 228 42"
        stroke="url(#sig-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: easeInOut, delay: 1.2 }}
      />
    </svg>
  )
}
