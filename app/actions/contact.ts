'use server'

import { z } from 'zod'
import { createServerAnonClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import type { MessageInsert } from '@/types/db'

const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

type ActionResult = {
  success: boolean
  message: string
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResult> {
  try {
    // Validate input
    const validated = contactSchema.parse(data)

    // Insert into messages table (using anon client with RLS)
    const supabase = createServerAnonClient()
    
    const messageData: MessageInsert = {
      name: validated.name || null,
      email: validated.email || null,
      body: validated.message,
      source: 'contact_form',
    }
    
    // @ts-expect-error - Supabase type inference issue with messages table
    const { error: dbError } = await supabase.from('messages').insert(messageData)

    if (dbError) {
      console.error('Database error:', dbError)
      return {
        success: false,
        message: 'Failed to send message. Please try again.',
      }
    }

    // Send email notification if configured
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL_TO) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: process.env.CONTACT_EMAIL_FROM || 'noreply@omarcreates.com',
          to: process.env.CONTACT_EMAIL_TO,
          subject: 'New Contact Form Submission',
          text: `
Name: ${validated.name || 'Not provided'}
Email: ${validated.email || 'Not provided'}
Message:
${validated.message}
          `.trim(),
        })
      } catch (emailError) {
        // Log but don't fail the request
        console.error('Email error (non-fatal):', emailError)
      }
    }

    return {
      success: true,
      message: 'Message sent successfully!',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0]?.message || 'Invalid input',
      }
    }

    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}
