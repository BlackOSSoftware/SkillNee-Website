import { BookOpen } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { CourseCard } from '@/components/ui/course-card';
import { Container, Section, SectionHeading } from '@/components/ui/section';
import { SessionCard } from '@/components/ui/session-card';

const liveSessions = [
  { title: 'Live session placeholder 01', date: 'Date placeholder', time: 'Time placeholder', mode: 'Live', instructor: 'Instructor placeholder', href: '/live-sessions' },
  { title: 'Live session placeholder 02', date: 'Date placeholder', time: 'Time placeholder', mode: 'Live', instructor: 'Instructor placeholder', href: '/live-sessions' },
  { title: 'Live session placeholder 03', date: 'Date placeholder', time: 'Time placeholder', mode: 'Live', instructor: 'Instructor placeholder', href: '/live-sessions' },
];

const prerecordedCourses = [
  {
    title: 'Prerecorded course placeholder 01',
    description: 'Prerecorded course description placeholder for layout.',
    category: 'Prerecorded',
    level: 'Level placeholder',
    duration: 'Duration placeholder',
    href: '/prerecorded-courses/course-01',
    icon: BookOpen,
  },
  {
    title: 'Prerecorded course placeholder 02',
    description: 'Prerecorded course description placeholder for layout.',
    category: 'Prerecorded',
    level: 'Level placeholder',
    duration: 'Duration placeholder',
    href: '/prerecorded-courses/course-02',
    icon: BookOpen,
  },
  {
    title: 'Prerecorded course placeholder 03',
    description: 'Prerecorded course description placeholder for layout.',
    category: 'Prerecorded',
    level: 'Level placeholder',
    duration: 'Duration placeholder',
    href: '/prerecorded-courses/course-03',
    icon: BookOpen,
  },
];

export function LiveSessionsSection() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Live"
            title="Live sessions"
            description="Placeholder live session cards preview the schedule layout."
          />
          <ButtonLink href="/live-sessions" variant="secondary" size="md" className="shrink-0">
            View all sessions
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-5">
          {liveSessions.map((session) => (
            <SessionCard key={session.title} {...session} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function PrerecordedSection() {
  return (
    <Section className="bg-canvas">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="On demand"
            title="Prerecorded learning"
            description="Placeholder prerecorded course cards preview the catalog layout."
          />
          <ButtonLink href="/prerecorded-courses" variant="secondary" size="md" className="shrink-0">
            View prerecorded courses
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prerecordedCourses.map((course) => (
            <CourseCard key={course.href} {...course} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
