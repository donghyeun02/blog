import '../styles/globals.css';
import type { Metadata } from 'next';
import SiteLayout from '@/components/SiteLayout';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'donghyeun02 - 개발자',
  description:
    '개발자 donghyeun02의 기술 블로그. 웹 개발, 백엔드, CS 학습 과정을 공유합니다.',
  keywords:
    'donghyeun02, 웹개발, 백엔드, CS, 기술 블로그, 개발, Next.js, TypeScript, MDX',
  authors: [{ name: 'donghyeun02' }],
  openGraph: {
    title: 'donghyeun02 - 개발자',
    description:
      '개발자 donghyeun02의 기술 블로그. 웹 개발, 백엔드, CS 학습 과정을 공유합니다.',
    type: 'website',
    url: 'https://donghyeun02.com/',
    siteName: 'donghyeun02',
    images: [
      {
        url: 'https://donghyeun02.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'donghyeun02 블로그 썸네일',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'donghyeun02 - 개발자',
    description:
      '개발자 donghyeun02의 기술 블로그. 웹 개발, 백엔드, CS 학습 과정을 공유합니다.',
    images: ['https://donghyeun02.com/og-image.png'],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
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

        {/* SEO 기본 메타태그 */}
        <meta
          name="description"
          content="개발자 donghyeun02의 기술 블로그. 웹 개발, 백엔드, CS 학습 과정을 공유합니다."
        />
        <meta
          name="keywords"
          content="donghyeun02, 웹개발, 백엔드, CS, 기술 블로그, 개발, Next.js, TypeScript, MDX"
        />
        <meta name="author" content="donghyeun02" />

        {/* Open Graph 태그 */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="donghyeun02" />
        <meta property="og:title" content="donghyeun02 - 개발자" />
        <meta
          property="og:description"
          content="개발자 donghyeun02의 기술 블로그. 웹 개발, 백엔드, CS 학습 과정을 공유합니다."
        />
        <meta property="og:url" content="https://donghyeun02.com" />
        <meta
          property="og:image"
          content="https://donghyeun02.com/og-image.png"
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
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
