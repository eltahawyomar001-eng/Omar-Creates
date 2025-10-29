import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { PageTitle } from '@/components/PageTitle';
import type { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/app/(seo)/metadata';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Terms of Service | Omar Creates',
  description: 'Terms of service for Omar Creates experiments and services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <Section spacing="xl">
      <Container size="md">
        <div className="space-y-8">
          <PageTitle subtitle="Last updated: October 29, 2025">
            Terms of Service
          </PageTitle>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                1. Acceptance of Terms
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                By accessing and using Omar Creates (&quot;the Service&quot;), you accept
                and agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                2. Experimental Nature
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Omar Creates hosts experimental projects and micro-SaaS ideas.
                These experiments are provided &quot;as is&quot; without warranties of any
                kind. Features may change, break, or be discontinued at any time
                without notice.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                3. Use of Service
              </h2>
              <p
                style={{ color: 'var(--color-text-secondary)' }}
                className="mb-4"
              >
                You agree to use the Service only for lawful purposes and in
                accordance with these Terms. You agree not to:
              </p>
              <ul
                className="list-disc list-inside space-y-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <li>
                  Use the Service in any way that violates applicable laws or
                  regulations
                </li>
                <li>
                  Attempt to gain unauthorized access to any part of the Service
                </li>
                <li>
                  Interfere with or disrupt the Service or servers connected to
                  it
                </li>
                <li>
                  Use automated systems to access the Service without permission
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                4. User Content
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                If you submit content to the Service (e.g., through contact
                forms or waitlist signups), you retain ownership of your content
                but grant us a license to use it for providing and improving the
                Service.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                5. Intellectual Property
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                The Service and its original content, features, and functionality
                are owned by Omar Creates and are protected by international
                copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                6. Disclaimer of Warranties
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT ANY
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT
                WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR
                ERROR-FREE.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                7. Limitation of Liability
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                IN NO EVENT SHALL OMAR CREATES BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING
                OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                8. Changes to Terms
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                We reserve the right to modify these Terms at any time. Continued
                use of the Service after changes constitutes acceptance of the
                modified Terms.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-semibold mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                9. Contact
              </h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                If you have questions about these Terms, please contact us
                through the contact form on our website.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
