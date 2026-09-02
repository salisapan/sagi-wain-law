import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Seo } from '@/components/shared/Seo'
import { CinematicSlides } from '@/components/cinematic/CinematicSlides'
import { PracticeDossier } from '@/components/home/PracticeDossier'
import { AboutSection } from '@/components/home/AboutSection'
import { CinematicTestimonials } from '@/components/home/CinematicTestimonials'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    // Give the pinned 900vh hero above it a moment to lay out before measuring.
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(raf)
  }, [hash])

  return (
    <>
      <Seo
        title="עורך דין נדל״ן"
        description="עו״ד שגיא ויין — ליווי משפטי בעסקאות נדל״ן: בדיקת חוזים, דיני שכירות, ירושה וצוואות וליווי משקיעים. פגישת היכרות ראשונית ללא עלות."
      />
      <CinematicSlides />
      <AboutSection />
      <PracticeDossier />
      <CinematicTestimonials />
    </>
  )
}
