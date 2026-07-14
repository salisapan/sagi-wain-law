import { Link } from 'react-router-dom'
import { Quote } from 'lucide-react'

import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { TestimonialsMarquee } from '@/components/home/TestimonialsMarquee'
import { ClientNamesTicker } from '@/components/home/ClientNamesTicker'
import { testimonials } from '@/data/testimonials'

export function TestimonialsSection() {
  return (
    <section className="bg-cream py-20">
      <Reveal>
        <SectionHeading align="center" eyebrow="עדויות לקוחות" title="מה אומרים הלקוחות" className="mx-auto" />
      </Reveal>

      {testimonials.length > 0 ? (
        <div className="mt-8 space-y-10">
          <ClientNamesTicker />
          <TestimonialsMarquee testimonials={testimonials} />
        </div>
      ) : (
        <Reveal stagger className="container mt-12 grid gap-6 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <RevealItem
              key={i}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gold/30 bg-white/50 p-6 text-center"
            >
              <Quote className="h-6 w-6 text-gold/50" />
              <p className="text-sm text-muted-foreground">עדויות לקוחות בקרוב</p>
            </RevealItem>
          ))}
        </Reveal>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        לקוח או לקוחה לשעבר?{' '}
        <Link to="/contact" className="font-medium text-gold-dark hover:underline">
          נשמח לשמוע מכם
        </Link>
      </p>
    </section>
  )
}
