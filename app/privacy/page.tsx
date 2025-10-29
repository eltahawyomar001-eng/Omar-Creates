import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageTitle } from '@/components/PageTitle';
import { Card } from '@/components/Card';

export default function PrivacyPage() {
  return (
    <Section spacing="xl">
      <Container size="sm">
        <PageTitle subtitle="Your privacy matters to us">Privacy</PageTitle>

        <div className="mt-12 space-y-8">
          <Card>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Data Collection
            </h2>
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              We collect only essential information needed to provide our
              services. This includes email addresses for contact forms and
              basic analytics to improve user experience.
            </p>
          </Card>

          <Card>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Data Usage
            </h2>
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Your data is used solely to communicate with you and improve our
              services. We never sell or share your personal information with
              third parties.
            </p>
          </Card>

          <Card>
            <h2
              className="text-2xl font-semibold mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Your Rights
            </h2>
            <p
              className="mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              You have the right to access, correct, or delete your personal
              data at any time. Contact us to exercise these rights.
            </p>
          </Card>

          <div className="pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Last updated: October 29, 2025
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
