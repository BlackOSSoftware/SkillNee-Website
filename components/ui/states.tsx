import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function LoadingPlaceholder({
  label = 'Loading content',
  cards = 3,
  className,
}: {
  label?: string;
  cards?: number;
  className?: string;
}) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)} role="status" aria-label={label}>
      {Array.from({ length: cards }).map((_, index) => (
        <div key={index} className="rounded-xl border border-line/70 bg-surface p-5 shadow-card">
          <div className="h-4 w-1/3 animate-pulse rounded bg-surface-2" />
          <div className="mt-4 h-32 animate-pulse rounded-lg bg-surface-2" />
          <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-surface-2" />
          <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-surface-2" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center shadow-card', className)}>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
