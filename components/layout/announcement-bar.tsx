'use client';

import { Megaphone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Announcement } from '@/lib/announcements';
import { cn } from '@/lib/cn';

const DISPLAY_MS = 5000;
const EXIT_MS = 520;

function AnnouncementItem({
  item,
  animateClass,
}: {
  item: Announcement;
  animateClass?: string;
}) {
  const message = item.link ? (
    <Link href={item.link} className="transition-colors hover:text-white hover:underline">
      {item.message}
    </Link>
  ) : (
    item.message
  );

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-sky-400/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300 ring-1 ring-inset ring-sky-300/25">
        <Megaphone className="size-3.5" aria-hidden />
        <span className="hidden sm:inline">Announcement</span>
      </span>
      <span className="h-5 w-px shrink-0 bg-gradient-to-b from-transparent via-white/25 to-transparent" aria-hidden />
      <span className={cn('min-w-0 flex-1 text-sm font-medium leading-6 text-white', animateClass)}>{message}</span>
    </div>
  );
}

export function AnnouncementBar({ announcements }: { announcements: Announcement[] }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  const count = announcements.length;

  useEffect(() => {
    if (count < 2) return;

    let cancelled = false;
    const schedule = (fn: () => void, ms: number) => {
      timerRef.current = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    };

    const advance = () => {
      setPhase('out');
      schedule(() => {
        indexRef.current = (indexRef.current + 1) % count;
        setIndex(indexRef.current);
        setPhase('in');
        schedule(advance, DISPLAY_MS);
      }, EXIT_MS);
    };

    schedule(advance, DISPLAY_MS);
    return () => {
      cancelled = true;
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [count]);

  if (count === 0) return null;

  const current = announcements[index] ?? announcements[0];
  const animate = count > 1;

  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-gradient-to-r from-navy via-navy-2 to-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_-20%,rgb(45_156_219/0.18),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-12 max-w-7xl items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <AnnouncementItem
          key={`${index}-${current.id}`}
          item={current}
          animateClass={animate ? (phase === 'out' ? 'announcement-exit' : 'announcement-enter') : undefined}
        />
        <Link
          href="/instructors"
          className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/20 sm:inline-flex"
        >
          Become an Instructor
        </Link>
      </div>
    </div>
  );
}
