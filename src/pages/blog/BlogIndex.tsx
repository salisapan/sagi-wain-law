import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { Button } from '@/components/ui/button'
import { ArticleCard } from '@/components/blog/ArticleCard'
import { Reveal, RevealItem } from '@/components/shared/Reveal'
import { publishedArticles } from '@/data/articles'

export default function BlogIndex() {
  const articles = publishedArticles()

  return (
    <>
      <Seo title="מאמרים" description="מאמרים בנושאי נדל״ן, חוזים, שכירות וירושה מאת עו״ד שגיא ויין." />

      <PageHero eyebrow="מאמרים" description="תוכן משפטי בשפה פשוטה, בנושאי נדל״ן שרלוונטיים לכל אחד." title="מאמרים" />

      <section className="bg-white py-16">
        <div className="container">
          {articles.length > 0 ? (
            <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <RevealItem key={article.slug}>
                  <ArticleCard article={article} />
                </RevealItem>
              ))}
            </Reveal>
          ) : (
            <div className="mx-auto max-w-xl rounded-lg border-2 border-dashed border-gold/30 bg-cream p-12 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-gold/60" />
              <h2 className="mt-4 font-display text-xl font-semibold text-primary">מאמרים בדרך</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                אנחנו עובדים על תוכן ראשון. בינתיים אפשר לעקוב אחרי התוכן השוטף באינסטגרם ובטיקטוק,
                או לפנות אליי ישירות בכל שאלה.
              </p>
              <Button asChild variant="gold" className="mt-6">
                <Link to="/contact">יצירת קשר</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
