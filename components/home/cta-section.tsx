import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/section';

export function CtaSection() {
  return (
    <Section className="bg-canvas">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0b6391] via-[#123a6b] to-[#3a4cb5] px-6 py-12 text-center shadow-pop sm:px-12">
          <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 size-64 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready to explore SkillBee?</h2>
            <p className="mt-4 text-base leading-7 text-white/80">
              Placeholder call-to-action copy for the public website layout.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/register" variant="light" size="lg">
                Create account
                <ArrowRight className="size-5" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-light" size="lg">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
