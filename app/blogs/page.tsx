import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog/blog-card';
import { Button, ButtonLink } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section } from '@/components/ui/section';
import { EmptyState } from '@/components/ui/states';
import { getPublicBlogs } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Read SkillBee blogs, guides and updates.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function pageHref(page: number, search?: string) {
  const sp = new URLSearchParams();
  if (search) sp.set('search', search);
  if (page > 1) sp.set('page', String(page));
  const qs = sp.toString();
  return qs ? `/blogs?${qs}` : '/blogs';
}

export default async function BlogsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const search = first(sp.search) || undefined;
  const page = Number(first(sp.page)) || 1;
  const result = await getPublicBlogs({ page, limit: 9, search });
  const blogs = result?.data ?? [];
  const pagination = result?.pagination;

  return (
    <>
      <PageHeader
        title="Blogs"
        description="Guides, updates and stories from the SkillBee team."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blogs' }]}
        actions={
          <form method="get" className="flex items-center gap-2">
            <input
              type="search"
              name="search"
              defaultValue={search ?? ''}
              placeholder="Search blogs"
              className="h-10 w-56 rounded-lg border border-field-border bg-field px-3 text-sm text-ink shadow-sm transition placeholder:text-ink-subtle focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
            />
            <Button type="submit" variant="secondary" size="md">
              Search
            </Button>
          </form>
        }
      />
      <Section>
        <Container>
          {blogs.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <EmptyState title="No blogs yet" description="Published blogs will appear here." />
          )}

          {pagination && pagination.totalPages > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-2">
              {pagination.hasPreviousPage ? (
                <ButtonLink href={pageHref(pagination.page - 1, search)} variant="secondary" size="sm">
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
                <ButtonLink href={pageHref(pagination.page + 1, search)} variant="secondary" size="sm">
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
    </>
  );
}
