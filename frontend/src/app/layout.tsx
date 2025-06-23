import './globals.css';
import { ReactNode } from 'react';
import MdxProviderWrapper from '@/components/MdxProvider';

export const metadata = {
  title: '기술 블로그',
  description: '백엔드 기반 실습형 기술 블로그',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-white text-black">
        <MdxProviderWrapper>{children}</MdxProviderWrapper>
      </body>
    </html>
  );
}
