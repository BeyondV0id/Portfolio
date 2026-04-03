import dynamic from 'next/dynamic';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const ScrollToTop = dynamic(() =>
  import('@/components/scroll-to-top').then((mod) => mod.ScrollToTop)
);

const FloatingNav = dynamic(() =>
  import('@/components/floating-nav').then((mod) => mod.FloatingNav)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className='w-full overflow-x-hidden px-2'>{children}</main>
      <SiteFooter />
      <FloatingNav />
      <ScrollToTop />
    </>
  );
}
