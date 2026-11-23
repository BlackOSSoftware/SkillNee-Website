import type { Metadata } from 'next';
import { CourseCatalog } from '@/components/catalog/course-catalog';
import { PageHeader } from '@/components/ui/page-header';
import { getPublicCategories, type CourseListParams } from '@/lib/courses';

export const metadata: Metadata = {
  title: 'Live Sessions',
  description: 'Browse SkillBee live session courses and batches.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LiveSessionsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const params: CourseListParams = {
    courseType: 'LIVE_SESSION',
    search: first(sp.search) || undefined,
    level: first(sp.level) || undefined,
    page: Number(first(sp.page)) || 1,
    limit: 12,
  };
  const categories = await getPublicCategories();

  return (
    <>
      <PageHeader
        title="Live Sessions"
        description="Join live SkillBee batches — apply to reserve your seat."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Live Sessions' }]}
      />
      <CourseCatalog params={params} categories={categories} showTypeFilter={false} />
    </>
  );
}
