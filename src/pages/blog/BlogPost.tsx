import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { Button } from '@/components/ui/button'
import { DraftBanner } from '@/components/blog/DraftBanner'
import { getArticleBySlug } from '@/data/articles'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const article = getArticleBySlug(slug ?? '')

  if (!article) {
    return <Navigate to="/articles" replace />
  }

  return (
    <>
      <Seo title={article.title} description={article.excerpt} />

      <article className="bg-white py-16">
        <div className="container max-w-2xl">
          <Link to="/articles" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline">
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            כל המאמרים
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{article.title}</h1>

          {!article.published && (
            <div className="mt-6">
              <DraftBanner />
            </div>
          )}

          <div className="mt-8 space-y-5">
            {article.body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-charcoal">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-gold/30 bg-cream p-6 text-center">
            <p className="text-sm leading-relaxed text-muted-foreground">יש לכם שאלה בנושא דומה?</p>
            <Button asChild variant="gold" className="mt-4">
              <Link to="/contact">קביעת פגישת היכרות חינם</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
