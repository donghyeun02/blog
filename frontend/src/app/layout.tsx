import '../styles/globals.css';
import type { Metadata } from 'next';
import SiteLayout from '@/components/SiteLayout';

export const metadata: Metadata = {
  title: 'donghyeun.dev - 기술 블로그',
  description: '백엔드 개발자 동현의 인터랙티브 기술 블로그',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
