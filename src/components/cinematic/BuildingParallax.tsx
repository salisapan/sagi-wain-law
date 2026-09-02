import { motion, useTransform, type MotionValue } from 'framer-motion'

import buildingPhoto from '@/assets/home/building-parallax.data'

/**
 * Replaces the old bronze-horse 3D centerpiece: a duotone photo of a real
 * building that drifts and slowly zooms as the visitor scrolls through the
 * Home chapters — driven by the same scrollYProgress as the chapter rail.
 */
export function BuildingParallax({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '18%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.32])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.85, 1], [0, 0.55, 0.55, 0.2])

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.img
        src={buildingPhoto}
        alt=""
        style={{ y, scale, opacity }}
        className="h-full w-full object-cover object-center [filter:grayscale(0.55)_contrast(1.15)_brightness(0.75)]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#241304]/70 via-transparent to-[#040a16]/85 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/50" />
    </div>
  )
}
