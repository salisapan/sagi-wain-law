import { Link } from 'react-router-dom'
import { Quote } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/shared/Reveal'
import { TrustStats } from '@/components/shared/TrustStats'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'
import { testimonials } from '@/data/testimonials'

const firstColumn = testimonials.slice(0, 4)
const secondColumn = testimonials.slice(4, 8)
const thirdColumn = testimonials.slice(8, 12)

export default function Testimonials() {
  return (
    <>
      <Seo title="עדויות לקוחות" description="מה אומרים לקוחות שליווה עו״ד שגיא ויין בעסקאות נדל״ן." />

      <PageHero eyebrow="עדויות" title="מה אומרים הלקוחות" description="עדויות אמיתיות מלקוחות שליוויתי בעסקאות נדל״ן." />

      <section className="bg-black/30 py-16 backdrop-blur-sm">
        <Reveal className="container">
          {testimonials.length > 0 ? (
            <>
            <TrustStats className="mb-14" />
            <div className="flex max-h-[740px] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
              <TestimonialsColumn testimonials={firstColumn} duration={16} />
              <TestimonialsColumn testimonials={secondColumn} duration={20} className="hidden sm:block" />
              <TestimonialsColumn testimonials={thirdColumn} duration={18} className="hidden lg:block" />
            </div>
            </>
          ) : (
            <div className="mx-auto max-w-xl rounded-lg border-2 border-dashed border-gold/30 bg-white/[0.03] p-12 text-center backdrop-blur-md">
              <Quote className="mx-auto h-8 w-8 text-gold/60" />
              <h2 className="mt-4 font-display text-xl font-semibold text-primary">
                העדויות בדרך לכאן
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                אנחנו אוספים עדויות אמיתיות מלקוחות. בקרוב יופיעו כאן. בינתיים, מוזמנים
                ליצור קשר ולשמוע ישירות על הליווי בעסקאות דומות.
              </p>
              <Button asChild variant="gold" className="mt-6">
                <Link to="/contact">יצירת קשר</Link>
              </Button>
            </div>
          )}
        </Reveal>
      </section>
    </>
  )
}
