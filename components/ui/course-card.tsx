import { ArrowRight, BookOpen, Clock, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconTile } from '@/components/ui/icon-tile';
import { cn } from '@/lib/cn';

interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  level?: string;
  duration?: string;
  href: string;
  icon?: LucideIcon;
  className?: string;
}

export function CourseCard({
  title,
  description,
  category,
  level,
  duration,
  href,
  icon: Icon = BookOpen,
  className,
}: CourseCardProps) {
  return (
    <Card className={cn('group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-pop', className)}>
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-sky-500/15 via-violet-500/15 to-teal-500/15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.7),transparent_55%)]" />
        <div className="absolute left-4 top-4">
          <Badge tone="primary">{category}</Badge>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <IconTile icon={Icon} tone="primary" size="lg" className="bg-surface/85 shadow-card" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">{description}</p>

        {(level || duration) ? (
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
          </div>
        ) : null}

        <div className="mt-5 pt-1">
          <ButtonLink href={href} variant="secondary" size="sm">
            View details
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
