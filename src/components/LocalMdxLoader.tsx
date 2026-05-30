'use client';

import { useEffect, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import { mdxComponents } from '@/components/mdx-components';
import { postsMeta } from '@/components/postsMeta';
import Link from 'next/link';

export default function LocalMdxLoader({ slug }: { slug: string }) {
  const [mdxContent, setMdxContent] = useState<React.ReactElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const post = postsMeta.find((p) => p.slug === slug);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/local-mdx?file=${slug}.mdx`);
        if (!res.ok) throw new Error('글을 찾을 수 없습니다.');
        const { content } = await res.json();
        const { default: MdxComponent } = await evaluate(content, {
          ...runtime,
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [rehypePrettyCode, { theme: 'github-light', keepBackground: true }],
          ],
          development: false,
        });
        setMdxContent(<MdxComponent components={mdxComponents} />);
      } catch (e) {
        setError(e instanceof Error ? e.message : '로드 실패');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-[#6E6E73]">불러오는 중...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-[#6E6E73]">
          {error ?? '글을 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-block text-sm text-[#AEAEB2] hover:text-[#6E6E73] transition-[color] duration-150 mb-12"
        >
          ← 홈으로
        </Link>
        <p className="text-sm font-semibold text-[#AEAEB2] uppercase tracking-widest mb-3">
          {post.category} · {post.date?.replace('.', '/')}
        </p>
        <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight leading-tight mb-12">
          {post.title}
        </h1>
        <article className="prose max-w-none">{mdxContent}</article>
      </div>
    </div>
  );
}
