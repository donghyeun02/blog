'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import LogicGatesContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';

export default function LogicGatesPage() {
  return (
    <BlogPostLayout
      title="논리게이트 기초와 실습"
      summary="AND, OR, NOT, XOR 등 주요 논리게이트의 동작 원리를 학습해보세요."
      date="2025-06-25"
      tags={['논리회로', '기초']}
    >
      <MdxProviderWrapper>
        <LogicGatesContent />
      </MdxProviderWrapper>
    </BlogPostLayout>
  );
}
