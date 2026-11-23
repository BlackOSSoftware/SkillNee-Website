import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/section';
import { EmptyState } from '@/components/ui/states';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFoundPage() {
  return (
    <Section className="bg-canvas">
      <Container>
        <EmptyState
          title="Page not found"
          description="The page you are looking for does not exist or has been moved."
          action={<ButtonLink href="/" variant="secondary" size="md">Back to home</ButtonLink>}
        />
      </Container>
    </Section>
  );
}
