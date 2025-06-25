import '../styles/globals.css';
import type { Metadata } from 'next';
import SiteLayout from '@/components/SiteLayout';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'donghyeun02 - 기술 블로그',
  description: '백엔드 개발자 donghyeun02 - 기술 블로그',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HNP6KGYLST"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HNP6KGYLST');
          `}
        </Script>
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
