'use client';

import BlogPostLayout from '@/components/BlogPostLayout';
import BooleanAlgebraContent from './content.mdx';
import MdxProviderWrapper from '@/components/MdxProvider';

export default function BooleanAlgebraPage() {
  return (
    <BlogPostLayout
      title="불린 대수 기초"
      summary="논리회로의 수학적 기초가 되는 불린 대수의 기본 개념과 법칙들을 학습해보세요."
      date="2024-01-16"
      tags={['논리회로', '수학', '기초']}
    >
      <MdxProviderWrapper>
        <BooleanAlgebraContent />
      </MdxProviderWrapper>
    </BlogPostLayout>
  );
}
