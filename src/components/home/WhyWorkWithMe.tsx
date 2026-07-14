import { Clock, MessageSquareText, ShieldCheck, Sparkles } from 'lucide-react'

import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import secondaryPhoto from '@/assets/sagi-wain-secondary.data'

const points = [
  {
    icon: MessageSquareText,
    title: 'זמינות ותקשורת ישירה',
    description: 'ליווי אישי לאורך כל התהליך, עם עדכונים שוטפים וזמינות אמיתית — לא רק בשעות המשרד.',
  },
  {
    icon: ShieldCheck,
    title: 'הגנה לפני שיש נזק',
    description: 'המטרה היא לאתר סיכונים לפני החתימה, לא לתקן נזק אחריה.',
  },
  {
    icon: Clock,
    title: 'ניסיון מעשי בעסקאות',
    description: 'ליווה מאות עסקאות נדל״ן — מכר, שכירות, ירושה והשקעות.',
  },
  {
    icon: Sparkles,
    title: 'שפה פשוטה, בלי ז׳רגון',
    description: 'הסבר ברור על כל סעיף וכל שלב, כדי שתבינו בדיוק על מה אתם חותמים.',
  },
]

export function WhyWorkWithMe() {
  return (
    <section className="bg-white py-20">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal className="lg:order-2">
          <div className="gradient-border overflow-hidden rounded-2xl shadow-navy">
            <img
              src={secondaryPhoto}
              alt="עו״ד שגיא ויין"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:order-1">
          <Reveal>
            <SectionHeading eyebrow="למה איתי" title="ליווי משפטי שאתם באמת מרגישים" />
          </Reveal>
          <Reveal stagger className="mt-8 space-y-6">
            {points.map(({ icon: Icon, title, description }) => (
              <RevealItem key={title} className="group flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-metallic bg-[length:200%_auto] shadow-gold transition-[background-position] duration-500 group-hover:bg-right">
                  <Icon className="h-5 w-5 text-navy" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
