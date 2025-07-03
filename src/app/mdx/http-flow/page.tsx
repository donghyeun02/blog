'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import HttpFlowContent from './content.mdx';

function MDXContentWithProvider() {
  return <HttpFlowContent />;
}

export default function HttpFlowPage() {
  return (
    <BlogPostLayout {...metadata}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
