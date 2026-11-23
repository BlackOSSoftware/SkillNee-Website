import { EmptyState } from '@/components/ui/states';
import { Reveal } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/section';
import { CourseGrid } from '@/components/courses/course-grid';
import { HowToApplyButton } from '@/components/courses/how-to-apply-button';
import { getPublicCourses, type CourseCardData } from '@/lib/courses';

const MAX_COURSES = 6;

function isPaidCourse(course: CourseCardData): boolean {
  return course.pricing?.type === 'paid' && course.courseType !== 'FREE';
}

function pickRandomCourses(courses: CourseCardData[], max: number): CourseCardData[] {
  const pool = [...courses];
  const picked: CourseCardData[] = [];
  while (pool.length && picked.length < max) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
}

export async function CoursesSection() {
  const result = await getPublicCourses({ pricingType: 'paid', limit: 100 });
  const paidCourses = (result?.data ?? []).filter(isPaidCourse);
  const courses = pickRandomCourses(paidCourses, MAX_COURSES);

  return (
    <Section className="bg-surface">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-8 bg-primary/60" aria-hidden />
              Our Courses
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Explore Our Professional Courses
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
              Discover professional training programs designed to enhance your knowledge, develop
              industry-relevant skills and support your career growth.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="shrink-0">
            <HowToApplyButton />
          </Reveal>
        </div>

        <div className="mt-10">
          {courses.length ? (
            <CourseGrid courses={courses} />
          ) : (
            <EmptyState
              title="No courses available yet"
              description="Paid courses will appear here once they are published."
            />
          )}
        </div>
      </Container>
    </Section>
  );
}
