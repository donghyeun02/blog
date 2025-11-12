import { Suspense } from 'react';
import BlogHome from '@/components/BlogHome';

export const metadata = {
  title: '블로그 - donghyeun02',
  description: '개발자 donghyeun02의 기술 블로그 포스트 목록입니다.',
};

export default function HomePage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <BlogHome />
    </Suspense>
  );
}
