import { createClient } from '@supabase/supabase-js'

import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars are not set. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example) before the contact form can save leads.',
  )
}

// Falls back to a syntactically valid placeholder URL so createClient doesn't
// throw at module load before real env vars are configured; isSupabaseConfigured
// gates actual usage (see ContactForm).
export const supabase = createClient<Database>(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder-anon-key',
)
