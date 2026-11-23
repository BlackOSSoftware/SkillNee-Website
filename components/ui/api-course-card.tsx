import { ArrowRight, Clock, Layers, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mediaUrl } from '@/lib/media';
import type { CourseCardData } from '@/lib/courses';
import { cn } from '@/lib/cn';

export const LEVEL_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  all_levels: 'All levels',
};

export const TYPE_LABELS: Record<string, string> = {
  FREE: 'Free',
  PRE_RECORDED: 'Recorded',
  LIVE_SESSION: 'Live',
};

export function formatDuration(value?: number, unit?: string) {
  if (!value || !unit) return '';
  return `${value} ${unit}`;
}

export function formatPrice(course: CourseCardData) {
  const pricing = course.pricing;
  if (course.courseType === 'FREE' || pricing?.type === 'free') return 'Free';
  const amount = pricing?.salePrice ?? pricing?.regularPrice;
  if (amount == null) return course.actionLabel || 'View';
  const currency = pricing?.currency || 'INR';
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

export function ApiCourseCard({ course, className }: { course: CourseCardData; className?: string }) {
  const image = mediaUrl(course.thumbnail);
  const category = course.categories?.[0]?.name || TYPE_LABELS[course.courseType ?? ''] || 'Course';
  const level = course.level ? LEVEL_LABELS[course.level] ?? course.level : '';
  const duration = formatDuration(course.durationValue, course.durationUnit);
  const rating = course.rating?.averageRating ? Number(course.rating.averageRating).toFixed(1) : '';
  const reviews = course.rating?.approvedReviewCount ?? course.rating?.totalApprovedReviews ?? 0;

  return (
    <Card className={cn('group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-pop', className)}>
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-sky-500/15 via-violet-500/15 to-teal-500/15">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={course.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        ) : null}
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          <Badge tone="primary">{category}</Badge>
          {course.courseType ? <Badge tone="neutral">{TYPE_LABELS[course.courseType] ?? course.courseType}</Badge> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">{course.title}</h3>
        {course.shortDescription ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">{course.shortDescription}</p> : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-subtle">
          {level ? (
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5" aria-hidden />
              {level}
            </span>
          ) : null}
          {duration ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {duration}
            </span>
          ) : null}
          {rating ? (
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
              {rating}
              {reviews ? <span className="text-ink-subtle">({reviews})</span> : null}
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 pt-1">
          <span className="text-sm font-semibold text-ink">{formatPrice(course)}</span>
          <ButtonLink href={`/courses/${course.slug}`} variant="secondary" size="sm">
            {course.actionLabel || 'View details'}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
