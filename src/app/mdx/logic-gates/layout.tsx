import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '논리게이트 기초와 실습 - 기술 블로그',
  description:
    'AND, OR, NOT, XOR 등 기본 논리게이트의 동작 원리를 인터랙티브한 시뮬레이터로 학습해보세요.',
  openGraph: {
    title: '논리게이트 기초와 실습',
    description: '인터랙티브한 시뮬레이터로 논리게이트 학습하기',
    type: 'article',
  },
};

export default function LogicGatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
