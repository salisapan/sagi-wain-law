import { Link } from 'react-router-dom'
import { GraduationCap, Handshake, Scale, ScrollText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { MagneticWrap } from '@/components/shared/MagneticWrap'
import { SectionMotif } from '@/components/shared/SectionMotif'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { siteConfig } from '@/data/siteConfig'
import sagiPortrait from '@/assets/about/sagi-portrait.data'

export function AboutSection() {
  return (
    <div id="about">
      <section className="bg-black/30 py-20 backdrop-blur-sm">
        <Reveal className="container mb-12 flex flex-col items-center gap-5 text-center sm:flex-row sm:text-start">
          <div className="gradient-border h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gold/30 shadow-gold sm:h-24 sm:w-24">
            <img src={sagiPortrait} alt="עו״ד שגיא ויין" className="h-full w-full object-cover object-top" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
              הרקע המקצועי שלי
            </h2>
            <p className="mt-1 text-sm text-white/60">עו״ד שגיא ויין — עורך דין נדל״ן</p>
          </div>
        </Reveal>

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
              <div className="gradient-border h-full rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.06] hover:shadow-elevation-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-metallic bg-[length:200%_auto] shadow-gold">
                  <Icon className="h-6 w-6 text-navy" strokeWidth={1.75} />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-gold-light">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-black/10 py-20">
        <SectionMotif icon={ScrollText} className="-end-10 -top-14 h-72 w-72 rotate-12 sm:h-96 sm:w-96" />
        <Reveal className="container relative max-w-3xl space-y-6">
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-white">איך אני עובד</h2>
          <p className="leading-relaxed text-white/70">
            כל עסקת נדל״ן מתחילה בהבנה — של הצרכים שלכם, של הסיכונים בעסקה הספציפית, ושל מה
            שבאמת חשוב לכם להשיג. אני מאמין בליווי אישי וזמין, בהסברים בשפה פשוטה במקום
            ז׳רגון משפטי, ובבדיקה יסודית של כל מסמך לפני שהוא נחתם — לא אחרי.
          </p>
          <p className="leading-relaxed text-white/70">
            לצד העבודה השוטפת מול לקוחות, אני יוצר תוכן משפטי ברשתות החברתיות כדי לחשוף את
            הציבור הרחב לזכויות ולסיכונים שכדאי להכיר לפני כל עסקת נדל״ן.
          </p>
          <MagneticWrap className="inline-block w-fit">
            <Button asChild variant="gold" size="lg">
              <Link to="/contact">קביעת פגישת היכרות חינם</Link>
            </Button>
          </MagneticWrap>
        </Reveal>
      </section>
    </div>
  )
}
