import '../styles/globals.css';
import type { Metadata } from 'next';
import SiteLayout from '@/components/SiteLayout';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'donghyeun02',
  description: '백엔드 개발자 donghyeun02',
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
          rel="icon"
          href="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/profile.jpg"
          type="image/jpeg"
        />
        <link
          rel="apple-touch-icon"
          href="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/profile.jpg"
        />

        {/* SEO 기본 메타태그 */}
        <title>donghyeun02</title>
        <meta
          name="description"
          content="백엔드 개발자 donghyeun02, 기술 블로그. Blockchain, SmartContract, 논리회로, CS, go, java, 개발 노트."
        />
        <meta
          name="keywords"
          content="donghyeun02, 기술 블로그, 개발, Next.js, TypeScript, MDX, 논리회로, CS, 백엔드"
        />
        <meta name="author" content="donghyeun02" />
        {/* Open Graph 태그 */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="donghyeun02" />
        <meta property="og:title" content="donghyeun02" />
        <meta
          property="og:description"
          content="백엔드 개발자 donghyeun02, 기술 블로그. Blockchain, SmartContract, 논리회로, CS, go, java, 개발 노트."
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
