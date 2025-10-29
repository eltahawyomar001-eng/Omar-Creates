import * as React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Section component for semantic page structure
 * Provides consistent vertical spacing
 */
export function Section({
  children,
  className,
  id,
  as: Component = 'section',
  spacing = 'lg',
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        'w-full',
        {
          'py-8 sm:py-12': spacing === 'sm',
          'py-12 sm:py-16': spacing === 'md',
          'py-16 sm:py-24': spacing === 'lg',
          'py-24 sm:py-32': spacing === 'xl',
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
