'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Play,
  CheckCircle,
  Monitor,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [randomAnimation, setRandomAnimation] = useState(0);

  // 새로고침할 때마다 랜덤 애니메이션 선택
  useEffect(() => {
    setRandomAnimation(Math.floor(Math.random() * 5)); // 0, 1, 2, 3, 4 중 랜덤
  }, []);

  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    setSelectedCategory(category || 'all');
  }, [category]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-900 text-xl">Loading...</div>
      </div>
    );
  }

  const filteredPosts =
    selectedCategory === 'all'
      ? postsMeta
      : postsMeta.filter((post) => post.category === selectedCategory);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const displayPosts = sortedPosts;

  // 카테고리별 포스트 수 계산
  const getPostCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return postsMeta.length;
    }
    return postsMeta.filter((post) => post.category === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden transition-colors">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-0.5 sm:gap-1 lg:gap-3 mb-6 sm:mb-8 px-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <Link key={category.id} href={`/blog?category=${category.id}`}>
              <motion.button
                className={`group relative px-1.5 sm:px-2 lg:px-6 py-1 sm:py-1.5 lg:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base ${
                  selectedCategory === category.id
                    ? 'text-gray-900 dark:text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    layoutId="categoryBackground"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {category.name}
                  <span className="hidden lg:inline ml-2 text-xs text-gray-500 dark:text-gray-400">
                    ({getPostCount(category.id)})
                  </span>
                </span>
              </motion.button>
            </Link>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {displayPosts.length > 0 ? (
            displayPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/post/${post.slug}`}>
                  <motion.article
                    className="group relative h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                    whileHover={{
                      y: -4,
                      scale: 1.01,
                    }}
                  >
                    {/* Card Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.thumbnail || '/file.svg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/file.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent group-hover:from-gray-900/10 transition-all duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 relative z-10 flex-grow">
                      {/* Category Badge */}
                      <div className="flex items-center mb-3">
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 group-hover:text-gray-800 dark:group-hover:text-gray-100 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-all duration-300">
                          {categories.find((c) => c.id === post.category)
                            ?.name || post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 dark:text-gray-400 text-sm line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    {/* Meta - 카드 하단에 고정 */}
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(post.date).toLocaleDateString('ko-KR')}
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-all duration-300 text-gray-500 dark:text-gray-400" />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">포스트가 없습니다.</p>
            </div>
          )}
        </motion.div>

        {/* Footer Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center">
            {/* 랜덤으로 하나만 보이기 */}
            {randomAnimation === 0 && (
              <motion.div
                className="flex items-center space-x-2"
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="text-green-600 text-xs sm:text-sm font-medium">
                  It Works!
                </span>
              </motion.div>
            )}

            {randomAnimation === 1 && (
              <motion.div
                className="flex items-center space-x-2"
                animate={{
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 dark:text-gray-100" />
                <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">
                  Hello, World!
                </span>
              </motion.div>
            )}

            {randomAnimation === 2 && (
              <motion.div
                className="flex items-center space-x-2"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                <span className="text-purple-600 text-xs sm:text-sm font-medium">
                  Works on My Machine...
                </span>
              </motion.div>
            )}

            {randomAnimation === 3 && (
              <motion.div
                className="flex items-center space-x-2"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                <span className="text-orange-600 text-xs sm:text-sm font-medium">
                  Why Is It Working?
                </span>
              </motion.div>
            )}

            {randomAnimation === 4 && (
              <motion.div
                className="flex items-center space-x-2"
                animate={{
                  x: [-3, 3, -3],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="text-red-600 text-xs sm:text-sm font-medium">
                  It&apos;s Not a Bug, It&apos;s a Feature
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
