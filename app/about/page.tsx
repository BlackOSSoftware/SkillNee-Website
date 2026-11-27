import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/about-hero';
import { CareerCta } from '@/components/about/career-cta';
import { ClientLogos } from '@/components/about/client-logos';
import { CoreValues } from '@/components/about/core-values';
import { LiveProjects } from '@/components/about/live-projects';
import { OurMission } from '@/components/about/mission';
import { ServicesOverview } from '@/components/about/services';
import { OurAim, WhoWeAre } from '@/components/about/who-we-are';
import { Reveal } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/section';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'SkillBee Solution — professional training, consultancy and career development organization across pharmaceutical, clinical research and medical device industries.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <OurAim />
      <OurMission />

      <Section className="bg-surface">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">
              The principles that guide our relationships, decisions and commitment to quality.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-12">
            <CoreValues />
          </Reveal>
        </Container>
      </Section>

      <ServicesOverview />
      <LiveProjects />
      <ClientLogos />
      <CareerCta />
    </>
  );
}
