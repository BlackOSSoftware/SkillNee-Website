'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, Briefcase, FlaskConical, MessagesSquare, Target, TrendingUp, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/cn';
import { fadeUpVariant, staggerContainerVariant, viewportOnce } from '@/lib/motion';
import type { WhyChooseFeature, WhyChooseIconName } from '@/lib/why-choose';

const ICONS: Record<WhyChooseIconName, LucideIcon> = {
  briefcase: Briefcase,
  messages: MessagesSquare,
  target: Target,
  flask: FlaskConical,
  badge: BadgeCheck,
  trending: TrendingUp,
};

function FeatureCard({ feature }: { feature: WhyChooseFeature }) {
  const Icon = ICONS[feature.icon];
  return (
    <Card className="group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop">
      <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/15">
        <Icon className="size-6" aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{feature.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-ink-muted">{feature.description}</p>
    </Card>
  );
}

export function FeatureGrid({ features }: { features: WhyChooseFeature[] }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerContainerVariant}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {features.map((feature) => (
        <motion.div key={feature.title} variants={fadeUpVariant} className={cn('h-full')}>
          <FeatureCard feature={feature} />
        </motion.div>
      ))}
    </motion.div>
  );
}
