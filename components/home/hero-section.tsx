'use client';

import { ArrowRight, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/section';

const HERO_IMAGE = '/hero/remote-learning-hero.jpg';

const container = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#061a33] text-white">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#04101f]/95 via-[#0a2a52]/78 to-[#0a2a52]/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#04101f]/80 via-transparent to-[#04101f]/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_90%_at_75%_30%,rgb(56_189_248/0.14),transparent_65%)]"
        aria-hidden
      />

      <Container className="relative py-20 sm:py-24 lg:py-28">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial={reduceMotion ? 'show' : 'hidden'}
          animate="show"
        >
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-300"
          >
            <span className="h-px w-8 bg-sky-400/70" aria-hidden />
            SkillBee: Global Solution
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 text-lg font-medium tracking-wide text-white/85 sm:text-xl"
          >
            Sound Successful Solution
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Offering Effective &amp; Engaging{' '}
            <span className="bg-linear-to-r from-sky-300 to-cyan-200 bg-clip-text text-transparent">
              Remote Learning
            </span>{' '}
            Solutions
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8"
          >
            Demonstrate your dedication to job performance by earning a professional certification.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink
              href="/courses"
              size="lg"
              className="group h-12 px-7 text-base"
            >
              View Courses
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </ButtonLink>
            <ButtonLink
              href="/courses?courseType=FREE"
              variant="outline-light"
              size="lg"
              className="h-12 px-7 text-base"
            >
              <Compass className="size-5" aria-hidden />
              Get Free Courses
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
