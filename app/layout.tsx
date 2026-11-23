import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteTopBar } from '@/components/layout/site-top-bar';
import { getPublicAnnouncements } from '@/lib/announcements';
import { getPublicCategories } from '@/lib/courses';
import { getPublicSiteSettings } from '@/lib/site-settings';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'SkillBee',
    template: '%s · SkillBee',
  },
  description: 'SkillBee public learning platform',
  icons: {
    icon: { url: '/brand/skillbee-mark.webp', type: 'image/webp' },
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [siteSettings, categories, announcements] = await Promise.all([
    getPublicSiteSettings(),
    getPublicCategories(),
    getPublicAnnouncements(),
  ]);
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <SiteTopBar settings={siteSettings} />
        <AnnouncementBar key={announcements.map((item) => item.id).join('|')} announcements={announcements} />
        <SiteHeader categories={categories} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={siteSettings} categories={categories} />
      </body>
    </html>
  );
}
