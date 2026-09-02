import { motion, useScroll, useSpring } from 'framer-motion'

/** A thin gold progress line pinned to the very top edge of the viewport, tracking full-page scroll. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold-metallic bg-[length:200%_auto]"
    />
  )
}
