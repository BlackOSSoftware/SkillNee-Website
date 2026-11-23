import Image from 'next/image';
import { cn } from '@/lib/cn';

const WORDMARK_RATIO = 640 / 231;

export function BrandMark({
  size = 36,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/skillbee-mark.webp"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={cn('shrink-0 select-none', className)}
      draggable={false}
    />
  );
}

export function BrandWordmark({
  height = 44,
  className,
  priority = false,
}: {
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * WORDMARK_RATIO);

  return (
    <span className={cn('inline-block shrink-0 select-none', className)} style={{ width, height }}>
      <Image
        src="/brand/skillbee-logo.webp"
        alt="SkillBee"
        width={width}
        height={height}
        priority={priority}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  );
}

export function Logo({
  variant = 'wordmark',
  height = 44,
  className,
  priority = false,
}: {
  variant?: 'wordmark' | 'compact';
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  if (variant === 'compact') {
    return (
      <span className={cn('inline-flex items-center gap-2.5', className)}>
        <BrandMark size={height} priority={priority} />
        <span className="leading-tight">
          <span className="block text-[15px] font-bold tracking-tight text-sky-600">SkillBee</span>
          <span className="block text-[11px] font-medium text-ink-subtle">Learning platform</span>
        </span>
      </span>
    );
  }

  return <BrandWordmark height={height} className={className} priority={priority} />;
}
