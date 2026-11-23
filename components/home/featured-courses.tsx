import { BarChart3, Code, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { CourseCard } from '@/components/ui/course-card';
import { Container, Section, SectionHeading } from '@/components/ui/section';

const courses: Array<{ title: string; description: string; category: string; level: string; duration: string; href: string; icon: LucideIcon }> = [
  {
    title: 'Course title placeholder 01',
    description: 'Course description placeholder for layout and spacing.',
    category: 'Category placeholder',
    level: 'Level placeholder',
    duration: 'Duration placeholder',
    href: '/courses/course-01',
    icon: Code,
  },
  {
    title: 'Course title placeholder 02',
    description: 'Course description placeholder for layout and spacing.',
    category: 'Category placeholder',
    level: 'Level placeholder',
    duration: 'Duration placeholder',
    href: '/courses/course-02',
    icon: Palette,
  },
  {
    title: 'Course title placeholder 03',
    description: 'Course description placeholder for layout and spacing.',
    category: 'Category placeholder',
    level: 'Level placeholder',
    duration: 'Duration placeholder',
    href: '/courses/course-03',
    icon: BarChart3,
  },
];

export function FeaturedCoursesSection() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Featured"
            title="Featured courses"
            description="Placeholder course cards preview the public catalog layout."
          />
          <ButtonLink href="/courses" variant="secondary" size="md" className="shrink-0">
            View all courses
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.href} {...course} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
