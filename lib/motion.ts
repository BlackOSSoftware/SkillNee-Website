import type { Variants } from 'framer-motion';

export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

export const scaleInVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainerVariant: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

export const viewportOnce = { once: true, margin: '-60px' } as const;
