import { Clock } from 'lucide-react';
import { cn } from '@/lib/cn';

export function formatCourseDuration(value?: number, unit?: string): string {
  if (!value || !unit) return '';
  const label = unit.endsWith('s') ? unit : `${unit}s`;
  return `${value} ${label}`;
}

export function CourseDuration({
  value,
  unit,
  className,
}: {
  value?: number;
  unit?: string;
  className?: string;
}) {
  const duration = formatCourseDuration(value, unit);
  if (!duration) return null;
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-medium text-ink-subtle', className)}>
      <Clock className="size-3.5 text-primary" aria-hidden />
      {duration}
    </span>
  );
}
