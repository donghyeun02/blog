'use client';
import { useEffect, useState } from 'react';
import { postsMeta } from '@/components/postsMeta';
import DynamicMdxViewer from '@/components/DynamicMdxViewer';
import {
  createJsonRpcProvider,
  createContractWithJsonRpc,
  handleBlockchainError,
} from '@/utils/blockchain';
import { createResponsiveStyles } from '@/utils/styles';

export default function ClientMdxLoader({ slug }: { slug: string }) {
  const [cid, setCid] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 반응형 레이아웃을 위한 상태
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const ipfsGateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY ||
    'https://gateway.pinata.cloud/ipfs/';
  const mdxUrl = cid ? ipfsGateway + cid : null;

  // 스타일 유틸리티 사용
  const styles = createResponsiveStyles(isMobile);

  if (loading)
    return (
      <div style={styles.box}>
        <svg
          width={styles.iconSize}
          height={styles.iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
          style={{ marginBottom: 6 }}
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
        <div style={styles.fontTitle}>
          블록체인에서 블로그 글을 꺼내오는 중...
        </div>
        <div style={styles.fontDesc}>
          분산 저장소와 스마트컨트랙트에서 안전하게 글을 불러오고 있습니다.
        </div>
      </div>
    );
  if (error)
    return (
      <div style={styles.errorBox}>
        <svg
          width={styles.iconSize}
          height={styles.iconSize}
          fill="none"
          viewBox="0 0 24 24"
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
        <div>
          <div style={{ ...styles.fontTitle, color: '#b91c1c' }}>
            블록체인에서 글을 불러오지 못했습니다.
          </div>
          <div style={{ ...styles.fontDesc, color: '#b91c1c' }}>
            계속 이렇게 뜨신다면{' '}
            <a
              href="mailto:donghyeun02@gmail.com"
              style={{ color: '#2563eb', textDecoration: 'underline' }}
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
      <div style={styles.notFoundBox}>
        <svg
          width={styles.iconSize}
          height={styles.iconSize}
          fill="none"
          viewBox="0 0 24 24"
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
        <div>
          <div style={styles.fontTitle}>온체인에서 CID를 찾을 수 없습니다.</div>
          <div style={styles.fontDesc}>
            이 글의 CID가 스마트컨트랙트에 등록되어 있는지 확인해 주세요.
          </div>
        </div>
      </div>
    );
  return <DynamicMdxViewer initialUrl={mdxUrl} />;
}
