import type { Metadata } from 'next';
import LocalMdxLoader from '@/components/LocalMdxLoader';
import { postsMeta } from '@/components/postsMeta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postsMeta.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | donghyeun02`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      url: `https://donghyeun02.com/post/${slug}`,
      siteName: 'donghyeun02',
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LocalMdxLoader slug={slug} />;
}
