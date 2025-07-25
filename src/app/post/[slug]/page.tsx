import { postsMeta } from '@/components/postsMeta';
import BlogPostLayout from '@/components/BlogPostLayout';
import ClientMdxLoader from './ClientMdxLoader';

type PostNavInfo =
  | { slug: string; title: string; path: string; date: string }
  | undefined;
type PostWithNav = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  path: string;
  slug: string;
  category: string;
  thumbnail: string;
  mdxUrl: string;
  prevPost: PostNavInfo;
  nextPost: PostNavInfo;
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postsMeta.find((p) => p.slug === slug) as
    | PostWithNav
    | undefined;
  if (!post) return <div>글을 찾을 수 없습니다.</div>;

  return (
    <BlogPostLayout
      title={post.title}
      summary={post.summary}
      date={post.date}
      tags={post.tags}
      prevPost={post.prevPost}
      nextPost={post.nextPost}
    >
      <ClientMdxLoader slug={post.slug} />
    </BlogPostLayout>
  );
}
