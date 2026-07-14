import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/button'
import { MediaCard } from '@/components/media/MediaCard'
import { InstagramIcon, TikTokIcon } from '@/components/shared/SocialIcons'
import { mediaItems } from '@/data/media'
import { siteConfig } from '@/data/siteConfig'

export default function Media() {
  return (
    <>
      <Seo
        title="מדיה"
        description="תוכן וידאו בנושאי נדל״ן, חוזים ושכירות מאת עו״ד שגיא ויין — מהעמודים באינסטגרם ובטיקטוק."
      />

      <PageHero
        eyebrow="מדיה"
        title="תוכן משפטי בגובה העיניים"
        description="קטעים נבחרים מהתוכן השוטף שלי באינסטגרם ובטיקטוק — נדל״ן, חוזים ושכירות בשפה פשוטה."
      />

      <section className="bg-white py-16">
        <Reveal stagger className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mediaItems.map((item) => (
            <RevealItem key={item.id}>
              <MediaCard item={item} />
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="container mt-14 flex flex-col items-center gap-4 rounded-xl border border-gold/20 bg-cream p-8 text-center">
          <p className="text-sm text-muted-foreground">
            העמודים מתעדכנים באופן שוטף בתוכן חדש — מוזמנים לעקוב לתוכן נוסף.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline">
              <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="gap-2">
                <InstagramIcon className="h-4 w-4" />
                אינסטגרם {siteConfig.instagramHandle}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={siteConfig.tiktokUrl} target="_blank" rel="noreferrer" className="gap-2">
                <TikTokIcon className="h-4 w-4" />
                טיקטוק {siteConfig.tiktokHandle}
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
