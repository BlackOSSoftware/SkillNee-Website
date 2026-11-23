import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Check, Clock, Layers, Lock, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InstructorCard } from '@/components/ui/instructor-card';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section } from '@/components/ui/section';
import { formatDuration, formatPrice, LEVEL_LABELS, TYPE_LABELS } from '@/components/ui/api-course-card';
import { getCourseBySlug, getCourseCurriculum } from '@/lib/courses';
import { mediaUrl } from '@/lib/media';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: 'Course not found' };
  return {
    title: course.title,
    description: course.shortDescription || course.title,
  };
}

export default async function CourseDetailsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const [course, curriculum] = await Promise.all([getCourseBySlug(slug), getCourseCurriculum(slug)]);
  if (!course) notFound();

  const image = mediaUrl(course.thumbnail);
  const category = course.categories?.[0];
  const level = course.level ? LEVEL_LABELS[course.level] ?? course.level : '';
  const duration = formatDuration(course.durationValue, course.durationUnit);
  const typeLabel = course.courseType ? TYPE_LABELS[course.courseType] ?? course.courseType : '';
  const rating = course.rating?.averageRating ? Number(course.rating.averageRating).toFixed(1) : '';
  const reviews = course.reviews ?? [];
  const topics = curriculum?.topics ?? [];

  return (
    <>
      <PageHeader
        title={course.title}
        description={course.shortDescription}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Courses', href: '/courses' },
          ...(category ? [{ label: category.name, href: `/services/${category.slug}` }] : []),
          { label: course.title },
        ]}
      />

      <Section>
        <Container className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-linear-to-br from-sky-500/15 via-violet-500/15 to-teal-500/15">
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={image} alt={course.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  {category ? <Badge tone="primary">{category.name}</Badge> : null}
                  {typeLabel ? <Badge tone="teal">{typeLabel}</Badge> : null}
                  {level ? <Badge tone="neutral">{level}</Badge> : null}
                  {duration ? <Badge tone="amber">{duration}</Badge> : null}
                  {rating ? (
                    <Badge tone="warning">
                      <Star className="mr-1 size-3 fill-current" aria-hidden />
                      {rating}
                    </Badge>
                  ) : null}
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink">{course.title}</h2>
                {course.description ? (
                  <div
                    className="mt-4 text-sm leading-7 text-ink-muted [&_a]:text-primary [&_a]:underline [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_p]:mb-3"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                ) : null}
              </div>
            </Card>

            {course.learningObjectives?.length ? (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-ink">What you will learn</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.learningObjectives.map((item, index) => {
                    const title = typeof item === 'string' ? item : item.title ?? '';
                    const description = typeof item === 'string' ? '' : item.description ?? '';
                    return (
                      <li key={title || index} className="flex items-start gap-2 text-sm text-ink-muted">
                        <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                        <span>
                          {title}
                          {description ? <span className="mt-0.5 block text-xs text-ink-subtle">{description}</span> : null}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            ) : null}

            {topics.length ? (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-ink">Curriculum</h3>
                <div className="mt-4 space-y-4">
                  {topics.map((topic) => (
                    <div key={topic.id} className="rounded-lg border border-line bg-surface-2/50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold text-ink">{topic.title}</h4>
                        {topic.locked ? (
                          <Badge tone="neutral">
                            <Lock className="mr-1 size-3" aria-hidden />
                            Locked
                          </Badge>
                        ) : null}
                      </div>
                      {topic.description ? <p className="mt-1 text-xs text-ink-muted">{topic.description}</p> : null}
                      {topic.lessons?.length ? (
                        <ul className="mt-3 space-y-1.5">
                          {topic.lessons.map((lesson) => (
                            <li key={lesson.id} className="flex items-center gap-2 text-sm text-ink-muted">
                              <Check className="size-3.5 shrink-0 text-primary" aria-hidden />
                              {lesson.title}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}

            {reviews.length ? (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-ink">Reviews</h3>
                <div className="mt-4 space-y-4">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="rounded-lg border border-line p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                        <span className="font-medium text-ink">{review.rating}/5</span>
                        {review.title ? <span className="text-ink-muted">· {review.title}</span> : null}
                      </div>
                      {review.comment ? <p className="mt-2 text-sm leading-6 text-ink-muted">{review.comment}</p> : null}
                      {review.student ? (
                        <p className="mt-2 text-xs text-ink-subtle">
                          {review.student.firstName} {review.student.lastName}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-ink">Enrollment</h3>
              <p className="mt-2 text-2xl font-semibold text-ink">{formatPrice(course)}</p>
              <div className="mt-5 space-y-3">
                <ButtonLink href="/register" className="w-full">
                  {course.actionLabel || 'Enroll now'}
                </ButtonLink>
                <ButtonLink href="/login" variant="secondary" className="w-full">
                  Log in to continue
                </ButtonLink>
              </div>
              {(course.durationValue || level) ? (
                <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm text-ink-muted">
                  {level ? (
                    <p className="flex items-center gap-2">
                      <Layers className="size-4" aria-hidden /> {level}
                    </p>
                  ) : null}
                  {duration ? (
                    <p className="flex items-center gap-2">
                      <Clock className="size-4" aria-hidden /> {duration}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </Card>

            {course.instructors?.length ? (
              <div className="space-y-4">
                {course.instructors.map((instructor) => (
                  <InstructorCard
                    key={instructor.id}
                    name={`${instructor.firstName} ${instructor.lastName}`.trim()}
                    role="Instructor"
                    bio=""
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
