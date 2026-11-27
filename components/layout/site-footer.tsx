import Link from 'next/link';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiFacebook, SiInstagram, SiTelegram, SiWhatsapp, SiX, SiYoutube } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { BrandMark } from '@/components/brand/logo';
import { Reveal } from '@/components/motion/reveal';
import { NewsletterForm } from '@/components/newsletter/newsletter-form';
import { Container } from '@/components/ui/section';
import type { CourseCategory } from '@/lib/courses';
import { ABOUT_NAV, COURSES_NAV, LEGAL_NAV, type NavItem } from '@/lib/site';
import type { PublicSiteSettings, SocialLinks } from '@/lib/site-settings';
import { cn } from '@/lib/cn';

const SOCIAL_ICONS: Record<keyof SocialLinks, IconType> = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  linkedin: FaLinkedinIn,
  youtube: SiYoutube,
  twitter: SiX,
  telegram: SiTelegram,
  whatsapp: SiWhatsapp,
};

const SOCIAL_LABELS: Record<keyof SocialLinks, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  twitter: 'X / Twitter',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
};

const SUPPORT_LINKS: NavItem[] = [
  ...ABOUT_NAV,
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
  ...LEGAL_NAV,
];

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

function formatAddress(settings: PublicSiteSettings | null): string | null {
  const c = settings?.contact;
  if (!c) return null;
  const line1 = [c.address, c.city].filter(Boolean).join(', ');
  const line2 = [c.state, c.postalCode, c.country].filter(Boolean).join(', ');
  const full = [line1, line2].filter(Boolean).join(' · ');
  return full || null;
}

function FooterLink({ link }: { link: NavItem }) {
  return (
    <Link
      href={link.href}
      className="group inline-flex items-center gap-1 text-sm text-white/65 transition-colors duration-200 hover:text-white"
    >
      <span className="relative">
        {link.label}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-soft transition-all duration-300 group-hover:w-full" aria-hidden />
      </span>
    </Link>
  );
}

function FooterColumn({
  title,
  links,
  delay,
}: {
  title: string;
  links: NavItem[];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <nav aria-label={title}>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">{title}</h3>
        <ul className="mt-5 space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <FooterLink link={link} />
            </li>
          ))}
        </ul>
      </nav>
    </Reveal>
  );
}

function FooterContact({ settings, delay }: { settings: PublicSiteSettings | null; delay: number }) {
  const contact = settings?.contact;
  const address = formatAddress(settings);
  const socialEntries = (Object.keys(SOCIAL_ICONS) as Array<keyof SocialLinks>)
    .map((key) => ({ key, url: settings?.socialLinks?.[key] ?? '' }))
    .filter((entry) => entry.url.trim().length > 0);

  const hasContent = Boolean(address || contact?.phone || contact?.alternatePhone || contact?.email || contact?.businessHours || socialEntries.length);
  if (!hasContent) return null;

  return (
    <Reveal delay={delay}>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">Contact Us</h3>
        <ul className="mt-5 space-y-4 text-sm">
          {address ? (
            <li className="flex items-start gap-3 text-white/65">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-soft" aria-hidden />
              <span className="leading-6">{address}</span>
            </li>
          ) : null}
          {contact?.phone ? (
            <li>
              <a href={telHref(contact.phone)} className="flex items-center gap-3 text-white/65 transition-colors hover:text-white">
                <Phone className="size-4 shrink-0 text-brand-soft" aria-hidden />
                <span className="break-all">{contact.phone}</span>
              </a>
            </li>
          ) : null}
          {contact?.alternatePhone ? (
            <li>
              <a href={telHref(contact.alternatePhone)} className="flex items-center gap-3 text-white/65 transition-colors hover:text-white">
                <Phone className="size-4 shrink-0 text-brand-soft" aria-hidden />
                <span className="break-all">{contact.alternatePhone}</span>
              </a>
            </li>
          ) : null}
          {contact?.email ? (
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-white/65 transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-brand-soft" aria-hidden />
                <span className="break-all">{contact.email}</span>
              </a>
            </li>
          ) : null}
          {contact?.businessHours ? (
            <li className="flex items-start gap-3 text-white/65">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-soft" aria-hidden />
              <span className="leading-6">{contact.businessHours}</span>
            </li>
          ) : null}
        </ul>

        {socialEntries.length > 0 ? (
          <ul className="mt-6 flex items-center gap-2" aria-label="Social media links">
            {socialEntries.map(({ key, url }) => {
              const Icon = SOCIAL_ICONS[key];
              return (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[key]}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-all duration-200 hover:border-brand-soft/60 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/60"
                  >
                    <Icon size={15} aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

export function SiteFooter({
  settings = null,
  categories = [],
}: {
  settings?: PublicSiteSettings | null;
  categories?: CourseCategory[];
}) {
  const year = new Date().getFullYear();

  const quickLinks: NavItem[] = [
    ...categories.map((category) => ({
      label: category.name,
      href: `/services/${category.slug}`,
    })),
    COURSES_NAV[0],
  ];

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      {/* Decorative brand glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-52 -right-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" aria-hidden />

      <Container className="relative">
        {/* Brand + columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_1fr_1.1fr] lg:gap-10 lg:py-16">
          <Reveal>
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-soft/60" aria-label="SkillBee home">
                <BrandMark size={44} />
                <span className="leading-tight">
                  <span className="block text-xl font-bold tracking-tight text-white">SkillBee</span>
                  <span className="block text-xs font-medium text-white/50">Learning platform</span>
                </span>
              </Link>
              <p className="mt-5 text-sm leading-6 text-white/60">
                Industry-focused training, expert guidance and career support to help you move
                confidently towards your professional goals.
              </p>
              <a
                href="https://skillbee.co.in/skillbee-for-industry/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 rounded-full border border-brand-soft/40 bg-brand-soft/10 px-4 py-2 text-sm font-semibold text-brand-soft transition-all duration-200 hover:border-brand-soft hover:bg-brand-soft/20 hover:text-white"
              >
                SkillBee for Industry
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </a>
            </div>
          </Reveal>

          <FooterColumn title="Support" links={SUPPORT_LINKS} delay={0.08} />
          <FooterColumn title="Quick Links" links={quickLinks} delay={0.16} />
          <FooterContact settings={settings} delay={0.24} />
        </div>

        {/* Newsletter / updates CTA */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-7 backdrop-blur-sm sm:px-8">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h3 className="text-lg font-semibold text-white">Stay Connected with SkillBee</h3>
                <p className="mt-1.5 text-sm leading-6 text-white/60">
                  Get the latest news, professional learning updates, upcoming training programs
                  and career opportunities delivered straight to your inbox.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} SkillBee. All Rights Reserved | Powered by IndiFuture Technologies
          </p>
          <div className="flex items-center gap-5">
            {LEGAL_NAV.map((item) => (
              <Link key={item.href} href={item.href} className={cn('transition-colors hover:text-white/80')}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
