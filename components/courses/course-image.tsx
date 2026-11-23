import { BookOpen } from 'lucide-react';
import { mediaUrl } from '@/lib/media';
import { cn } from '@/lib/cn';

export function CourseImage({
  thumbnail,
  title,
  className,
}: {
  thumbnail: unknown;
  title: string;
  className?: string;
}) {
  const image = mediaUrl(thumbnail);

  return (
    <div
      className={cn(
        'relative aspect-video overflow-hidden bg-linear-to-br from-sky-500/15 via-violet-500/15 to-teal-500/15',
        className
      )}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="size-10 text-primary/40" aria-hidden />
        </div>
      )}
    </div>
  );
}
