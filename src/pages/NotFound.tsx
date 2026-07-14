import { Link } from 'react-router-dom'

import { Seo } from '@/components/shared/Seo'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <Seo title="עמוד לא נמצא" description="העמוד המבוקש לא נמצא." />
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-cream px-6 text-center">
        <p className="font-display text-6xl font-semibold text-gold">404</p>
        <h1 className="text-2xl font-semibold text-primary">העמוד לא נמצא</h1>
        <p className="max-w-md text-muted-foreground">
          ייתכן שהקישור שגוי או שהעמוד הוסר. אפשר לחזור לעמוד הבית ולנווט משם.
        </p>
        <Button asChild variant="gold">
          <Link to="/">חזרה לעמוד הבית</Link>
        </Button>
      </section>
    </>
  )
}
