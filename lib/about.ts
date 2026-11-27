export type AboutValueIconName =
  | 'award'
  | 'shield'
  | 'flame'
  | 'heart'
  | 'messages'
  | 'clipboard'
  | 'users';

export type AboutServiceIconName = 'briefcase' | 'graduation' | 'target' | 'monitor';

export interface AboutValue {
  title: string;
  description: string;
  icon: AboutValueIconName;
}

export const ABOUT_VALUES: AboutValue[] = [
  {
    title: 'Excellence',
    description:
      'We deliver what we promise and work towards the highest quality standards. We avoid promises we cannot fulfil and strive to exceed expectations wherever possible.',
    icon: 'award',
  },
  {
    title: 'Integrity',
    description:
      'We demonstrate honesty, transparency and strong moral principles. We never compromise on the truth.',
    icon: 'shield',
  },
  {
    title: 'Passion',
    description:
      'We approach recruitment, training and consultancy with enthusiasm, energy and a genuine understanding of client and candidate needs.',
    icon: 'flame',
  },
  {
    title: 'Respect',
    description:
      'We treat clients, candidates and colleagues with mutual respect and sensitivity, embracing individual diversity.',
    icon: 'heart',
  },
  {
    title: 'Clarity',
    description:
      'We believe in clear communication and encourage the open exchange of ideas, opinions and business perspectives.',
    icon: 'messages',
  },
  {
    title: 'Accountability',
    description:
      'We accept responsibility for our actions and use experience and sound judgement to support our work.',
    icon: 'clipboard',
  },
  {
    title: 'Community',
    description:
      'We support one another personally and professionally while contributing positively to external communities and the environment.',
    icon: 'users',
  },
];

export interface AboutService {
  title: string;
  description: string;
  icon: AboutServiceIconName;
  highlights: string[];
  highlightLabel?: string;
}

export const ABOUT_SERVICES: AboutService[] = [
  {
    title: 'Industry Consultancy',
    description:
      'Professional consultancy for pharmaceutical, clinical research, medical device and information technology organizations.',
    icon: 'briefcase',
    highlights: [
      'Computer System Validation',
      'Process Validation',
      'Equipment Qualification',
      'Water System Validation',
      'Excel Sheet Validation',
      'Infrastructure Qualification',
      'LIMS and MES Validation',
    ],
    highlightLabel: 'Service areas',
  },
  {
    title: 'Professional Training',
    description:
      'Industry-oriented training programs designed to help candidates develop practical knowledge and professional skills.',
    icon: 'graduation',
    highlights: [
      'Pharmaceuticals',
      'Medical Device Industry',
      'Clinical Trials',
      'Clinical Research',
      'Information Technology',
    ],
    highlightLabel: 'Training domains',
  },
  {
    title: 'Job Placement Support',
    description:
      'We help candidates move closer to their career goals through structured career support and placement assistance.',
    icon: 'target',
    highlights: [
      'Resume Building',
      'Interview Preparation Sessions',
      'Online Interaction with Lecturers',
      'Collaboration with Companies for Career Opportunities',
      'Continued Online Support',
    ],
    highlightLabel: 'Support offered',
  },
  {
    title: 'Virtual Online Training',
    description:
      'We conduct interactive virtual training sessions using collaborative online platforms and screen-sharing technology.',
    icon: 'monitor',
    highlights: [
      'Online Interaction with Lecturer',
      'Online Chat with Lecturer and Participants',
      'Screen Sharing',
      'Online Examination and Certification',
      'Online Support',
    ],
    highlightLabel: 'Session features',
  },
];

export interface AboutClient {
  name: string;
  logo: string;
  alt: string;
}

export const ABOUT_CLIENTS: AboutClient[] = [
  { name: 'Cipla', logo: '/placements/cipla.jpg', alt: 'Cipla logo' },
  { name: 'Actis', logo: '/placements/actis.webp', alt: 'Actis logo' },
  { name: 'IQVIA', logo: '/placements/iqvia.webp', alt: 'IQVIA logo' },
  { name: 'Hetero', logo: '/placements/hetero.webp', alt: 'Hetero logo' },
  { name: 'Syngene', logo: '/placements/syngene.webp', alt: 'Syngene logo' },
];
