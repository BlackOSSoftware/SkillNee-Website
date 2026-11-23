import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export function HowToApplyButton({
  className,
  children = 'How to Apply',
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <ButtonLink href="/form/" size="lg" className={cn('group', className)}>
      {children}
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
    </ButtonLink>
  );
}
