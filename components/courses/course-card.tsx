import { Card } from '@/components/ui/card';
import { cn } from '@/lib/cn';
import type { CourseCardData } from '@/lib/courses';
import { ApplyNowButton } from './apply-now-button';
import { CourseDuration } from './course-duration';
import { CourseImage } from './course-image';

export function CourseCard({ course, className }: { course: CourseCardData; className?: string }) {
  return (
    <Card className={cn('group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-pop', className)}>
      <CourseImage thumbnail={course.thumbnail} title={course.title} />
      <div className="flex flex-1 flex-col items-center p-5 text-center">
        <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">
          {course.title}
        </h3>
        <div className="mt-3">
          <CourseDuration value={course.durationValue} unit={course.durationUnit} className="justify-center" />
        </div>
        <div className="mt-auto pt-5">
          <ApplyNowButton courseId={course.id} className="mx-auto w-auto px-6" />
        </div>
      </div>
    </Card>
  );
}
