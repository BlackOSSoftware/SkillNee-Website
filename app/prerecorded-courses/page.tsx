import type { Metadata } from 'next';
import { CourseCatalog } from '@/components/catalog/course-catalog';
import { PageHeader } from '@/components/ui/page-header';
import { getPublicCategories, type CourseListParams } from '@/lib/courses';

export const metadata: Metadata = {
  title: 'Recorded Courses',
  description: 'Browse SkillBee prerecorded and recorded courses.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PrerecordedCoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const params: CourseListParams = {
    courseType: 'PRE_RECORDED',
    search: first(sp.search) || undefined,
    level: first(sp.level) || undefined,
    page: Number(first(sp.page)) || 1,
    limit: 12,
  };
  const categories = await getPublicCategories();

  return (
    <>
      <PageHeader
        title="Recorded Courses"
        description="Learn at your own pace with SkillBee prerecorded courses."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Recorded Courses' }]}
      />
      <CourseCatalog params={params} categories={categories} showTypeFilter={false} />
    </>
  );
}
