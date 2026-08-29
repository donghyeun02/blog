import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { ViewTransition } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { postsMeta } from '@/components/postsMeta';
import { postsContent } from '@/components/postsContent';
import PostToc from '@/components/PostToc';

// 모든 글을 빌드 타임에 정적 생성한다.
export function generateStaticParams() {
  return postsMeta.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postsMeta.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | donghyeun02`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      url: `https://donghyeun02.com/post/${slug}`,
      siteName: 'donghyeun02',
    },
  };
}

// 코드 펜스 안의 '## '는 제목이 아니므로 먼저 걷어낸다.
async function readHeadings(slug: string): Promise<string[]> {
  try {
    const file = path.join(process.cwd(), 'src/app/local-mdx', `${slug}.mdx`);
    const raw = await fs.readFile(file, 'utf-8');
    const withoutCode = raw.replace(/```[\s\S]*?```/g, '');
    return [...withoutCode.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
  } catch {
    return [];
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postsMeta.find((p) => p.slug === slug);
  if (!post) notFound();

  // MDX는 빌드 타임에 컴파일된다. 브라우저로 컴파일러나 하이라이터가
  // 내려가지 않고, 본문은 HTML로 먼저 그려진다.
  const loadContent = postsContent[slug];
  if (!loadContent) notFound();
  const { default: Content } = await loadContent();
  const headings = await readHeadings(slug);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="read-progress" aria-hidden="true" />
      <div className="post-shell max-w-5xl mx-auto px-6 py-16 sm:py-24">
        <aside className="toc-col">
          <PostToc headings={headings} />
        </aside>
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-block text-sm text-[#AEAEB2] hover:text-[#6E6E73] transition-[color] duration-150 mb-12"
          >
            ← 홈으로
          </Link>
          <p className="text-sm font-semibold text-[#AEAEB2] uppercase tracking-widest mb-3">
            {post.category} · {post.date?.replace('.', '/')}
          </p>
          <ViewTransition
            name={`post-title-${post.slug}`}
            share="morph"
            default="none"
          >
            <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight leading-tight mb-12">
              {post.title}
            </h1>
          </ViewTransition>
          <article className="prose max-w-none">
            <Content />
          </article>
        </div>
      </div>
    </div>
  );
}
