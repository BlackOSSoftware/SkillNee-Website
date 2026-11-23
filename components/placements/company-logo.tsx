import Image from 'next/image';
import type { PlacementCompany } from '@/lib/placements';
import { cn } from '@/lib/cn';

export function CompanyLogo({
  company,
  className,
}: {
  company: PlacementCompany;
  className?: string;
}) {
  return (
    <span className={cn('flex h-11 w-auto shrink-0 items-center justify-center px-4 sm:h-12 sm:px-5', className)}>
      <Image
        src={company.logo}
        alt={company.alt}
        width={700}
        height={300}
        className="h-full w-auto max-w-[150px] object-contain opacity-80 transition-opacity duration-300 hover:opacity-100 sm:max-w-[170px]"
      />
    </span>
  );
}
