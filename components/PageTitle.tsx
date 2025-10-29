import * as React from 'react';
import { cn } from '@/lib/utils';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
  size?: 'default' | 'large';
}

/**
 * PageTitle component - Apple-style large titles
 * Follows the large title design pattern
 */
export function PageTitle({
  children,
  className,
  subtitle,
  size = 'default',
}: PageTitleProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1
        className={cn('font-bold tracking-tight text-balance', {
          'text-4xl sm:text-5xl lg:text-6xl': size === 'default',
          'text-5xl sm:text-6xl lg:text-7xl': size === 'large',
        })}
        style={{
          color: 'var(--color-text)',
          letterSpacing: 'var(--tracking-tighter)',
        }}
      >
        {children}
      </h1>
      {subtitle && (
        <p
          className="text-lg sm:text-xl lg:text-2xl font-normal"
          style={{
            color: 'var(--color-text-secondary)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
