import { StatCounter } from '@/components/shared/StatCounter'
import { testimonials } from '@/data/testimonials'
import { practiceAreas } from '@/data/practiceAreas'
import { publishedArticles } from '@/data/articles'

/** Real, derived counts only — never invented years-of-experience or deal figures. */
export function TrustStats({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-x-14 gap-y-6 border-y border-white/10 py-8 ${className ?? ''}`}>
      <StatCounter value={testimonials.length} label="עדויות לקוחות" />
      <StatCounter value={practiceAreas.length} label="תחומי התמחות" />
      <StatCounter value={publishedArticles().length} label="מאמרים מקצועיים" />
    </div>
  )
}
