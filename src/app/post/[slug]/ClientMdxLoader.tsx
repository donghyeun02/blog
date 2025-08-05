'use client';
import { useEffect, useState, useCallback } from 'react';
import { postsMeta } from '@/components/postsMeta';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/components/mdx-components';
import {
  createJsonRpcProvider,
  createContractWithJsonRpc,
  handleBlockchainError,
} from '@/utils/blockchain';

import { quickIntegrityCheck } from '@/utils/integrity';

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

  useEffect(() => {
    async function fetchCid() {
      setLoading(true);
      setError(null);
      try {
        const postIndex = postsMeta.findIndex((p) => p.slug === slug);
        const provider = createJsonRpcProvider();
        const contract = createContractWithJsonRpc(provider);
        const cids: string[] = await contract.getAllPosts();
        const foundCid = cids[postIndex] || null;

        setCid(foundCid);
      } catch (e: unknown) {
        const blockchainError = handleBlockchainError(e);
        setError(blockchainError.message || '온체인 CID fetch 에러');
      } finally {
        setLoading(false);
      }
    }
    fetchCid();
  }, [slug]);

  const verifyIntegrity = useCallback(async () => {
    if (!cid) {
      return;
    }

    try {
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
        message: '로컬 콘텐츠 (무결성 검증 생략)',
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

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA]">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin mb-2"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="#6366f1"
            strokeWidth="4"
            strokeDasharray="32 32"
            strokeLinecap="round"
          />
          <rect x="20" y="8" width="8" height="8" rx="2" fill="#6366f1" />
        </svg>
        <div className="text-xl font-semibold text-gray-900 mb-2">
          블록체인에서 블로그 글을 꺼내오는 중...
        </div>
        <div className="text-gray-600 text-center max-w-md">
          분산 저장소와 스마트컨트랙트에서 안전하게 글을 불러오고 있습니다.
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA]">
        <svg
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          className="mb-4"
        >
          <circle cx="12" cy="12" r="10" fill="#fee2e2" />
          <path
            d="M12 8v4m0 4h.01"
            stroke="#b91c1c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-center">
          <div className="text-xl font-semibold text-red-700 mb-2">
            블록체인에서 글을 불러오지 못했습니다.
          </div>
          <div className="text-red-600 text-center max-w-md">
            계속 이렇게 뜨신다면{' '}
            <a
              href="mailto:donghyeun02@gmail.com"
              className="text-blue-600 underline"
            >
              donghyeun02@gmail.com
            </a>{' '}
            로 메일 남겨주세요 ㅠㅠ..
          </div>
        </div>
      </div>
    );

  if (!mdxUrl)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA]">
        <svg
          width="48"
          height="48"
          fill="none"
          viewBox="0 0 24 24"
          className="mb-4"
        >
          <circle cx="12" cy="12" r="10" fill="#e0e7ef" />
          <path
            d="M12 8v4m0 4h.01"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-900 mb-2">
            온체인에서 CID를 찾을 수 없습니다.
          </div>
          <div className="text-gray-600 text-center max-w-md">
            이 글의 CID가 스마트컨트랙트에 등록되어 있는지 확인해 주세요.
          </div>
        </div>
      </div>
    );

  return (
    <div className="fixed inset-0 bg-[#FAFAFA] font-sans overflow-hidden">
      <div className="w-full h-full">
        <div className="w-full h-full">
          <div className="w-full h-full">
            <div className="w-full h-full">
              <div className="h-full">
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {mdxContent && (
                  <div className="prose prose-lg prose-blue max-w-none leading-loose font-sans h-full">
                    {mdxContent}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
