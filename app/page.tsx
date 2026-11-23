import type { Metadata } from 'next';
import { AboutSection } from '@/components/home/about-section';
import { CoursesSection } from '@/components/home/courses-section';
import { HeroSection } from '@/components/home/hero-section';
import { StudentPlacementSection } from '@/components/placements/student-placement-section';
import { StudentTestimonialsSection } from '@/components/testimonials/student-testimonials-section';
import { WhyChooseSkillBeeSection } from '@/components/why-choose/why-choose-section';

export const metadata: Metadata = {
  title: 'Home',
  description: 'SkillBee public website homepage layout',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <StudentPlacementSection />
      <WhyChooseSkillBeeSection />
      <StudentTestimonialsSection />
    </>
  );
}
