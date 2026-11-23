import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalendarDays, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section } from '@/components/ui/section';
import { getBlogBySlug } from '@/lib/blogs';
import { mediaUrl } from '@/lib/media';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Blog not found' };
  return {
    title: blog.title,
    description: blog.excerpt || blog.title,
  };
}

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const image = mediaUrl(blog.featuredImage);
  const date = formatDate(blog.publishedAt);

  return (
    <>
      <PageHeader
        title={blog.title}
        description={blog.excerpt}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Blogs', href: '/blogs' },
          { label: blog.title },
        ]}
      />
      <Section>
        <Container className="max-w-3xl">
          <Card className="overflow-hidden">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={blog.title} className="aspect-video w-full object-cover" />
            ) : null}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-subtle">
                {date ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" aria-hidden />
                    {date}
                  </span>
                ) : null}
                {blog.readingTime ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden />
                    {blog.readingTime} min read
                  </span>
                ) : null}
              </div>
              {blog.tags?.length ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
              <article
                className="mt-6 text-sm leading-7 text-ink-muted [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-line [&_blockquote]:pl-4 [&_h1]:mb-3 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-ink [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_img]:my-4 [&_img]:rounded-lg [&_li]:ml-5 [&_li]:list-disc [&_ol]:my-3 [&_ol]:list-decimal [&_p]:mb-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface-2 [&_pre]:p-4 [&_table]:my-4 [&_table]:w-full [&_td]:border [&_td]:border-line [&_td]:p-2 [&_th]:border [&_th]:border-line [&_th]:p-2 [&_ul]:my-3 [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: blog.content || '' }}
              />
              <div className="mt-8 border-t border-line pt-6">
                <ButtonLink href="/blogs" variant="secondary" size="sm">
                  ← Back to blogs
                </ButtonLink>
              </div>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
