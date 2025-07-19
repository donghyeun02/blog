'use client';

import { useEffect, useState } from 'react';

interface MDXWrapperProps {
  slug: string;
}

// MDX 모듈 타입 정의
interface MDXModule {
  default: React.ComponentType;
}

// 정적 import를 위한 매핑
const mdxModules: Record<string, () => Promise<MDXModule>> = {
  binarysystem: () => import('../app/mdx/binarysystem/content.mdx'),
  calculator: () => import('../app/mdx/calculator/content.mdx'),
  floatingpoint: () => import('../app/mdx/floatingpoint/content.mdx'),
  korailreserve: () => import('../app/mdx/korailreserve/content.mdx'),
  nft: () => import('../app/mdx/nft/content.mdx'),
  smartcontract: () => import('../app/mdx/smartcontract/content.mdx'),
};

export default function MDXWrapper({ slug }: MDXWrapperProps) {
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMDXContent = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log(`Loading MDX content for slug: ${slug}`);

        const importFunction = mdxModules[slug];
        if (!importFunction) {
          throw new Error(`Unknown slug: ${slug}`);
        }

        const mdxModule = await importFunction();
        console.log('MDX module loaded:', mdxModule);

        if (mdxModule && mdxModule.default) {
          setMDXContent(() => mdxModule.default);
          console.log('MDX content set successfully');
        } else {
          throw new Error('MDX 모듈을 찾을 수 없습니다.');
        }
      } catch (err) {
        console.error(`Failed to load MDX content for ${slug}:`, err);
        setError(
          `콘텐츠를 불러올 수 없습니다: ${slug} - ${err instanceof Error ? err.message : 'Unknown error'}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      loadMDXContent();
    }
  }, [slug]);

  if (isLoading) {
    return <div className="animate-pulse p-4">콘텐츠를 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded-md bg-red-50">
        <p className="font-semibold">오류 발생</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!MDXContent) {
    return (
      <div className="text-gray-500 p-4 border border-gray-200 rounded-md bg-gray-50">
        콘텐츠를 찾을 수 없습니다.
      </div>
    );
  }

  return <MDXContent />;
}
