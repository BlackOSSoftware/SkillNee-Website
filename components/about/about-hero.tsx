import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/section';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" aria-hidden />

      <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-soft">
              <span className="h-px w-8 bg-brand-soft/70" aria-hidden />
              About SkillBee Solution
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Empowering People. Connecting Talent. Building Better Careers.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
              SkillBee Solution is a professional training, consultancy and career development
              organization focused on empowering individuals and supporting businesses across the
              pharmaceutical, clinical research and medical device industries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services" size="lg">
                Explore Our Services
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline-light" size="lg">
                <Phone className="size-4" aria-hidden />
                Contact Us
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-pop">
              <Image
                src="/about/team-collaboration.jpg"
                alt="SkillBee team of professionals collaborating"
                width={1200}
                height={800}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl border border-white/10 bg-navy-2/90 px-5 py-4 shadow-pop backdrop-blur sm:-left-8">
              <p className="text-2xl font-bold text-brand-soft">2023</p>
              <p className="text-xs text-white/60">Established in India</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
