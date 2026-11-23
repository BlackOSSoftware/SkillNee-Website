import type { Metadata } from 'next';
import { CourseCatalog } from '@/components/catalog/course-catalog';
import { PageHeader } from '@/components/ui/page-header';
import { getPublicCategories, type CourseListParams } from '@/lib/courses';

export const metadata: Metadata = {
  title: 'All Courses',
  description: 'Browse all SkillBee courses — free, recorded and live sessions.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const params: CourseListParams = {
    search: first(sp.search) || undefined,
    categoryId: first(sp.categoryId) || undefined,
    level: first(sp.level) || undefined,
    courseType: first(sp.courseType) || undefined,
    page: Number(first(sp.page)) || 1,
    limit: 12,
  };
  const categories = await getPublicCategories();

  return (
    <>
      <PageHeader
        title="All Courses"
        description="Explore every SkillBee course — filter by category, level or type."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'All Courses' }]}
      />
      <CourseCatalog params={params} categories={categories} />
    </>
  );
}
