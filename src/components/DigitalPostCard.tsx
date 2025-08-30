import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface DigitalPostCardProps {
  post: {
    title: string;
    summary: string;
    date: string;
    category: string;
    slug: string;
    cid?: string;
    integrityStatus?: boolean;
    blockNumber?: number;
    timestamp?: number;
    gasPrice?: string;
    transactionHash?: string;
  };
  isLoading?: boolean;
}

export default function DigitalPostCard({
  post,
  isLoading = false,
}: DigitalPostCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-sm sm:max-w-md h-80 sm:h-96 perspective-1000"
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className={`relative w-full h-full cursor-pointer transition-all duration-500 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* 카드 앞면 */}
        <div className="absolute w-full h-full backface-hidden rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="p-4 sm:p-6 h-full flex flex-col">
            {/* 카드 헤더 - 카테고리 */}
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                {post.category}
              </span>
            </div>

            {/* 카드 제목 */}
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 line-clamp-2">
              {post.title}
            </h3>

            {/* 카드 설명 */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 flex-grow line-clamp-3">
              {post.summary}
            </p>

            {/* 카드 하단 정보 */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(post.date).toLocaleDateString('ko-KR')}
              </div>
            </div>
          </div>
        </div>

        {/* 카드 뒷면 */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-lg">
          <div className="p-4 sm:p-6 h-full flex flex-col">
            <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              블록체인 정보
            </h4>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {/* IPFS CID */}
              {post.cid && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">
                    IPFS CID:
                  </span>
                  <p className="text-gray-700 dark:text-gray-300 font-mono text-xs break-all mt-1">
                    {post.cid.slice(0, 20)}...
                  </p>
                </div>
              )}

              {/* 무결성 상태 */}
              {post.integrityStatus !== undefined && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400 font-medium">
                    무결성 상태:
                  </span>
                  <div className="flex items-center mt-1">
                    {post.integrityStatus ? (
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1 text-red-500" />
                    )}
                    <span
                      className={`text-xs ${
                        post.integrityStatus
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {post.integrityStatus ? '검증됨' : '미검증'}
                    </span>
                  </div>
                </div>
              )}

              {/* 블록 번호 */}
              <div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  블록 번호:
                </span>
                {isLoading ? (
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      로딩 중...
                    </span>
                  </div>
                ) : post.blockNumber ? (
                  <p className="text-gray-700 dark:text-gray-300 font-mono text-xs mt-1">
                    #{post.blockNumber.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    -
                  </p>
                )}
              </div>

              {/* Gas Price */}
              <div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Gas Price:
                </span>
                {isLoading ? (
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      로딩 중...
                    </span>
                  </div>
                ) : post.gasPrice ? (
                  <p className="text-gray-700 dark:text-gray-300 text-xs mt-1">
                    {post.gasPrice}
                  </p>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    -
                  </p>
                )}
              </div>

              {/* 타임스탬프 */}
              <div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  타임스탬프:
                </span>
                {isLoading ? (
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mr-2"></div>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      로딩 중...
                    </span>
                  </div>
                ) : post.timestamp ? (
                  <p className="text-gray-700 dark:text-gray-300 text-xs mt-1">
                    {new Date(post.timestamp).toLocaleString('ko-KR')}
                  </p>
                ) : (
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    -
                  </p>
                )}
              </div>
            </div>

            {/* 읽기 버튼 */}
            <div className="mt-auto pt-2 sm:pt-3">
              <Link href={`/post/${post.slug}`}>
                <motion.button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  포스트 읽기
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
