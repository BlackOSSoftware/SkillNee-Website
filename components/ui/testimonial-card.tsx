import { Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { IconTile } from '@/components/ui/icon-tile';
import { cn } from '@/lib/cn';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  className?: string;
}

export function TestimonialCard({ quote, name, role, className }: TestimonialCardProps) {
  return (
    <Card className={cn('flex h-full flex-col p-6 transition-shadow hover:shadow-pop', className)}>
      <IconTile icon={Quote} tone="amber" size="md" />
      <blockquote className="mt-4 flex-1 text-base leading-7 text-ink-muted">{quote}</blockquote>
      <div className="mt-5 border-t border-line pt-4">
        <p className="text-sm font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-xs text-ink-subtle">{role}</p>
      </div>
    </Card>
  );
}
