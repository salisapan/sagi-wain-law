import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { siteConfig } from '@/data/siteConfig'

export default function Accessibility() {
  return (
    <>
      <Seo title="הצהרת נגישות" description="הצהרת נגישות לאתר עו״ד שגיא ויין." />

      <PageHero eyebrow="נגישות" title="הצהרת נגישות" />

      <section className="bg-black/30 py-16 backdrop-blur-sm">
        <div className="container max-w-3xl space-y-6 leading-relaxed text-white/80">
          <p>
            אתר זה פועל במטרה לאפשר שימוש נגיש ונוח לכלל הגולשים, לרבות אנשים עם מוגבלות,
            בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013,
            ותקן ישראלי 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA.
          </p>

          <h2 className="text-xl font-semibold text-gold-light">התאמות הנגישות באתר</h2>
          <ul className="list-inside list-disc space-y-2">
            <li>ניתן להגדיל ולהקטין את גודל הטקסט באמצעות תפריט הנגישות הצף באתר.</li>
            <li>אפשרות למעבר למצב ניגודיות גבוהה.</li>
            <li>אפשרות להוספת קו תחתון לכלל הקישורים באתר לזיהוי קל יותר.</li>
            <li>האתר מותאם לניווט מקלדת ולתמיכה בקוראי מסך.</li>
            <li>מבנה עמודים אחיד וברור, עם כותרות היררכיות.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gold-light">שימוש בתפריט הנגישות</h2>
          <p>
            תפריט הנגישות זמין בלחיצה על סמל הנגישות הצף בפינת המסך. בתפריט ניתן לשלוט על
            גודל הטקסט, ניגודיות הצבעים והדגשת קישורים, וכן לאפס את כל ההגדרות בלחיצה אחת.
          </p>

          <h2 className="text-xl font-semibold text-gold-light">פנייה בנושא נגישות</h2>
          <p>
            במידה ונתקלתם בבעיית נגישות באתר, או שיש לכם הצעות לשיפור הנגישות, נשמח שתפנו
            אלינו בכתובת{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-gold-light hover:underline">
              {siteConfig.email}
            </a>
            . אנו פועלים לטפל בכל פנייה בהקדם האפשרי.
          </p>

          <p className="text-sm text-white/60">
            הצהרת נגישות זו עודכנה לאחרונה בתאריך {new Date().toLocaleDateString('he-IL')}.
          </p>
        </div>
      </section>
    </>
  )
}
