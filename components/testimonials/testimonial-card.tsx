import Link from 'next/link';
import { BookOpen, Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/cn';
import type { Testimonial } from '@/lib/testimonials';
import { StudentAvatar, StudentName } from './student-avatar';

function RatingStars({ rating }: { rating: number }) {
  if (!rating || rating < 1) return null;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn('size-3.5', i < rating ? 'fill-amber-400 text-amber-400' : 'text-line')}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function TestimonialCard({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  return (
    <Card className={cn('flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-pop', className)}>
      <div className="flex items-start justify-between gap-3">
        <Quote className="size-6 text-primary/30" aria-hidden />
        <RatingStars rating={testimonial.rating} />
      </div>

      {testimonial.title ? (
        <h3 className="mt-3 text-base font-semibold leading-snug text-ink">{testimonial.title}</h3>
      ) : null}

      {testimonial.comment ? (
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">&ldquo;{testimonial.comment}&rdquo;</p>
      ) : (
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">Rated this course {testimonial.rating} out of 5.</p>
      )}

      {testimonial.course ? (
        <Link
          href={`/courses/${testimonial.course.slug}`}
          className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
        >
          <BookOpen className="size-3.5" aria-hidden />
          Course: {testimonial.course.title}
        </Link>
      ) : null}

      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <StudentAvatar student={testimonial.student} />
        <div className="min-w-0">
          <StudentName student={testimonial.student} />
          <p className="text-xs text-ink-subtle">SkillBee Student</p>
        </div>
      </div>
    </Card>
  );
}
