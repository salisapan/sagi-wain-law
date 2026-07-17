import { useEffect, useRef } from 'react'

export function CinematicCursor() {
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (isCoarsePointer) return

    let cursorX = window.innerWidth / 2
    let cursorY = window.innerHeight / 2
    let outerX = cursorX
    let outerY = cursorY
    let rafId = 0

    function handleMouseMove(event: MouseEvent) {
      cursorX = event.clientX
      cursorY = event.clientY
      if (innerRef.current) {
        innerRef.current.style.left = `${cursorX}px`
        innerRef.current.style.top = `${cursorY}px`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    function animate() {
      rafId = requestAnimationFrame(animate)
      outerX += (cursorX - outerX) * 0.2
      outerY += (cursorY - outerY) * 0.2
      if (outerRef.current) {
        outerRef.current.style.left = `${outerX}px`
        outerRef.current.style.top = `${outerY}px`
      }
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="cinematic-cursor">
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
      />
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 transition-[width,height,background] duration-300"
      />
    </div>
  )
}
