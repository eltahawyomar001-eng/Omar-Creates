'use server';

import { z } from 'zod';
import { supabaseServerAnon } from '@/lib/supabase/server';
import { env, isDev } from '@/lib/env';

/**
 * Simple in-memory rate limiter
 * Tracks submission attempts per IP address
 */
const rateLimitMap = new Map<
  string,
  { count: number; resetAt: number }
>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 3; // 3 attempts per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    // First attempt or window expired
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

/**
 * Waitlist form validation schema
 */
const waitlistSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  source: z.string().default('landing'),
  honeypot: z.string().optional(),
});

export type WaitlistFormState = {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
  };
};

/**
 * Send confirmation email (optional - only if RESEND or SMTP configured)
 */
async function sendConfirmationEmail(email: string): Promise<void> {
  // Skip if no email service configured
  if (!env.RESEND_API_KEY && !env.SMTP_HOST) {
    return;
  }

  try {
    if (env.RESEND_API_KEY) {
      // Use Resend
      const { Resend } = await import('resend');
      const resend = new Resend(env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Omar Creates <onboarding@omarcreates.com>',
        to: email,
        subject: "You're on the list! 🎉",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 16px; color: #1d1d1f;">Welcome to Omar Creates</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #6e6e73; margin-bottom: 24px;">
              Thanks for joining the waitlist! We'll keep you updated on new experiments, launches, and behind-the-scenes updates.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #6e6e73;">
              In the meantime, check out what we're working on at <a href="${env.NEXT_PUBLIC_SITE_URL}/experiments" style="color: #409cff; text-decoration: none;">omarcreates.com/experiments</a>
            </p>
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e5e7;">
              <p style="font-size: 14px; color: #6e6e73;">
                Omar Creates • Building micro-SaaS products
              </p>
            </div>
          </div>
        `,
      });
    }
    // TODO: Add SMTP fallback if needed
  } catch (error) {
    // Log error but don't fail the signup
    console.error('Failed to send confirmation email:', error);
  }
}

/**
 * Server action to add email to waitlist
 */
export async function addToWaitlist(
  prevState: WaitlistFormState | null,
  formData: FormData
): Promise<WaitlistFormState> {
  try {
    // Get IP from headers (for rate limiting)
    const ip = 'anonymous'; // In production, extract from headers

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return {
        success: false,
        message: 'Too many attempts. Please try again in a minute.',
      };
    }

    // Parse and validate form data
    const rawData = {
      email: formData.get('email'),
      source: formData.get('source') || 'landing',
      honeypot: formData.get('website'), // Honeypot field
    };

    // Check honeypot (bot detection)
    if (rawData.honeypot) {
      // Bot detected - silently succeed
      return {
        success: true,
        message: 'Thanks for joining! Check your email for confirmation.',
      };
    }

    const validationResult = waitlistSchema.safeParse(rawData);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return {
        success: false,
        message: 'Please check your email and try again.',
        errors: {
          email: errors.email,
        },
      };
    }

    const { email, source } = validationResult.data;

    // Insert into database (using anon client - RLS enforced)
    const { error: dbError } = await supabaseServerAnon
      .from('waitlist')
      .insert({
        email,
        source: source || 'landing',
      } as any);

    if (dbError) {
      // Check for duplicate email
      if (dbError.code === '23505') {
        // Unique constraint violation
        return {
          success: true, // Don't reveal that email exists
          message: "You're already on the list! We'll be in touch soon.",
        };
      }

      console.error('Database error:', dbError);
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      };
    }

    // Send confirmation email (async, non-blocking)
    if (!isDev) {
      sendConfirmationEmail(email).catch((err) =>
        console.error('Email send failed:', err)
      );
    }

    return {
      success: true,
      message: 'Thanks for joining! Check your email for confirmation.',
    };
  } catch (error) {
    console.error('Waitlist error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
