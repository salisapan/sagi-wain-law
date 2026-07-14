import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { practiceAreas } from '@/data/practiceAreas'

export function PracticeAreasGrid() {
  return (
    <section className="bg-cream py-20">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="תחומי התמחות"
            title="ליווי משפטי בכל שלב של העסקה"
            description="מבדיקת חוזה לפני חתימה ועד ליווי מלא מול הצד השני — ארבעה תחומים שבהם אני נותן מענה מלא."
          />
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {practiceAreas.map((area) => (
            <RevealItem key={area.slug}>
              <Link to={`/services/${area.slug}`} className="group block h-full">
                <Card className="gradient-border h-full border-border/60 bg-white transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-gold">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-metallic bg-[length:200%_auto] shadow-gold transition-[background-position] duration-700 group-hover:bg-right">
                      <area.icon className="h-6 w-6 text-navy" strokeWidth={1.75} />
                    </div>
                    <CardTitle>{area.navTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{area.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark transition-transform duration-300 group-hover:-translate-x-1">
                      לפרטים נוספים
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
