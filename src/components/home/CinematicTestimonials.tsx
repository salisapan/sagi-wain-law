import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'

import { Reveal } from '@/components/shared/Reveal'
import { SectionMotif } from '@/components/shared/SectionMotif'
import { TrustStats } from '@/components/shared/TrustStats'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'
import { testimonials } from '@/data/testimonials'

const firstColumn = testimonials.slice(0, 4)
const secondColumn = testimonials.slice(4, 8)
const thirdColumn = testimonials.slice(8, 12)

export function CinematicTestimonials() {
  return (
    <section className="relative z-10 overflow-hidden bg-black/60 py-24 backdrop-blur-sm">
      <SectionMotif icon={Scale} className="-start-16 -top-16 h-80 w-80 -rotate-12 sm:h-[26rem] sm:w-[26rem]" />
      <div className="container relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-gold-200">
            עדויות לקוחות
          </span>
          <h2 className="font-display text-3xl font-medium text-[#fff6ed] sm:text-5xl">מה אומרים הלקוחות</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <TrustStats />
        </Reveal>

        <div className="mt-14 flex max-h-[740px] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn testimonials={secondColumn} duration={20} className="hidden sm:block" />
          <TestimonialsColumn testimonials={thirdColumn} duration={18} className="hidden lg:block" />
        </div>

        <p className="mt-10 text-center text-sm text-[#9a9a9a]">
          לקוח או לקוחה לשעבר?{' '}
          <Link to="/contact" className="font-medium text-gold-200 hover:underline">
            נשמח לשמוע מכם
          </Link>
        </p>
      </div>
    </section>
  )
}
