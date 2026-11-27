import Image from 'next/image';
import { Award, Building2, MapPin, Target } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { Container, Section } from '@/components/ui/section';

const branches = ['Hyderabad', 'Indore', 'Bangalore'];

export function WhoWeAre() {
  return (
    <Section className="bg-canvas">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Who We Are</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-5 text-base leading-7 text-ink-muted">
              <p>
                We at SkillBee Solution are a team of passionate entrepreneurs who believe that
                everyone should have access to quality education. Established in 2023, our goal is
                to make professional learning more affordable and accessible.
              </p>
              <p>
                SkillBee Solution is registered under the Registration Act, 1958 with the Government
                of India, Registration Number INDO230821SE012926, and is affiliated with the Life
                Sciences Sector Skills Council (SSC).
              </p>
              <p>
                We were inspired to start our company after witnessing the challenges people face
                while accessing quality education. We wanted to create a better learning experience
                that makes professional knowledge, practical training and career opportunities more
                accessible.
              </p>
              <p>
                We have branches across India, including Hyderabad, Indore and Bangalore.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {branches.map((city) => (
                <li
                  key={city}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink-muted"
                >
                  <MapPin className="size-3.5 text-primary" aria-hidden />
                  {city}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/about/lab-training.jpg"
                alt="Professional laboratory training environment"
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
            <Card className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 p-4 sm:left-6 sm:right-auto sm:w-72">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Award className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Registered Organization</p>
                <p className="text-xs leading-5 text-ink-muted">
                  Reg. No. INDO230821SE012926 · Affiliated with Life Sciences SSC
                </p>
              </div>
            </Card>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

export function OurAim() {
  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="relative">
              <div className="rounded-3xl bg-navy p-8 text-white sm:p-10">
                <Target className="size-10 text-brand-soft" aria-hidden />
                <p className="mt-5 text-2xl font-semibold leading-snug sm:text-3xl">
                  Connecting the Right Candidates with the Right Companies.
                </p>
              </div>
              <div className="absolute -right-3 -top-3 hidden rounded-2xl border border-line bg-surface px-4 py-3 shadow-pop sm:block">
                <p className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <Building2 className="size-4 text-primary" aria-hidden />
                  Talent · Training · Consultancy
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Our Aim</h2>
            <p className="mt-5 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Our aim is to connect skilled candidates with suitable industry opportunities. We
              strive to support every candidate in their professional journey while helping
              industries find capable talent. Our focus is on building meaningful relationships,
              delivering value and creating positive experiences for our clients and candidates.
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
