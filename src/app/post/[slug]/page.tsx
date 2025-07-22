import { postsMeta } from '@/components/postsMeta';
import DynamicMdxViewer from '@/components/DynamicMdxViewer';
import BlogPostLayout from '@/components/BlogPostLayout';

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
      {post.mdxUrl ? (
        <DynamicMdxViewer initialUrl={post.mdxUrl} />
      ) : (
        <div>아직 동적 MDX 렌더링이 적용되지 않은 글입니다.</div>
      )}
    </BlogPostLayout>
  );
}
