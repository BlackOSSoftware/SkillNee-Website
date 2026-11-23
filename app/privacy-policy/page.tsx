import type { Metadata } from 'next';
import { LegalPage } from '@/components/pages/legal-page';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SkillBee privacy policy placeholder',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Placeholder privacy policy content for the SkillBee public website."
      sections={[
        {
          heading: 'Information we collect',
          paragraphs: ['Placeholder paragraph describing the information collected by SkillBee.'],
        },
        {
          heading: 'How we use information',
          paragraphs: ['Placeholder paragraph describing how collected information is used.'],
        },
        {
          heading: 'Data retention',
          paragraphs: ['Placeholder paragraph describing data retention practices.'],
        },
        {
          heading: 'Your choices',
          paragraphs: ['Placeholder paragraph describing user choices and controls.'],
        },
        {
          heading: 'Contact',
          paragraphs: ['Placeholder paragraph for privacy-related contact information.'],
        },
      ]}
    />
  );
}
