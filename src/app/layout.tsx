import '../styles/globals.css';
import type { Metadata } from 'next';
import SiteLayout from '@/components/SiteLayout';
import Script from 'next/script';
import { SITE_URL } from '@/utils/site';

export const metadata: Metadata = {
  // metadataBase가 있어야 아래 상대 주소가 정본 주소로 펼쳐지고 canonical이 붙는다.
  metadataBase: new URL(SITE_URL),
  title: 'donghyeun02',
  description:
    '개발자 donghyeun02의 기술 블로그. 웹 개발, 백엔드, CS 학습 과정을 공유합니다.',
  keywords:
    'donghyeun02, 웹개발, 백엔드, CS, 기술 블로그, 개발, Next.js, TypeScript, MDX',
  authors: [{ name: 'donghyeun02' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'donghyeun02',
    description:
      '개발자 donghyeun02의 기술 블로그. 웹 개발, 백엔드, CS 학습 과정을 공유합니다.',
    type: 'website',
    url: '/',
    siteName: 'donghyeun02',
    images: [
      {
        url: 'https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/profile.jpg',
        alt: 'donghyeun02 블로그 썸네일',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
        />
        <link
          rel="icon"
          href="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/profile.jpg"
          type="image/jpeg"
        />
        <link
          rel="apple-touch-icon"
          href="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/profile.jpg"
        />

        {/* GA4 */}
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

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5803293251875548"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
