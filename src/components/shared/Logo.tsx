interface LogoProps {
  className?: string
}

let idCounter = 0

/** Bespoke scales-of-justice monogram in a gold-gradient ring, replacing the generic icon. */
export function Logo({ className = 'h-8 w-8' }: LogoProps) {
  const gradientId = `logo-gold-${(idCounter += 1)}`

  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5E7C4" />
          <stop offset="25%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#9C7A2E" />
          <stop offset="75%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#F5E7C4" />
        </linearGradient>
      </defs>

      <circle cx="20" cy="20" r="18" stroke={`url(#${gradientId})`} strokeWidth="1.3" />

      <line x1="20" y1="9" x2="20" y2="27" stroke={`url(#${gradientId})`} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10.5" y1="13" x2="29.5" y2="13" stroke={`url(#${gradientId})`} strokeWidth="1.6" strokeLinecap="round" />

      <path
        d="M10.5 13 L7 19.5 a4 4 0 0 0 7 0 Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M29.5 13 L26 19.5 a4 4 0 0 0 7 0 Z"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      <line x1="14.5" y1="29.5" x2="25.5" y2="29.5" stroke={`url(#${gradientId})`} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
