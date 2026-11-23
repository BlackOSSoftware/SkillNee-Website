import { Reveal } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/section';
import { FeatureGrid } from './feature-grid';
import { WHY_CHOOSE_FEATURES } from '@/lib/why-choose';

export function WhyChooseSkillBeeSection() {
  return (
    <Section className="bg-surface">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Everything You Need to Build a Successful Career
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            From industry-focused training to expert guidance and career opportunities, SkillBee
            provides the right support to help you move confidently towards your professional goals.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <FeatureGrid features={WHY_CHOOSE_FEATURES} />
        </Reveal>
      </Container>
    </Section>
  );
}
