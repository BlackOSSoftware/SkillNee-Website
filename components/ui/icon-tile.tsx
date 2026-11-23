import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type IconTone = 'primary' | 'sky' | 'violet' | 'teal' | 'amber' | 'rose' | 'indigo';

const tones: Record<IconTone, string> = {
  primary: 'bg-primary/10 text-primary ring-primary/25',
  sky: 'bg-sky-500/10 text-sky-600 ring-sky-500/20',
  violet: 'bg-violet-500/10 text-violet-600 ring-violet-500/20',
  teal: 'bg-teal-500/10 text-teal-600 ring-teal-500/20',
  amber: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-600 ring-rose-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-600 ring-indigo-500/20',
};

const sizes = {
  sm: 'size-10',
  md: 'size-12',
  lg: 'size-14',
} as const;

export function IconTile({
  icon: Icon,
  tone = 'primary',
  size = 'md',
  className,
  iconClassName,
}: {
  icon: LucideIcon;
  tone?: IconTone;
  size?: keyof typeof sizes;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
        sizes[size],
        tones[tone],
        className
      )}
      aria-hidden
    >
      <Icon className={cn(size === 'lg' ? 'size-6' : 'size-5', iconClassName)} />
    </span>
  );
}
