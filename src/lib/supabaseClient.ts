import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  'https://ehclvcukijwqcgzxbkdo.supabase.co';

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoY2x2Y3VraWp3cWNnenhia2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNDQ2MTEsImV4cCI6MjEwNDcyMDYxMX0._K8C2bfBALgPxsyiZz9IXhNV2guQtNcVATepCC_8t6w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
