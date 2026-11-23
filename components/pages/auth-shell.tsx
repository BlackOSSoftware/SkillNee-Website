import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Container, Section } from '@/components/ui/section';

interface AuthShellProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, description, children, footer }: AuthShellProps) {
  return (
    <Section className="bg-canvas">
      <Container className="flex justify-center py-10 sm:py-14">
        <Card className="w-full max-w-md p-6 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p>
          <div className="mt-6">{children}</div>
          {footer ? <div className="mt-6 border-t border-line pt-5 text-sm text-ink-muted">{footer}</div> : null}
        </Card>
      </Container>
    </Section>
  );
}
