import { z } from 'zod';

/**
 * Environment variable validation schema
 * Validates both client-side (NEXT_PUBLIC_*) and server-side variables
 */

const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // Client-side variables (NEXT_PUBLIC_*)
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),

  // Supabase (required)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url({
    message: 'NEXT_PUBLIC_SUPABASE_URL must be a valid URL',
  }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, {
    message: 'NEXT_PUBLIC_SUPABASE_ANON_KEY is required',
  }),

  // Server-only Supabase variables
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, {
    message: 'SUPABASE_SERVICE_ROLE_KEY is required for server operations',
  }),

  // Optional email service (Resend)
  RESEND_API_KEY: z.string().optional(),

  // Optional SMTP configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
});

/**
 * Client-safe environment variables schema
 * Only includes NEXT_PUBLIC_* variables that are safe to expose
 */
const clientEnvSchema = envSchema.pick({
  NODE_ENV: true,
  NEXT_PUBLIC_SITE_URL: true,
  NEXT_PUBLIC_SUPABASE_URL: true,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: true,
});

type Env = z.infer<typeof envSchema>;
type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Validates and returns environment variables
 * Throws descriptive errors if validation fails
 */
function validateEnv(): Env {
  const isServer = typeof window === 'undefined';

  // In production, ensure all required variables are set
  const isProd = process.env.NODE_ENV === 'production';

  try {
    if (isServer) {
      // Server-side: validate all variables
      const parsed = envSchema.safeParse(process.env);

      if (!parsed.success) {
        const errors = parsed.error.errors
          .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
          .join('\n');

        throw new Error(
          `❌ Environment validation failed:\n${errors}\n\n` +
            `Please check your .env file and ensure all required variables are set.\n` +
            `See .env.example for reference.`
        );
      }

      return parsed.data;
    } else {
      // Client-side: only validate NEXT_PUBLIC_* variables
      const parsed = clientEnvSchema.safeParse({
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      });

      if (!parsed.success) {
        const errors = parsed.error.errors
          .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
          .join('\n');

        console.error(
          `❌ Client environment validation failed:\n${errors}\n\n` +
            `This is a critical error. The application may not function correctly.`
        );
      }

      return parsed.data as Env;
    }
  } catch (error) {
    if (isProd) {
      // In production, fail hard
      throw error;
    } else {
      // In development, log and continue (for better DX)
      console.error(error);
      return process.env as Env;
    }
  }
}

/**
 * Validated environment variables
 * Use this throughout your application instead of process.env
 */
export const env = validateEnv();

/**
 * Type-safe helper to check if we're on the server
 */
export const isServer = typeof window === 'undefined';

/**
 * Type-safe helper to check if we're in production
 */
export const isProd = env.NODE_ENV === 'production';

/**
 * Type-safe helper to check if we're in development
 */
export const isDev = env.NODE_ENV === 'development';
