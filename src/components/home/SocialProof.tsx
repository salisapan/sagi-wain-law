import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { InstagramIcon, TikTokIcon } from '@/components/shared/SocialIcons'
import { siteConfig } from '@/data/siteConfig'

export function SocialProof() {
  return (
    <section className="bg-white py-20">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="תוכן משפטי בגובה העיניים"
            title="עוקבים אחריי ברשתות"
            description="תוכן שוטף בנושאי נדל״ן, חוזים ושכירות — בשפה פשוטה, בלי ז׳רגון משפטי."
            className="mx-auto"
          />
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-6 sm:mx-auto sm:max-w-2xl sm:grid-cols-2">
          <RevealItem>
            <Card className="gradient-border flex h-full flex-col items-center gap-3 border-border/60 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-gold">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-metallic bg-[length:200%_auto] shadow-gold">
                <InstagramIcon className="h-6 w-6 text-navy" />
              </div>
              <p className="font-display text-lg font-semibold text-primary">אינסטגרם</p>
              <p className="text-sm text-muted-foreground">{siteConfig.instagramHandle}</p>
              <Button asChild variant="outline" size="sm">
                <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
                  מעבר לפרופיל
                </a>
              </Button>
            </Card>
          </RevealItem>

          <RevealItem>
            <Card className="gradient-border flex h-full flex-col items-center gap-3 border-border/60 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-gold">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-metallic bg-[length:200%_auto] shadow-gold">
                <TikTokIcon className="h-6 w-6 text-navy" />
              </div>
              <p className="font-display text-lg font-semibold text-primary">טיקטוק</p>
              <p className="text-sm text-muted-foreground">{siteConfig.tiktokHandle}</p>
              <Button asChild variant="outline" size="sm">
                <a href={siteConfig.tiktokUrl} target="_blank" rel="noreferrer">
                  מעבר לפרופיל
                </a>
              </Button>
            </Card>
          </RevealItem>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <Link
            to="/media"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-dark transition-transform hover:-translate-x-1"
          >
            לצפייה בעוד תוכן בעמוד המדיה
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
