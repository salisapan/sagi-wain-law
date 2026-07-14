import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { AccessibilityWidget } from '@/components/layout/AccessibilityWidget'
import { AnimatedOutlet } from '@/components/layout/AnimatedOutlet'
import { BlueprintSkyline } from '@/components/shared/BlueprintSkyline'
import { Toaster } from '@/components/ui/sonner'

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <AnimatedOutlet />
      </main>
      <BlueprintSkyline />
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
      <Toaster />
    </div>
  )
}
