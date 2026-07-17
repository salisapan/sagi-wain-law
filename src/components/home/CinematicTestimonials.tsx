import { Link } from 'react-router-dom'
import { Quote, Star } from 'lucide-react'

import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { testimonials } from '@/data/testimonials'

export function CinematicTestimonials() {
  return (
    <section className="relative z-10 bg-black/60 py-24 backdrop-blur-sm">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-gold-200">
            עדויות לקוחות
          </span>
          <h2 className="font-display text-3xl font-medium text-[#fff6ed] sm:text-5xl">מה אומרים הלקוחות</h2>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <RevealItem
              key={testimonial.name}
              className="gradient-border flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]"
            >
              <Quote className="h-5 w-5 text-gold-200/60" />
              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-200 text-gold-200" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#d1d5db]">{testimonial.quote}</p>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-display text-base text-[#fff6ed]">{testimonial.name}</p>
                <p className="text-xs text-[#9a9a9a]">{testimonial.role}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>

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
