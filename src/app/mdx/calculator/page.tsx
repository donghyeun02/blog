'use client';

import { metadata } from './meta';
import BlogPostLayout from '@/components/BlogPostLayout';
import CalculatorContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';
import { postsMeta } from '@/components/postsMeta';
import DecimalToBinaryConverter from '@/components/CS/DecimalToBinaryConverter';
import { MDXProvider } from '@mdx-js/react';

const components = {
  DecimalToBinaryConverter,
};

function MDXContentWithProvider() {
  return (
    <MDXProvider components={components}>
      <CalculatorContent />
    </MDXProvider>
  );
}

export default function CalculatorPage() {
  const currentPath = '/mdx/calculator';
  const idx = postsMeta.findIndex((p) => p.path === currentPath);
  const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
  const nextPost = idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;
  return (
    <BlogPostLayout {...metadata} prevPost={prevPost} nextPost={nextPost}>
      <MDXContentWithProvider />
    </BlogPostLayout>
  );
}
