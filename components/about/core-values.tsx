'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Award,
  ClipboardCheck,
  Flame,
  HeartHandshake,
  MessagesSquare,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fadeUpVariant, staggerContainerVariant, viewportOnce } from '@/lib/motion';
import { ABOUT_VALUES, type AboutValueIconName } from '@/lib/about';

const ICONS: Record<AboutValueIconName, LucideIcon> = {
  award: Award,
  shield: ShieldCheck,
  flame: Flame,
  heart: HeartHandshake,
  messages: MessagesSquare,
  clipboard: ClipboardCheck,
  users: Users,
};

function ValueCard({ value }: { value: (typeof ABOUT_VALUES)[number] }) {
  const Icon = ICONS[value.icon];
  return (
    <Card className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop">
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-5" aria-hidden />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{value.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-muted">{value.description}</p>
    </Card>
  );
}

export function CoreValues() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ABOUT_VALUES.map((value) => (
          <ValueCard key={value.title} value={value} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      variants={staggerContainerVariant}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {ABOUT_VALUES.map((value) => (
        <motion.div key={value.title} variants={fadeUpVariant} className="h-full">
          <ValueCard value={value} />
        </motion.div>
      ))}
    </motion.div>
  );
}
