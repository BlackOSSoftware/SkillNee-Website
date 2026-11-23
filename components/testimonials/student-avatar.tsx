import { mediaUrl } from '@/lib/media';
import { cn } from '@/lib/cn';
import type { TestimonialStudent } from '@/lib/testimonials';

function initials(student: TestimonialStudent | null): string {
  const first = student?.firstName?.trim().charAt(0) ?? '';
  const last = student?.lastName?.trim().charAt(0) ?? '';
  return (first + last).toUpperCase() || 'S';
}

export function StudentAvatar({
  student,
  className,
}: {
  student: TestimonialStudent | null;
  className?: string;
}) {
  const image = mediaUrl(student?.profileImage);
  const name = [student?.firstName, student?.lastName].filter(Boolean).join(' ') || 'Student';

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        loading="lazy"
        className={cn('size-12 shrink-0 rounded-full object-cover ring-2 ring-line', className)}
      />
    );
  }

  return (
    <span
      className={cn(
        'flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-2 ring-line',
        className
      )}
      aria-hidden
    >
      {initials(student)}
    </span>
  );
}

export function StudentName({ student }: { student: TestimonialStudent | null }) {
  const name = [student?.firstName, student?.lastName].filter(Boolean).join(' ');
  return <span className="text-sm font-semibold text-ink">{name || 'SkillBee Student'}</span>;
}
