'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import { EASE_OUT_EXPO } from '@/lib/motion';
import type { Testimonial } from '@/lib/testimonials';
import { TestimonialCard } from './testimonial-card';

const AUTOPLAY_MS = 5000;

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const compute = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setCount(3);
      else if (window.matchMedia('(min-width: 640px)').matches) setCount(2);
      else setCount(1);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  return count;
}

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const reduceMotion = useReducedMotion();
  const visibleCount = useVisibleCount();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [instant, setInstant] = useState(false);

  const total = testimonials.length;
  const items = useMemo(() => [...testimonials, ...testimonials], [testimonials]);
  const slidable = total > visibleCount;
  // index can reach `total` (== 0 visually, duplicated track) then snaps back instantly.
  const displayIndex = Math.min(Math.max(index, -1), total);
  const slidePercent = items.length > 0 ? (displayIndex / items.length) * 100 : 0;
  const activeDot = ((index % total) + total) % total;

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const prev = useCallback(() => setIndex((i) => i - 1), []);

  // Seamless loop: index === total is visually identical to 0 (duplicated half),
  // index === -1 is identical to total - 1. Wait for the slide to finish, then
  // snap instantly — the duplicated content makes the snap invisible.
  useEffect(() => {
    if (index < total && index > -1) return;
    const timer = window.setTimeout(() => {
      setInstant(true);
      setIndex(index >= total ? 0 : total - 1);
    }, 620);
    return () => window.clearTimeout(timer);
  }, [index, total]);

  useEffect(() => {
    if (!instant) return;
    const timer = window.setTimeout(() => setInstant(false), 60);
    return () => window.clearTimeout(timer);
  }, [instant]);

  useEffect(() => {
    if (reduceMotion || paused || !slidable) return;
    const timer = window.setInterval(() => setIndex((i) => i + 1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion, paused, slidable]);

  if (!total) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${slidePercent}%` }}
          transition={{ duration: reduceMotion || instant ? 0 : 0.55, ease: EASE_OUT_EXPO }}
          drag={reduceMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) next();
            else if (info.offset.x > 60) prev();
          }}
        >
          {items.map((testimonial, i) => (
            <motion.div
              key={`${testimonial.id}-${i}`}
              className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.4), ease: EASE_OUT_EXPO }}
            >
              <TestimonialCard testimonial={testimonial} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {slidable ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute -left-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:border-primary hover:text-primary disabled:opacity-40 sm:flex lg:-left-5"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="absolute -right-3 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-sm transition hover:border-primary hover:text-primary disabled:opacity-40 sm:flex lg:-right-5"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === activeDot}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === activeDot ? 'w-6 bg-primary' : 'w-2 bg-line hover:bg-primary/40'
                )}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
