'use client';

import { useState } from 'react';
import Link from 'next/link';
import { postsMeta } from '@/components/postsMeta';
import PostRow from '@/components/PostRow';

const CATEGORIES = ['전체', 'Dev', 'CS', 'Blockchain'] as const;
type Category = (typeof CATEGORIES)[number];

const allPosts = postsMeta.filter((p) => p.listed !== false).reverse();

export default function PostsPage() {
  const [active, setActive] = useState<Category>('전체');

  const filtered =
    active === '전체'
      ? allPosts
      : allPosts.filter((p) => p.category === active);

  return (
    <div className="max-w-3xl mx-auto px-6 pb-[3lh]">
      <header className="pt-[3lh]">
        <Link className="ext" href="/">
          ← 홈
        </Link>

        <div className="label mt-[1.5lh]">
          <h2>글</h2>
          <span className="label-meta">{filtered.length}편</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-[0.8lh]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`label-meta transition-[color] duration-150 ${
                active === cat
                  ? 'text-[#1D1D1F] underline underline-offset-4'
                  : 'hover:text-[#1D1D1F]'
              }`}
              aria-pressed={active === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="text-[15px] text-[#6E6E73]">아직 글이 없습니다.</p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((post) => (
            <div key={post.slug}>
              <PostRow post={post} />
              <p className="text-[14px] text-[#6E6E73] leading-snug pl-[5.5rem] pr-[0.6rem] pb-[0.3lh] max-[480px]:pl-[0.6rem]">
                {post.summary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
