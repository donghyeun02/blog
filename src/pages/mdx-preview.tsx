import { useEffect, useState } from 'react';
import BlogPostLayout from '@/components/BlogPostLayout';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { mdxComponents } from '@/components/mdx-components';

export default function MdxPreviewPage() {
  const [MDXContent, setMDXContent] = useState<null | React.ComponentType<{
    components?: object;
  }>>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/mdx-preview')
      .then((res) => res.json())
      .then(async (data) => {
        if (data.mdx) {
          try {
            const evaluated = await evaluate(data.mdx, {
              ...runtime,
            });
            setMDXContent(
              () =>
                evaluated.default as React.ComponentType<{
                  components?: object;
                }>
            );
          } catch (e: unknown) {
            if (e instanceof Error) {
              setError(e.message || 'MDX 파싱 오류');
            } else {
              setError('MDX 파싱 오류 (알 수 없는 오류)');
            }
          }
        } else {
          setError(data.error || 'MDX 파일 없음');
        }
      });
  }, []);

  return (
    <BlogPostLayout
      title="로컬 MDX 미리보기"
      summary="이 페이지는 src/local-mdx/sample.mdx 파일의 원본을 미리보기합니다."
      date={new Date().toISOString()}
      tags={['로컬', 'MDX', '미리보기']}
    >
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {MDXContent ? (
        <div className="prose max-w-none">
          <MDXContent components={mdxComponents} />
        </div>
      ) : !error ? (
        <div>로딩 중...</div>
      ) : null}
    </BlogPostLayout>
  );
}
