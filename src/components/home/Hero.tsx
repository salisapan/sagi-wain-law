import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Easing,
} from 'framer-motion'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GradientBlobs } from '@/components/shared/GradientBlobs'
import { MagneticWrap } from '@/components/shared/MagneticWrap'
import heroPhoto from '@/assets/sagi-wain-hero.jpg'

const easeOut: Easing = [0.22, 1, 0.36, 1]

const line1 = ['עו״ד', 'שגיא', 'ויין']
const line2 = ['ליווי', 'משפטי', 'בעסקאות', 'נדל״ן']

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const word = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

function KineticHeadline() {
  return (
    <motion.h1
      variants={wordContainer}
      initial="hidden"
      animate="show"
      className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
    >
      <span className="flex flex-wrap gap-x-3">
        {line1.map((w) => (
          <motion.span key={w} variants={word}>
            {w}
          </motion.span>
        ))}
      </span>
      <span className="mt-1 flex flex-wrap gap-x-3">
        {line2.map((w) => (
          <motion.span
            key={w}
            variants={word}
            className="bg-gold-metallic bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x"
          >
            {w}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  )
}

function CursorSpotlight() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const background = useMotionTemplate`radial-gradient(500px circle at ${x}px ${y}px, rgba(212,175,55,0.16), transparent 45%)`

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ background }}
      aria-hidden="true"
    />
  )
}

function TiltPhoto() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-full max-w-sm lg:max-w-md"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-gold-metallic bg-[length:200%_auto] opacity-30 blur-2xl animate-gradient-x" />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl border border-gold/30 shadow-gold-lg"
      >
        <img
          src={heroPhoto}
          alt="עו״ד שגיא ויין"
          className="aspect-[4/5] w-full rounded-2xl object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-radial text-white noise-overlay">
      <GradientBlobs variant="hero" />
      <CursorSpotlight />
      <div className="container relative z-10 grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold-light animate-[float_5s_ease-in-out_infinite,glow-pulse_2.8s_ease-in-out_infinite]"
          >
            <ShieldCheck className="h-4 w-4" />
            ההגנה שלכם לפני שאתם חותמים
          </motion.span>

          <KineticHeadline />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
            className="max-w-xl text-lg leading-relaxed text-white/80"
          >
            בדיקת חוזים, דיני שכירות, ירושה וצוואות וליווי משקיעים — עם ליווי אישי וזמין,
            לפני שאתם חותמים על כל מסמך.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: easeOut }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <MagneticWrap>
              <Button asChild size="lg" variant="gold">
                <Link to="/contact">
                  קביעת פגישת היכרות חינם
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </MagneticWrap>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-navy">
              <Link to="/about">קצת עליי</Link>
            </Button>
          </motion.div>
        </div>

        <TiltPhoto />
      </div>
    </section>
  )
}
