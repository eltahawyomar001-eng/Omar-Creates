import * as React from 'react';
import type { Experiment } from '@/types/db';
import { Card } from '@/components/Card';

/**
 * Get status badge color
 */
function getStatusColor(status: Experiment['status']) {
  switch (status) {
    case 'shipped':
      return '#34c759'; // Green
    case 'testing':
      return '#409cff'; // Blue - WCAG AA compliant
    case 'ideating':
      return '#ff9f0a'; // Orange
    case 'killed':
      return '#ff453a'; // Red
    default:
      return '#8e9199'; // Gray
  }
}

interface ExperimentCardProps {
  experiment: Experiment;
}

export function ExperimentCard({ experiment }: ExperimentCardProps) {
  return (
    <Card hover padding="lg" className="h-full flex flex-col" data-testid="experiment-card">
      {/* Status Badge */}
      <div className="mb-4">
        <span
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize"
          style={{
            backgroundColor: `${getStatusColor(experiment.status)}20`,
            color: getStatusColor(experiment.status),
          }}
        >
          {experiment.status}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-xl font-semibold mb-3"
        style={{ color: 'var(--color-text)' }}
      >
        {experiment.title}
      </h3>

      {/* One-liner */}
      <p
        className="mb-6 flex-grow"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {experiment.one_liner}
      </p>

      {/* CTA */}
      {experiment.cta_url && (
        <div className="mt-auto">
          <a
            href={experiment.cta_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
            style={{
              color: 'var(--color-accent)',
              minHeight: 'var(--touch-target)',
            }}
          >
            Learn more →
          </a>
        </div>
      )}

      {/* Metadata */}
      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Created {new Date(experiment.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </Card>
  );
}
