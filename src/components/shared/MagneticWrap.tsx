import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticWrapProps {
  children: ReactNode
  strength?: number
  className?: string
}

/**
 * Subtly pulls its child toward the cursor when nearby — reserved for the
 * site's primary CTAs. No-op on touch devices (no meaningful hover there).
 */
export function MagneticWrap({ children, strength = 0.35, className }: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 })

  const isTouch = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (isTouch || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
