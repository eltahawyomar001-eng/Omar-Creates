import * as React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Container component for consistent content width
 * Follows Apple's approach to content containment
 */
export function Container({
  children,
  className,
  size = 'lg',
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        {
          'max-w-3xl': size === 'sm',
          'max-w-5xl': size === 'md',
          'max-w-7xl': size === 'lg',
          'max-w-none': size === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
