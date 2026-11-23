import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Container, Section, SectionHeading } from '@/components/ui/section';
import { getPublicCourseById } from '@/lib/courses';

export const metadata: Metadata = {
  title: 'How to Apply',
  description: 'Apply to SkillBee training and certification programs.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function FormPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const courseId = first(sp.courseId);
  const course = courseId ? await getPublicCourseById(courseId) : null;

  return (
    <Section className="bg-canvas">
      <Container>
        <SectionHeading
          eyebrow="How to Apply"
          title="Start your SkillBee journey"
          description="This page will host the application form in a later phase. The layout is ready for content and form fields."
        />

        {course ? (
          <Card className="mt-8 flex max-w-3xl items-center gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">
                Applying for
              </p>
              <p className="truncate text-base font-semibold text-ink">{course.title}</p>
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
            >
              Course details
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Card>
        ) : null}

        <div className="mt-10 max-w-3xl rounded-2xl border border-dashed border-line bg-surface p-8 text-center sm:p-12">
          <p className="text-sm text-ink-subtle">
            Application form coming soon — this placeholder keeps the route and layout ready.
          </p>
        </div>
      </Container>
    </Section>
  );
}
