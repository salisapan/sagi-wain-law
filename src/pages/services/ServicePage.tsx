import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { getPracticeAreaBySlug, practiceAreas } from '@/data/practiceAreas'

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const area = getPracticeAreaBySlug(slug ?? '')

  if (!area) {
    return <Navigate to="/" replace />
  }

  const otherAreas = practiceAreas.filter((a) => a.slug !== area.slug)

  return (
    <>
      <Seo title={area.title} description={area.summary} />

      <PageHero eyebrow="תחומי התמחות" title={area.title} description={area.tagline}>
        <Button asChild size="lg" variant="gold" className="mt-4">
          <Link to="/contact">
            קביעת פגישת היכרות חינם
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </PageHero>

      <section className="bg-white py-16">
        <div className="container grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <Reveal>
              <h2 className="text-2xl font-semibold text-primary">מה כלול בליווי</h2>
              <ul className="mt-6 space-y-4">
                {area.whatIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" strokeWidth={1.75} />
                    <span className="leading-relaxed text-charcoal">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div>
              <Reveal>
                <h2 className="text-2xl font-semibold text-primary">איך זה עובד</h2>
              </Reveal>
              <Reveal stagger className="mt-6 space-y-6">
                {area.process.map((step, index) => (
                  <RevealItem key={step.title} className="group flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-metallic bg-[length:200%_auto] font-display text-sm font-semibold text-navy shadow-gold transition-[background-position] duration-500 group-hover:bg-right">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-primary">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                    </div>
                  </RevealItem>
                ))}
              </Reveal>
            </div>

            <Reveal>
              <h2 className="text-2xl font-semibold text-primary">שאלות נפוצות</h2>
              <Accordion type="single" collapsible className="mt-4">
                {area.faq.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>

          <Reveal as="section" className="space-y-6">
            <div className="gradient-border rounded-lg border border-gold/30 bg-cream p-6 shadow-gold">
              <h3 className="font-display text-lg font-semibold text-primary">רוצים לבדוק את המקרה שלכם?</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                פגישת היכרות ראשונית ללא עלות — נבין יחד מה נכון לעשות בעסקה שלכם.
              </p>
              <Button asChild variant="gold" className="mt-4 w-full">
                <Link to="/contact">קביעת פגישה</Link>
              </Button>
            </div>

            <div>
              <h3 className="font-display text-lg font-semibold text-primary">תחומי התמחות נוספים</h3>
              <ul className="mt-4 space-y-2">
                {otherAreas.map((a) => (
                  <li key={a.slug}>
                    <Link
                      to={`/services/${a.slug}`}
                      className="flex items-center gap-2 text-sm text-charcoal transition-colors hover:text-gold-dark"
                    >
                      <a.icon className="h-4 w-4 text-gold-dark" strokeWidth={1.5} />
                      {a.navTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
