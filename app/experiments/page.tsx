import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageTitle } from '@/components/PageTitle';
import { supabaseServerAnon } from '@/lib/supabase/server';
import type { Experiment, ExperimentStatus } from '@/types/db';
import { ExperimentFilters } from './ExperimentFilters';
import { ExperimentCard } from './ExperimentCard';
import { generateMetadata as generateSEOMetadata } from '@/app/(seo)/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Experiments | Omar Creates',
  description: 'Browse micro-SaaS experiments. iOS & Web demos. Live data, fast decisions.',
  path: '/experiments',
});

/**
 * Revalidate every 60 seconds
 */
export const revalidate = 60;

interface ExperimentsPageProps {
  searchParams: {
    status?: string;
  };
}

/**
 * Fetch experiments from database with optional status filter
 */
async function getExperiments(status?: string): Promise<Experiment[]> {
  let query = supabaseServerAnon
    .from('experiments')
    .select('*')
    .order('created_at', { ascending: false });

  // Apply status filter if provided
  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching experiments:', error);
    return [];
  }

  return data || [];
}

export default async function ExperimentsPage({
  searchParams,
}: ExperimentsPageProps) {
  const experiments = await getExperiments(searchParams.status);
  const currentStatus = searchParams.status || 'all';

  return (
    <Section spacing="xl">
      <Container size="lg">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <PageTitle subtitle="Exploring ideas and building in public">
              Experiments
            </PageTitle>
          </div>

          {/* Filters */}
          <ExperimentFilters />

          {/* Results Count */}
          <div className="text-center">
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {experiments.length}{' '}
              {experiments.length === 1 ? 'experiment' : 'experiments'}
              {currentStatus !== 'all' && ` · ${currentStatus}`}
            </p>
          </div>

          {/* Experiments Grid */}
          {experiments.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {experiments.map((experiment) => (
                <ExperimentCard key={experiment.id} experiment={experiment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p
                className="text-lg mb-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                No experiments found
              </p>
              <p
                className="text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {currentStatus !== 'all'
                  ? `Try selecting a different status filter`
                  : `Check back soon for new experiments`}
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
