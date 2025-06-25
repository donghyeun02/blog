'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import LogicGatesContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';

function MDXContentWithProvider() {
  return (
    <MdxProviderWrapper>
      <LogicGatesContent />
    </MdxProviderWrapper>
  );
}

export default function LogicGatesPage() {
  return (
    <BlogPostLayout {...metadata}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
