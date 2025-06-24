import React from 'react';
import Link from 'next/link';

interface BlogPostLayoutProps {
  title: string;
  summary?: string;
  date: string;
  tags?: string[];
  readTime?: string;
  author?: string;
  children: React.ReactNode;
}

export default function BlogPostLayout({
  title,
  summary,
  date,
  tags = [],
  author,
  children,
}: BlogPostLayoutProps) {
  return (
    <main>
      <div className="max-w-2xl mx-auto px-4">
        <header className="pt-16 pb-8">
          <Link
            href="/"
            className="text-xs text-neutral-400 hover:text-blue-600"
          >
            ← 글 목록
          </Link>
          <h1 className="mt-4 text-4xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            {title}
          </h1>
          {summary && (
            <p className="mt-3 text-lg text-neutral-600">{summary}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {tags.length > 0 && (
              <span className="flex gap-1">
                ·{' '}
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            )}
            <span>
              · by{' '}
              <a
                href="https://github.com/donghyeun02"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 underline underline-offset-2"
              >
                donghyeun02
              </a>
            </span>
          </div>
        </header>
        <article className="prose prose-lg prose-neutral max-w-none leading-relaxed py-8">
          {children}
        </article>
        <footer className="py-12 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} donghyeun02
        </footer>
      </div>
    </main>
  );
}
