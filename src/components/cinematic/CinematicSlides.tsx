import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, type Easing } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { MagneticWrap } from '@/components/shared/MagneticWrap'
import { BuildingParallax } from '@/components/cinematic/BuildingParallax'
import { cn } from '@/lib/utils'
import { cinematicSlides } from '@/lib/cinematicContent'

const easeOut: Easing = [0.22, 1, 0.36, 1]

// Contiguous, no gaps — every point in the 900vh scroll track has an active
// slide, so the background never scrolls past with the text area blank.
const ACTIVE_RANGES: [number, number][] = [
  [0, 0.25],
  [0.25, 0.5],
  [0.5, 0.75],
  [0.75, 1.001],
]

function activeIndexFromProgress(progress: number): number | null {
  for (let i = 0; i < ACTIVE_RANGES.length; i++) {
    const [start, end] = ACTIVE_RANGES[i]
    if (progress >= start && progress <= end) return i
  }
  return null
}

function KineticTitle({ text, active }: { text: string; active: boolean }) {
  const words = text.split(' ')
  let charCounter = 0

  return (
    <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-[#fff6ed] [text-shadow:0_4px_24px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
      {words.map((word, wordIndex) => {
        const chars = Array.from(word)
        const wordStartIndex = charCounter
        charCounter += chars.length
        return (
          <span key={`word-${wordIndex}`}>
            <span className="inline-block whitespace-nowrap">
              {chars.map((char, i) => (
                <motion.span
                  key={`char-${i}`}
                  initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
                  animate={
                    active
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                      : { opacity: 0, y: 50, filter: 'blur(12px)' }
                  }
                  transition={{
                    duration: 0.8,
                    ease: easeOut,
                    delay: active ? (wordStartIndex + i) * 0.035 : 0,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {wordIndex < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </h1>
  )
}

export function CinematicSlides() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = activeIndexFromProgress(value)
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  return (
    <div ref={containerRef} data-cinematic-track className="relative h-[500vh] sm:h-[700vh] lg:h-[900vh]">
      <div className="sticky top-0 flex h-dvh w-full flex-col justify-end overflow-hidden px-6 pb-10 sm:px-10 lg:px-16">
        <BuildingParallax scrollYProgress={scrollYProgress} />

        <div className="pointer-events-none absolute inset-y-0 start-8 z-20 hidden flex-col items-start justify-center gap-7 lg:start-14 lg:flex">
          <motion.div
            aria-hidden
            className="absolute start-[3px] top-[15%] w-px origin-top bg-gold-metallic bg-[length:100%_400%]"
            style={{ scaleY: scrollYProgress, height: '70%' }}
          />
          <div aria-hidden className="absolute start-[3px] top-[15%] h-[70%] w-px bg-white/10" />
          {cinematicSlides.map((slide, index) => {
            const active = activeIndex === index
            return (
              <div key={slide.id} className="relative flex items-center gap-4">
                <span
                  className={cn(
                    'z-10 block h-2 w-2 rounded-full border transition-all duration-500',
                    active ? 'scale-[1.4] border-gold-200 bg-gold-200 shadow-gold' : 'border-white/30 bg-black/60',
                  )}
                />
                <span
                  className={cn(
                    'whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-500',
                    active ? 'translate-x-0 text-gold-200 opacity-100' : '-translate-x-1 text-white/35 opacity-0',
                  )}
                >
                  {slide.label}
                </span>
              </div>
            )
          })}
        </div>

        {cinematicSlides.map((slide, index) => {
          const active = activeIndex === index
          return (
            <div
              key={slide.id}
              className={`absolute inset-x-0 bottom-[12%] transition-opacity duration-500 ${
                active ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="me-auto ms-0 max-w-3xl rounded-3xl border border-white/5 bg-black/35 p-6 backdrop-blur-md sm:p-8 sm:pe-16">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-gold-200">
                  {slide.label}
                </span>

                <KineticTitle text={slide.title} active={active} />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
                  className="mt-6 grid gap-4 text-base leading-relaxed text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.6)] sm:grid-cols-2 sm:text-lg"
                >
                  <p>{slide.columnA}</p>
                  <p>{slide.columnB}</p>
                </motion.div>

                {slide.cta && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: easeOut, delay: 0.6 }}
                    className="mt-8"
                  >
                    <MagneticWrap className="inline-block w-fit" strength={0.3}>
                      <Button asChild size="lg" variant="gold">
                        <Link to={slide.cta.href}>{slide.cta.label}</Link>
                      </Button>
                    </MagneticWrap>
                  </motion.div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
