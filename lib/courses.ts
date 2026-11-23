import { env } from './env';

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: unknown;
  parentCategoryId?: string | null;
  sortOrder?: number;
}

export interface CourseInstructor {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string | null;
}

export interface CoursePricing {
  type?: 'free' | 'paid' | string;
  regularPrice?: number | null;
  salePrice?: number | null;
  currency?: string;
}

export interface CourseRating {
  averageRating?: number;
  approvedReviewCount?: number;
  totalApprovedReviews?: number;
}

export interface CourseCardData {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  thumbnail?: unknown;
  level?: string;
  language?: string;
  courseType?: 'FREE' | 'PRE_RECORDED' | 'LIVE_SESSION' | string;
  actionLabel?: string;
  enrollmentEligibility?: string;
  durationValue?: number;
  durationUnit?: string;
  isFeatured?: boolean;
  pricing?: CoursePricing;
  categories?: Array<{ id: string; name: string; slug: string }>;
  instructors?: CourseInstructor[];
  rating?: CourseRating;
  publishedAt?: string;
}

export interface CourseReview {
  id: string;
  rating: number;
  title?: string;
  comment?: string;
  createdAt?: string;
  student?: { firstName?: string; lastName?: string } | null;
}

export interface CourseDetail extends CourseCardData {
  description?: string;
  gallery?: unknown[];
  learningObjectives?: Array<string | { title?: string; description?: string; sortOrder?: number }>;
  requirements?: string[];
  targetAudience?: string[];
  faqs?: Array<{ question?: string; answer?: string }>;
  tags?: string[];
  certificate?: { enabled?: boolean; minimumCompletionPercentage?: number };
  seo?: Record<string, unknown>;
  liveSession?: {
    batchName?: string;
    startDate?: string;
    endDate?: string;
    sessionMode?: string;
    sessionSchedule?: unknown;
  } | null;
  reviews?: CourseReview[];
  enrolled?: boolean;
}

export interface CurriculumLesson {
  id: string;
  title: string;
  [key: string]: unknown;
}

export interface CurriculumTopic {
  id: string;
  title: string;
  description?: string;
  sortOrder?: number;
  locked?: boolean;
  lessons?: CurriculumLesson[];
}

export interface CourseCurriculum {
  course?: { id: string; title: string; slug: string };
  enrolled?: boolean;
  topics?: CurriculumTopic[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CourseListResult {
  data: CourseCardData[];
  pagination: Pagination;
}

interface ApiEnvelope<T> {
  success?: boolean;
  data?: T;
  pagination?: Pagination;
}

export interface CourseListParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  level?: string;
  language?: string;
  pricingType?: string;
  courseType?: string;
  isFeatured?: boolean;
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

function toQuery(params: CourseListParams): string {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    sp.set(key, String(value));
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}

export async function getPublicCategories(): Promise<CourseCategory[]> {
  const json = await apiGet<ApiEnvelope<{ categories?: CourseCategory[] }>>('/course-categories');
  return json?.data?.categories ?? [];
}

export async function getPublicCourses(params: CourseListParams = {}): Promise<CourseListResult | null> {
  const json = await apiGet<ApiEnvelope<CourseCardData[]>>(`/courses${toQuery(params)}`);
  if (!json?.data) return null;
  return {
    data: json.data,
    pagination: json.pagination ?? {
      page: params.page ?? 1,
      limit: params.limit ?? 20,
      total: json.data.length,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
}

export async function getPublicCourseById(id: string): Promise<CourseCardData | null> {
  if (!id) return null;
  for (let page = 1; page <= 10; page += 1) {
    const result = await getPublicCourses({ page, limit: 100 });
    if (!result) return null;
    const found = result.data.find((course) => course.id === id);
    if (found) return found;
    if (!result.pagination.hasNextPage) return null;
  }
  return null;
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const json = await apiGet<ApiEnvelope<{ course?: CourseDetail }>>(`/courses/${encodeURIComponent(slug)}`);
  return json?.data?.course ?? null;
}

export async function getCourseCurriculum(slug: string): Promise<CourseCurriculum | null> {
  const json = await apiGet<ApiEnvelope<CourseCurriculum>>(`/courses/${encodeURIComponent(slug)}/curriculum`);
  return json?.data ?? null;
}
