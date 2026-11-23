import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Container } from '@/components/ui/section';
import { cn } from '@/lib/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, breadcrumbs, actions, className }: PageHeaderProps) {
  const items = breadcrumbs ?? [{ label: 'Home', href: '/' }, { label: title }];

  return (
    <section className={cn('border-b border-line bg-surface', className)}>
      <Container className="py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const content = (
              <>
                {index === 0 && item.href === '/' ? <Home className="size-4" aria-hidden /> : null}
                <span>{item.label}</span>
              </>
            );

            return (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link href={item.href} className="inline-flex items-center gap-1.5 transition-colors hover:text-primary">
                    {content}
                  </Link>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className={cn(isLast && 'font-medium text-ink')}>
                    {content}
                  </span>
                )}
                {!isLast ? <ChevronRight className="size-4 text-ink-subtle/70" aria-hidden /> : null}
              </span>
            );
          })}
        </nav>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
            {description ? <p className="mt-3 text-base leading-7 text-ink-muted">{description}</p> : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
