import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
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
        <div className="absolute w-full h-full backface-hidden border border-[#1D1F22] bg-[#111213] transition-all duration-300">
          <div className="p-4 sm:p-6 h-full flex flex-col">
            {/* 카드 헤더 - 카테고리 */}
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <span className="px-2 sm:px-3 py-1 text-xs font-medium text-[#E2E6E9] uppercase tracking-wide">
                {post.category}
              </span>
            </div>

            {/* 카드 제목 */}
            <h3 className="text-base sm:text-lg font-heading font-bold text-[#FFFFFF] mb-2 sm:mb-3 line-clamp-2">
              {post.title}
            </h3>

            {/* 카드 설명 */}
            <p className="text-xs sm:text-sm text-[#E2E6E9] mb-3 sm:mb-4 flex-grow line-clamp-3">
              {post.summary}
            </p>

            {/* 카드 하단 정보 */}
            <div className="space-y-1 sm:space-y-2">
            </div>
          </div>
        </div>

        {/* 카드 뒷면 */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 border border-[#1D1F22] bg-[#111213]">
          <div className="p-4 sm:p-6 h-full flex flex-col">
            <h4 className="text-base sm:text-lg font-heading font-bold text-[#FFFFFF] mb-3 sm:mb-4">
              블록체인 정보
            </h4>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {/* IPFS CID */}
              {post.cid && (
                <div>
                  <span className="text-[#E2E6E9] font-medium">
                    IPFS CID:
                  </span>
                  <p className="text-[#E2E6E9] font-mono text-xs break-all mt-1">
                    {post.cid.slice(0, 20)}...
                  </p>
                </div>
              )}

              {/* 무결성 상태 */}
              {post.integrityStatus !== undefined && (
                <div>
                  <span className="text-[#E2E6E9] font-medium">
                    무결성 상태:
                  </span>
                  <div className="flex items-center mt-1">
                    {post.integrityStatus ? (
                      <CheckCircle className="w-3 h-3 mr-1 text-[#FFFFFF]" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1 text-[#E2E6E9]" />
                    )}
                    <span className="text-xs text-[#E2E6E9]">
                      {post.integrityStatus ? '검증됨' : '미검증'}
                    </span>
                  </div>
                </div>
              )}

              {/* 블록 번호 */}
              <div>
                <span className="text-[#E2E6E9] font-medium">
                  블록 번호:
                </span>
                {isLoading ? (
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 border-2 border-[#1D1F22] border-t-[#FFFFFF] animate-spin mr-2"></div>
                    <span className="text-[#E2E6E9] text-xs">
                      로딩 중...
                    </span>
                  </div>
                ) : post.blockNumber ? (
                  <p className="text-[#E2E6E9] font-mono text-xs mt-1">
                    #{post.blockNumber.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-[#E2E6E9]/60 text-xs mt-1">
                    -
                  </p>
                )}
              </div>

              {/* Gas Price */}
              <div>
                <span className="text-[#E2E6E9] font-medium">
                  Gas Price:
                </span>
                {isLoading ? (
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 border-2 border-[#1D1F22] border-t-[#FFFFFF] animate-spin mr-2"></div>
                    <span className="text-[#E2E6E9] text-xs">
                      로딩 중...
                    </span>
                  </div>
                ) : post.gasPrice ? (
                  <p className="text-[#E2E6E9] text-xs mt-1">
                    {post.gasPrice}
                  </p>
                ) : (
                  <p className="text-[#E2E6E9]/60 text-xs mt-1">
                    -
                  </p>
                )}
              </div>

              {/* 타임스탬프 */}
              <div>
                <span className="text-[#E2E6E9] font-medium">
                  타임스탬프:
                </span>
                {isLoading ? (
                  <div className="flex items-center mt-1">
                    <div className="w-4 h-4 border-2 border-[#1D1F22] border-t-[#FFFFFF] animate-spin mr-2"></div>
                    <span className="text-[#E2E6E9] text-xs">
                      로딩 중...
                    </span>
                  </div>
                ) : post.timestamp ? (
                  <p className="text-[#E2E6E9] text-xs mt-1">
                    {new Date(post.timestamp).toLocaleString('ko-KR')}
                  </p>
                ) : (
                  <p className="text-[#E2E6E9]/60 text-xs mt-1">
                    -
                  </p>
                )}
              </div>
            </div>

            {/* 읽기 버튼 */}
            <div className="mt-auto pt-2 sm:pt-3">
              <Link href={`/post/${post.slug}`}>
                <motion.button
                  className="w-full bg-[#1D1F22] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#181A1B] py-1.5 sm:py-2 px-3 sm:px-4 flex items-center justify-center text-xs sm:text-sm font-medium transition-colors border border-[#1D1F22] hover:border-[#FFFFFF]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
