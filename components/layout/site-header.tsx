'use client';

import { ArrowRight, ChevronDown, LogIn, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/brand/logo';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/section';
import { cn } from '@/lib/cn';
import type { CourseCategory } from '@/lib/courses';
import { PRIMARY_NAV, type NavItem } from '@/lib/site';

function pathOnly(href: string) {
  return href.split('?')[0];
}

function isActive(pathname: string, item: NavItem) {
  const href = pathOnly(item.href);
  const self = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
  if (self) return true;
  return (item.children ?? []).some((child) => {
    const childHref = pathOnly(child.href);
    return childHref !== '/' && (pathname === childHref || pathname.startsWith(`${childHref}/`));
  });
}

export function SiteHeader({
  categories = [],
}: {
  categories?: CourseCategory[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = PRIMARY_NAV.map((item) =>
    item.href === '/services'
      ? {
          ...item,
          children: categories.map((category) => ({
            label: category.name,
            href: `/services/${category.slug}`,
          })),
        }
      : item
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 shadow-[0_1px_0_rgb(11_31_58/0.04),0_8px_24px_-16px_rgb(11_31_58/0.25)] backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between gap-4">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35" aria-label="SkillBee home">
          <Logo variant="compact" height={36} priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = isActive(pathname, item);
            const linkClass = cn(
              'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35',
              active ? 'bg-primary/10 text-primary' : 'text-ink hover:bg-surface-2'
            );
            if (item.children?.length) {
              return (
                <div key={item.href} className="group relative">
                  <Link href={item.href} aria-current={active ? 'page' : undefined} className={linkClass}>
                    {item.label}
                    <ChevronDown className="size-3.5 opacity-70" aria-hidden />
                  </Link>
                  <div className="invisible absolute left-0 top-full z-50 translate-y-1 pt-2 opacity-0 transition duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div
                      className={cn(
                        'rounded-2xl border border-line/80 bg-white p-2 shadow-pop',
                        item.href === '/services' ? 'max-h-80 w-72 overflow-y-auto' : 'w-56'
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-ink-muted transition-all duration-200 hover:bg-primary/5 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ButtonLink href="/login" variant="secondary" size="md">
            <LogIn className="size-4" aria-hidden />
            Log in
          </ButtonLink>
          <ButtonLink href="/register" size="md">
            Get started
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="py-4">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const active = isActive(pathname, item);
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        active ? 'bg-primary/10 text-primary' : 'text-ink hover:bg-surface-2'
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <div className="ml-3 mt-1 grid gap-1 border-l border-line pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <ButtonLink href="/login" variant="secondary" size="md" className="w-full" onClick={() => setOpen(false)}>
                <LogIn className="size-4" aria-hidden />
                Log in
              </ButtonLink>
              <ButtonLink href="/register" size="md" className="w-full" onClick={() => setOpen(false)}>
                Get started
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
