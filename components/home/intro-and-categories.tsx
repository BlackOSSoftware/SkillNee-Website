import { BarChart3, Briefcase, Check, Code, Languages, Megaphone, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { IconTile, type IconTone } from '@/components/ui/icon-tile';
import { Container, Section, SectionHeading } from '@/components/ui/section';

const introPoints = [
  'Live and prerecorded learning formats',
  'Course and instructor discovery',
  'Clear placeholder learning paths',
];

const categories: Array<{ title: string; description: string; icon: LucideIcon; tone: IconTone }> = [
  { title: 'Design', description: 'Placeholder category description for layout.', icon: Palette, tone: 'violet' },
  { title: 'Development', description: 'Placeholder category description for layout.', icon: Code, tone: 'sky' },
  { title: 'Business', description: 'Placeholder category description for layout.', icon: Briefcase, tone: 'amber' },
  { title: 'Data', description: 'Placeholder category description for layout.', icon: BarChart3, tone: 'teal' },
  { title: 'Communication', description: 'Placeholder category description for layout.', icon: Languages, tone: 'rose' },
  { title: 'Marketing', description: 'Placeholder category description for layout.', icon: Megaphone, tone: 'indigo' },
];

export function IntroSection() {
  return (
    <Section className="bg-canvas">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeading
          eyebrow="Welcome"
          title="A focused place for practical learning"
          description="This section introduces the SkillBee public website. Final copy and statistics will be added in a later content phase."
        />
        <Card className="p-6">
          <ul className="space-y-4">
            {introPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check className="size-4" aria-hidden />
                </span>
                <span className="text-sm leading-6 text-ink-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </Section>
  );
}

export function CategoriesSection() {
  return (
    <Section>
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Explore"
          title="Browse learning categories"
          description="Placeholder category cards are used to preview the public website layout."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.title} className="group p-5 transition-shadow hover:shadow-pop">
              <div className="flex items-start gap-4">
                <IconTile icon={category.icon} tone={category.tone} size="md" />
                <div>
                  <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-primary">{category.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-muted">{category.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
