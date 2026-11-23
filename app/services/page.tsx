import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section } from '@/components/ui/section';
import { EmptyState } from '@/components/ui/states';
import { getPublicCategories } from '@/lib/courses';
import { mediaUrl } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Browse SkillBee course categories and services.',
};

export default async function ServicesPage() {
  const categories = await getPublicCategories();

  return (
    <>
      <PageHeader
        title="Services"
        description="Explore our course categories — pick a category to see all related courses."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />
      <Section>
        <Container>
          {categories.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const image = mediaUrl(category.image);
                return (
                  <Card key={category.id} className="group flex h-full flex-col overflow-hidden p-5 transition-shadow hover:shadow-pop">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={image} alt={category.name} className="mb-4 aspect-video w-full rounded-lg object-cover" loading="lazy" />
                    ) : null}
                    <h2 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">{category.name}</h2>
                    {category.description ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-muted">{category.description}</p> : null}
                    <div className="mt-5 pt-1">
                      <ButtonLink href={`/services/${category.slug}`} variant="secondary" size="sm">
                        View courses
                        <ArrowRight className="size-4" aria-hidden />
                      </ButtonLink>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyState title="No categories yet" description="Course categories will appear here once published." />
          )}
        </Container>
      </Section>
    </>
  );
}
