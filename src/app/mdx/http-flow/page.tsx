'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import HttpFlowContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';
import { postsMeta } from '@/components/postsMeta';

function MDXContentWithProvider() {
  return (
    <MdxProviderWrapper>
      <HttpFlowContent />
    </MdxProviderWrapper>
  );
}

export default function HttpFlowPage() {
  const currentPath = '/mdx/http-flow';
  const idx = postsMeta.findIndex((p) => p.path === currentPath);
  const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
  const nextPost = idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;
  return (
    <BlogPostLayout {...metadata} prevPost={prevPost} nextPost={nextPost}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
