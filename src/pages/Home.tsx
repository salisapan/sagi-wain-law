import { Seo } from '@/components/shared/Seo'
import { Hero } from '@/components/home/Hero'
import { LegalBookReveal } from '@/components/home/LegalBookReveal'
import { TrustBar } from '@/components/home/TrustBar'
import { PracticeAreasGrid } from '@/components/home/PracticeAreasGrid'
import { WhyWorkWithMe } from '@/components/home/WhyWorkWithMe'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { SocialProof } from '@/components/home/SocialProof'
import { FinalCta } from '@/components/home/FinalCta'

export default function Home() {
  return (
    <>
      <Seo
        title="עורך דין נדל״ן"
        description="עו״ד שגיא ויין — ליווי משפטי בעסקאות נדל״ן: בדיקת חוזים, דיני שכירות, ירושה וצוואות וליווי משקיעים. פגישת היכרות ראשונית ללא עלות."
      />
      <Hero />
      <LegalBookReveal />
      <TrustBar />
      <PracticeAreasGrid />
      <WhyWorkWithMe />
      <TestimonialsSection />
      <SocialProof />
      <FinalCta />
    </>
  )
}
