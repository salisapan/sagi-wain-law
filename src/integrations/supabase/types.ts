// Minimal hand-written types for the tables this project uses.
// Once the real Supabase project is provisioned, regenerate with:
//   supabase gen types typescript --project-id <PROJECT_ID> > src/integrations/supabase/types.ts
export interface Database {
  public: {
    Tables: {
      sagi_wain_leads: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          message: string | null
          interest: string | null
          source: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          message?: string | null
          interest?: string | null
          source?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['sagi_wain_leads']['Insert']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
