'use client'

import { useState, useRef } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { submitContactForm } from '@/app/actions/contact'
import { toast } from 'sonner'

interface ContactSheetProps {
  children: React.ReactNode
}

export function ContactSheet({ children }: ContactSheetProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Prevent double submission
    if (isSubmitting) {
      return
    }
    
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    }

    try {
      const result = await submitContactForm(data)
      
      console.log('Contact form result:', result)

      if (result.success) {
        toast.success(result.message)
        // Reset form using ref
        formRef.current?.reset()
        setOpen(false)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error('Contact form caught error:', error)
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md"
        aria-describedby="contact-description"
      >
        <SheetHeader>
          <SheetTitle>Contact</SheetTitle>
          <SheetDescription id="contact-description">
            Send me a message. I&apos;ll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Name field (optional) */}
          <div className="space-y-2">
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-muted-foreground"
            >
              Name <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your name"
              style={{ minHeight: '44px' }}
            />
          </div>

          {/* Email field (optional) */}
          <div className="space-y-2">
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email <span className="text-muted-foreground">(optional)</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="your@email.com"
              style={{ minHeight: '44px' }}
              aria-describedby="email-hint"
            />
            <p id="email-hint" className="text-xs text-muted-foreground">
              Include your email if you&apos;d like a reply
            </p>
          </div>

          {/* Message field (required, min 20 chars) */}
          <div className="space-y-2">
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-muted-foreground"
            >
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={20}
              rows={6}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Your message (at least 20 characters)"
              aria-describedby="message-hint"
              aria-required="true"
            />
            <p id="message-hint" className="text-xs text-muted-foreground">
              Minimum 20 characters required
            </p>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            style={{ minHeight: '44px' }}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
