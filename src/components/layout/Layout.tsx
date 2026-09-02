import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { AccessibilityWidget } from '@/components/layout/AccessibilityWidget'
import { AnimatedOutlet } from '@/components/layout/AnimatedOutlet'
import { CinematicScene } from '@/components/cinematic/CinematicScene'
import { CinematicGrid } from '@/components/cinematic/CinematicGrid'
import { Toaster } from '@/components/ui/sonner'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-gold/30 focus:bg-navy/95 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-navy-lg focus:backdrop-blur-xl"
      >
        דלג לתוכן הראשי
      </a>
      <CinematicScene />
      <CinematicGrid />
      <Header />
      <main id="main" tabIndex={-1} className="relative z-10 flex-1 outline-none">
        <AnimatedOutlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
      <Toaster />
    </div>
  )
}
