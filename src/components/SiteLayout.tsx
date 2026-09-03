import Link from 'next/link';
import { Github, Instagram } from 'lucide-react';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F]">
      {/* 이름은 왼쪽, 이동 링크는 오른쪽. 어느 페이지에서도 같은 자리에 있다. */}
      <div className="max-w-5xl mx-auto px-6">
        <header className="flex items-baseline justify-between gap-4 py-[0.9lh] border-b border-[#D2D2D7]">
          <Link
            href="/"
            className="text-[0.9rem] font-semibold tracking-tight text-[#1D1D1F] hover:text-[#6E6E73] transition-[color] duration-150"
          >
            donghyeun02
          </Link>
          <nav className="flex items-baseline gap-x-4">
            <Link className="ext" href="/posts">
              글
            </Link>
            <Link className="ext" href="/log">
              로그
            </Link>
            <Link className="ext" href="/about">
              소개
            </Link>
          </nav>
        </header>
      </div>

      <main>{children}</main>

      <footer className="border-t border-[#D2D2D7] mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-xs text-[#6E6E73]">© 2025 donghyeun02</p>
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/donghyeun02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 text-[#AEAEB2] hover:text-[#1D1D1F] transition-[color] duration-150"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/donghyeun_02"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 text-[#AEAEB2] hover:text-[#1D1D1F] transition-[color] duration-150"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
