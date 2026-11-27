import Image from 'next/image';
import { Reveal } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/section';
import { ABOUT_CLIENTS } from '@/lib/about';
import { cn } from '@/lib/cn';

export function ClientLogos() {
  return (
    <Section className="bg-surface">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">
            Building professional connections across the pharmaceutical, life sciences and
            healthcare industries.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
            {ABOUT_CLIENTS.map((client) => (
              <li
                key={client.name}
                className="flex h-14 w-36 items-center justify-center rounded-xl border border-line/70 bg-white px-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card sm:h-16 sm:w-44"
              >
                <Image
                  src={client.logo}
                  alt={client.alt}
                  width={700}
                  height={300}
                  className={cn('h-8 w-auto max-w-full object-contain sm:h-9')}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
