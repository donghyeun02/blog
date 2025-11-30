'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Code,
  Database,
  Link2,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { postsMeta } from './postsMeta';

const categories = [
  { id: 'all', name: '전체', color: 'from-blue-500 to-cyan-500' },
  { id: 'CS', name: 'CS', color: 'from-gray-500 to-slate-500' },
  { id: 'backend', name: '백엔드', color: 'from-indigo-500 to-purple-500' },
  { id: 'Blockchain', name: '블록체인', color: 'from-purple-500 to-pink-500' },
  { id: 'java', name: 'Java', color: 'from-yellow-500 to-orange-500' },
  { id: 'go', name: 'Go', color: 'from-blue-600 to-cyan-600' },
  { id: 'Dev', name: '개발', color: 'from-green-500 to-emerald-500' },
];

export default function BlogHome() {
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

  // 최근 포스트는 postsMeta 배열의 원본 순서에서 마지막 2개를 가져옴
  const displayPosts = postsMeta.slice(-2);

  // 카테고리별 포스트 수 계산
  const getPostCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return postsMeta.length;
    }
    return postsMeta.filter((post) => post.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-[#181A1B] relative overflow-hidden transition-colors">
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
        {/* Introduction Section */}
        <motion.div
          className="mb-24 sm:mb-32 pb-16 sm:pb-20 border-b border-[#1D1F22]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
            {/* 이미지 */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 flex-shrink-0 relative">
              {/* 이미지 주변 장식 */}
              <div className="absolute -inset-1 border border-[#1D1F22] opacity-50"></div>
              <div className="absolute -inset-2 border border-[#1D1F22]/30 opacity-30"></div>
              <Image
                src="https://donghyeun-blog-images.s3.us-east-1.amazonaws.com/A64D1C12-596E-4016-8EB5-063B2BA1DEBE_1_201_a-Photoroom.png"
                alt="donghyeun02"
                fill
                className="object-contain relative z-10"
                unoptimized
              />
            </div>

            {/* 텍스트 영역 */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-[#FFFFFF] mb-4 sm:mb-6">
                donghyeun02
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#E2E6E9] mb-4 sm:mb-6 leading-relaxed">
                백엔드 개발자
              </p>
              <div className="space-y-3 max-w-3xl">
                <p className="text-base sm:text-lg text-[#E2E6E9] leading-relaxed">
                  보이지 않아도, 사람에게 닿는 효율적인 기술을 고민합니다.
                </p>
                <p className="text-base sm:text-lg text-[#E2E6E9] leading-relaxed sm:whitespace-nowrap">
                  인티그레이션에서 백엔드 개발자 인턴으로 일하였으며,
                  영남대학교에서 컴퓨터공학을 전공 중입니다.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          className="mb-24 sm:mb-32 pb-16 sm:pb-20 border-b border-[#1D1F22]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-[#FFFFFF] mt-5"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#FFFFFF] flex items-center gap-3">
              <Link2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFFFFF]" />
              About
            </h2>
          </div>
          <div className="space-y-4 max-w-3xl">
            <p className="text-base sm:text-lg text-[#E2E6E9] leading-relaxed">
              이 블로그는 Web3 기술로 구축된 블록체인 기반 블로그입니다.
            </p>
            <p className="text-base sm:text-lg text-[#E2E6E9] leading-relaxed">
              단순한 기술 블로그가 아니라, &quot;위변조 방지, 소유권 증명,
              그리고 탈중앙화&quot;를 실제로 구현한 실험적 블로그입니다.
            </p>
            <Link
              href="/about"
              className="inline-block mt-4 text-base text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
            >
              더 알아보기 →
            </Link>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-20 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-[#FFFFFF] mt-5"></div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-[#FFFFFF] flex items-center gap-3">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFFFFF]" />
              Categories
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {categories
              .filter((cat) => cat.id !== 'all')
              .map((category) => (
                <Link key={category.id} href={`/blog/${category.id}`}>
                  <motion.div
                    className="group relative p-4 sm:p-6 md:p-8 bg-[#111213] border border-[#1D1F22] hover:border-[#FFFFFF]/20 transition-all duration-300 overflow-hidden"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* 카드 배경 장식 */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#1D1F22] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-2xl"></div>

                    {/* 카테고리 아이콘 */}
                    <div className="mb-3">
                      {category.id === 'CS' && (
                        <Code className="w-5 h-5 sm:w-6 sm:h-6 text-[#E2E6E9] group-hover:text-[#FFFFFF] transition-colors" />
                      )}
                      {category.id === 'backend' && (
                        <Database className="w-5 h-5 sm:w-6 sm:h-6 text-[#E2E6E9] group-hover:text-[#FFFFFF] transition-colors" />
                      )}
                      {category.id === 'Blockchain' && (
                        <Link2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#E2E6E9] group-hover:text-[#FFFFFF] transition-colors" />
                      )}
                      {!['CS', 'backend', 'Blockchain'].includes(
                        category.id
                      ) && (
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#E2E6E9] group-hover:text-[#FFFFFF] transition-colors" />
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[#FFFFFF] mb-2 group-hover:text-[#FFFFFF]">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#E2E6E9]">
                      {getPostCount(category.id)}개의 포스트
                    </p>
                    <ArrowRight className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 w-4 h-4 sm:w-5 sm:h-5 text-[#E2E6E9] group-hover:text-[#FFFFFF] group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-[#FFFFFF] mt-5"></div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#FFFFFF] flex items-center gap-3">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]" />
              최근 포스트
            </h2>
            <span className="text-sm text-[#E2E6E9] ml-auto">
              총 {postsMeta.length}개
            </span>
          </div>
        </motion.div>

        {/* Posts List */}
        <motion.div
          className="space-y-12 sm:space-y-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {displayPosts.length > 0 ? (
            displayPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/post/${post.slug}`}>
                  <motion.article
                    className="group relative transition-all duration-300 pb-8 sm:pb-12 border-b border-[#1D1F22] hover:border-[#FFFFFF]/20 last:border-0"
                    whileHover={{ opacity: 1 }}
                  >
                    {/* Title - 큰 제목 */}
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
            ))
          ) : (
            <div className="text-center py-16 sm:py-20">
              <p className="text-[#E2E6E9] text-lg">포스트가 없습니다.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
