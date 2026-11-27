import Image from 'next/image';
import { BookOpenCheck, Lightbulb, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/section';

const benefits = [
  {
    icon: BookOpenCheck,
    title: 'Real Industrial Knowledge',
    description: 'Understand professional workflows and practical industry requirements.',
  },
  {
    icon: Lightbulb,
    title: 'Better Understanding',
    description:
      'Live projects help students connect theoretical concepts with practical applications.',
  },
  {
    icon: TrendingUp,
    title: 'Learn Current Projects',
    description:
      'Gain exposure to ongoing project activities and industry practices while learning.',
  },
];

export function LiveProjects() {
  return (
    <Section className="bg-canvas">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/about/live-projects.jpg"
                alt="Students and professionals working together on live projects"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-4 rounded-2xl bg-primary px-5 py-4 text-white shadow-pop sm:right-8">
              <p className="text-2xl font-bold">Live</p>
              <p className="text-xs text-white/80">Industry projects</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Learn Beyond the Classroom
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg">
              Our courses are designed to connect learning with practical industry experience
              through live projects and real-world assignments.
            </p>
          </Reveal>
          <div className="mt-8 space-y-5">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} delay={0.08 + i * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink">{benefit.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-ink-muted">{benefit.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
