'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import type { NavItem } from '@/types/nav';

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClassName = (href: string) =>
    cn(
      'font-mono text-sm font-medium transition-[color] duration-300',
      'hover:text-foreground',
      isActive(href) ? 'text-foreground' : 'text-muted-foreground'
    );

  return (
    <nav className='flex items-center gap-4 sm:gap-6'>
      {items.map((item) => (
        <Link
          key={item.href}
          className={linkClassName(item.href)}
          href={item.href}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
