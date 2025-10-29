'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { ExperimentStatus } from '@/types/db';

const statuses: Array<{ label: string; value: ExperimentStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'Ideating', value: 'ideating' },
  { label: 'Testing', value: 'testing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Killed', value: 'killed' },
];

/**
 * Get status badge color
 */
function getStatusColor(status: string) {
  switch (status) {
    case 'all':
      return 'var(--color-text)';
    case 'shipped':
      return '#34c759';
    case 'testing':
      return '#409cff';
    case 'ideating':
      return '#ff9f0a';
    case 'killed':
      return '#ff453a';
    default:
      return '#8e9199';
  }
}

export function ExperimentFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleStatusChange = (status: string) => {
    if (status === 'all') {
      // Remove the status param for "All"
      router.push('/experiments');
    } else {
      // Update the URL with the new status
      router.push(`/experiments?status=${status}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {statuses.map((status) => {
        const isActive = currentStatus === status.value;
        return (
          <button
            key={status.value}
            onClick={() => handleStatusChange(status.value)}
            className={cn(
              'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
            )}
            style={{
              backgroundColor: isActive
                ? `${getStatusColor(status.value)}20`
                : 'var(--color-surface)',
              color: isActive
                ? getStatusColor(status.value)
                : 'var(--color-text-secondary)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: isActive
                ? getStatusColor(status.value)
                : 'var(--color-border)',
              minHeight: 'var(--touch-target)',
            }}
            aria-pressed={isActive}
          >
            {status.label}
          </button>
        );
      })}
    </div>
  );
}
