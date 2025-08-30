'use client';
import { useEffect, useState, useCallback } from 'react';
import { postsMeta } from '@/components/postsMeta';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx-components';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import AdSense from '@/components/AdSense';
import Link from 'next/link';
// 동적 import로 변경하여 서버 사이드에서 실행되지 않도록 함

interface ClientMdxLoaderProps {
  slug: string;
  onIntegrityStatusChange?: (status: {
    isValid: boolean;
    message: string;
  }) => void;
}

export default function ClientMdxLoader({
  slug,
  onIntegrityStatusChange,
}: ClientMdxLoaderProps) {
  const [cid, setCid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [integrityStatus, setIntegrityStatus] = useState<{
    isValid: boolean;
    message: string;
  } | null>(null);
  const [mdxContent, setMdxContent] = useState<React.ReactElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchCid() {
      if (typeof window === 'undefined') return;

      setLoading(true);
      setError(null);
      try {
        const postIndex = postsMeta.findIndex((p) => p.slug === slug);
        const { createJsonRpcProvider, createContractWithJsonRpc } =
          await import('@/utils/blockchain');

        const provider = createJsonRpcProvider();
        const contract = createContractWithJsonRpc(provider);
        const cids: string[] = await contract.getAllPosts();
        const foundCid = cids[postIndex] || null;

        setCid(foundCid);
      } catch (e: unknown) {
        const { handleBlockchainError } = await import('@/utils/blockchain');
        const blockchainError = handleBlockchainError(e);
        setError(blockchainError.message || '온체인 CID fetch 에러');
      } finally {
        setLoading(false);
      }
    }
    fetchCid();
  }, [slug]);

  const verifyIntegrity = useCallback(async () => {
    if (!cid || typeof window === 'undefined') {
      return;
    }

    try {
      const { quickIntegrityCheck } = await import('@/utils/integrity');
      const quickCheck = await quickIntegrityCheck(cid);
      if (!quickCheck.isValid) {
        const status = {
          isValid: false,
          message: quickCheck.error || '무결성 검증에 실패했습니다.',
        };
        setIntegrityStatus(status);
        onIntegrityStatusChange?.(status);
      } else {
        const status = {
          isValid: true,
          message: '블록체인에서 검증된 안전한 콘텐츠입니다.',
        };
        setIntegrityStatus(status);
        onIntegrityStatusChange?.(status);
      }
    } catch {
      const status = {
        isValid: false,
        message: '무결성 검증 중 오류가 발생했습니다.',
      };
      setIntegrityStatus(status);
      onIntegrityStatusChange?.(status);
    }
  }, [cid, onIntegrityStatusChange]);

  useEffect(() => {
    if (cid) {
      verifyIntegrity();
    } else {
      const tempStatus = {
        isValid: true,
        message: '무결성 검증 중',
      };
      setIntegrityStatus(tempStatus);
      onIntegrityStatusChange?.(tempStatus);
    }
  }, [cid, verifyIntegrity, onIntegrityStatusChange]);

  const ipfsGateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY ||
    'https://gateway.pinata.cloud/ipfs/';
  const mdxUrl = cid ? ipfsGateway + cid : null;

  // MDX 콘텐츠 로드
  useEffect(() => {
    async function loadMdxContent() {
      if (!mdxUrl) return;

      try {
        const response = await fetch(mdxUrl);
        if (!response.ok) throw new Error('MDX 파일을 불러올 수 없습니다.');

        const text = await response.text();
        const { default: MdxComponent } = await evaluate(text, {
          ...runtime,
          remarkPlugins: [remarkGfm],
          development: false,
        });

        // MDX 컴포넌트에 integrityStatus를 전달하기 위해 전역 변수 사용
        (
          window as Window & { integrityStatus?: typeof integrityStatus }
        ).integrityStatus = integrityStatus;
        setMdxContent(<MdxComponent components={mdxComponents} />);
      } catch (error) {
        console.error('MDX 로드 오류:', error);
        setError('MDX 콘텐츠를 불러올 수 없습니다.');
      }
    }

    if (mdxUrl) {
      loadMdxContent();
    }
  }, [mdxUrl, integrityStatus]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-900 dark:text-gray-100 text-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden flex items-center justify-center">
        {/* Tech Network Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-gray-100 rounded-full mb-6"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              블록체인에서 블로그 글을 꺼내오는 중...
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              분산 저장소와 스마트컨트랙트에서 안전하게 글을 불러오고 있습니다.
            </div>
          </motion.div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden flex items-center justify-center">
        {/* Tech Network Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
          >
            <AlertCircle className="w-8 h-8 text-red-600" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
              블록체인에서 글을 불러오지 못했습니다.
            </div>
            <div className="text-red-600 dark:text-red-400 text-center max-w-md">
              계속 이렇게 뜨신다면{' '}
              <a
                href="mailto:donghyeun02@gmail.com"
                className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                donghyeun02@gmail.com
              </a>{' '}
              로 메일 남겨주세요.
            </div>
          </motion.div>
        </div>
      </div>
    );

  if (!mdxUrl)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden flex items-center justify-center">
        {/* Tech Network Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6"
          >
            <AlertCircle className="w-8 h-8 text-gray-600" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              온체인에서 CID를 찾을 수 없습니다.
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-center max-w-md">
              이 글의 CID가 스마트컨트랙트에 등록되어 있는지 확인해 주세요.
            </div>
          </motion.div>
        </div>
      </div>
    );

  const post = postsMeta.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 hidden sm:block"
          >
            <Link href="/blog">
              <motion.button
                className="group inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                블로그 목록으로
              </motion.button>
            </Link>
          </motion.div>

          {/* Post Header */}
          {post && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {post.title}
              </motion.h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Integrity Status */}
              {integrityStatus && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${
                    integrityStatus.isValid
                      ? 'bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700'
                      : 'bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-700'
                  }`}
                >
                  {integrityStatus.isValid ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mr-2" />
                  )}
                  {integrityStatus.message}
                </motion.div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>
            </motion.div>
          )}

          {/* Post Content */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-8"
            >
              <div className="text-red-700 dark:text-red-400">{error}</div>
            </motion.div>
          )}

          {mdxContent && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="prose prose-lg prose-blue dark:prose-invert max-w-none leading-relaxed"
            >
              {mdxContent}
            </motion.article>
          )}

          {/* AdSense Advertisement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 mb-8"
          >
            <AdSense
              adSlot="2600864316"
              className="text-center"
              style={{ minHeight: '250px' }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
