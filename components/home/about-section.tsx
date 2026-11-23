import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Reveal } from '@/components/motion/reveal';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/section';

const ABOUT_IMAGE = '/about/training.webp';

export function AboutSection() {
  return (
    <Section className="bg-canvas">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-8 bg-primary/60" aria-hidden />
            About Us
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Why Skillbee Solution
          </h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            <p>
              We&rsquo;re Skillbee Solution Company, and we&rsquo;re here to help your Skills &amp; Business to grow,
              Providing Consultancy in the field of Pharma &amp; Clinical Research.
            </p>
            <p>
              We provide Training &amp; certification on Computerized System Validation, Quality Assurance &amp;
              Quality Control, Regulatory Affairs&rsquo; and Clinical Research &amp; Pharmacovigilance. We also Provide
              Job Placement for job Seekers.
            </p>
          </div>
          <div className="mt-8">
            <ButtonLink href="/form/" size="lg" className="group">
              How to Apply
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-sky-400/15 via-transparent to-violet-500/15 blur-2xl"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-3xl shadow-pop ring-1 ring-line">
            <Image
              src={ABOUT_IMAGE}
              alt="SkillBee professional training and workshop session"
              width={1400}
              height={933}
              className="h-auto w-full object-contain"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
