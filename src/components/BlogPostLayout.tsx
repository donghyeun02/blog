import React from 'react';
import Link from 'next/link';

interface BlogPostLayoutProps {
  title: string;
  summary?: string;
  date: string;
  tags?: string[];
  readTime?: string;
  children: React.ReactNode;
}

export default function BlogPostLayout({
  title,
  summary,
  date,
  tags = [],
  children,
}: BlogPostLayoutProps) {
  return (
    <main>
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-4">
        <header className="mb-8 pt-2 sm:pt-0">
          <Link
            href="/"
            className="text-xs sm:text-sm text-neutral-400 hover:text-blue-600 mb-6 inline-block"
          >
            ← 글 목록
          </Link>
          <div className="flex gap-2 mb-2 flex-wrap">
            {tags &&
              tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded"
                >
                  {tag}
                </span>
              ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900 mb-2">
            <span className="align-middle">📄</span> {title}
          </h1>
          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-2">
            <span>
              {date &&
                new Date(date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </span>
          </div>
          <p className="text-neutral-600 text-base sm:text-lg mb-2">
            {summary}
          </p>
        </header>
        <hr className="my-6 border-neutral-200" />
        <article className="prose prose-base sm:prose-lg prose-neutral max-w-none leading-relaxed py-2 sm:py-4">
          {children}
        </article>
      </div>
    </main>
  );
}
