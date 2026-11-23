import { Container, Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { CompanyLogoMarquee } from './company-logo-marquee';
import { PLACEMENT_COMPANIES } from '@/lib/placements';

export function StudentPlacementSection() {
  return (
    <Section className="bg-canvas">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Our Students Placed With
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <CompanyLogoMarquee companies={PLACEMENT_COMPANIES} />
        </Reveal>
      </Container>
    </Section>
  );
}
