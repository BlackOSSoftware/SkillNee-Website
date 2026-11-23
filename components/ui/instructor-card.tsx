import { UserRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { IconTile } from '@/components/ui/icon-tile';
import { cn } from '@/lib/cn';

interface InstructorCardProps {
  name: string;
  role: string;
  bio: string;
  tone?: 'violet' | 'teal' | 'sky' | 'amber' | 'rose' | 'indigo';
  className?: string;
}

export function InstructorCard({ name, role, bio, tone = 'violet', className }: InstructorCardProps) {
  return (
    <Card className={cn('flex h-full flex-col items-center p-6 text-center transition-shadow hover:shadow-pop', className)}>
      <IconTile icon={UserRound} tone={tone} size="lg" className="size-16" iconClassName="size-7" />
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{name}</h3>
      <div className="mt-2">
        <Badge tone={tone}>{role}</Badge>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink-muted">{bio}</p>
    </Card>
  );
}
