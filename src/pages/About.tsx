import { Link } from 'react-router-dom'
import { GraduationCap, Handshake, Scale } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { Button } from '@/components/ui/button'
import { GradientBlobs } from '@/components/shared/GradientBlobs'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { siteConfig } from '@/data/siteConfig'
import heroPhoto from '@/assets/sagi-wain-hero.data'

export default function About() {
  return (
    <>
      <Seo
        title="אודות"
        description="עו״ד שגיא ויין — רקע מקצועי, השכלה ותחומי עיסוק בליווי משפטי בעסקאות נדל״ן."
      />

      <section className="relative overflow-hidden bg-navy-radial py-20 text-white noise-overlay sm:py-28">
        <GradientBlobs />
        <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="space-y-4">
            <span className="inline-block text-sm font-semibold uppercase tracking-wide text-gold-light">
              אודות
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">עו״ד שגיא ויין</h1>
            <p className="text-lg leading-relaxed text-white/80">
              עורך דין נדל״ן, מלווה יחידים, משפחות ומשקיעים בעסקאות נדל״ן — מבדיקת חוזה
              ראשונית ועד סגירת העסקה. בונה נוכחות דיגיטלית וחינוך משפטי לציבור הרחב תחת
              השם האישי שלו, מתוך אמונה שכל אדם צריך להבין על מה הוא חותם.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-2xl bg-gold-metallic bg-[length:200%_auto] opacity-30 blur-2xl animate-gradient-x" />
            <img
              src={heroPhoto}
              alt="עו״ד שגיא ויין"
              className="relative aspect-[4/5] w-full rounded-2xl border border-gold/30 object-cover shadow-gold-lg"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-20">
        <Reveal stagger className="container grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: 'השכלה',
              text: 'בוגר המסלול האקדמי המכללה למינהל (אונו), עם התמחות בדיני מקרקעין.',
            },
            {
              icon: Scale,
              title: 'תחום עיסוק',
              text: 'דיני מקרקעין: בדיקת חוזים, עסקאות מכר ושכירות, ירושה וצוואות וליווי משקיעים.',
            },
            {
              icon: Handshake,
              title: 'שיתופי פעולה',
              text: `פועל, בין היתר, בשיתוף פעולה עם ${siteConfig.firmAffiliation} לצד עסקאות שהוא מוביל באופן עצמאי.`,
            },
          ].map(({ icon: Icon, title, text }) => (
            <RevealItem key={title}>
              <div className="gradient-border h-full rounded-lg border border-border bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-gold">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-metallic bg-[length:200%_auto] shadow-gold">
                  <Icon className="h-6 w-6 text-navy" strokeWidth={1.75} />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="bg-white py-20">
        <Reveal className="container max-w-3xl space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">איך אני עובד</h2>
          <p className="leading-relaxed text-muted-foreground">
            כל עסקת נדל״ן מתחילה בהבנה — של הצרכים שלכם, של הסיכונים בעסקה הספציפית, ושל מה
            שבאמת חשוב לכם להשיג. אני מאמין בליווי אישי וזמין, בהסברים בשפה פשוטה במקום
            ז׳רגון משפטי, ובבדיקה יסודית של כל מסמך לפני שהוא נחתם — לא אחרי.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            לצד העבודה השוטפת מול לקוחות, אני יוצר תוכן משפטי ברשתות החברתיות כדי לחשוף את
            הציבור הרחב לזכויות ולסיכונים שכדאי להכיר לפני כל עסקת נדל״ן.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/contact">קביעת פגישת היכרות חינם</Link>
          </Button>
        </Reveal>
      </section>
    </>
  )
}
