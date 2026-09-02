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
        initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
