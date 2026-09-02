import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { MagneticWrap } from '@/components/shared/MagneticWrap'
import { practiceAreas } from '@/data/practiceAreas'

export function PracticeDossier() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <section className="relative z-10 bg-black/40 py-24 backdrop-blur-sm">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-gold-200">
            תחומי התמחות
          </span>
          <h2 className="font-display text-3xl font-medium text-[#fff6ed] sm:text-5xl">התיקים שאני מלווה</h2>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((area) => {
            const open = openSlug === area.slug
            return (
              <RevealItem key={area.slug}>
                <div className="group relative">
                  <div
                    aria-hidden
                    className="absolute -top-3 start-6 h-6 w-16 rounded-t-md bg-gold-metallic bg-[length:200%_auto] opacity-90 [clip-path:polygon(12%_100%,0_0,100%_0,88%_100%)]"
                  />
                  <button
                    type="button"
                    onClick={() => setOpenSlug(open ? null : area.slug)}
                    aria-expanded={open}
                    className="relative flex w-full flex-col items-start rounded-lg border border-white/10 bg-white/[0.03] p-6 text-start backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.06] hover:shadow-gold"
                  >
                    <area.icon className="h-8 w-8 text-gold-light" strokeWidth={1.5} />
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">{area.navTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{area.tagline}</p>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                            {area.whatIncluded.slice(0, 3).map((item) => (
                              <li key={item} className="text-xs leading-relaxed text-white/70">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <span className="mt-4 text-xs font-medium text-gold-light">
                      {open ? 'צמצום' : 'פתיחת התיק'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="mt-3"
                      >
                        <MagneticWrap className="inline-block w-fit" strength={0.25}>
                          <Link
                            to={`/services/${area.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-200 hover:underline"
                          >
                            לפרטים המלאים
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </Link>
                        </MagneticWrap>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
