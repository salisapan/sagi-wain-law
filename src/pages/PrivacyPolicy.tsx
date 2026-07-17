import { Seo } from '@/components/shared/Seo'
import { PageHero } from '@/components/shared/PageHero'
import { siteConfig } from '@/data/siteConfig'

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="מדיניות פרטיות" description="מדיניות הפרטיות של אתר עו״ד שגיא ויין." />

      <PageHero eyebrow="פרטיות" title="מדיניות פרטיות" />

      <section className="bg-black/30 py-16 backdrop-blur-sm">
        <div className="container max-w-3xl space-y-6 leading-relaxed text-white/80">
          <p>
            מדיניות פרטיות זו מתארת כיצד אנו אוספים ומשתמשים במידע שאתם מוסרים באמצעות
            טופס יצירת הקשר באתר זה.
          </p>

          <h2 className="text-xl font-semibold text-gold-light">איזה מידע נאסף</h2>
          <p>
            בעת שליחת טופס יצירת קשר, נאסף המידע שאתם מוסרים באופן יזום: שם מלא, מספר
            טלפון, כתובת אימייל (אם סופקה), תחום העניין ותוכן הפנייה.
          </p>

          <h2 className="text-xl font-semibold text-gold-light">כיצד נעשה שימוש במידע</h2>
          <p>
            המידע משמש אך ורק לצורך יצירת קשר חוזר עמכם בהתאם לפנייתכם, ואינו מועבר לצד
            שלישי כלשהו למטרות שיווקיות.
          </p>

          <h2 className="text-xl font-semibold text-gold-light">אבטחת מידע</h2>
          <p>
            המידע הנאסף נשמר באמצעות ספק תשתית מאובטח, וגישה אליו מוגבלת לצורך מענה לפניות
            בלבד.
          </p>

          <h2 className="text-xl font-semibold text-gold-light">פנייה בנושא פרטיות</h2>
          <p>
            לכל שאלה או בקשה בנוגע למידע שנמסר, ניתן לפנות בכתובת{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-gold-light hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>

          <p className="text-sm text-white/60">
            מדיניות זו עודכנה לאחרונה בתאריך {new Date().toLocaleDateString('he-IL')}.
          </p>
        </div>
      </section>
    </>
  )
}
