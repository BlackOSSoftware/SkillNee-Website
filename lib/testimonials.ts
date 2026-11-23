import { env } from './env';

export interface TestimonialStudent {
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: unknown;
}

export interface TestimonialCourse {
  id: string;
  title: string;
  slug: string;
}

export interface Testimonial {
  id: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  student: TestimonialStudent | null;
  course: TestimonialCourse | null;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

interface TestimonialsResponse {
  testimonials: Testimonial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getPublicTestimonials(limit = 12): Promise<TestimonialsResponse | null> {
  try {
    const res = await fetch(`${env.apiBaseUrl}/courses/testimonials?limit=${limit}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as ApiEnvelope<TestimonialsResponse>;
    return json?.data ?? null;
  } catch {
    return null;
  }
}
