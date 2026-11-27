import { Briefcase, CheckCircle2, GraduationCap, MonitorPlay, Target, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container, Section } from '@/components/ui/section';
import { ABOUT_SERVICES, type AboutServiceIconName } from '@/lib/about';

const ICONS: Record<AboutServiceIconName, LucideIcon> = {
  briefcase: Briefcase,
  graduation: GraduationCap,
  target: Target,
  monitor: MonitorPlay,
};

export function ServicesOverview() {
  return (
    <Section className="bg-surface">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">What We Do</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">
            We provide specialized training and consultancy solutions across pharmaceutical,
            clinical research, medical device and information technology sectors.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {ABOUT_SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon];
            return (
              <Reveal key={service.title} delay={(i % 2) * 0.1} className="h-full">
                <Card className="flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop">
                  <div className="flex items-center gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-ink-muted">{service.description}</p>
                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-subtle">
                      {service.highlightLabel}
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <ButtonLink
                      href={service.title === 'Industry Consultancy' ? '/services' : '/courses'}
                      variant="secondary"
                      size="sm"
                    >
                      Learn more
                    </ButtonLink>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
