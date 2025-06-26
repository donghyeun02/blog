import React from 'react';
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
  return (
    <main className="bg-[#FAFAFA] font-sans">
      <div className="max-w-4xl mx-auto px-4 py-0">
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
          <h1 className="text-4xl font-extrabold font-sans text-neutral-900 mb-4 flex items-center gap-2">
            <span className="align-middle text-3xl">📄</span> {title}
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
        <article className="prose prose-lg prose-blue max-w-none leading-loose font-sans">
          {children}
        </article>
        {(prevPost || nextPost) && (
          <nav className="flex justify-between gap-4 mt-6 pt-4 border-t border-neutral-200 text-sm">
            {prevPost ? (
              <Link
                href={prevPost.path}
                className="group flex-1 max-w-[48%] bg-white border border-neutral-200 rounded-lg p-4 shadow-sm hover:shadow-md transition hover:border-blue-300 no-underline"
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
                className="group flex-1 max-w-[48%] bg-white border border-neutral-200 rounded-lg p-4 shadow-sm hover:shadow-md transition hover:border-blue-300 text-right no-underline"
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
    </main>
  );
}
