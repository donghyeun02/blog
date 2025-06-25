import Link from 'next/link';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-sans text-neutral-900">
      {/* 상단 네비 */}
      <header className="sticky top-0 z-30 bg-neutral-50 border-b border-neutral-200">
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
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-6xl px-4 py-12">{children}</div>
      </main>
      {/* 푸터 */}
      <footer className="bg-neutral-50 border-t border-neutral-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-xs text-neutral-400 font-mono">
          © {new Date().getFullYear()} donghyeun02
        </div>
      </footer>
    </div>
  );
}
