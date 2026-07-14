import { AlertTriangle } from 'lucide-react'

export function DraftBanner() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
      <p>
        <strong>טיוטה</strong> — מאמר זה טרם פורסם באופן רשמי וממתין לאישור תוכן סופי מעו״ד
        שגיא ויין. אינו מיועד לשיתוף ציבורי בשלב זה.
      </p>
    </div>
  )
}
