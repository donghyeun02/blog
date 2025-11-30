'use client';

import { useState, useEffect } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx-components';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
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
      <div className="min-h-screen bg-[#181A1B] flex items-center justify-center relative overflow-hidden">
        {/* 배경 그리드 패턴 */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-[#1D1F22] border-t-[#FFFFFF] rounded-full mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-xl font-semibold text-[#FFFFFF] mb-2">
              블로그 글을 불러오는 중...
            </div>
            <div className="text-[#E2E6E9] text-center max-w-md">
              MDX 콘텐츠를 렌더링하고 있습니다.
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (mdxContent) {
    return (
      <div className="min-h-screen bg-[#181A1B] relative overflow-hidden">
        {/* 배경 그리드 패턴 */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 max-w-5xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <Link href="/">
              <motion.button
                className="group inline-flex items-center text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm sm:text-base">홈으로 돌아가기</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-[#1D1F22]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-[#FFFFFF] mt-5"></div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#FFFFFF] flex items-center gap-3">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]" />
                샘플 제목
              </h1>
            </div>
          </motion.div>

          {/* Post Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="prose prose-lg max-w-none leading-relaxed"
          >
            {mdxContent}
          </motion.article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181A1B] flex items-center justify-center relative overflow-hidden">
      {/* 배경 그리드 패턴 */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>
      <div className="flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16 bg-[#1D1F22] rounded-full flex items-center justify-center mb-6"
        >
          <svg
            className="w-8 h-8 text-[#E2E6E9]"
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
          <div className="text-xl font-semibold text-[#FFFFFF] mb-2">
            콘텐츠를 불러오지 못했습니다.
          </div>
          <div className="text-[#E2E6E9] text-center max-w-md">
            MDX 파일을 찾을 수 없거나 로드 중 오류가 발생했습니다.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
