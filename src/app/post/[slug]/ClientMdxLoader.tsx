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

  // 여러 IPFS 게이트웨이를 시도할 수 있도록 설정
  const ipfsGateways = [
    process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/',
    'https://ipfs.io/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://dweb.link/ipfs/',
  ];
  
  const getMdxUrl = (cid: string, gatewayIndex: number = 0): string | null => {
    if (!cid) return null;
    const gateway = ipfsGateways[gatewayIndex] || ipfsGateways[0];
    return gateway + cid;
  };

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

  // MDX 콘텐츠 로드 (여러 게이트웨이 재시도)
  useEffect(() => {
    async function loadMdxContent() {
      if (!cid) return;

      // 여러 게이트웨이를 순차적으로 시도
      for (let i = 0; i < ipfsGateways.length; i++) {
        const currentUrl = getMdxUrl(cid, i);
        if (!currentUrl) continue;

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 20000); // 20초 타임아웃

          console.log(`IPFS 게이트웨이 시도 ${i + 1}/${ipfsGateways.length}:`, currentUrl);

          const response = await fetch(currentUrl, {
            signal: controller.signal,
            cache: 'no-cache',
          });
          
          clearTimeout(timeoutId);

          if (!response.ok) {
            console.warn(`게이트웨이 ${i + 1} 실패:`, {
              status: response.status,
              statusText: response.statusText,
              url: currentUrl,
            });
            
            // 404가 아닌 경우에만 다음 게이트웨이 시도
            if (response.status === 404 && i === 0) {
              // 첫 번째 게이트웨이에서 404면 CID가 잘못되었을 가능성이 높음
              throw new Error(
                `MDX 파일을 찾을 수 없습니다. (상태: ${response.status}) CID가 올바른지 확인해주세요.`
              );
            }
            
            // 마지막 게이트웨이도 실패한 경우
            if (i === ipfsGateways.length - 1) {
              throw new Error(
                `모든 IPFS 게이트웨이에서 파일을 불러올 수 없습니다. (상태: ${response.status} ${response.statusText})`
              );
            }
            
            // 다음 게이트웨이 시도
            continue;
          }

          const text = await response.text();
          
          if (!text || text.trim().length === 0) {
            throw new Error('MDX 파일이 비어있습니다.');
          }

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
          setError(null); // 성공 시 에러 초기화
          console.log(`성공적으로 MDX 파일 로드: 게이트웨이 ${i + 1}`);
          return; // 성공하면 종료
        } catch (error) {
          if (error instanceof Error) {
            if (error.name === 'AbortError') {
              console.warn(`게이트웨이 ${i + 1} 타임아웃:`, currentUrl);
              
              // 마지막 게이트웨이도 타임아웃인 경우
              if (i === ipfsGateways.length - 1) {
                setError('모든 IPFS 게이트웨이에서 응답 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.');
                return;
              }
              // 다음 게이트웨이 시도
              continue;
            } else {
              // 마지막 게이트웨이인 경우에만 에러 설정
              if (i === ipfsGateways.length - 1) {
                console.error('모든 게이트웨이 실패:', error);
                setError(error.message || 'MDX 콘텐츠를 불러올 수 없습니다.');
                return;
              }
              // 다음 게이트웨이 시도
              continue;
            }
          } else {
            if (i === ipfsGateways.length - 1) {
              console.error('MDX 로드 알 수 없는 오류:', error);
              setError('MDX 콘텐츠를 불러올 수 없습니다.');
              return;
            }
            continue;
          }
        }
      }
    }

    if (cid) {
      loadMdxContent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid, integrityStatus]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#181A1B] flex items-center justify-center">
        <div className="text-[#E2E6E9] text-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#181A1B] relative overflow-hidden flex items-center justify-center">
        {/* Tech Network Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="flex flex-col items-center justify-center">
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
            <div className="text-lg sm:text-xl font-heading font-bold text-[#FFFFFF] mb-2 px-4">
              블록체인에서 블로그 글을 꺼내오는 중...
            </div>
            <div className="text-sm sm:text-base text-[#E2E6E9] text-center max-w-md px-4">
              분산 저장소와 스마트컨트랙트에서 안전하게 글을 불러오고 있습니다.
            </div>
          </motion.div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-[#181A1B] relative overflow-hidden flex items-center justify-center">
        {/* Tech Network Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-[#111213] border border-[#1D1F22] rounded-full flex items-center justify-center mb-6"
          >
            <AlertCircle className="w-8 h-8 text-[#FFFFFF]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-lg sm:text-xl font-heading font-bold text-[#FFFFFF] mb-2 px-4">
              블록체인에서 글을 불러오지 못했습니다.
            </div>
            <div className="text-sm sm:text-base text-[#E2E6E9] text-center max-w-md px-4">
              계속 이렇게 뜨신다면{' '}
              <a
                href="mailto:donghyeun02@gmail.com"
                className="text-[#FFFFFF] underline hover:text-[#E2E6E9]"
              >
                donghyeun02@gmail.com
              </a>{' '}
              로 메일 남겨주세요.
            </div>
          </motion.div>
        </div>
      </div>
    );

  if (!cid)
    return (
      <div className="min-h-screen bg-[#181A1B] relative overflow-hidden flex items-center justify-center">
        {/* Tech Network Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-[#111213] border border-[#1D1F22] rounded-full flex items-center justify-center mb-6"
          >
            <AlertCircle className="w-8 h-8 text-[#E2E6E9]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <div className="text-lg sm:text-xl font-heading font-bold text-[#FFFFFF] mb-2 px-4">
              온체인에서 CID를 찾을 수 없습니다.
            </div>
            <div className="text-sm sm:text-base text-[#E2E6E9] text-center max-w-md px-4">
              이 글의 CID가 스마트컨트랙트에 등록되어 있는지 확인해 주세요.
            </div>
          </motion.div>
        </div>
      </div>
    );

  const post = postsMeta.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-[#181A1B] relative overflow-hidden">
      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
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
                className="group inline-flex items-center text-[#E2E6E9] hover:text-[#FFFFFF] transition-colors"
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
              <motion.h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#FFFFFF] mb-4">
                {post.title}
              </motion.h1>

              {/* Integrity Status */}
              {integrityStatus && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                    integrityStatus.isValid
                      ? 'bg-[#111213] text-[#FFFFFF] border border-[#1D1F22]'
                      : 'bg-[#111213] text-[#FFFFFF] border border-[#1D1F22]'
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
              <div className="border-t border-[#1D1F22] my-8"></div>
            </motion.div>
          )}

          {/* Post Content */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#111213] border border-[#1D1F22] p-4 mb-8"
            >
              <div className="text-[#E2E6E9]">{error}</div>
            </motion.div>
          )}

          {mdxContent && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="prose prose-lg max-w-none leading-relaxed"
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
