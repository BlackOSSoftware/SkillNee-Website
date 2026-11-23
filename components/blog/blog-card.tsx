import Link from 'next/link';
import { CalendarDays, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mediaUrl } from '@/lib/media';
import type { BlogCard as BlogCardData } from '@/lib/blogs';

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function BlogCard({ blog }: { blog: BlogCardData }) {
  const image = mediaUrl(blog.featuredImage);
  const date = formatDate(blog.publishedAt);

  return (
    <Link href={`/blogs/${blog.slug}`} className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35">
      <Card className="flex h-full flex-col overflow-hidden transition-shadow group-hover:shadow-pop">
        <div className="relative aspect-video overflow-hidden bg-linear-to-br from-sky-500/15 via-violet-500/15 to-teal-500/15">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={blog.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          ) : null}
          {blog.isFeatured ? (
            <div className="absolute left-4 top-4">
              <Badge tone="primary">Featured</Badge>
            </div>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">{blog.title}</h3>
          {blog.excerpt ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-muted">{blog.excerpt}</p> : null}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-subtle">
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
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </Card>
    </Link>
  );
}
