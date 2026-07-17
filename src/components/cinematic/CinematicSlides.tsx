import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, type Easing } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { cinematicSlides } from '@/lib/cinematicContent'
import heroPhoto from '@/assets/sagi-wain-hero.data'

const easeOut: Easing = [0.22, 1, 0.36, 1]

const ACTIVE_RANGES: [number, number][] = [
  [0, 0.14],
  [0.28, 0.42],
  [0.56, 0.7],
  [0.82, 1.01],
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
    <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-[#fff6ed] sm:text-5xl lg:text-6xl">
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
    <div ref={containerRef} data-cinematic-track className="relative h-[900vh]">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-end overflow-hidden px-6 pb-10 sm:px-10 lg:px-16">
        {cinematicSlides.map((slide, index) => {
          const active = activeIndex === index
          return (
            <div
              key={slide.id}
              className={`absolute inset-x-0 bottom-[12%] transition-opacity duration-500 ${
                active ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="me-auto ms-0 max-w-3xl pe-6 sm:pe-16">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-gold-200">
                  {slide.label}
                </span>

                {index === 1 && (
                  <div
                    className="mb-6 aspect-square w-40 overflow-hidden rounded-sm border border-white/10 sm:w-56"
                    style={{
                      clipPath: active ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                      transition: 'clip-path 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <img
                      src={heroPhoto}
                      alt="עו״ד שגיא ויין"
                      className="h-full w-full object-cover"
                      style={{
                        transform: active ? 'scale(1)' : 'scale(1.15)',
                        transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                )}

                <KineticTitle text={slide.title} active={active} />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
                  className="mt-6 grid gap-4 text-base leading-relaxed text-[#d1d5db] sm:grid-cols-2 sm:text-lg"
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
                    <Button asChild size="lg" variant="gold">
                      <Link to={slide.cta.href}>{slide.cta.label}</Link>
                    </Button>
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
