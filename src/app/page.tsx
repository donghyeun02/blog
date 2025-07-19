import BlogHome from '@/components/BlogHome';

export const metadata = {
  title: 'donghyeun02',
  description:
    'donghyeun02의 CS, 백엔드, 블록체인 등 다양한 개발 지식과 경험을 공유합니다.',
  openGraph: {
    title: 'donghyeun02',
    description:
      'donghyeun02의 CS, 백엔드, 블록체인 등 다양한 개발 지식과 경험을 공유합니다.',
    type: 'website',
    url: 'https://donghyeun02.com/',
    images: [
      {
        url: 'https://donghyeun02.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'donghyeun02 블로그 썸네일',
      },
    ],
  },
};

export default function Home() {
  return <BlogHome />;
}
