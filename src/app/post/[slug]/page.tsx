'use client';

import { useState, useEffect } from 'react';
import { postsMeta } from '@/components/postsMeta';
import BlogPostLayout from '@/components/BlogPostLayout';
import ClientMdxLoader from './ClientMdxLoader';

type PostNavInfo =
  | { slug: string; title: string; path: string; date: string }
  | undefined;
type PostWithNav = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  path: string;
  slug: string;
  category: string;
  thumbnail: string;
  mdxUrl: string;
  prevPost: PostNavInfo;
  nextPost: PostNavInfo;
};

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string>('');
  const [integrityStatus, setIntegrityStatus] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);

  // params를 비동기로 처리
  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  const post = postsMeta.find((p) => p.slug === slug) as
    | PostWithNav
    | undefined;

  if (!slug || !post) return <div>글을 찾을 수 없습니다.</div>;

  const handleIntegrityStatusChange = (status: {
    isValid: boolean;
    message: string;
  }) => {
    setIntegrityStatus(status);
  };

  return (
    <BlogPostLayout
      title={post.title}
      summary={post.summary}
      date={post.date}
      tags={post.tags}
      prevPost={post.prevPost}
      nextPost={post.nextPost}
      integrityStatus={integrityStatus || undefined}
    >
      <ClientMdxLoader
        slug={post.slug}
        onIntegrityStatusChange={handleIntegrityStatusChange}
      />
    </BlogPostLayout>
  );
}
