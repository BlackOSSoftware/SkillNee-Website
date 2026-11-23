'use client';

import { animate, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { PlacementCompany } from '@/lib/placements';
import { CompanyLogo } from './company-logo';
import { cn } from '@/lib/cn';

const MARQUEE_DURATION = 40;

export function CompanyLogoMarquee({
  companies,
  className,
}: {
  companies: PlacementCompany[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  useEffect(() => {
    if (reduceMotion || !trackRef.current) return;
    const controls = animate(
      trackRef.current,
      { x: ['0%', '-50%'] },
      { duration: MARQUEE_DURATION, ease: 'linear', repeat: Infinity }
    );
    controlsRef.current = controls;
    return () => controls.stop();
  }, [reduceMotion]);

  const sequence = (keyPrefix: string, hidden: boolean) => (
    <div key={keyPrefix} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {companies.map((company) => (
        <CompanyLogo key={`${keyPrefix}-${company.name}`} company={company} />
      ))}
    </div>
  );

  if (reduceMotion) {
    return (
      <div className={cn('overflow-x-auto py-2', className)}>
        <div className="flex w-max items-center">
          {companies.map((company) => (
            <CompanyLogo key={company.name} company={company} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('relative overflow-hidden py-2', className)}
      onMouseEnter={() => controlsRef.current?.pause()}
      onMouseLeave={() => controlsRef.current?.play()}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        style={{ transform: 'translateX(0)' }}
      >
        {sequence('a', false)}
        {sequence('b', true)}
      </div>
    </div>
  );
}
