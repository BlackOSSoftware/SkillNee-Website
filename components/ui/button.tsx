import Link from 'next/link';
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-[#35c3ef] to-primary text-primary-fg shadow-[0_8px_18px_-10px_rgb(11_99_145/0.75)] hover:from-[#22b4e3] hover:to-primary-hover',
  secondary: 'border border-field-border bg-surface text-ink shadow-sm hover:border-field-border-hover hover:bg-surface-2',
  ghost: 'text-ink-muted hover:bg-surface-2 hover:text-ink',
  light: 'bg-white text-[#123a6b] shadow-sm hover:bg-white/90',
  'outline-light': 'border border-white/30 bg-white/10 text-white hover:bg-white/15',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className' | 'children'> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}
