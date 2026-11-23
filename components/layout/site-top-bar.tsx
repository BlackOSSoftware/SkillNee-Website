import { BadgeCheck, FileBadge, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { SiFacebook, SiInstagram, SiTelegram, SiWhatsapp, SiX, SiYoutube } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { Container } from '@/components/ui/section';
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

const SOCIAL_COLORS: Record<keyof SocialLinks, string> = {
  facebook: '#1877F2',
  instagram: '#E4405F',
  linkedin: '#0A66C2',
  youtube: '#FF0000',
  twitter: '#000000',
  telegram: '#229ED9',
  whatsapp: '#25D366',
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

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

interface ContactItem {
  key: string;
  icon: LucideIcon;
  label: string;
  href?: string;
  tone: string;
}

export function SiteTopBar({ settings }: { settings: PublicSiteSettings | null }) {
  const contact = settings?.contact;
  const social = settings?.socialLinks;

  const items: ContactItem[] = [];
  if (contact?.phone) {
    items.push({ key: 'phone', icon: Phone, label: contact.phone, href: telHref(contact.phone), tone: 'text-sky-300' });
  }
  if (contact?.alternatePhone) {
    items.push({ key: 'alternate-phone', icon: Phone, label: contact.alternatePhone, href: telHref(contact.alternatePhone), tone: 'text-sky-300' });
  }
  if (contact?.email) {
    items.push({ key: 'email', icon: Mail, label: contact.email, href: `mailto:${contact.email}`, tone: 'text-amber-300' });
  }
  if (contact?.isoCertification) {
    items.push({ key: 'iso', icon: BadgeCheck, label: contact.isoCertification, tone: 'text-teal-300' });
  }
  if (contact?.gstin) {
    items.push({ key: 'gstin', icon: FileBadge, label: `GSTIN: ${contact.gstin}`, tone: 'text-violet-300' });
  }

  const socialEntries = (Object.keys(SOCIAL_ICONS) as Array<keyof SocialLinks>)
    .map((key) => ({ key, url: social?.[key] ?? '' }))
    .filter((entry) => entry.url.trim().length > 0);

  if (items.length === 0 && socialEntries.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-white/5 bg-navy text-white/80">
      <Container className="flex flex-col gap-2 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {items.length > 0 ? (
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <Icon className={cn('size-3.5 shrink-0', item.tone)} aria-hidden />
                  <span className="truncate">{item.label}</span>
                </>
              );
              return (
                <li key={item.key} className="flex min-w-0 items-center gap-1.5">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="inline-flex min-w-0 items-center gap-1.5 rounded transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
                    >
                      {content}
                    </a>
                  ) : (
                    <span className="inline-flex min-w-0 items-center gap-1.5">{content}</span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <span />
        )}

        {socialEntries.length > 0 ? (
          <ul className="flex items-center gap-1" aria-label="Social media links">
            {socialEntries.map(({ key, url }) => {
              const Icon = SOCIAL_ICONS[key];
              return (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_LABELS[key]}
                    className={cn(
                      'inline-flex size-8 items-center justify-center rounded-lg text-white/70 transition-colors',
                      'hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60'
                    )}
                  >
                    <Icon size={16} color={SOCIAL_COLORS[key]} aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
      </Container>
    </div>
  );
}
