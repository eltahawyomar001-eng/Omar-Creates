'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addToWaitlist, type WaitlistFormState } from '@/app/actions/waitlist';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const initialState: WaitlistFormState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full"
      style={{
        backgroundColor: 'var(--color-accent)',
        color: 'white',
        minHeight: 'var(--touch-target)',
      }}
    >
      {pending ? 'Joining...' : 'Join Waitlist'}
    </Button>
  );
}

interface WaitlistDialogProps {
  children: React.ReactNode;
}

export function WaitlistDialog({ children }: WaitlistDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [state, formAction] = useFormState(addToWaitlist, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  // Handle form state changes
  React.useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
        setOpen(false);
        formRef.current?.reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription>
            Be the first to know when we launch new experiments and products.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          {/* Email field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-md border border-white/10 px-4 py-3 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
              style={{
                backgroundColor: 'var(--color-bg-start)',
                color: 'var(--color-text)',
                minHeight: 'var(--touch-target)',
              }}
              aria-describedby={
                state?.errors?.email ? 'email-error' : undefined
              }
            />
            {state?.errors?.email && (
              <p
                id="email-error"
                className="text-sm"
                style={{ color: '#ef4444' }}
                role="alert"
              >
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            style={{
              position: 'absolute',
              left: '-9999px',
              width: '1px',
              height: '1px',
            }}
            aria-hidden="true"
          />

          {/* Hidden source field */}
          <input type="hidden" name="source" value="landing" />

          <SubmitButton />

          <p
            className="text-xs text-center"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
