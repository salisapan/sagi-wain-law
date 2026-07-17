import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { getHomeScrollProgress } from '@/lib/cinematicScroll'

const DASH_COUNT = 4

export function CinematicGrid() {
  const location = useLocation()
  const isHomeRef = useRef(location.pathname === '/')
  const dotRefs = useRef<Array<HTMLDivElement | null>>([])
  const dashFillRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    isHomeRef.current = location.pathname === '/'
  }, [location.pathname])

  useEffect(() => {
    let rafId = 0
    let idleTime = 0
    const clockStart = performance.now()

    function animate() {
      rafId = requestAnimationFrame(animate)

      let scroll = 0
      if (isHomeRef.current) {
        scroll = getHomeScrollProgress()
      } else {
        idleTime = (performance.now() - clockStart) / 1000
        scroll = (Math.sin(idleTime * 0.05) + 1) / 2
      }

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return
        const startY = (i * 17) % 80 + 10
        let speed = 90 + (i * 55) % 180
        if (i % 2 === 0) speed = -speed
        let y = startY + scroll * speed
        y = ((y % 100) + 100) % 100
        dot.style.top = `${y}%`
      })

      if (isHomeRef.current) {
        for (let i = 1; i <= DASH_COUNT; i++) {
          const fill = dashFillRefs.current[i - 1]
          if (!fill) continue
          const start = (i - 1) * 0.25
          const end = i * 0.25
          let progress = (scroll - start) / (end - start)
          progress = Math.max(0, Math.min(1, progress))
          fill.style.height = `${progress * 100}%`
        }
      } else {
        dashFillRefs.current.forEach((fill) => {
          if (fill) fill.style.height = '0%'
        })
      }
    }
    animate()

    return () => cancelAnimationFrame(rafId)
  }, [])

  const lines = [0, 1, 2, 3, 4]

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-[70px] z-[5] h-px w-full bg-white/10" />
      <div className="pointer-events-none fixed inset-y-0 start-10 end-10 z-[5] flex h-screen justify-between">
        {lines.map((i) => (
          <div
            key={i}
            className={`relative h-full w-px bg-white/10 ${i === 2 ? 'mt-[70px] h-[calc(100%-70px)]' : ''}`}
          >
            <div
              ref={(el) => {
                dotRefs.current[i * 2] = el
              }}
              className="absolute start-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/35 shadow-[0_0_4px_rgba(255,255,255,0.15)]"
            />
            <div
              ref={(el) => {
                dotRefs.current[i * 2 + 1] = el
              }}
              className="absolute start-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/35 shadow-[0_0_4px_rgba(255,255,255,0.15)]"
            />
            {i === 4 && (
              <div className="absolute start-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-3">
                {Array.from({ length: DASH_COUNT }).map((_, dashIndex) => (
                  <div key={dashIndex} className="h-10 w-0.5 overflow-hidden rounded-sm bg-white/15">
                    <div
                      ref={(el) => {
                        dashFillRefs.current[dashIndex] = el
                      }}
                      className="w-full bg-white"
                      style={{ height: '0%' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
