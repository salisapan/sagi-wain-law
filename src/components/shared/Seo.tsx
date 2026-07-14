import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
}

export function Seo({ title, description }: SeoProps) {
  const fullTitle = `${title} | עו״ד שגיא ויין`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  )
}
