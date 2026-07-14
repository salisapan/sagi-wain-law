import { Link } from 'react-router-dom'

import { practiceAreas } from '@/data/practiceAreas'
import { siteConfig } from '@/data/siteConfig'
import { InstagramIcon, TikTokIcon } from '@/components/shared/SocialIcons'
import { Logo } from '@/components/shared/Logo'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-radial text-white noise-overlay">
      <div className="h-px w-full bg-gold-metallic bg-[length:200%_auto] animate-gradient-x" />
      <div className="container relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7" />
            <span className="font-display text-lg font-semibold text-gradient-gold">עו״ד שגיא ויין</span>
          </Link>
          <p className="text-sm leading-relaxed text-white/70">
            ליווי משפטי בעסקאות נדל״ן — בדיקת חוזים, שכירות, ירושה וליווי משקיעים.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-base font-semibold text-gold-light">תחומי התמחות</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <Link to={`/services/${area.slug}`} className="transition-colors hover:text-gold-light">
                  {area.navTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-base font-semibold text-gold-light">ניווט</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link to="/about" className="transition-colors hover:text-gold-light">
                אודות
              </Link>
            </li>
            <li>
              <Link to="/articles" className="transition-colors hover:text-gold-light">
                מאמרים
              </Link>
            </li>
            <li>
              <Link to="/media" className="transition-colors hover:text-gold-light">
                מדיה
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="transition-colors hover:text-gold-light">
                עדויות
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-gold-light">
                יצירת קשר
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-base font-semibold text-gold-light">יצירת קשר</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>{siteConfig.phoneDisplay}</li>
            <li>{siteConfig.addressDisplay}</li>
          </ul>
          <div className="flex gap-3 pt-2">
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="אינסטגרם"
              className="rounded-full border border-white/20 p-2 transition-colors hover:border-gold-light hover:text-gold-light"
            >
              <InstagramIcon />
            </a>
            <a
              href={siteConfig.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="טיקטוק"
              className="rounded-full border border-white/20 p-2 transition-colors hover:border-gold-light hover:text-gold-light"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col items-center justify-between gap-3 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} עו״ד שגיא ויין. כל הזכויות שמורות.</p>
          <div className="flex gap-4">
            <Link to="/accessibility-statement" className="hover:text-gold-light">
              הצהרת נגישות
            </Link>
            <Link to="/privacy-policy" className="hover:text-gold-light">
              מדיניות פרטיות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
