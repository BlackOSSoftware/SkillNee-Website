import { PageHeader } from '@/components/ui/page-header';
import { Card } from '@/components/ui/card';
import { Container, Section } from '@/components/ui/section';

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  sections: LegalSection[];
}

export function LegalPage({ title, description, sections }: LegalPageProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Section>
        <Container className="max-w-4xl">
          <div className="space-y-6">
            {sections.map((section) => (
              <Card key={section.heading} className="p-6">
                <h2 className="text-lg font-semibold text-ink">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-7 text-ink-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
