import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface EmailSummary {
  id: string
  email_subject: string
  email_body: string
  summary: string
  summary_length: 'short' | 'medium' | 'detailed'
  key_points: string[]
  created_at: string
  user_id?: string
}
