interface GradientBlobsProps {
  variant?: 'hero' | 'cta'
}

/**
 * Decorative blurred, slowly-drifting radial-gradient blobs for dark
 * sections. Purely visual — aria-hidden, pointer-events disabled.
 */
export function GradientBlobs({ variant = 'hero' }: GradientBlobsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={
          'absolute -top-24 start-1/4 h-96 w-96 rounded-full bg-gold/20 blur-[100px] animate-blob-drift-slow ' +
          (variant === 'cta' ? 'opacity-60' : 'opacity-70')
        }
      />
      <div className="absolute top-1/3 end-0 h-80 w-80 translate-x-1/3 rounded-full bg-navy-light/40 blur-[110px] animate-blob-drift-slower" />
      <div className="absolute bottom-0 start-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-gold/10 blur-[90px] animate-blob-drift-slow" />
    </div>
  )
}
