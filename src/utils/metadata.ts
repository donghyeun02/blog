import { Metadata } from 'next';

interface PostMeta {
  title: string;
  summary: string;
  tags: string[];
  date: string;
  thumbnail: string;
}

export function generatePostMetadata(
  currentPost: PostMeta | undefined
): Metadata {
  if (!currentPost) {
    return {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 페이지가 존재하지 않습니다.',
    };
  }

  return {
    metadataBase: new URL('https://donghyeun02.com'),
    title: currentPost.title,
    description: currentPost.summary,
    keywords: currentPost.tags.join(', '),
    openGraph: {
      title: currentPost.title,
      description: currentPost.summary,
      type: 'article',
      publishedTime: currentPost.date,
      images: [
        {
          url: currentPost.thumbnail,
          width: 1200,
          height: 630,
          alt: currentPost.title,
        },
      ],
    },
  };
}
