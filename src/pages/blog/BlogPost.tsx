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

      <article className="bg-black/30 py-16 backdrop-blur-sm">
        <div className="container max-w-2xl">
          <Link to="/articles" className="inline-flex items-center gap-1.5 text-sm text-gold-light hover:underline">
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            כל המאמרים
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{article.title}</h1>

          {!article.published && (
            <div className="mt-6">
              <DraftBanner />
            </div>
          )}

          <div className="mt-8 space-y-5">
            {article.body.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          {article.sections && article.sections.length > 0 && (
            <div className="mt-10 space-y-10">
              {article.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-5">
                    {section.paragraphs.map((paragraph, j) => (
                      <p key={j} className="leading-relaxed text-white/80">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {article.sources && article.sources.length > 0 && (
            <div className="mt-12 border-t border-white/10 pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                מקורות ואסמכתאות
              </h2>
              <ol className="mt-3 space-y-1.5">
                {article.sources.map((source, i) => (
                  <li key={i} className="text-sm leading-relaxed text-white/60">
                    <span className="text-white/40">[{i + 1}]</span> {source}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-12 rounded-lg border border-gold/30 bg-white/[0.03] p-6 text-center backdrop-blur-md">
            <p className="text-sm leading-relaxed text-white/70">יש לכם שאלה בנושא דומה?</p>
            <Button asChild variant="gold" className="mt-4">
              <Link to="/contact">קביעת פגישת היכרות חינם</Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
