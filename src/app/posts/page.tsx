'use client';

import { useState } from 'react';
import Link from 'next/link';
import { postsMeta } from '@/components/postsMeta';

const CATEGORIES = ['전체', 'CS', 'Dev', 'Blockchain'] as const;
type Category = (typeof CATEGORIES)[number];

const allPosts = [...postsMeta].reverse();

export default function PostsPage() {
  const [active, setActive] = useState<Category>('전체');

  const filtered =
    active === '전체'
      ? allPosts
      : allPosts.filter((p) => p.category === active);

  return (
    <div className="max-w-2xl mx-auto px-6 pb-24">
      <div className="pt-16 sm:pt-24 mb-12">
        <Link
          href="/"
          className="inline-block text-sm text-[#AEAEB2] hover:text-[#6E6E73] transition-[color] duration-150 mb-8"
        >
          ← 홈으로
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-semibold text-[#AEAEB2] uppercase tracking-widest">
            글{' '}
            <span className="font-normal">{filtered.length}</span>
          </h1>
          <div className="flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-3 py-1 text-sm transition-[background-color,color] duration-150 ${
                  active === cat
                    ? 'bg-[#1D1D1F] text-white'
                    : 'text-[#6E6E73] hover:bg-[#F5F5F7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-[15px] text-[#AEAEB2]">
          해당 카테고리의 글이 없습니다.
        </p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((post, index) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="group block py-2 px-3 -mx-3 hover:bg-[#F2F2F7] transition-[background-color] duration-150 post-item"
              style={{ '--stagger-index': index } as React.CSSProperties}
            >
              <h3 className="text-base font-semibold text-[#1D1D1F] group-hover:text-[#6E6E73] transition-[color] duration-150 leading-snug mb-0.5">
                {post.title}
              </h3>
              <p className="text-[15px] text-[#6E6E73] leading-snug">
                {post.summary}
              </p>
              <p className="text-sm text-[#AEAEB2] mt-0.5">
                {post.category} · {post.date?.replace('.', '/')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
