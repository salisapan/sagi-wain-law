import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

import type { Testimonial } from '@/types/content'
import { cn } from '@/lib/utils'

export function TestimonialsColumn({
  className,
  testimonials,
  duration = 10,
}: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((loopIndex) => (
          <Fragment key={loopIndex}>
            {testimonials.map((testimonial, i) => (
              <div
                key={`${loopIndex}-${i}`}
                className={cn(
                  'w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/20 backdrop-blur-md',
                )}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-3.5 w-3.5 fill-gold-200 text-gold-200" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#d1d5db]">{testimonial.quote}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-metallic bg-[length:200%_auto] font-display text-sm font-semibold text-navy">
                    {testimonial.name.trim().charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-display text-sm font-medium leading-5 text-[#fff6ed]">
                      {testimonial.name}
                    </div>
                    <div className="text-xs leading-5 text-[#9a9a9a]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  )
}
