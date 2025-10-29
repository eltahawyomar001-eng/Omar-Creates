import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { z } from 'zod'

describe('Environment Validator', () => {
  const originalEnv = process.env

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv }
  })

  afterEach(() => {
    // Restore original env
    process.env = originalEnv
  })

  it('should pass with valid environment variables', () => {
    const envSchema = z.object({
      NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
      NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
      SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    })

    process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test_anon_key'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'test_service_role_key'

    const result = envSchema.safeParse(process.env)
    
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_SUPABASE_URL).toBe('https://example.supabase.co')
      expect(result.data.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe('test_anon_key')
    }
  })

  it('should fail with missing required variables', () => {
    const envSchema = z.object({
      NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
      NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    })

    process.env.NEXT_PUBLIC_SUPABASE_URL = '' // Invalid: empty string
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = '' // Invalid: empty string

    const result = envSchema.safeParse(process.env)
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0)
    }
  })

  it('should fail with invalid URL format', () => {
    const envSchema = z.object({
      NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    })

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'not-a-valid-url'

    const result = envSchema.safeParse(process.env)
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid url')
    }
  })

  it('should use default values when optional vars are missing', () => {
    const envSchema = z.object({
      NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
    })

    // Don't set the optional var
    delete process.env.NEXT_PUBLIC_SITE_URL

    const result = envSchema.safeParse(process.env)
    
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.NEXT_PUBLIC_SITE_URL).toBe('http://localhost:3000')
    }
  })
})
