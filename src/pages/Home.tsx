import { Seo } from '@/components/shared/Seo'
import { CinematicSlides } from '@/components/cinematic/CinematicSlides'
import { CinematicTestimonials } from '@/components/home/CinematicTestimonials'

export default function Home() {
  return (
    <>
      <Seo
        title="עורך דין נדל״ן"
        description="עו״ד שגיא ויין — ליווי משפטי בעסקאות נדל״ן: בדיקת חוזים, דיני שכירות, ירושה וצוואות וליווי משקיעים. פגישת היכרות ראשונית ללא עלות."
      />
      <CinematicSlides />
      <CinematicTestimonials />
    </>
  )
}
