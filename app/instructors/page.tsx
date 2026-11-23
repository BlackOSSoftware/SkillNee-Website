import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section } from '@/components/ui/section';
import { InstructorCard } from '@/components/ui/instructor-card';

export const metadata: Metadata = {
  title: 'Instructors',
  description: 'Meet SkillBee instructors',
};

const instructors = [
  { name: 'Instructor name placeholder 01', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'violet' as const },
  { name: 'Instructor name placeholder 02', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'teal' as const },
  { name: 'Instructor name placeholder 03', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'sky' as const },
  { name: 'Instructor name placeholder 04', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'amber' as const },
  { name: 'Instructor name placeholder 05', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'rose' as const },
  { name: 'Instructor name placeholder 06', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'indigo' as const },
];

export default function InstructorsPage() {
  return (
    <>
      <PageHeader
        title="Instructors"
        description="Placeholder instructor directory for the public website layout."
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.name} {...instructor} />
            ))}
          </div>

          <Card className="mt-12 p-6 text-center">
            <h2 className="text-xl font-semibold text-ink">Become an instructor</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-ink-muted">
              Instructor application functionality will be connected in a later phase.
            </p>
            <div className="mt-5 flex justify-center">
              <ButtonLink href="/contact" variant="secondary" size="md">
                Contact us
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
