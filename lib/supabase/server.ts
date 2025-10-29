import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';
import type { Database } from '@/types/db';

/**
 * Server-side Supabase client
 * Uses service role key for admin operations
 * ⚠️ Only use this in Server Components, API routes, or Server Actions
 */
export function createServerClient() {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Server-side Supabase client with anon key (RLS enforced)
 * Use this for operations that should respect Row Level Security
 */
export function createServerAnonClient() {
  return createClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Get a typed Supabase server client (admin)
 */
export const supabaseServer = createServerClient();

/**
 * Get a typed Supabase server client (anon - RLS enforced)
 */
export const supabaseServerAnon = createServerAnonClient();
