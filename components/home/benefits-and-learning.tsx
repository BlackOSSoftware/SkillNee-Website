import { Layers, ShieldCheck, Sparkles, Users, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { IconTile, type IconTone } from '@/components/ui/icon-tile';
import { Container, Section, SectionHeading } from '@/components/ui/section';

const benefits: Array<{ title: string; description: string; icon: LucideIcon; tone: IconTone }> = [
  { title: 'Flexible formats', description: 'Placeholder benefit description for layout.', icon: Video, tone: 'sky' },
  { title: 'Guided support', description: 'Placeholder benefit description for layout.', icon: Users, tone: 'violet' },
  { title: 'Clear structure', description: 'Placeholder benefit description for layout.', icon: Layers, tone: 'teal' },
  { title: 'Quality focus', description: 'Placeholder benefit description for layout.', icon: ShieldCheck, tone: 'amber' },
  { title: 'Practical learning', description: 'Placeholder benefit description for layout.', icon: Sparkles, tone: 'rose' },
  { title: 'Community access', description: 'Placeholder benefit description for layout.', icon: Users, tone: 'indigo' },
];

export function BenefitsSection() {
  return (
    <Section className="bg-canvas">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Why SkillBee"
          title="Learning benefits"
          description="Placeholder benefit cards are used to preview the homepage section layout."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="p-5 transition-shadow hover:shadow-pop">
              <IconTile icon={benefit.icon} tone={benefit.tone} size="md" />
              <h3 className="mt-4 text-base font-semibold text-ink">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
