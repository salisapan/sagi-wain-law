import { Link } from 'react-router-dom'
import { Quote } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/shared/Reveal'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <>
      <Seo title="עדויות לקוחות" description="מה אומרים לקוחות שליווה עו״ד שגיא ויין בעסקאות נדל״ן." />

      <PageHero eyebrow="עדויות" title="מה אומרים הלקוחות" description="עדויות אמיתיות מלקוחות שליוויתי בעסקאות נדל״ן." />

      <section className="bg-white py-16">
        <Reveal className="container">
          {testimonials.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-6">
                  <Quote className="h-6 w-6 text-gold" />
                  <p className="mt-4 text-sm leading-relaxed text-charcoal">{t.quote}</p>
                  <p className="mt-4 text-sm font-semibold text-primary">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-lg border-2 border-dashed border-gold/30 bg-cream p-12 text-center">
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
