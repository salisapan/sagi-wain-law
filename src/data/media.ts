import type { MediaItem } from '@/types/content'
import { siteConfig } from '@/data/siteConfig'

import thumb1 from '@/assets/media/ig-1.jpg'
import thumb3 from '@/assets/media/ig-3.jpg'
import thumb4 from '@/assets/media/ig-4.jpg'
import thumb5 from '@/assets/media/ig-5.jpg'

// Thumbnails are cropped stills from Adv. Wain's own public Instagram/TikTok
// content (screenshots he supplied). No Facebook material has been supplied
// yet — add a `platform: 'facebook'` section here once it is.
//
// ig-6.data.ts (property-condition clip) is excluded: the stored JPEG decodes
// to solid black pixel data (verified in isolation, outside any component/CSS)
// even though its header/dimensions are valid — the crop itself is corrupted.
// Needs a fresh screenshot re-supplied to bring that item back.
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
]
