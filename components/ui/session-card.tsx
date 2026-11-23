import { ArrowRight, CalendarDays, Clock, UserRound, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconTile, type IconTone } from '@/components/ui/icon-tile';
import { cn } from '@/lib/cn';

interface SessionCardProps {
  title: string;
  date: string;
  time: string;
  mode: string;
  instructor: string;
  href: string;
  icon?: LucideIcon;
  tone?: IconTone;
  className?: string;
}

export function SessionCard({
  title,
  date,
  time,
  mode,
  instructor,
  href,
  icon: Icon = Video,
  tone = 'rose',
  className,
}: SessionCardProps) {
  return (
    <Card className={cn('group flex h-full flex-col gap-4 p-5 transition-shadow hover:shadow-pop sm:flex-row sm:items-center', className)}>
      <IconTile icon={Icon} tone={tone} size="lg" className="shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={tone}>{mode}</Badge>
        </div>
        <h3 className="mt-2 text-base font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">{title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-ink-subtle">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" aria-hidden />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" aria-hidden />
            {time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="size-3.5" aria-hidden />
            {instructor}
          </span>
        </div>
      </div>
      <div className="shrink-0">
        <ButtonLink href={href} variant="secondary" size="sm">
          View session
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </Card>
  );
}
