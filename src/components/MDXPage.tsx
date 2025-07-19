import { Metadata } from 'next';
import BlogPostLayout from '@/components/BlogPostLayout';
import { postsMeta } from '@/components/postsMeta';
import MDXWrapper from '@/components/MDXWrapper';
import { generatePostMetadata } from '@/utils/metadata';

export function createMDXPage(slug: string) {
  const currentPost = postsMeta.find((p) => p.path === `/mdx/${slug}`);

  async function generateMetadata(): Promise<Metadata> {
    return generatePostMetadata(currentPost);
  }

  function MDXPage() {
    if (!currentPost) {
      return <div>페이지를 찾을 수 없습니다.</div>;
    }

    const currentPath = currentPost.path;
    const idx = postsMeta.findIndex((p) => p.path === currentPath);
    const prevPost = idx > 0 ? postsMeta[idx - 1] : undefined;
    const nextPost =
      idx < postsMeta.length - 1 ? postsMeta[idx + 1] : undefined;

    return (
      <BlogPostLayout {...currentPost} prevPost={prevPost} nextPost={nextPost}>
        <MDXWrapper slug={slug} />
      </BlogPostLayout>
    );
  }

  return { generateMetadata, default: MDXPage };
}
