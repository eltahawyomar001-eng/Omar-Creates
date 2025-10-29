import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card component for content grouping
 * Apple-inspired elevated surface
 */
export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'surface-elevated rounded-lg border border-white/10',
        {
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
          'interactive': hover,
        },
        className
      )}
      style={{
        backgroundColor: 'var(--color-surface)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {children}
    </div>
  );
}
