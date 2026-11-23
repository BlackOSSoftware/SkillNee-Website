import type { Metadata } from 'next';
import { Compass, ShieldCheck, Sparkles, Target, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconTile, type IconTone } from '@/components/ui/icon-tile';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section, SectionHeading } from '@/components/ui/section';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About the SkillBee public website',
};

const values: Array<{ title: string; description: string; icon: LucideIcon; tone: IconTone }> = [
  { title: 'Learner focused', description: 'Placeholder value description for layout.', icon: Target, tone: 'primary' },
  { title: 'Quality first', description: 'Placeholder value description for layout.', icon: ShieldCheck, tone: 'teal' },
  { title: 'Clear process', description: 'Placeholder value description for layout.', icon: Compass, tone: 'sky' },
  { title: 'People centered', description: 'Placeholder value description for layout.', icon: Users, tone: 'violet' },
  { title: 'Practical outcomes', description: 'Placeholder value description for layout.', icon: Sparkles, tone: 'amber' },
  { title: 'Transparent approach', description: 'Placeholder value description for layout.', icon: ShieldCheck, tone: 'rose' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Placeholder about page content for the SkillBee public website layout."
      />

      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <SectionHeading
            eyebrow="Our story"
            title="About SkillBee"
            description="This section introduces the organization and learning platform. Final copy will be added in a later content phase."
          />
          <Card className="p-6">
            <div className="space-y-4 text-sm leading-7 text-ink-muted">
              <p>Placeholder paragraph for the about page introduction.</p>
              <p>Placeholder paragraph for mission and vision content.</p>
              <p>Placeholder paragraph for the learning approach.</p>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="bg-canvas">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Values"
            title="What guides SkillBee"
            description="Placeholder value cards preview the about page layout."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="p-5 transition-shadow hover:shadow-pop">
                <IconTile icon={value.icon} tone={value.tone} size="md" />
                <h3 className="mt-4 text-base font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{value.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/contact" variant="secondary" size="md">
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
