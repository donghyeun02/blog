'use client';
import { useState } from 'react';
import Link from 'next/link';
import { metadata as logicGatesMeta } from '@/app/mdx/logic-gates/meta';
import { metadata as booleanAlgebraMeta } from '@/app/mdx/boolean-algebra/meta';
import { metadata as httpFlowMeta } from '@/app/mdx/http-flow/meta';

const categories = [
  {
    id: 'all',
    name: '전체',
    icon: '📂',
    posts: null, // null로 두고, 실제 렌더링 시 모든 글을 합쳐서 보여줌
  },
  {
    id: 'cs',
    name: 'CS',
    icon: '📁',
    posts: [
      {
        ...logicGatesMeta,
        path: '/mdx/logic-gates',
      },
      {
        ...booleanAlgebraMeta,
        path: '/mdx/boolean-algebra',
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '📁',
    posts: [
      {
        ...httpFlowMeta,
        path: '/mdx/http-flow',
      },
    ],
  },
  {
    id: 'java',
    name: 'Java',
    icon: '📁',
    posts: [],
  },
  {
    id: 'go',
    name: 'Go',
    icon: '📁',
    posts: [],
  },
];

// 전체 글 목록을 합쳐주는 함수
const getAllPosts = () =>
  categories
    .filter((cat) => cat.posts && Array.isArray(cat.posts))
    .flatMap((cat) => cat.posts!);

export default function BlogHome() {
  const [selected, setSelected] = useState(categories[0].id);
  const current = categories.find((c) => c.id === selected);
  const posts = current?.id === 'all' ? getAllPosts() : current?.posts || [];

  return (
    <main className="flex flex-col md:flex-row gap-0 min-h-[70vh]">
      {/* 좌측 카테고리(디렉토리) 패널 - 모바일에서는 상단에 버튼으로 */}
      <aside className="hidden md:flex w-48 border-r border-neutral-200 bg-neutral-50 py-8 px-2 flex-col gap-1 font-mono text-sm select-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded transition-colors text-left ${
              selected === cat.id
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'hover:bg-neutral-100 text-neutral-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </aside>
      {/* 모바일 카테고리 버튼 */}
      <div className="flex md:hidden w-full overflow-x-auto gap-2 px-2 py-2 bg-neutral-50 border-b border-neutral-200">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`flex items-center gap-1 px-3 py-1 rounded text-xs whitespace-nowrap transition-colors ${
              selected === cat.id
                ? 'bg-blue-50 text-blue-700 font-bold'
                : 'hover:bg-neutral-100 text-neutral-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
      {/* 우측 글 목록 */}
      <section className="flex-1 px-2 sm:px-4 md:px-8 py-6 sm:py-10 max-w-4xl mx-auto w-full">
        <h1 className="text-xl sm:text-2xl font-mono font-bold mb-6 sm:mb-8 tracking-tight text-neutral-900">
          {current?.name}{' '}
          <span className="text-sm sm:text-base font-normal text-neutral-400 align-middle">
            카테고리
          </span>
        </h1>
        <div className="flex flex-col space-y-6 sm:space-y-10">
          {posts.length ? (
            posts.map((post) => (
              <article
                key={post.title}
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transition hover:shadow-md"
              >
                <div className="flex gap-2 mb-1 flex-wrap">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold font-mono text-neutral-900 group-hover:text-blue-700 mb-1 transition-colors">
                  <Link
                    href={post.path}
                    className="align-middle hover:text-blue-700"
                  >
                    <span className="align-middle">📄</span> {post.title}
                  </Link>
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base mb-2">
                  {post.summary}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <span>
                    {new Date(post.date).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="text-neutral-400 font-mono text-base py-12">
              아직 글이 없습니다.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
