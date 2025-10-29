import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from '@/types/db';

/**
 * Client-side Supabase client
 * Uses anon key with RLS enforced
 * Safe to use in browser/client components
 */
export const supabaseClient = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Type-safe client singleton
 */
export const supabase = supabaseClient;
