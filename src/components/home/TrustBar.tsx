import { GraduationCap, ShieldCheck, Users, Video } from 'lucide-react'

import { Reveal, RevealItem } from '@/components/shared/Reveal'

const items = [
  { icon: GraduationCap, label: 'בוגר המסלול האקדמי אונו' },
  { icon: Users, label: 'מאות לקוחות ליווה בעסקאות נדל״ן' },
  { icon: Video, label: 'יוצר תוכן משפטי מוביל ברשתות' },
  { icon: ShieldCheck, label: 'שיתוף פעולה עם משרד רוזן פלקסר ושות׳' },
]

export function TrustBar() {
  return (
    <section className="border-b border-border bg-white py-10">
      <Reveal stagger className="container grid grid-cols-2 gap-6 sm:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <RevealItem key={label} className="group flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-metallic bg-[length:200%_auto] shadow-gold transition-[background-position,transform] duration-500 group-hover:scale-110 group-hover:bg-right">
              <Icon className="h-5 w-5 text-navy" strokeWidth={1.75} />
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}
