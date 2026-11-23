import { ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export function applyNowHref(courseId: string): string {
  return `/form/?courseId=${encodeURIComponent(courseId)}`;
}

export function ApplyNowButton({
  courseId,
  className,
  children = 'Apply Now',
}: {
  courseId: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <ButtonLink href={applyNowHref(courseId)} variant="primary" size="sm" className={cn('w-full', className)}>
      {children}
    </ButtonLink>
  );
}
