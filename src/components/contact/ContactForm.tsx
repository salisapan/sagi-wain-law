import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { practiceAreas } from '@/data/practiceAreas'
import { isSupabaseConfigured, supabase } from '@/integrations/supabase/client'

const formSchema = z.object({
  name: z.string().min(2, 'יש להזין שם מלא'),
  phone: z.string().min(9, 'יש להזין מספר טלפון תקין'),
  email: z.string().email('כתובת אימייל לא תקינה').optional().or(z.literal('')),
  interest: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', phone: '', email: '', interest: '', message: '' },
  })

  async function onSubmit(values: FormValues) {
    if (!isSupabaseConfigured) {
      toast.error('טופס יצירת הקשר טרם חובר למסד הנתונים. יש ליצור קשר בוואטסאפ או בטלפון בינתיים.')
      return
    }

    const { error } = await supabase.from('sagi_wain_leads').insert({
      name: values.name,
      phone: values.phone,
      email: values.email || null,
      interest: values.interest || null,
      message: values.message || null,
      source: 'website-contact-form',
    })

    if (error) {
      toast.error('אירעה שגיאה בשליחת הפנייה. אפשר לנסות שוב או ליצור קשר בוואטסאפ.')
      return
    }

    toast.success('הפנייה נשלחה בהצלחה! אחזור אליכם בהקדם.')
    setSubmitted(true)
    form.reset()
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-gold/30 bg-white/[0.03] p-8 text-center backdrop-blur-md">
        <h3 className="font-display text-xl font-semibold text-gold-light">תודה על הפנייה!</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          קיבלתי את הפרטים שלכם ואחזור אליכם בהקדם האפשרי.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>שם מלא</FormLabel>
              <FormControl>
                <Input placeholder="ישראל ישראלי" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>טלפון</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="050-0000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>אימייל (לא חובה)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel>באיזה נושא מדובר?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="בחירת תחום (לא חובה)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {practiceAreas.map((area) => (
                    <SelectItem key={area.slug} value={area.slug}>
                      {area.navTitle}
                    </SelectItem>
                  ))}
                  <SelectItem value="other">אחר</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ספרו לי בקצרה במה מדובר (לא חובה)</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="לדוגמה: קיבלתי חוזה מכר וארצה שתעבור עליו לפני שאני חותם/ת" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="gold" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              שולח...
            </>
          ) : (
            <>
              שליחת פנייה
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
