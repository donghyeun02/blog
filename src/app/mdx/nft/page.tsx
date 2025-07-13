'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import NftContent from './content.mdx';
import { postsMeta } from '@/components/postsMeta';

function MDXContentWithProvider() {
  return <NftContent />;
}

export default function NftPage() {
  const currentPath = '/mdx/nft';
  const idx = postsMeta.findIndex((p) => p.path === currentPath);
  const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
  const nextPost = idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;
  return (
    <BlogPostLayout {...metadata} prevPost={prevPost} nextPost={nextPost}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
