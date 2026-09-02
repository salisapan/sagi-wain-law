import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Lightbulb } from 'lucide-react'

import { Seo } from '@/components/shared/Seo'
import { Button } from '@/components/ui/button'
import { MagneticWrap } from '@/components/shared/MagneticWrap'
import { DraftBanner } from '@/components/blog/DraftBanner'
import { ArticleTOC } from '@/components/blog/ArticleTOC'
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
        {article.sections && article.sections.length > 1 && <ArticleTOC sections={article.sections} />}
        <div className="container max-w-2xl">
          <Link to="/articles" className="inline-flex items-center gap-1.5 text-sm text-gold-light hover:underline">
            <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            כל המאמרים
          </Link>

          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-5 font-display text-lg leading-relaxed text-white/60 sm:text-xl">{article.excerpt}</p>

          {!article.published && (
            <div className="mt-6">
              <DraftBanner />
            </div>
          )}

          <div className="mt-8 space-y-5">
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'leading-relaxed text-white/80 first-letter:me-2 first-letter:float-start first-letter:font-display first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-gold-light'
                    : 'leading-relaxed text-white/80'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="gradient-border mt-8 rounded-lg border border-gold/30 bg-white/[0.03] p-6 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-gold-light" strokeWidth={1.75} />
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">בתמצית</h2>
              </div>
              <ul className="mt-4 space-y-2.5">
                {article.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-light" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.sections && article.sections.length > 0 && (
            <div className="mt-10 space-y-10">
              {article.sections.map((section, i) => (
                <section key={i} id={`section-${i}`} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 font-display text-xl font-bold tracking-[-0.01em] text-white sm:text-2xl">
                    <span className="text-base font-normal text-gold-light/70">{String(i + 1).padStart(2, '0')}</span>
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
            <MagneticWrap className="mt-4 inline-block w-fit">
              <Button asChild variant="gold">
                <Link to="/contact">קביעת פגישת היכרות חינם</Link>
              </Button>
            </MagneticWrap>
          </div>
        </div>
      </article>
    </>
  )
}
