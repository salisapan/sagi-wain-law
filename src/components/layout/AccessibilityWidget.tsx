import { useEffect, useState } from 'react'
import { Accessibility, Minus, Plus, RotateCcw, Underline, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

const FONT_STEPS = [100, 112, 125, 137, 150]

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [fontStepIndex, setFontStepIndex] = useState(0)
  const [highContrast, setHighContrast] = useState(false)
  const [underlineLinks, setUnderlineLinks] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${FONT_STEPS[fontStepIndex]}%`
  }, [fontStepIndex])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-contrast', highContrast)
  }, [highContrast])

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-underline', underlineLinks)
  }, [underlineLinks])

  const reset = () => {
    setFontStepIndex(0)
    setHighContrast(false)
    setUnderlineLinks(false)
  }

  return (
    <div className="fixed bottom-6 end-6 z-40">
      {open && (
        <div className="mb-3 w-72 rounded-lg border border-border bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-primary">נגישות</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="סגירת תפריט נגישות"
              className="rounded p-1 text-muted-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>גודל טקסט</span>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => setFontStepIndex((i) => Math.max(0, i - 1))}
                  aria-label="הקטנת טקסט"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => setFontStepIndex((i) => Math.min(FONT_STEPS.length - 1, i + 1))}
                  aria-label="הגדלת טקסט"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>ניגודיות גבוהה</span>
              <Button
                size="sm"
                variant={highContrast ? 'default' : 'outline'}
                onClick={() => setHighContrast((v) => !v)}
              >
                {highContrast ? 'פעיל' : 'כבוי'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Underline className="h-4 w-4" /> קו תחתון לקישורים
              </span>
              <Button
                size="sm"
                variant={underlineLinks ? 'default' : 'outline'}
                onClick={() => setUnderlineLinks((v) => !v)}
              >
                {underlineLinks ? 'פעיל' : 'כבוי'}
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="w-full justify-center gap-1.5" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" />
              איפוס הגדרות
            </Button>
          </div>
        </div>
      )}

      <Button
        size="icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="פתיחת תפריט נגישות"
        className="h-14 w-14 rounded-full bg-navy text-white shadow-lg hover:bg-navy-light"
      >
        <Accessibility className="h-7 w-7" />
      </Button>
    </div>
  )
}
