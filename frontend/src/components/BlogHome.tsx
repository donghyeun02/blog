'use client';
import { useState } from 'react';
import Link from 'next/link';

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
        id: 'logic-gates',
        title: '논리게이트 기초와 실습',
        description:
          'AND, OR, NOT, XOR 등 기본 논리게이트의 동작 원리를 인터랙티브한 시뮬레이터로 학습해보세요.',
        date: '2024-01-15',
        tags: ['논리회로', '시뮬레이터', '기초'],
        path: '/mdx/logic-gates',
      },
      {
        id: 'boolean-algebra',
        title: '불린 대수 기초',
        description:
          '논리게이트의 수학적 기반이 되는 불린 대수의 기본 개념과 법칙들을 학습해보세요.',
        date: '2024-01-16',
        tags: ['논리회로', '수학', '기초'],
        path: '/mdx/boolean-algebra',
      },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: '📁',
    posts: [],
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
    <main className="flex flex-row gap-0 min-h-[70vh]">
      {/* 좌측 카테고리(디렉토리) 패널 */}
      <aside className="w-48 border-r border-neutral-200 bg-neutral-50 py-8 px-2 flex flex-col gap-1 font-mono text-sm select-none">
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
      {/* 우측 글 목록 */}
      <section className="flex-1 px-8 py-12">
        <h1 className="text-2xl font-mono font-bold mb-8 tracking-tight text-neutral-900">
          {current?.name}{' '}
          <span className="text-base font-normal text-neutral-400 align-middle">
            카테고리
          </span>
        </h1>
        <div className="flex flex-col space-y-10">
          {posts.length ? (
            posts.map((post) => (
              <Link href={post.path} key={post.id} className="group block">
                <article>
                  <div className="flex gap-2 mb-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold font-mono text-neutral-900 group-hover:text-blue-700 mb-1 transition-colors">
                    <span className="align-middle">📄</span> {post.title}
                  </h2>
                  <p className="text-neutral-600 text-base mb-2">
                    {post.description}
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
              </Link>
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
