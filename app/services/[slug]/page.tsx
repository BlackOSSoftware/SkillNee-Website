import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CourseCatalog } from '@/components/catalog/course-catalog';
import { PageHeader } from '@/components/ui/page-header';
import { getPublicCategories, type CourseListParams } from '@/lib/courses';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getPublicCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return { title: 'Category' };
  return {
    title: category.name,
    description: category.description || `Courses in ${category.name}`,
  };
}

export default async function ServiceCategoryPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const categories = await getPublicCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const courseParams: CourseListParams = {
    categoryId: category.id,
    search: first(sp.search) || undefined,
    level: first(sp.level) || undefined,
    courseType: first(sp.courseType) || undefined,
    page: Number(first(sp.page)) || 1,
    limit: 12,
  };

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description || `All courses in ${category.name}.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: category.name },
        ]}
      />
      <CourseCatalog params={courseParams} categories={categories} />
    </>
  );
}
