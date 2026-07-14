import type { MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Play } from 'lucide-react'

import { InstagramIcon, TikTokIcon } from '@/components/shared/SocialIcons'
import type { MediaItem } from '@/types/content'

const PlatformIcon = { instagram: InstagramIcon, tiktok: TikTokIcon }

export function MediaCard({ item }: { item: MediaItem }) {
  const Icon = PlatformIcon[item.platform]

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="group gradient-border relative block aspect-[3/4] overflow-hidden rounded-xl border border-border/60 shadow-sm transition-shadow duration-500 hover:shadow-gold-lg"
    >
      <img
        src={item.thumbnail}
        alt={item.caption}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold-metallic bg-[length:200%_auto] shadow-gold">
        <Icon className="h-4 w-4 text-navy" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex translate-y-1 flex-col gap-1 p-4 transition-transform duration-500 group-hover:translate-y-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Play className="h-4 w-4 text-white" fill="white" strokeWidth={0} />
        </div>
        <p className="text-sm font-medium leading-snug text-white">{item.caption}</p>
        {item.views && <p className="text-xs text-gold-light">{item.views}</p>}
      </div>
    </motion.a>
  )
}
