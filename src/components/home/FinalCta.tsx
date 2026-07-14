import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GradientBlobs } from '@/components/shared/GradientBlobs'
import { Reveal } from '@/components/shared/Reveal'
import { MagneticWrap } from '@/components/shared/MagneticWrap'

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy-radial py-20 text-white noise-overlay">
      <GradientBlobs variant="cta" />
      <Reveal as="section" className="container relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          לפני שאתם חותמים על כל מסמך —{' '}
          <span className="bg-gold-metallic bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
            בואו נדבר
          </span>
        </h2>
        <p className="max-w-xl text-lg text-white/80">
          פגישת היכרות ראשונית ללא עלות, לבדוק יחד מה נכון לעשות בעסקה שלכם.
        </p>
        <MagneticWrap>
          <Button asChild size="lg" variant="gold">
            <Link to="/contact">
              קביעת פגישת היכרות חינם
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </MagneticWrap>
      </Reveal>
    </section>
  )
}
