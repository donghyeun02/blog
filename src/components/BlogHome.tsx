'use client';
import { useState } from 'react';
import Link from 'next/link';
import { metadata as calculatorMeta } from '@/app/mdx/calculator/meta';
import { metadata as smartcontractMeta } from '@/app/mdx/smartcontract/meta';
import { metadata as korailreserveMeta } from '@/app/mdx/korailreserve/meta';
import { metadata as nftMeta } from '@/app/mdx/nft/meta';
import { metadata as floatingpointMeta } from '@/app/mdx/floatingpoint/meta';
import { metadata as binarySystemMeta } from '@/app/mdx/binarysystem/meta';
import Image from 'next/image';

type PostMeta = {
  title: string;
  path: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
  thumbnail?: string;
};

const categories = [
  {
    id: 'all',
    name: '전체',
    icon: '📁',
    posts: null, // null로 두고, 실제 렌더링 시 모든 글을 합쳐서 보여줌
  },
  {
    id: 'cs',
    name: 'CS',
    icon: '📁',
    posts: [
      {
        ...calculatorMeta,
        path: '/mdx/calculator',
        category: 'CS',
      },

      {
        ...binarySystemMeta,
        path: '/mdx/binarysystem',
        category: 'CS',
      },

      {
        ...floatingpointMeta,
        path: '/mdx/floatingpoint',
        category: 'CS',
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
    id: 'blockchain',
    name: 'Blockchain',
    icon: '📁',
    posts: [
      {
        ...nftMeta,
        path: '/mdx/nft',
        category: 'Blockchain',
      },
      {
        ...smartcontractMeta,
        path: '/mdx/smartcontract',
        category: 'Blockchain',
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
  {
    id: 'dev',
    name: 'Dev',
    icon: '📁',
    posts: [
      {
        ...korailreserveMeta,
        path: '/mdx/korailreserve',
        category: 'Dev',
      },
    ],
  },
];

// 전체 글 목록을 합쳐주는 함수
const getAllPosts = () =>
  categories
    .filter((cat) => cat.posts && Array.isArray(cat.posts))
    .flatMap((cat) => cat.posts!);

export default function BlogHome() {
  const [selected, setSelected] = useState(categories[0].id);
  const [viewType, setViewType] = useState<'card' | 'thumbnail'>('card');
  const current = categories.find((c) => c.id === selected);
  const posts: PostMeta[] =
    current?.id === 'all' ? getAllPosts() : current?.posts || [];
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
            <span>{selected === cat.id ? '📂' : '📁'}</span>
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
            <span>{selected === cat.id ? '📂' : '📁'}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
      {/* 우측 글 목록 */}
      <section className="flex-1 px-2 sm:px-4 md:px-8 py-2 sm:py-4 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-neutral-900">
            {current?.name}{' '}
            <span className="text-sm sm:text-base font-normal text-neutral-400 align-middle">
              카테고리
            </span>
          </h1>
          {/* 레이아웃 토글 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewType('card')}
              className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-mono transition-colors ${
                viewType === 'card'
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                  : 'bg-white border-neutral-200 text-neutral-400 hover:text-blue-700'
              }`}
              aria-label="카드형 보기"
            >
              <span>□</span> 카드형
            </button>
            <button
              onClick={() => setViewType('thumbnail')}
              className={`flex items-center gap-1 px-2 py-1 rounded border text-xs font-mono transition-colors ${
                viewType === 'thumbnail'
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                  : 'bg-white border-neutral-200 text-neutral-400 hover:text-blue-700'
              }`}
              aria-label="썸네일형 보기"
            >
              <span>▤</span> 썸네일형
            </button>
          </div>
        </div>
        <div
          className={
            viewType === 'card'
              ? 'flex flex-col space-y-6 sm:space-y-10'
              : 'flex flex-col space-y-6 sm:space-y-8'
          }
        >
          {sortedPosts.length ? (
            sortedPosts.map((post) =>
              viewType === 'card' ? (
                <article
                  key={post.title}
                  className="flex flex-row items-center gap-3 sm:gap-6 bg-gradient-to-br from-white to-blue-50/40 rounded-2xl shadow-md border border-neutral-100 p-4 sm:p-6 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 group transition-all duration-200 ease-in-out"
                >
                  <Image
                    src={post.thumbnail || '/file.svg'}
                    alt={post.title + ' 썸네일'}
                    width={128}
                    height={128}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md flex-shrink-0 bg-neutral-100"
                    loading="lazy"
                    priority={false}
                  />
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex gap-1 sm:gap-2 mb-2 flex-wrap">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-0.5 text-[11px] sm:text-xs bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full font-semibold shadow-sm border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-[11px] bg-gray-200 text-gray-600 rounded-full font-semibold">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-extrabold font-mono text-neutral-900 group-hover:text-blue-700 mb-1 transition-colors line-clamp-2 tracking-tight">
                      <Link
                        href={post.path}
                        className="align-middle hover:text-blue-700"
                      >
                        <span className="align-middle">📄</span> {post.title}
                      </Link>
                    </h2>
                    <div className="border-b border-neutral-100 mb-2" />
                    <p className="text-neutral-700 text-xs sm:text-sm mb-2 line-clamp-2 font-medium">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                        {new Date(post.date).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              ) : (
                <article
                  key={post.title}
                  className="flex flex-col bg-white rounded-xl border border-neutral-100 p-0 sm:p-0 hover:border-blue-300 transition-all duration-150 ease-in-out shadow-sm overflow-hidden"
                >
                  <Image
                    src={post.thumbnail || '/file.svg'}
                    alt={post.title + ' 썸네일'}
                    width={640}
                    height={360}
                    className="w-full h-48 sm:h-64 object-cover bg-neutral-100 border-b border-neutral-100"
                    loading="lazy"
                    priority={false}
                  />
                  <div className="flex flex-col flex-1 min-w-0 px-4 py-4">
                    <div className="flex gap-1 sm:gap-2 mb-2 flex-wrap">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-3 py-0.5 text-[11px] sm:text-xs bg-blue-50 text-blue-700 rounded-full font-semibold border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-[11px] bg-gray-200 text-gray-600 rounded-full font-semibold">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-extrabold font-mono text-neutral-900 hover:text-blue-700 mb-1 transition-colors line-clamp-2 tracking-tight">
                      <Link
                        href={post.path}
                        className="align-middle hover:text-blue-700"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-neutral-700 text-xs sm:text-sm mb-2 line-clamp-2 font-medium">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                        {new Date(post.date).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              )
            )
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
