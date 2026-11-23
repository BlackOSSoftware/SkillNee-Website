/** Primary public navigation — keep in sync with header/footer. */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const ABOUT_NAV: NavItem[] = [
  { label: 'Why SkillBee', href: '/about/why-skillbee' },
  { label: 'Company', href: '/about/company' },
  { label: 'Our Business', href: '/about/our-business' },
  { label: 'Career', href: '/about/career' },
  { label: 'Testimonials', href: '/about/testimonials' },
];

export const COURSES_NAV: NavItem[] = [
  { label: 'All Courses', href: '/courses' },
  { label: 'Free Courses', href: '/courses?courseType=FREE' },
  { label: 'Recorded Courses', href: '/prerecorded-courses' },
  { label: 'Live Sessions', href: '/live-sessions' },
];

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about', children: ABOUT_NAV },
  { label: 'Services', href: '/services' },
  { label: 'Courses', href: '/courses', children: COURSES_NAV },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blogs', href: '/blogs' },
];

export const FOOTER_NAV: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'All Courses', href: '/courses' },
  { label: 'Live Sessions', href: '/live-sessions' },
  { label: 'Prerecorded Courses', href: '/prerecorded-courses' },
  { label: 'Instructors', href: '/instructors' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

export const LEGAL_NAV: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
];
