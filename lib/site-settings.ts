import { env } from './env';

export interface SiteContact {
  companyName?: string;
  email?: string;
  phone?: string;
  alternatePhone?: string;
  whatsappNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  gstin?: string;
  isoCertification?: string;
  businessHours?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  telegram?: string;
  whatsapp?: string;
}

export interface PublicSiteSettings {
  contact: SiteContact;
  socialLinks: SocialLinks;
}

interface ApiEnvelope<T> {
  success?: boolean;
  data?: T;
}

/** GET /site-settings — public contact/social projection (cached 5 min server-side). */
export async function getPublicSiteSettings(): Promise<PublicSiteSettings | null> {
  try {
    const res = await fetch(`${env.apiBaseUrl}/site-settings`, {
      next: { revalidate: 300 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiEnvelope<PublicSiteSettings>;
    return json.data ?? null;
  } catch {
    return null;
  }
}
