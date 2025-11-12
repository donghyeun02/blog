'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { postsMeta } from '@/components/postsMeta';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#181A1B] flex items-center justify-center">
        <div className="text-[#E2E6E9] text-xl">Loading...</div>
      </div>
    );
  }

  // 카테고리별 포스트 필터링 및 정렬
  const categoryPosts = postsMeta
    .filter((post) => post.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => {
      // order가 있으면 order로 정렬, 없으면 slug로 정렬
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.order !== undefined) return -1;
      if (b.order !== undefined) return 1;
      return a.slug.localeCompare(b.slug);
    });

  const categoryName = categoryPosts[0]?.category || category;

  if (categoryPosts.length === 0) {
    return (
      <div className="min-h-screen bg-[#181A1B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-[#FFFFFF] mb-4">
            {categoryName}
          </h1>
          <p className="text-[#E2E6E9]">포스트가 없습니다.</p>
          <Link
            href="/blog"
            className="mt-8 inline-block text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
          >
            ← 블로그로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181A1B] relative overflow-hidden transition-colors">
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-block mb-6 text-sm text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
          >
            ← 블로그로 돌아가기
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#FFFFFF] mb-4">
            {categoryName}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#E2E6E9]">
            {categoryPosts.length}개의 포스트
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#1D1F22]"></div>

          {/* Posts */}
          <div className="space-y-12 sm:space-y-16">
            {categoryPosts.map((post, index) => {
              return (
                <motion.div
                  key={post.slug}
                  className="relative pl-6 sm:pl-8 md:pl-12"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-[#111213] border-2 border-[#FFFFFF] -translate-x-[5px] sm:-translate-x-[7px]"></div>

                  {/* Post Content */}
                  <Link href={post.path}>
                    <motion.article
                      className="group relative transition-all duration-150"
                      whileHover={{ x: 4 }}
                    >
                      {/* Order Number */}
                      <div className="mb-2">
                        <span className="text-xs font-medium text-[#E2E6E9] uppercase tracking-wider">
                          {index + 1} / {categoryPosts.length}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-[#FFFFFF] mb-3 sm:mb-4 leading-tight group-hover:text-[#FFFFFF]">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base md:text-lg text-[#E2E6E9] leading-relaxed">
                        {post.summary}
                      </p>
                    </motion.article>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

