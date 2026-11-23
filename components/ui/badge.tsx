import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'sky'
  | 'violet'
  | 'teal'
  | 'amber'
  | 'rose'
  | 'indigo';

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-surface-2 text-ink-muted ring-line',
  primary: 'bg-primary/10 text-primary ring-primary/25',
  info: 'bg-info/10 text-info ring-info/25',
  success: 'bg-success/10 text-success ring-success/25',
  warning: 'bg-warning/10 text-warning ring-warning/25',
  danger: 'bg-danger/10 text-danger ring-danger/25',
  sky: 'bg-sky-500/10 text-sky-700 ring-sky-500/20',
  violet: 'bg-violet-500/10 text-violet-700 ring-violet-500/20',
  teal: 'bg-teal-500/10 text-teal-700 ring-teal-500/20',
  amber: 'bg-amber-500/10 text-amber-700 ring-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-700 ring-rose-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-700 ring-indigo-500/20',
};

export function Badge({ tone = 'neutral', children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
