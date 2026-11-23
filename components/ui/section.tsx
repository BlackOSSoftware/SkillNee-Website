import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Section({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('py-16 sm:py-20 lg:py-24', className)} {...rest} />;
}

export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...rest} />;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className }: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className={cn('text-xs font-semibold uppercase tracking-[0.14em] text-primary', centered && 'justify-center')}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <div className={cn('mt-4 text-base leading-7 text-ink-muted', centered && 'mx-auto max-w-2xl')}>{description}</div> : null}
    </div>
  );
}
