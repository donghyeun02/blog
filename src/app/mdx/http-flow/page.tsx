'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import HttpFlowContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';

function MDXContentWithProvider() {
  return (
    <MdxProviderWrapper>
      <HttpFlowContent />
    </MdxProviderWrapper>
  );
}

export default function HttpFlowPage() {
  return (
    <BlogPostLayout {...metadata}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
