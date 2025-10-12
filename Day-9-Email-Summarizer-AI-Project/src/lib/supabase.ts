import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
};

export type Email = {
  id: string;
  user_id: string;
  subject: string;
  sender: string;
  recipient: string;
  body: string;
  received_date: string;
  created_at: string;
  updated_at: string;
};

export type Summary = {
  id: string;
  email_id: string;
  user_id: string;
  summary_text: string;
  key_points: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
};