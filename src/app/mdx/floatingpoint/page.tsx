'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import FloatingpointContent from './content.mdx';
import { postsMeta } from '@/components/postsMeta';

function MDXContentWithProvider() {
  return <FloatingpointContent />;
}

export default function FloatingpointPage() {
  const currentPath = '/mdx/floatingpoint';
  const idx = postsMeta.findIndex((p) => p.path === currentPath);
  const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
  const nextPost = idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;
  return (
    <BlogPostLayout {...metadata} prevPost={prevPost} nextPost={nextPost}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
