import type { ReactNode } from 'react'
import { motion, type Easing, type Variants } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  className?: string
  stagger?: boolean
  delay?: number
  y?: number
  as?: 'div' | 'section'
}

const easeOut: Easing = [0.22, 1, 0.36, 1]

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

// A more physical entrance — scale + blur on top of fade/rise — reserved for
// hero-level card grids (dossier, articles) rather than every reveal on the
// site, so it reads as a deliberate accent instead of default motion.
const itemPremium: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.94, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeOut } },
}

/**
 * Scroll-triggered fade+rise wrapper. Pass `stagger` to animate direct
 * children in sequence (each child should be a motion-aware element or
 * plain element — framer-motion applies the variant via context).
 */
export function Reveal({ children, className, stagger = false, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const Component = as === 'section' ? motion.section : motion.div

  if (stagger) {
    return (
      <Component
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.12, delayChildren: delay }}
      >
        {children}
      </Component>
    )
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
    >
      {children}
    </Component>
  )
}

/** Use as a direct child of a staggering <Reveal stagger> to inherit the stagger variant. */
export function RevealItem({
  children,
  className,
  premium = false,
}: {
  children: ReactNode
  className?: string
  premium?: boolean
}) {
  return (
    <motion.div className={className} variants={premium ? itemPremium : item}>
      {children}
    </motion.div>
  )
}
