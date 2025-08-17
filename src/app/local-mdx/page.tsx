'use client';

import { useState, useEffect } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx-components';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-xl font-semibold text-gray-900 mb-2">
              블로그 글을 불러오는 중...
            </div>
            <div className="text-gray-600 text-center max-w-md">
              MDX 콘텐츠를 렌더링하고 있습니다.
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (mdxContent) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Link href="/">
                <motion.button
                  className="group inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  홈으로 돌아가기
                </motion.button>
              </Link>
            </motion.div>

            {/* Post Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                샘플 제목
              </motion.h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date().toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    샘플
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-8"></div>
            </motion.div>

            {/* Post Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="prose prose-lg prose-blue max-w-none leading-relaxed"
            >
              {mdxContent}
            </motion.article>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
        >
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="text-xl font-semibold text-red-700 mb-2">
            콘텐츠를 불러오지 못했습니다.
          </div>
          <div className="text-red-600 text-center max-w-md">
            MDX 파일을 찾을 수 없거나 로드 중 오류가 발생했습니다.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
