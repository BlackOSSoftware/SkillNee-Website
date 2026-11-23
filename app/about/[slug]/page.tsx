import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/ui/page-header';
import { Container, Section } from '@/components/ui/section';
import { Card } from '@/components/ui/card';

const PAGES: Record<string, { title: string; description: string; sections: { heading: string; body: string[] }[] }> = {
  'why-skillbee': {
    title: 'Why SkillBee',
    description: 'What makes SkillBee different for learners and professionals.',
    sections: [
      {
        heading: 'Skill-first learning',
        body: [
          'SkillBee focuses on practical, job-ready skills rather than theory alone. Every course is designed around real-world outcomes.',
          'Our curriculum is built with industry input so learners graduate with skills employers actually need.',
        ],
      },
      {
        heading: 'Learn your way',
        body: [
          'Choose prerecorded courses to learn at your own pace, or join live sessions for guided, interactive learning.',
          'Free courses let you explore before you commit.',
        ],
      },
      {
        heading: 'Trusted instructors',
        body: [
          'Courses are taught by experienced professionals who bring real project experience into the classroom.',
        ],
      },
    ],
  },
  company: {
    title: 'Company',
    description: 'Learn more about the SkillBee company.',
    sections: [
      {
        heading: 'Who we are',
        body: [
          'SkillBee is a learning platform helping students and professionals build practical, in-demand skills.',
          'We believe quality education should be accessible, structured and career-focused.',
        ],
      },
      {
        heading: 'Our mission',
        body: [
          'To make skill-based learning simple, affordable and effective for everyone.',
        ],
      },
    ],
  },
  'our-business': {
    title: 'Our Business',
    description: 'How SkillBee works and what we offer.',
    sections: [
      {
        heading: 'What we do',
        body: [
          'SkillBee offers online courses across multiple categories — free, prerecorded and live session formats.',
          'We work with instructors to deliver structured programs and with learners to help them grow their careers.',
        ],
      },
      {
        heading: 'How it works',
        body: [
          'Browse categories, pick a course, enroll or apply, and start learning instantly.',
        ],
      },
    ],
  },
  career: {
    title: 'Career',
    description: 'Grow your career with SkillBee.',
    sections: [
      {
        heading: 'For learners',
        body: [
          'Upskill for your current role or prepare for a new one with structured courses and certifications.',
        ],
      },
      {
        heading: 'For instructors',
        body: [
          'Share your expertise by teaching on SkillBee and reaching learners across India.',
        ],
      },
    ],
  },
  testimonials: {
    title: 'Testimonials',
    description: 'What learners say about SkillBee.',
    sections: [
      {
        heading: 'Learner stories',
        body: [
          'Hear from students and professionals who have grown their skills with SkillBee courses.',
          'Testimonials and reviews will be showcased here as they are published.',
        ],
      },
    ],
  },
};

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return { title: 'About' };
  return { title: page.title, description: page.description };
}

export default async function AboutSubPage({ params }: { params: Params }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();

  return (
    <>
      <PageHeader
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about' },
          { label: page.title },
        ]}
      />
      <Section>
        <Container className="max-w-3xl space-y-6">
          {page.sections.map((section) => (
            <Card key={section.heading} className="p-6">
              <h2 className="text-lg font-semibold text-ink">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          ))}
        </Container>
      </Section>
    </>
  );
}
