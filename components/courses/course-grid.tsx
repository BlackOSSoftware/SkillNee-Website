'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';
import { fadeUpVariant, staggerContainerVariant, viewportOnce } from '@/lib/motion';
import type { CourseCardData } from '@/lib/courses';
import { CourseCard } from './course-card';

export function CourseGrid({
  courses,
  className,
}: {
  courses: CourseCardData[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}
      variants={staggerContainerVariant}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {courses.map((course) => (
        <motion.div key={course.id} variants={fadeUpVariant}>
          <CourseCard course={course} />
        </motion.div>
      ))}
    </motion.div>
  );
}
