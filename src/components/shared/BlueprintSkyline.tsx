import { useId, useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface BuildingSpec {
  x: number
  w: number
  h: number
  cols: number
  rows: number
  antenna?: boolean
}

const BASELINE = 150

const BUILDINGS: BuildingSpec[] = [
  { x: 15, w: 70, h: 70, cols: 3, rows: 4 },
  { x: 98, w: 52, h: 108, cols: 2, rows: 6 },
  { x: 163, w: 78, h: 54, cols: 4, rows: 3 },
  { x: 254, w: 62, h: 132, cols: 3, rows: 7, antenna: true },
  { x: 328, w: 88, h: 78, cols: 4, rows: 4 },
  { x: 428, w: 58, h: 118, cols: 2, rows: 6 },
  { x: 498, w: 74, h: 62, cols: 3, rows: 3 },
  { x: 584, w: 84, h: 142, cols: 4, rows: 8, antenna: true },
  { x: 680, w: 68, h: 88, cols: 3, rows: 5 },
  { x: 758, w: 58, h: 58, cols: 2, rows: 3 },
  { x: 828, w: 48, h: 98, cols: 2, rows: 5 },
]

function windowRects(b: BuildingSpec) {
  const margin = 6
  const innerW = b.w - margin * 2
  const innerH = b.h - margin * 2
  const cellW = innerW / b.cols
  const cellH = innerH / b.rows
  const rects: { x: number; y: number; w: number; h: number }[] = []
  for (let r = 0; r < b.rows; r++) {
    for (let c = 0; c < b.cols; c++) {
      rects.push({
        x: b.x + margin + c * cellW + cellW * 0.18,
        y: BASELINE - b.h + margin + r * cellH + cellH * 0.18,
        w: cellW * 0.64,
        h: cellH * 0.64,
      })
    }
  }
  return rects
}

interface BuildingProps {
  spec: BuildingSpec
  start: number
  end: number
  scrollYProgress: MotionValue<number>
  gradientId: string
}

function Building({ spec, start, end, scrollYProgress, gradientId }: BuildingProps) {
  const maskId = useId()
  const { x, w, h, antenna } = spec
  const windows = windowRects(spec)

  const revealH = useTransform(scrollYProgress, [start, end], [0, h], { clamp: true })
  const revealY = useTransform(revealH, (rh) => BASELINE - rh)

  return (
    <g>
      {/* faint blueprint sketch — always visible */}
      <g stroke="#0B1E33" strokeOpacity={0.16} fill="none" strokeWidth={1}>
        <rect x={x} y={BASELINE - h} width={w} height={h} rx={2} />
        {windows.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} />
        ))}
        {antenna && (
          <line x1={x + w / 2} y1={BASELINE - h} x2={x + w / 2} y2={BASELINE - h - 16} strokeWidth={1.2} />
        )}
      </g>

      {/* gold "built" layer, revealed bottom-up as the page is scrolled */}
      <mask id={maskId}>
        <motion.rect x={x - 3} width={w + 6} height={revealH} y={revealY} fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect
          x={x}
          y={BASELINE - h}
          width={w}
          height={h}
          rx={2}
          fill={`url(#${gradientId})`}
          stroke="#9C6F0B"
          strokeWidth={1}
        />
        {windows.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="#0B1E33" fillOpacity={0.35} />
        ))}
        {antenna && (
          <line
            x1={x + w / 2}
            y1={BASELINE - h}
            x2={x + w / 2}
            y2={BASELINE - h - 16}
            stroke="#9C6F0B"
            strokeWidth={1.5}
          />
        )}
      </g>
    </g>
  )
}

/**
 * Blueprint-style illustrated skyline anchored at the bottom of the page.
 * Each building is a real line-art drawing (outline + window grid), sketched
 * faintly in navy at all times, and "built" in gold from the ground up as
 * the reader scrolls — fully grown by the time they reach the page bottom.
 */
export function BlueprintSkyline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })
  const gradientId = useId()
  const n = BUILDINGS.length

  return (
    <div ref={containerRef} className="relative h-40 w-full overflow-hidden bg-cream sm:h-48">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(11,30,51,0.06) 0, rgba(11,30,51,0.06) 1px, transparent 1px, transparent 20px)',
        }}
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 900 160"
        preserveAspectRatio="xMidYMax slice"
        className="relative h-full w-full drop-shadow-[0_0_18px_rgba(212,175,55,0.35)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#9C6F0B" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F0CC6C" />
          </linearGradient>
        </defs>

        <line x1="0" y1={BASELINE} x2="900" y2={BASELINE} stroke="#0B1E33" strokeOpacity={0.25} strokeWidth={1} />

        {BUILDINGS.map((b, i) => (
          <Building
            key={i}
            spec={b}
            start={i / n}
            end={(i + 1) / n}
            scrollYProgress={scrollYProgress}
            gradientId={gradientId}
          />
        ))}
      </svg>
    </div>
  )
}
