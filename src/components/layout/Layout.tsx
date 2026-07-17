import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { AccessibilityWidget } from '@/components/layout/AccessibilityWidget'
import { AnimatedOutlet } from '@/components/layout/AnimatedOutlet'
import { CinematicScene } from '@/components/cinematic/CinematicScene'
import { CinematicCursor } from '@/components/cinematic/CinematicCursor'
import { CinematicGrid } from '@/components/cinematic/CinematicGrid'
import { Toaster } from '@/components/ui/sonner'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <CinematicScene />
      <CinematicCursor />
      <CinematicGrid />
      <Header />
      <main className="relative z-10 flex-1">
        <AnimatedOutlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
      <Toaster />
    </div>
  )
}
