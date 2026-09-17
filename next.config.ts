import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Turbopack은 직렬화 가능한 값만 받으므로 플러그인을 import한 함수가 아니라
    // 패키지 이름 문자열로 넘긴다.
    remarkPlugins: [['remark-gfm', {}]],
    // 코드 하이라이팅도 빌드 타임에 끝낸다. shiki가 브라우저로 내려가지 않는다.
    rehypePlugins: [
      ['rehype-pretty-code', { theme: 'github-light', keepBackground: true }],
    ],
  },
});

const nextConfig: NextConfig = {
  // React Compiler 1.0 — useMemo/useCallback/memo를 빌드 타임에 자동 삽입한다.
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'donghyeun-blog-images.s3.us-east-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 홈과 같은 목록을 보여주던 옛 경로. 예전에 공유된 링크가 죽지 않게 홈으로 보낸다.
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:category', destination: '/', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
