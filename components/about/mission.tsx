import { MessagesSquare, ShieldCheck, Users } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Container, Section } from '@/components/ui/section';

const missionAreas = [
  {
    icon: MessagesSquare,
    title: 'Industry Consultancy',
    description:
      'We bring together experts from various industries to provide consultancy to pharmaceutical and clinical research organizations. Our mission is to deliver professional knowledge and expertise to complete assignments within stipulated timelines while improving quality and compliance.',
  },
  {
    icon: Users,
    title: 'Practical Learning',
    description:
      "We utilize our experts' knowledge to train candidates seeking industrial practical knowledge and professional skills to help them pursue careers in their dream companies.",
  },
  {
    icon: ShieldCheck,
    title: 'Professional Excellence',
    description:
      'We are a professional, enthusiastic and innovative team dedicated to providing HR consulting services and evolving recruitment solutions that help our customers become more productive and successful.',
  },
];

export function OurMission() {
  return (
    <Section className="bg-canvas">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Our Mission</h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {missionAreas.map((area, i) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.title} delay={i * 0.1} className="h-full">
                <Card className="flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-pop">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{area.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{area.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-line bg-surface p-6 text-center sm:p-8">
            <p className="text-sm leading-7 text-ink-muted sm:text-base sm:leading-8">
              Together, we communicate on a personal level, listen to individual needs and provide
              suitable solutions.
            </p>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-ink">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              We aim to maintain a Quality Management System in accordance with ISO 9001:2015
              guidelines, with the objective of achieving quality in every activity.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
