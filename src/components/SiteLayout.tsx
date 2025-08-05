'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsHeaderVisible(true);
      return;
    }

    const scrollHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      const currentScrollY = target.scrollTop || window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setIsHeaderVisible(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 20) {
        setIsHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    document.addEventListener('scroll', scrollHandler, {
      passive: true,
      capture: true,
    });

    const slideDeckContainer = document.querySelector(
      '[style*="overflowY: scroll"]'
    );
    if (slideDeckContainer) {
      slideDeckContainer.addEventListener('scroll', scrollHandler, {
        passive: true,
        capture: true,
      });
    }

    return () => {
      document.removeEventListener('scroll', scrollHandler, { capture: true });
      if (slideDeckContainer) {
        slideDeckContainer.removeEventListener('scroll', scrollHandler, {
          capture: true,
        });
      }
    };
  }, [isMobile, lastScrollY]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-sans text-neutral-900">
      {/* 상단 네비 */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 bg-neutral-50 border-b border-neutral-200 transition-transform duration-300 ${
          isMobile
            ? isHeaderVisible
              ? 'translate-y-0'
              : '-translate-y-full'
            : 'translate-y-0'
        }`}
        style={{
          transform: isMobile
            ? isHeaderVisible
              ? 'translateY(0)'
              : 'translateY(-100%)'
            : 'translateY(0)',
          willChange: 'transform',
        }}
      >
        <div className="w-full px-8 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-neutral-900 select-none hover:text-blue-700 transition-colors"
          >
            donghyeun02
          </Link>
          <nav className="flex gap-6 text-sm font-mono text-neutral-700">
            <Link href="/" className="hover:text-blue-700 transition-colors">
              홈
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-700 transition-colors"
            >
              소개
            </Link>
          </nav>
        </div>
      </header>
      {/* 본문 */}
      <main className="flex-1 flex flex-col items-center pt-0">
        <div className="w-full max-w-6xl px-4 py-4 sm:py-12">{children}</div>
      </main>
      {/* 푸터 */}
      <footer className="bg-neutral-50 border-t border-neutral-200 mt-4">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-neutral-400 font-mono">
          © {new Date().getFullYear()} donghyeun02
        </div>
      </footer>
    </div>
  );
}
