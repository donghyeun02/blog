import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '불린 대수 기초 - 기술 블로그',
  description:
    '논리게이트의 수학적 기반이 되는 불린 대수의 기본 개념과 법칙들을 학습해보세요.',
  openGraph: {
    title: '불린 대수 기초',
    description: '논리게이트의 수학적 기반 학습하기',
    type: 'article',
  },
};

export default function BooleanAlgebraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
