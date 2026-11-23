export type WhyChooseIconName =
  | 'briefcase'
  | 'messages'
  | 'target'
  | 'flask'
  | 'badge'
  | 'trending';

export interface WhyChooseFeature {
  title: string;
  description: string;
  icon: WhyChooseIconName;
}

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    title: 'Job Placement',
    description:
      'Get career guidance and placement support to connect your skills with relevant opportunities in the pharmaceutical and clinical research industries.',
    icon: 'briefcase',
  },
  {
    title: 'Expert Advice',
    description:
      'Learn from experienced professionals who provide practical insights, industry knowledge and guidance to help you make better career decisions.',
    icon: 'messages',
  },
  {
    title: 'Achieve Your Goals',
    description:
      'Turn your career ambitions into achievable milestones with structured learning, professional certifications and continuous guidance.',
    icon: 'target',
  },
  {
    title: 'Industry-Relevant Training',
    description:
      'Develop practical, job-relevant knowledge through training programs designed around current pharmaceutical and clinical research industry requirements.',
    icon: 'flask',
  },
  {
    title: 'Professional Certification',
    description:
      'Strengthen your professional profile with certification-focused learning that helps demonstrate your knowledge and commitment to career growth.',
    icon: 'badge',
  },
  {
    title: 'Career Growth & Support',
    description:
      'Keep moving forward with learning resources, expert guidance and support designed to help you grow throughout your professional journey.',
    icon: 'trending',
  },
];
