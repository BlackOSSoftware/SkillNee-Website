/** Normalize Cloudinary/media payloads to a displayable URL. */
export function mediaUrl(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>;
    for (const key of ['secureUrl', 'secure_url', 'url', 'src']) {
      const candidate = v[key];
      if (typeof candidate === 'string' && candidate) return candidate;
    }
  }
  return '';
}
