import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageTitle } from '@/components/PageTitle';
import { Card } from '@/components/Card';
import { Button } from '@/components/ui/button';
import { WaitlistDialog } from '@/app/(home)/WaitlistDialog';
import { supabaseServerAnon } from '@/lib/supabase/server';
import type { Experiment } from '@/types/db';
import Link from 'next/link';

/**
 * Revalidate every 60 seconds
 */
export const revalidate = 60;

/**
 * Fetch top 3 experiments from database
 */
async function getExperiments(): Promise<Experiment[]> {
  const { data, error } = await supabaseServerAnon
    .from('experiments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching experiments:', error);
    return [];
  }

  return data || [];
}

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

export default async function Home() {
  const experiments = await getExperiments();

  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl">
        <Container size="md">
          <div className="text-center">
            <PageTitle size="large" subtitle="iOS & Web micro-SaaS. Validate fast. Ship or stop.">
              Omar Creates
            </PageTitle>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <WaitlistDialog>
                <Button
                  size="lg"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                  }}
                >
                  Join Waitlist
                </Button>
              </WaitlistDialog>

              <Button
                size="lg"
                variant="outline"
                asChild
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                <a
                  href="https://x.com/omar_create"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on X
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Current Experiments */}
      {experiments.length > 0 && (
        <Section>
          <Container size="md">
            <div className="space-y-8">
              <div className="text-center">
                <h2
                  className="text-3xl font-bold tracking-tight mb-2"
                  style={{
                    color: 'var(--color-text)',
                    letterSpacing: 'var(--tracking-tight)',
                  }}
                >
                  Current Experiments
                </h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  Exploring ideas and building in public
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {experiments.map((experiment) => (
                  <Card key={experiment.id} hover padding="lg">
                    {/* Status Badge */}
                    <div className="mb-4">
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
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
                      className="mb-4"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {experiment.one_liner}
                    </p>

                    {/* CTA */}
                    {experiment.cta_url && (
                      <a
                        href={experiment.cta_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium transition-colors hover:underline"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        Learn more →
                      </a>
                    )}
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="ghost" asChild>
                  <Link href="/experiments">View all experiments →</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
