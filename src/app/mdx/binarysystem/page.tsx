'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import BinarySystemContent from './content.mdx';
import { postsMeta } from '@/components/postsMeta';

function MDXContentWithProvider() {
  return <BinarySystemContent />;
}

export default function binarysystemPage() {
  const currentPath = '/mdx/binarysystem';
  const idx = postsMeta.findIndex((p) => p.path === currentPath);
  const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
  const nextPost = idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;
  return (
    <BlogPostLayout {...metadata} prevPost={prevPost} nextPost={nextPost}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
