export function InstagramIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.15-1.4 4.3 4.3 0 0 1-1.15-2.92h-3.1v13.4a2.6 2.6 0 1 1-2.6-2.6c.28 0 .55.04.8.12v-3.14a5.7 5.7 0 1 0 4.9 5.65V9.06a7.35 7.35 0 0 0 4.3 1.38V7.34c-.01 0-.01 0 0 0v-1.52Z" />
    </svg>
  )
}

export function WhatsAppIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.35.65 4.55 1.79 6.44L3 29l7.73-2.75a12.9 12.9 0 0 0 5.28 1.12h.01c6.63 0 12.01-5.38 12.01-12.01C28.02 8.73 22.64 3 16.01 3Zm0 22.02h-.01a9.98 9.98 0 0 1-5.08-1.39l-.36-.22-3.79 1.35 1.35-3.65-.24-.38a9.96 9.96 0 0 1-1.55-5.33c0-5.53 4.5-10.02 10.03-10.02 2.68 0 5.19 1.04 7.08 2.94a9.95 9.95 0 0 1 2.94 7.08c0 5.53-4.5 10.02-10.02 10.02Zm5.51-7.51c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.51-1.79-1.69-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.15 4.54.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  )
}
