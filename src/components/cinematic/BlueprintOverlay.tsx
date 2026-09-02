import { motion, type MotionValue } from 'framer-motion'

/**
 * An architectural line-drawing of the building, laid over the real photo
 * and faded out across the opening scroll — "the plan" resolving into
 * the real building, the exact turn a real-estate deal itself takes.
 */
export function BlueprintOverlay({ opacity }: { opacity: MotionValue<number> }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
      className="absolute inset-0 h-full w-full mix-blend-screen"
    >
      <defs>
        <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6FA3E0" strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>

      <rect width="800" height="1000" fill="url(#blueprint-grid)" />

      <g stroke="#9CC3EC" strokeWidth="1.4" fill="none" opacity="0.85">
        <rect x="470" y="140" width="230" height="780" />
        <rect x="520" y="60" width="130" height="860" />
        <rect x="220" y="260" width="180" height="680" />

        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`f1-${i}`} x1="470" x2="700" y1={140 + i * 43.3} y2={140 + i * 43.3} strokeWidth="0.7" opacity="0.5" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`f2-${i}`} x1="520" x2="650" y1={60 + i * 43} y2={60 + i * 43} strokeWidth="0.7" opacity="0.5" />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={`f3-${i}`} x1="220" x2="400" y1={260 + i * 45.3} y2={260 + i * 45.3} strokeWidth="0.7" opacity="0.5" />
        ))}
      </g>

      <g stroke="#E8F0FC" strokeWidth="2" fill="none" opacity="0.9">
        <path d="M40 40 L40 90 M40 40 L90 40" />
        <path d="M760 40 L760 90 M760 40 L710 40" />
        <path d="M40 960 L40 910 M40 960 L90 960" />
        <path d="M760 960 L760 910 M760 960 L710 960" />
      </g>

      <g stroke="#9CC3EC" strokeWidth="1" opacity="0.6">
        <line x1="150" y1="920" x2="700" y2="920" />
        <line x1="150" y1="910" x2="150" y2="930" />
        <line x1="700" y1="910" x2="700" y2="930" />
      </g>
    </motion.svg>
  )
}
