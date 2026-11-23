import { env } from './env';

export interface BlogCard {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: unknown;
  tags?: string[];
  publishedAt?: string;
  readingTime?: number;
  isFeatured?: boolean;
  author?: { firstName?: string; lastName?: string; profileImage?: string | null } | null;
}

export interface BlogDetail extends BlogCard {
  content?: string;
  seo?: Record<string, unknown>;
  viewsCount?: number;
}

export interface BlogListResult {
  data: BlogCard[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface ApiEnvelope<T> {
  success?: boolean;
  data?: T;
  pagination?: BlogListResult['pagination'];
}

async function apiGet<T>(path: string, revalidate = 300): Promise<T | null> {
  try {
    const res = await fetch(`${env.apiBaseUrl}${path}`, {
      next: { revalidate },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPublicBlogs(params: { page?: number; limit?: number; search?: string } = {}): Promise<BlogListResult | null> {
  const sp = new URLSearchParams();
  if (params.page) sp.set('page', String(params.page));
  if (params.limit) sp.set('limit', String(params.limit));
  if (params.search) sp.set('search', params.search);
  const qs = sp.toString();
  const json = await apiGet<ApiEnvelope<BlogCard[]> & { pagination?: BlogListResult['pagination'] }>(
    `/public/blogs${qs ? `?${qs}` : ''}`
  );
  if (!json?.data) return null;
  return { data: json.data, pagination: json.pagination };
}

export async function getBlogBySlug(slug: string): Promise<BlogDetail | null> {
  const json = await apiGet<ApiEnvelope<BlogDetail>>(`/public/blogs/${encodeURIComponent(slug)}`);
  return json?.data ?? null;
}
