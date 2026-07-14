/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      fontFamily: {
        display: ['Heebo', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Heebo', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          light: 'hsl(var(--accent-light))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        navy: {
          DEFAULT: '#0B1E33',
          light: '#16304F',
          950: '#050C16',
        },
        gold: {
          50: '#FFF6E0',
          100: '#FBE8B0',
          200: '#F0CC6C',
          300: '#E0B62D',
          DEFAULT: '#D4AF37',
          light: '#F0CC6C',
          dark: '#9C6F0B',
          700: '#9C6F0B',
          900: '#6B4A05',
        },
        charcoal: '#1C1F26',
        cream: '#FAF7F1',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        gold: '0 20px 60px -18px rgba(212,175,55,0.5)',
        'gold-lg': '0 30px 80px -20px rgba(212,175,55,0.6)',
        navy: '0 20px 60px -18px rgba(0,0,0,0.5)',
        'navy-lg': '0 30px 90px -20px rgba(0,0,0,0.65)',
      },
      backgroundImage: {
        'gold-metallic':
          'linear-gradient(135deg, #FFF6E0 0%, #F0CC6C 20%, #D4AF37 45%, #9C6F0B 70%, #F0CC6C 88%, #FFF6E0 100%)',
        'navy-radial': 'radial-gradient(circle at 30% 20%, #16304F 0%, #0B1E33 45%, #050C16 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '0% 0%' },
          to: { backgroundPosition: '200% 0%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'blob-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, 6%) scale(1.08)' },
          '66%': { transform: 'translate(-3%, -4%) scale(0.96)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0.45)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(201,162,39,0.35)' },
        },
        'marquee-right': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 5s ease-in-out infinite',
        'blob-drift-slow': 'blob-drift 18s ease-in-out infinite',
        'blob-drift-slower': 'blob-drift 24s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'glow-pulse': 'glow-pulse 2.8s ease-in-out infinite',
        'marquee-right': 'marquee-right 32s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
