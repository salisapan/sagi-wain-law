/**
 * All Home-page-scroll-driven cinematic effects (camera orbit, shader palette,
 * spark turbulence, grid progress dashes) must agree on the same 0..1 progress
 * value. That value is scoped to the 900vh slides track itself, not the whole
 * document — the page also has a testimonials section below the track, so a
 * whole-document ratio would never reach 1.0 by the time the track ends.
 */
export function getHomeScrollProgress(): number {
  const track = document.querySelector('[data-cinematic-track]') as HTMLElement | null
  if (!track) return 0

  const rect = track.getBoundingClientRect()
  const trackTop = window.scrollY + rect.top
  const trackHeight = track.offsetHeight
  const maxScroll = trackHeight - window.innerHeight
  if (maxScroll <= 0) return 0

  const progress = (window.scrollY - trackTop) / maxScroll
  return Math.min(1, Math.max(0, progress))
}
