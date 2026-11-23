import { ButtonLink } from '@/components/ui/button';
import { Container, Section, SectionHeading } from '@/components/ui/section';
import { InstructorCard } from '@/components/ui/instructor-card';
import { TestimonialCard } from '@/components/ui/testimonial-card';

const instructors = [
  { name: 'Instructor name placeholder 01', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'violet' as const },
  { name: 'Instructor name placeholder 02', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'teal' as const },
  { name: 'Instructor name placeholder 03', role: 'Role placeholder', bio: 'Instructor bio placeholder for layout.', tone: 'sky' as const },
];

const testimonials = [
  { quote: 'Testimonial placeholder text for layout and spacing.', name: 'Learner name placeholder 01', role: 'Learner role placeholder' },
  { quote: 'Testimonial placeholder text for layout and spacing.', name: 'Learner name placeholder 02', role: 'Learner role placeholder' },
  { quote: 'Testimonial placeholder text for layout and spacing.', name: 'Learner name placeholder 03', role: 'Learner role placeholder' },
];

export function InstructorsSection() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Faculty"
            title="Instructor introduction"
            description="Placeholder instructor cards preview the faculty layout."
          />
          <ButtonLink href="/instructors" variant="secondary" size="md" className="shrink-0">
            Meet instructors
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} {...instructor} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function TestimonialsSection() {
  return (
    <Section className="bg-canvas">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Learner stories"
          description="Placeholder testimonial cards preview the homepage layout."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
