import { siteConfig } from '@/data/siteConfig'
import { practiceAreas } from '@/data/practiceAreas'

export interface CinematicSlideContent {
  id: string
  label: string
  title: string
  columnA: string
  columnB: string
  cta?: { label: string; href: string }
}

export const cinematicSlides: CinematicSlideContent[] = [
  {
    id: 'slide-1',
    label: 'היכרות',
    title: 'עו״ד שגיא ויין',
    columnA: 'ההגנה שלכם לפני שאתם חותמים — עורך דין נדל״ן.',
    columnB:
      'בדיקת חוזים, דיני שכירות, ירושה וצוואות וליווי משקיעים — עם ליווי אישי וזמין, לפני שאתם חותמים על כל מסמך.',
  },
  {
    id: 'slide-2',
    label: 'שירותים',
    title: 'ליווי משפטי בכל שלב של העסקה',
    columnA: practiceAreas.map((area) => area.navTitle).join(' · '),
    columnB: 'מבדיקת חוזה לפני חתימה ועד ליווי מלא מול הצד השני — ארבעה תחומים שבהם אני נותן מענה מלא.',
  },
  {
    id: 'slide-3',
    label: 'גישה שלי',
    title: 'איך אני עובד',
    columnA:
      'כל עסקת נדל״ן מתחילה בהבנה — של הצרכים שלכם, של הסיכונים בעסקה הספציפית, ושל מה שבאמת חשוב לכם להשיג. אני מאמין בליווי אישי וזמין, בהסברים בשפה פשוטה במקום ז׳רגון משפטי, ובבדיקה יסודית של כל מסמך לפני שהוא נחתם — לא אחרי.',
    columnB:
      'לצד העבודה השוטפת מול לקוחות, אני יוצר תוכן משפטי ברשתות החברתיות כדי לחשוף את הציבור הרחב לזכויות ולסיכונים שכדאי להכיר לפני כל עסקת נדל״ן.',
  },
  {
    id: 'slide-4',
    label: 'יצירת קשר',
    title: 'בואו נדבר',
    columnA: 'לפני שאתם חותמים על כל מסמך — בואו נדבר. פגישת היכרות ראשונית ללא עלות.',
    columnB: `${siteConfig.phoneDisplay} · וואטסאפ זמין · ${siteConfig.addressDisplay}`,
    cta: { label: 'קביעת פגישת היכרות חינם', href: '/contact' },
  },
]
