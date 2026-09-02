import { useRef, type MouseEvent } from 'react'

/**
 * Tracks the cursor position over an element as CSS custom properties
 * (--spot-x/--spot-y), for the `.spotlight` cursor-glow utility in
 * index.css. Writes via a ref instead of React state so hovering never
 * triggers a re-render.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  function onMouseMove(e: MouseEvent<T>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  return { ref, onMouseMove }
}
