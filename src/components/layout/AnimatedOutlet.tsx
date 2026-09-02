import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'

import { easeOut } from '@/lib/motion'

export function AnimatedOutlet() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        style={{ transformOrigin: 'top center' }}
        initial={{ opacity: 0, y: 14, scaleY: 0.97, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, scaleY: 0.985, filter: 'blur(6px)' }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
