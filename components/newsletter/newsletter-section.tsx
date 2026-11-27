import { MailOpen } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/section';
import { NewsletterForm } from './newsletter-form';

export function NewsletterSection() {
  return (
    <Section className="relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" aria-hidden />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                <MailOpen className="size-6 text-brand-soft" aria-hidden />
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Stay Connected with SkillBee
              </h2>
              <p className="mt-4 max-w-md text-base leading-7 text-white/65">
                Get the latest news, professional learning updates, upcoming training programs and
                career opportunities delivered straight to your inbox.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <NewsletterForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
