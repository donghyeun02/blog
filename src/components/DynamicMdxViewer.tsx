'use client';

import { useState, useEffect } from 'react';
import * as runtime from 'react/jsx-runtime';
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';

import { mdxComponents } from './mdx-components';

interface DynamicMdxViewerProps {
  initialUrl: string;
}

export default function DynamicMdxViewer({
  initialUrl,
}: DynamicMdxViewerProps) {
  const [error, setError] = useState<string | null>(null);
  const [Content, setContent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    async function fetchAndCompile() {
      setError(null);
      setContent(null);
      try {
        const res = await fetch(initialUrl);
        if (!res.ok) throw new Error('파일을 불러올 수 없습니다.');
        const text = await res.text();
        const compiled = await evaluate(text, {
          ...runtime,
          useMDXComponents: () => mdxComponents,
          remarkPlugins: [remarkGfm],
        });
        setContent(() => compiled.default);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('불러오기 실패');
        }
      }
    }
    if (initialUrl) fetchAndCompile();
  }, [initialUrl]);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {Content && (
        <div className="prose prose-lg max-w-none">
          <Content />
        </div>
      )}
    </div>
  );
}
