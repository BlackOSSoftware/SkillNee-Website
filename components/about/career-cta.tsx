import { ArrowRight, GraduationCap } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/section';

export function CareerCta() {
  return (
    <Section className="bg-canvas">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/25 blur-3xl" aria-hidden />
            <div className="relative">
              <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/10">
                <GraduationCap className="size-7 text-brand-soft" aria-hidden />
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to Take the Next Step in Your Career?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/70">
                Explore industry-focused training programs, develop practical skills and move
                closer to your professional goals with SkillBee Solution.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/courses" size="lg">
                  Explore Courses
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/form" variant="outline-light" size="lg">
                  Apply Now
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
