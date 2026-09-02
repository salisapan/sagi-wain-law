import type { Easing } from 'framer-motion'

/**
 * The site's two motion curves. Defined once and reused everywhere instead
 * of ad-hoc bezier literals, so every reveal and transition feels like the
 * same hand drew it.
 */
export const easeOut: Easing = [0.22, 1, 0.36, 1]
export const easeInOut: Easing = [0.65, 0, 0.35, 1]
