import { env } from './env';

export interface NewsletterSubscribeResponse {
  message: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export interface NewsletterSubscribeInput {
  email: string;
  title?: string;
  message?: string;
}

/** POST /public/newsletter/subscribe — double opt-in; always returns a generic message. */
export async function subscribeNewsletter(input: NewsletterSubscribeInput): Promise<NewsletterSubscribeResponse> {
  const body: NewsletterSubscribeInput = { email: input.email };
  const title = input.title?.trim();
  const message = input.message?.trim();
  if (title) body.title = title.slice(0, 120);
  if (message) body.message = message.slice(0, 1000);

  const res = await fetch(`${env.apiBaseUrl}/public/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

  const json = (await res.json().catch(() => null)) as
    | (ApiEnvelope<NewsletterSubscribeResponse> & { message?: string })
    | null;

  if (!res.ok || !json?.success) {
    const message = json?.message || 'Subscription failed. Please try again.';
    throw new Error(message);
  }

  return json.data;
}
