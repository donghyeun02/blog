'use client';

import { useState, useEffect } from 'react';
import { postsMeta } from '@/components/postsMeta';
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
  // params를 비동기로 처리
  useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  const post = postsMeta.find((p) => p.slug === slug) as
    | PostWithNav
    | undefined;

  if (!slug || !post) return <div>글을 찾을 수 없습니다.</div>;

  const handleIntegrityStatusChange = () => {
    // integrityStatus is not used in this component
  };

  return (
    <ClientMdxLoader
      slug={post.slug}
      onIntegrityStatusChange={handleIntegrityStatusChange}
    />
  );
}
