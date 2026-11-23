import { env } from './env';

export interface Announcement {
  id: string;
  title?: string;
  message: string;
  link?: string;
}

interface RawAnnouncement {
  id?: string;
  _id?: string;
  slug?: string;
  title?: string;
  message?: string;
  content?: string;
  text?: string;
  body?: string;
  link?: string;
  url?: string;
}

function normalizeAnnouncement(raw: RawAnnouncement, index: number): Announcement | null {
  const message = (raw.message ?? raw.content ?? raw.text ?? raw.body ?? '').trim();
  if (!message) return null;
  return {
    id: raw.id ?? raw._id ?? raw.slug ?? `announcement-${index}`,
    title: raw.title?.trim() || undefined,
    message,
    link: raw.link ?? raw.url ?? undefined,
  };
}

function extractList(payload: unknown): RawAnnouncement[] {
  if (Array.isArray(payload)) return payload as RawAnnouncement[];
  if (payload && typeof payload === 'object') {
    const data = (payload as { data?: unknown }).data;
    if (Array.isArray(data)) return data as RawAnnouncement[];
    if (data && typeof data === 'object') {
      const nested = (data as { announcements?: unknown; items?: unknown }).announcements
        ?? (data as { items?: unknown }).items;
      if (Array.isArray(nested)) return nested as RawAnnouncement[];
    }
    const top = (payload as { announcements?: unknown; items?: unknown }).announcements
      ?? (payload as { items?: unknown }).items;
    if (Array.isArray(top)) return top as RawAnnouncement[];
  }
  return [];
}

export async function getPublicAnnouncements(): Promise<Announcement[]> {
  try {
    const response = await fetch(`${env.apiBaseUrl}/public/announcements`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    const payload: unknown = await response.json();
    return extractList(payload)
      .map((raw, index) => normalizeAnnouncement(raw, index))
      .filter((item): item is Announcement => item !== null);
  } catch {
    return [];
  }
}
