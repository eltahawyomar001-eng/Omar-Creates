import { describe, it, expect } from 'vitest'
import { z } from 'zod'

describe('Waitlist Validator', () => {
  const waitlistSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
  })

  it('should pass with valid email', () => {
    const result = waitlistSchema.safeParse({ email: 'test@example.com' })
    
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.email).toBe('test@example.com')
    }
  })

  it('should pass with various valid email formats', () => {
    const validEmails = [
      'user@domain.com',
      'user.name@domain.com',
      'user+tag@domain.co.uk',
      'user_name@sub.domain.com',
      '123@domain.com',
    ]

    validEmails.forEach((email) => {
      const result = waitlistSchema.safeParse({ email })
      expect(result.success).toBe(true)
    })
  })

  it('should fail with invalid email format', () => {
    const result = waitlistSchema.safeParse({ email: 'not-an-email' })
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address')
    }
  })

  it('should fail with missing @ symbol', () => {
    const result = waitlistSchema.safeParse({ email: 'testdomain.com' })
    
    expect(result.success).toBe(false)
  })

  it('should fail with missing domain', () => {
    const result = waitlistSchema.safeParse({ email: 'test@' })
    
    expect(result.success).toBe(false)
  })

  it('should fail with empty string', () => {
    const result = waitlistSchema.safeParse({ email: '' })
    
    expect(result.success).toBe(false)
  })

  it('should fail with whitespace only', () => {
    const result = waitlistSchema.safeParse({ email: '   ' })
    
    expect(result.success).toBe(false)
  })

  it('should fail with missing email field', () => {
    const result = waitlistSchema.safeParse({})
    
    expect(result.success).toBe(false)
  })
})
