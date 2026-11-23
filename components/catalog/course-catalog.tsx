import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Field, Input, Select } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/states';
import { ApiCourseCard } from '@/components/ui/api-course-card';
import { getPublicCourses, type CourseCategory, type CourseListParams } from '@/lib/courses';
import { Container, Section } from '@/components/ui/section';

const LEVEL_OPTIONS = [
  { value: '', label: 'All levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'all_levels', label: 'All levels' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'FREE', label: 'Free' },
  { value: 'PRE_RECORDED', label: 'Recorded' },
  { value: 'LIVE_SESSION', label: 'Live session' },
];

function buildHref(params: CourseListParams, page: number) {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    if (key === 'page') continue;
    sp.set(key, String(value));
  }
  if (page > 1) sp.set('page', String(page));
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export async function CourseCatalog({
  params,
  categories,
  showTypeFilter = true,
}: {
  params: CourseListParams;
  categories: CourseCategory[];
  showTypeFilter?: boolean;
}) {
  const result = await getPublicCourses(params);
  const courses = result?.data ?? [];
  const pagination = result?.pagination;

  return (
    <Section>
      <Container>
        <Card className="p-4">
          <form method="get" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_200px_180px_180px_auto]">
            <Field id="course-search" label="Search">
              <Input id="course-search" name="search" defaultValue={params.search ?? ''} placeholder="Search courses" />
            </Field>
            <Field id="course-category" label="Category">
              <Select id="course-category" name="categoryId" defaultValue={params.categoryId ?? ''}>
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field id="course-level" label="Level">
              <Select id="course-level" name="level" defaultValue={params.level ?? ''}>
                {LEVEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </Field>
            {showTypeFilter ? (
              <Field id="course-type" label="Type">
                <Select id="course-type" name="courseType" defaultValue={params.courseType ?? ''}>
                  {TYPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            ) : null}
            {!showTypeFilter && params.courseType ? <input type="hidden" name="courseType" value={params.courseType} /> : null}
            <div className="flex items-end">
              <Button type="submit" variant="secondary" size="md" className="w-full sm:w-auto">
                Filters
              </Button>
            </div>
          </form>
        </Card>

        {courses.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <ApiCourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-8"
            title="No courses found"
            description="Try adjusting your search or filters."
          />
        )}

        {pagination && pagination.totalPages > 1 ? (
          <div className="mt-10 flex items-center justify-center gap-2">
            {pagination.hasPreviousPage ? (
              <ButtonLink href={buildHref(params, pagination.page - 1)} variant="secondary" size="sm">
                Previous
              </ButtonLink>
            ) : (
              <Button type="button" variant="secondary" size="sm" disabled>
                Previous
              </Button>
            )}
            <span className="px-2 text-sm text-ink-muted">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            {pagination.hasNextPage ? (
              <ButtonLink href={buildHref(params, pagination.page + 1)} variant="secondary" size="sm">
                Next
              </ButtonLink>
            ) : (
              <Button type="button" variant="secondary" size="sm" disabled>
                Next
              </Button>
            )}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
