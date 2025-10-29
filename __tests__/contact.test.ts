import { describe, it, expect } from 'vitest'
import { z } from 'zod'

describe('Contact Validator', () => {
  const contactSchema = z.object({
    name: z.string().optional(),
    email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
    body: z.string().min(20, 'Message must be at least 20 characters'),
  })

  it('should pass with valid body length (exactly 20 characters)', () => {
    const result = contactSchema.safeParse({
      body: '12345678901234567890', // exactly 20 chars
    })
    
    expect(result.success).toBe(true)
  })

  it('should pass with body longer than 20 characters', () => {
    const result = contactSchema.safeParse({
      body: 'This is a test message that is definitely longer than twenty characters.',
    })
    
    expect(result.success).toBe(true)
  })

  it('should pass with optional name and email included', () => {
    const result = contactSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      body: 'This is a valid message that is long enough to pass validation.',
    })
    
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('John Doe')
      expect(result.data.email).toBe('john@example.com')
    }
  })

  it('should pass with optional fields omitted', () => {
    const result = contactSchema.safeParse({
      body: 'This is a message without name or email but long enough.',
    })
    
    expect(result.success).toBe(true)
  })

  it('should pass with empty string email (optional)', () => {
    const result = contactSchema.safeParse({
      email: '',
      body: 'This is a valid message that is long enough to pass.',
    })
    
    expect(result.success).toBe(true)
  })

  it('should fail with body shorter than 20 characters', () => {
    const result = contactSchema.safeParse({
      body: 'Too short', // only 9 chars
    })
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Message must be at least 20 characters')
    }
  })

  it('should fail with body exactly 19 characters', () => {
    const result = contactSchema.safeParse({
      body: '1234567890123456789', // exactly 19 chars
    })
    
    expect(result.success).toBe(false)
  })

  it('should fail with empty body', () => {
    const result = contactSchema.safeParse({
      body: '',
    })
    
    expect(result.success).toBe(false)
  })

  it('should fail with missing body field', () => {
    const result = contactSchema.safeParse({
      name: 'John Doe',
    })
    
    expect(result.success).toBe(false)
  })

  it('should fail with invalid email format when email is provided', () => {
    const result = contactSchema.safeParse({
      email: 'not-an-email',
      body: 'This is a valid message that is long enough.',
    })
    
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please enter a valid email address')
    }
  })
})
