# התראת ליד חדש — הגדרה

שולח מייל התראה לעו"ד שגיא ויין בכל פעם שמישהו שולח את טופס יצירת הקשר באתר,
דרך Resend. הפונקציה כתובה ומוכנה; היא דורשת כמה צעדים חד-פעמיים בדשבורד של
Supabase ו-Resend כדי לעלות לאוויר (לסביבה הזו אין פרטי גישה לאף אחד מהם,
כך שהצעדים האלה לא בוצעו בפועל).

## 1. הקמת פרויקט Supabase נפרד לאתר הזה

בהתאם להחלטה עם הלקוח — הפרויקט הזה משתמש ב-Supabase **נפרד** מ-realrtade, לא
משותף. יש ליצור פרויקט חדש ב-https://supabase.com, ולעדכן את `supabase/config.toml`
עם ה-`project_id` שלו, ואת משתני הסביבה `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
(ב-`.env` מקומי וב-Netlify).

## 2. הרצת המיגרציה

```bash
supabase link --project-ref <PROJECT_ID>
supabase db push
```

## 3. יצירת חשבון Resend וקבלת API key

1. הרשמה ב-https://resend.com.
2. אימות דומיין שליחה (Domains → Add Domain, ולהוסיף את רשומות ה-DNS).
   עד לאימות הדומיין, Resend מאפשר לשלוח רק לכתובת המייל של בעל החשבון.
3. יצירת API key (API Keys → Create API Key).
4. עדכון `FROM_ADDRESS` ב-`index.ts` לכתובת מהדומיין המאומת.

## 4. הגדרת ה-secrets

```bash
supabase secrets set RESEND_API_KEY=re_your_key_here
supabase secrets set LEAD_NOTIFY_EMAIL=sagi@example.com   # כתובת המייל האמיתית של שגיא
supabase secrets set LEADS_WEBHOOK_SECRET=$(openssl rand -hex 24)   # מומלץ, לא חובה
```

## 5. פריסת הפונקציה

```bash
supabase functions deploy send-lead-notification
```

הפקודה תדפיס את כתובת ה-URL של הפונקציה, לדוגמה:
`https://<project-ref>.supabase.co/functions/v1/send-lead-notification`

## 6. יצירת ה-Database Webhook

בדשבורד של Supabase: **Database → Webhooks → Create a new hook**

- שם: `sagi-wain-lead-notification`
- טבלה: `public.sagi_wain_leads`
- אירועים: `INSERT` בלבד
- סוג: `HTTP Request`
- כתובת: כתובת ה-URL מהשלב הקודם
- שיטה: `POST`
- כותרות: אם הוגדר `LEADS_WEBHOOK_SECRET`, יש להוסיף כותרת
  `x-webhook-secret: <אותו הערך>` כדי שהפונקציה תוכל לאמת שהבקשה הגיעה מה-webhook.

מרגע זה, כל שליחה של טופס יצירת הקשר תיצור שורה חדשה ב-`sagi_wain_leads` ותשלח
מייל התראה לכתובת שהוגדרה ב-`LEAD_NOTIFY_EMAIL`.
