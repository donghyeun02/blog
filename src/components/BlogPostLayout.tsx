import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface BlogPostLayoutProps {
  title: string;
  summary?: string;
  date: string;
  tags?: string[];
  readTime?: string;
  children: React.ReactNode;
  prevPost?: { title: string; path: string; date: string };
  nextPost?: { title: string; path: string; date: string };
}

export default function BlogPostLayout({
  title,
  summary,
  date,
  tags = [],
  children,
  prevPost,
  nextPost,
}: BlogPostLayoutProps) {
  // 목차 추출 로직
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>(
    []
  );
  const [showToc, setShowToc] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!articleRef.current) return;
    const headings = Array.from(
      articleRef.current.querySelectorAll('h2, h3')
    ) as HTMLHeadingElement[];
    const tocItems = headings.map((el) => {
      // id가 없으면 자동 생성
      if (!el.id) {
        el.id =
          el.textContent?.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-') || '';
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: el.tagName === 'H2' ? 2 : 3,
      };
    });
    setToc(tocItems);
  }, [children]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1600) {
        setShowToc(true);
      } else {
        setShowToc(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="bg-[#FAFAFA] font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-0 flex flex-row gap-8">
          {/* 본문: 항상 중앙 */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="w-full max-w-4xl">
              <header className="mb-4">
                <Link
                  href="/"
                  className="text-xs sm:text-sm text-neutral-400 hover:text-blue-600 mb-6 inline-block"
                >
                  ← 글 목록
                </Link>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {tags &&
                    tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full font-semibold hover:bg-blue-100 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-sans text-neutral-900 mb-4 flex items-center gap-2">
                  <span className="align-middle text-xl sm:text-2xl lg:text-3xl">
                    📄
                  </span>{' '}
                  {title}
                </h1>
                {summary && (
                  <blockquote className="border-l-4 border-blue-200 bg-blue-50 px-4 py-2 text-lg text-blue-900 font-medium mb-4">
                    {summary}
                  </blockquote>
                )}
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3 w-full">
                  <span>
                    {date &&
                      new Date(date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </span>
                  <span className="ml-auto">
                    by{' '}
                    <a
                      href="https://github.com/donghyeun02"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-700 transition-colors"
                    >
                      donghyeun02
                    </a>
                  </span>
                </div>
              </header>
              <hr className="my-4 border-blue-200" />
              <div ref={articleRef}>
                <article className="prose prose-lg prose-blue max-w-none leading-loose font-sans">
                  {children}
                </article>
              </div>
              {(prevPost || nextPost) && (
                <nav className="flex flex-row justify-between gap-2 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-200 text-sm">
                  {prevPost ? (
                    <Link
                      href={prevPost.path}
                      className="group flex-1 min-w-0 h-auto bg-white border border-neutral-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition hover:border-blue-300 no-underline"
                    >
                      <div className="text-blue-600 font-bold flex items-center gap-1 mb-1">
                        <span className="text-lg">←</span> 이전 글
                      </div>
                      <span className="font-semibold text-neutral-900 group-hover:text-blue-700 line-clamp-2 no-underline">
                        {prevPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                  {nextPost ? (
                    <Link
                      href={nextPost.path}
                      className="group flex-1 min-w-0 h-auto bg-white border border-neutral-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition hover:border-blue-300 text-right no-underline"
                    >
                      <div className="text-blue-600 font-bold flex items-center gap-1 justify-end mb-1">
                        다음 글 <span className="text-lg">→</span>
                      </div>
                      <span className="font-semibold text-neutral-900 group-hover:text-blue-700 line-clamp-2 no-underline">
                        {nextPost.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="flex-1" />
                  )}
                </nav>
              )}
            </div>
          </div>
          {/* 목차(TOC) - 완전히 오른쪽 바깥에 고정 */}
          {toc.length > 0 && showToc && (
            <aside className="fixed top-24 right-12 w-72 z-30">
              <nav>
                <ul className="space-y-4">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={
                        item.level === 2
                          ? 'ml-0 font-bold text-xl'
                          : 'ml-4 text-lg text-neutral-400 font-normal'
                      }
                    >
                      <a
                        href={`#${item.id}`}
                        className="hover:underline hover:text-blue-400 transition-colors"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
