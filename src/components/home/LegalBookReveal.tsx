import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'

import { GradientBlobs } from '@/components/shared/GradientBlobs'
import { Logo } from '@/components/shared/Logo'

/**
 * Scroll-driven 3D legal book: a closed book sits center-stage after the
 * Hero, then as the section scrolls through, its covers swing open on a
 * central spine (real CSS 3D — perspective + rotateY + preserve-3d) to
 * reveal a headline behind it, before the whole scene hands off to TrustBar.
 */
export function LegalBookReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const rightRotate = useTransform(scrollYProgress, [0.06, 0.34], [0, -158])
  const leftRotate = useTransform(scrollYProgress, [0.06, 0.34], [0, 158])
  const sceneRotateX = useTransform(scrollYProgress, [0, 0.3], [10, 0])
  const bookScale = useTransform(scrollYProgress, [0, 0.06, 0.56], [0.76, 0.94, 0.86])
  const bookY = useTransform(scrollYProgress, [0.38, 0.56], [0, -40])
  const bookGroupOpacity = useTransform(scrollYProgress, [0.38, 0.56], [1, 0])
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.06, 0.34, 0.56], [0, 0.5, 0.35, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.46, 0.68], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.46, 0.7], [28, 0])
  const sceneFade = useTransform(scrollYProgress, [0.86, 1], [1, 0])

  const [bookVisible, setBookVisible] = useState(true)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setBookVisible(v < 0.58))

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-navy">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-navy-radial">
        <div className="noise-overlay absolute inset-0" aria-hidden="true" />
        <GradientBlobs variant="cta" />

        <motion.div
          style={{ opacity: sceneFade }}
          className="relative flex h-full w-full max-w-5xl items-center justify-center px-6 [perspective:2200px]"
        >
          {/* headline revealed behind the book as it opens */}
          <motion.div
            style={{ opacity: contentOpacity, y: contentY }}
            className="absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 px-6 text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">
              המגילה שמגנה עליכם
            </span>
            <h3 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
              כל עסקת נדל״ן{' '}
              <span className="bg-gold-metallic bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                מתחילה בקריאה נכונה של החוזה
              </span>
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              אני פותח כל מסמך לפניכם, סעיף אחר סעיף — לפני שאתם חותמים על משהו.
            </p>
          </motion.div>

          {/* grounding shadow */}
          <motion.div
            style={{ opacity: shadowOpacity }}
            className="absolute h-10 w-56 rounded-full bg-black blur-2xl sm:w-72"
            aria-hidden="true"
          />

          {/* the book — hard-unmounted once fully faded so no residual frame can linger */}
          {bookVisible && (
            <motion.div
              style={{
                scale: bookScale,
                y: bookY,
                rotateX: sceneRotateX,
                opacity: bookGroupOpacity,
                transformStyle: 'preserve-3d',
              }}
              className="relative z-10 h-[300px] w-[220px] sm:h-[420px] sm:w-[300px]"
            >
              {/* page block — gives the book paper thickness and depth */}
              <div
                className="absolute inset-y-2 left-2 right-2 overflow-hidden rounded-sm bg-gradient-to-b from-[#FBF6E9] to-[#EEE2C4] shadow-[inset_0_0_20px_rgba(11,30,51,0.15)]"
                style={{ transform: 'translateZ(-6px)' }}
                aria-hidden="true"
              >
                <div className="absolute inset-0 [background-image:repeating-linear-gradient(to_bottom,rgba(11,30,51,0.07)_0,rgba(11,30,51,0.07)_1px,transparent_1px,transparent_6px)]" />
              </div>

              {/* spine */}
              <div
                className="absolute inset-y-0 left-1/2 z-20 w-2 -translate-x-1/2 rounded-sm bg-gold-metallic bg-[length:200%_auto] shadow-gold"
                aria-hidden="true"
              />

              {/* right-hand cover (spine-anchored on the left edge) */}
              <motion.div
                style={{ rotateY: rightRotate, transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
                className="absolute inset-y-0 left-1/2 z-30 w-1/2 [backface-visibility:hidden]"
              >
                <div className="gradient-border relative flex h-full w-full flex-col items-center justify-center gap-4 rounded-e-lg border border-gold/30 bg-navy-radial p-4 shadow-navy-lg">
                  <Logo className="h-10 w-10 sm:h-14 sm:w-14" />
                  <p className="text-center font-display text-sm font-bold leading-snug text-gold-light sm:text-base">
                    עו״ד
                    <br />
                    שגיא ויין
                  </p>
                  <span className="absolute inset-x-4 bottom-4 h-px bg-gold/30" />
                </div>
              </motion.div>

              {/* left-hand cover (spine-anchored on the right edge) */}
              <motion.div
                style={{ rotateY: leftRotate, transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
                className="absolute inset-y-0 right-1/2 z-30 w-1/2 [backface-visibility:hidden]"
              >
                <div className="relative flex h-full w-full items-center justify-center rounded-s-lg border border-gold/30 bg-navy-radial shadow-navy-lg">
                  <div className="h-2/3 w-px bg-gold/20" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
