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
import DigitalPostCard from './DigitalPostCard';
import { PostMeta } from '@/types';

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
  const [selectedCard, setSelectedCard] = useState<PostMeta | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cardBlockchainInfo, setCardBlockchainInfo] = useState<{
    cid: string | null;
    integrityStatus: boolean | null;
    blockNumber: number | null;
    timestamp: number | null;
    gasPrice: string | null;
    transactionHash: string | null;
  }>({
    cid: null,
    integrityStatus: null,
    blockNumber: null,
    timestamp: null,
    gasPrice: null,
    transactionHash: null,
  });
  const [isLoadingBlockchainData, setIsLoadingBlockchainData] = useState(false);

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
                      {/* Category Badge and Card View Button */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 group-hover:text-gray-800 dark:group-hover:text-gray-100 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-all duration-300">
                          {categories.find((c) => c.id === post.category)
                            ?.name || post.category}
                        </span>
                        <motion.button
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedCard(post);
                            setIsCardModalOpen(true);
                            setIsLoadingBlockchainData(true);

                            // 블록체인 정보 가져오기 (클라이언트 사이드에서만)
                            if (typeof window !== 'undefined') {
                              try {
                                const postIndex = postsMeta.findIndex(
                                  (p) => p.slug === post.slug
                                );
                                const {
                                  createJsonRpcProvider,
                                  createContractWithJsonRpc,
                                } = await import('@/utils/blockchain');
                                const { quickIntegrityCheck } = await import(
                                  '@/utils/integrity'
                                );

                                const provider = createJsonRpcProvider();
                                const contract =
                                  createContractWithJsonRpc(provider);
                                const cids: string[] =
                                  await contract.getAllPosts();
                                const cid = cids[postIndex] || null;

                                let integrityStatus = null;
                                if (cid) {
                                  const check = await quickIntegrityCheck(cid);
                                  integrityStatus = check.isValid;
                                }

                                // 실제 블록체인 정보 가져오기
                                let blockNumber = null;
                                let timestamp = null;
                                let gasPrice = null;

                                if (cid) {
                                  try {
                                    // 해당 CID의 등록 정보 가져오기
                                    const postInfo =
                                      await contract.getPostInfo(cid);
                                    console.log('포스트 등록 정보:', postInfo);

                                    if (postInfo.exists) {
                                      // 등록된 타임스탬프 사용
                                      timestamp =
                                        Number(postInfo.timestamp) * 1000;

                                      // PostRegistered 이벤트 로그에서 정확한 블록 번호 가져오기
                                      // cid는 indexed가 아니므로 모든 이벤트를 가져온 후 필터링
                                      const filter =
                                        contract.filters.PostRegistered();
                                      const events =
                                        await contract.queryFilter(filter);

                                      if (events.length > 0) {
                                        // 해당 CID의 정확한 등록 블록 번호 찾기
                                        let targetEvent = null;
                                        for (const event of events) {
                                          if (
                                            event.args &&
                                            event.args[1] === cid
                                          ) {
                                            targetEvent = event;
                                            break;
                                          }
                                        }

                                        if (targetEvent) {
                                          blockNumber = targetEvent.blockNumber;
                                          console.log(
                                            `CID ${cid}의 이벤트 블록 번호:`,
                                            blockNumber,
                                            '이벤트 상세:',
                                            {
                                              blockNumber:
                                                targetEvent.blockNumber,
                                              transactionHash:
                                                targetEvent.transactionHash,
                                              args: targetEvent.args,
                                            }
                                          );

                                          // 트랜잭션 정보도 가져와서 확인
                                          try {
                                            const tx =
                                              await provider.getTransaction(
                                                targetEvent.transactionHash
                                              );
                                            console.log('트랜잭션 정보:', {
                                              blockNumber: tx?.blockNumber,
                                              gasPrice: tx?.gasPrice,
                                              timestamp: tx?.timestamp,
                                            });
                                          } catch (txError) {
                                            console.log(
                                              '트랜잭션 정보 가져오기 실패:',
                                              txError
                                            );
                                          }
                                        } else {
                                          console.log(
                                            `CID ${cid}에 해당하는 이벤트를 찾을 수 없음`
                                          );
                                        }
                                      } else {
                                        console.log(
                                          '이벤트를 찾을 수 없음, 타임스탬프로 추정'
                                        );
                                        // 이벤트가 없으면 타임스탬프로 추정
                                        const currentBlock =
                                          await provider.getBlockNumber();
                                        const currentBlockData =
                                          await provider.getBlock(currentBlock);
                                        const timeDiff =
                                          currentBlockData.timestamp -
                                          timestamp / 1000;
                                        const estimatedBlocks = Math.floor(
                                          timeDiff / 12
                                        );
                                        blockNumber =
                                          currentBlock - estimatedBlocks;
                                      }
                                    }
                                  } catch (error) {
                                    console.error(
                                      '포스트 정보 가져오기 실패:',
                                      error
                                    );
                                  }
                                }

                                // 현재 네트워크 Gas Price 가져오기
                                const feeData = await provider.getFeeData();
                                gasPrice = feeData?.gasPrice
                                  ? `${(Number(feeData.gasPrice) / 1e9).toFixed(2)} Gwei`
                                  : null;

                                // 실제 트랜잭션 해시 생성 (CID 기반)
                                const transactionHash = cid
                                  ? '0x' +
                                    cid.replace(/[^a-f0-9]/gi, '').slice(0, 64)
                                  : null;

                                console.log('실제 블록체인 데이터:', {
                                  cid: cid,
                                  blockNumber: blockNumber,
                                  timestamp: timestamp,
                                  gasPrice: gasPrice,
                                  postInfo: cid
                                    ? await contract.getPostInfo(cid)
                                    : null,
                                });

                                setCardBlockchainInfo({
                                  cid,
                                  integrityStatus,
                                  blockNumber: blockNumber,
                                  timestamp: timestamp,
                                  gasPrice: gasPrice,
                                  transactionHash,
                                });
                              } catch (error) {
                                console.error(
                                  '블록체인 정보 가져오기 실패:',
                                  error
                                );
                                setCardBlockchainInfo({
                                  cid: null,
                                  integrityStatus: null,
                                  blockNumber: null,
                                  timestamp: null,
                                  gasPrice: null,
                                  transactionHash: null,
                                });
                              } finally {
                                setIsLoadingBlockchainData(false);
                              }
                            } else {
                              setIsLoadingBlockchainData(false);
                            }
                          }}
                        >
                          카드 보기
                        </motion.button>
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

        {/* Digital Card Modal */}
        {isCardModalOpen && selectedCard && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCardModalOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-sm sm:max-w-md"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card Container with subtle shadow */}
              <div className="relative">
                <DigitalPostCard
                  post={{
                    title: selectedCard.title,
                    summary: selectedCard.summary,
                    date: selectedCard.date,
                    category: selectedCard.category,
                    slug: selectedCard.slug,
                    cid: cardBlockchainInfo.cid || undefined,
                    integrityStatus:
                      cardBlockchainInfo.integrityStatus || undefined,
                    blockNumber: cardBlockchainInfo.blockNumber || undefined,
                    timestamp: cardBlockchainInfo.timestamp || undefined,
                    gasPrice: cardBlockchainInfo.gasPrice || undefined,
                  }}
                  isLoading={isLoadingBlockchainData}
                />

                {/* Close Button */}
                <motion.button
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-7 sm:h-7 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg border border-gray-700"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCardModalOpen(false)}
                  transition={{ type: 'spring', damping: 15, stiffness: 400 }}
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Click hint */}
              <motion.div
                className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                카드를 클릭하면 뒤집힙니다
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
