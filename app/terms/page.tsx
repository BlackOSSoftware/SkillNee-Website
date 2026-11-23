import type { Metadata } from 'next';
import { LegalPage } from '@/components/pages/legal-page';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'SkillBee terms and conditions placeholder',
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="Placeholder terms and conditions content for the SkillBee public website."
      sections={[
        {
          heading: 'Acceptance',
          paragraphs: ['Placeholder paragraph describing acceptance of the terms.'],
        },
        {
          heading: 'Accounts',
          paragraphs: ['Placeholder paragraph describing account responsibilities.'],
        },
        {
          heading: 'Courses and content',
          paragraphs: ['Placeholder paragraph describing course access and content usage.'],
        },
        {
          heading: 'Payments',
          paragraphs: ['Placeholder paragraph describing payment terms.'],
        },
        {
          heading: 'Intellectual property',
          paragraphs: ['Placeholder paragraph describing intellectual property rights.'],
        },
        {
          heading: 'Limitation of liability',
          paragraphs: ['Placeholder paragraph describing limitation of liability.'],
        },
        {
          heading: 'Changes',
          paragraphs: ['Placeholder paragraph describing changes to the terms.'],
        },
      ]}
    />
  );
}
