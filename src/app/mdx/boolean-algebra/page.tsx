'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import BooleanAlgebraContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';

function MDXContentWithProvider() {
  return (
    <MdxProviderWrapper>
      <BooleanAlgebraContent />
    </MdxProviderWrapper>
  );
}

export default function BooleanAlgebraPage() {
  return (
    <BlogPostLayout {...metadata}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
