import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { ContactForm } from '@/components/contact/ContactForm'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { siteConfig } from '@/data/siteConfig'
import sagiPortrait from '@/assets/about/sagi-portrait.data'

export default function Contact() {
  return (
    <>
      <Seo
        title="יצירת קשר"
        description="קביעת פגישת היכרות ראשונית ללא עלות עם עו״ד שגיא ויין."
      />

      <PageHero
        eyebrow="יצירת קשר"
        title="בואו נדבר על העסקה שלכם"
        description="פגישת היכרות ראשונית ללא עלות — נבין יחד מה נכון לעשות."
      />

      <section className="bg-black/30 py-16 backdrop-blur-sm">
        <div className="container grid gap-12 lg:grid-cols-5">
          <Reveal className="gradient-border lg:col-span-3 rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-navy backdrop-blur-md sm:p-8">
            <ContactForm />
          </Reveal>

          <Reveal
            stagger
            delay={0.1}
            className="relative overflow-hidden rounded-lg border border-white/10 shadow-navy lg:col-span-2"
          >
            <img
              src={sagiPortrait}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-top opacity-[0.18]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
            <div className="relative space-y-6 p-6 sm:p-8">
              {[
                { icon: Phone, label: 'טלפון', value: siteConfig.phoneDisplay, href: undefined },
                { icon: MessageCircle, label: 'וואטסאפ', value: 'שליחת הודעה', href: siteConfig.whatsappHref },
                { icon: Mail, label: 'אימייל', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                { icon: MapPin, label: 'איפה נפגשים', value: siteConfig.addressDisplay, href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <RevealItem key={label} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-metallic bg-[length:200%_auto] shadow-gold">
                    <Icon className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <p className="font-medium text-gold-light">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-white/70 hover:text-gold-light">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/70">{value}</p>
                    )}
                  </div>
                </RevealItem>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
