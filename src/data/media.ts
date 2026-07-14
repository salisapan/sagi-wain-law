import type { MediaItem } from '@/types/content'
import { siteConfig } from '@/data/siteConfig'

import thumb1 from '@/assets/media/ig-1.data'
import thumb3 from '@/assets/media/ig-3.data'
import thumb4 from '@/assets/media/ig-4.data'
import thumb5 from '@/assets/media/ig-5.data'
import thumb6 from '@/assets/media/ig-6.data'

// Thumbnails are cropped stills from Adv. Wain's own public Instagram/TikTok
// content (screenshots he supplied). No Facebook material has been supplied
// yet — add a `platform: 'facebook'` section here once it is.
export const mediaItems: MediaItem[] = [
  {
    id: 'tax-40-percent',
    platform: 'instagram',
    thumbnail: thumb1,
    caption: 'כמעט 40% מס בעסקת נדל״ן — מתי זה קורה לכם',
    views: '36.5K צפיות',
    href: siteConfig.instagramUrl,
  },
  {
    id: 'rent-vs-buy',
    platform: 'instagram',
    thumbnail: thumb3,
    caption: 'שכירות מול קניית דירה — מה באמת משתלם',
    views: '38.8K צפיות',
    href: siteConfig.instagramUrl,
  },
  {
    id: 'missed-opportunities',
    platform: 'instagram',
    thumbnail: thumb4,
    caption: 'מפחדים לפספס הזדמנויות? הנה מה שכדאי לבדוק קודם',
    href: siteConfig.instagramUrl,
  },
  {
    id: 'construction-site',
    platform: 'instagram',
    thumbnail: thumb5,
    caption: 'ליווי משפטי בפרויקט בנייה — מהיסודות ועד המסירה',
    href: siteConfig.instagramUrl,
  },
  {
    id: 'property-condition',
    platform: 'instagram',
    thumbnail: thumb6,
    caption: 'בדיקת מצב הנכס לפני העסקה — למה זה קריטי',
    href: siteConfig.instagramUrl,
  },
]
