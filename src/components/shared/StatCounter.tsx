import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

/** Animates from 0 to a real, derived count (never a fabricated figure) once scrolled into view. */
export function StatCounter({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-4xl font-bold text-gradient-gold sm:text-5xl">
        {display}
      </span>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{label}</p>
    </div>
  )
}
