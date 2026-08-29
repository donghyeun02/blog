'use client';

import { useState } from 'react';
import PostRow from '@/components/PostRow';
import type { PostMeta } from '@/types';

const FILTERS = ['전체', 'Dev', 'CS', 'Blockchain'] as const;
type Filter = (typeof FILTERS)[number];

// 카테고리를 섹션으로 쪼개지 않고 한 목록에 두되, 버튼으로 걸러 본다.
export default function FilterablePosts({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState<Filter>('전체');

  const shown =
    active === '전체' ? posts : posts.filter((p) => p.category === active);

  return (
    <section>
      <div className="label">
        <h2>글</h2>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              className={`label-meta transition-[color] duration-150 ${
                active === filter
                  ? 'text-[#1D1D1F] underline underline-offset-4'
                  : 'hover:text-[#1D1D1F]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <p className="text-[15px] text-[#6E6E73]">아직 글이 없습니다.</p>
      ) : (
        <div className="flex flex-col">
          {shown.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
