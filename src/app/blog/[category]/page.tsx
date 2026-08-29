'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { postsMeta } from '@/components/postsMeta';
import PostRow from '@/components/PostRow';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // 배열 뒤쪽이 최신이므로 뒤집어서 최신순으로 둔다.
  const posts = postsMeta
    .filter(
      (post) =>
        post.listed !== false &&
        post.category.toLowerCase() === category.toLowerCase()
    )
    .reverse();

  const name = posts[0]?.category ?? category;

  return (
    <div className="max-w-3xl mx-auto px-6 pb-[3lh]">
      <header className="pt-[3lh]">
        <Link className="ext" href="/">
          ← 홈
        </Link>
        <div className="label mt-[1.5lh]">
          <h2>{name}</h2>
          <span className="label-meta">{posts.length}편</span>
        </div>
      </header>

      {posts.length === 0 ? (
        <p className="text-[15px] text-[#6E6E73]">
          이 카테고리에는 아직 글이 없습니다.{' '}
          <Link className="ext" href="/posts">
            글 전체 보기 →
          </Link>
        </p>
      ) : (
        <div className="flex flex-col">
          {posts.map((post) => (
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
