import { EmptyState } from '@/components/ui/states';
import { Reveal } from '@/components/motion/reveal';
import { Container, Section } from '@/components/ui/section';
import { getPublicTestimonials } from '@/lib/testimonials';
import { TestimonialsSlider } from './testimonials-slider';

export async function StudentTestimonialsSection() {
  const data = await getPublicTestimonials(12);
  const testimonials = data?.testimonials ?? [];

  if (!testimonials.length) {
    return (
      <Section className="bg-canvas">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Real Experiences. Real Success Stories.
            </h2>
          </Reveal>
          <EmptyState
            className="mt-10"
            title="No testimonials yet"
            description="Student reviews will appear here once approved by our team."
          />
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-canvas">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Real Experiences. Real Success Stories.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-muted sm:text-lg sm:leading-8">
            Discover how SkillBee has helped students build industry-relevant skills, gain
            confidence and move forward in their professional careers.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <TestimonialsSlider testimonials={testimonials} />
        </Reveal>
      </Container>
    </Section>
  );
}
