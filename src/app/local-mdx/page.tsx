'use client';

import { useState, useEffect } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx-components';

export default function LocalMdxPage() {
  const [mdxContent, setMdxContent] = useState<React.ReactElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMdxContent = async () => {
      try {
        const response = await fetch('/api/local-mdx?file=sample.mdx');
        const { content } = await response.json();

        const { default: MdxComponent } = await evaluate(content, {
          ...runtime,
          remarkPlugins: [remarkGfm],
          development: false,
        });

        setMdxContent(<MdxComponent components={mdxComponents} />);
      } catch (error) {
        console.error('Failed to load MDX content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMdxContent();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (mdxContent) {
    return (
      <div className="fixed inset-0 bg-[#FAFAFA] font-sans overflow-hidden">
        <div className="w-full h-full">
          <div className="prose prose-lg prose-blue max-w-none leading-loose font-sans h-full">
            {mdxContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <p className="text-gray-600">Failed to load MDX content</p>
    </div>
  );
}
