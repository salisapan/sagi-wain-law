import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Article } from '@/types/content'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to={`/articles/${article.slug}`} className="group block h-full">
      <Card className="gradient-border h-full border-border/60 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-gold">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{article.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-light transition-transform duration-300 group-hover:-translate-x-1">
            לקריאת המאמר
            <ArrowLeft className="h-3.5 w-3.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
