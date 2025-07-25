'use client';
import { useEffect, useState } from 'react';
import { getBlogRegistryContract } from '@/contracts/blogRegistry';
import { ethers } from 'ethers';
import { postsMeta } from '@/components/postsMeta';
import DynamicMdxViewer from '@/components/DynamicMdxViewer';

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
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL
        );
        const contract = getBlogRegistryContract(provider);
        const cids: string[] = await contract.getAllPosts();
        const foundCid = cids[postIndex] || null;
        setCid(foundCid);
      } catch (e: unknown) {
        if (e && typeof e === 'object' && 'message' in e) {
          setError(
            (e as { message?: string }).message || '온체인 CID fetch 에러'
          );
        } else {
          setError('온체인 CID fetch 에러');
        }
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

  const boxStyle: React.CSSProperties = isMobile
    ? {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 120,
        gap: 8,
        background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)',
        borderRadius: 10,
        margin: '12px auto',
        boxShadow: '0 1px 4px #0001',
        width: '100%',
        maxWidth: '100%',
        padding: '16px 8px',
        border: '1px solid #e5e7eb',
        boxSizing: 'border-box',
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
        gap: 16,
        background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)',
        borderRadius: 16,
        margin: '40px auto 32px auto',
        boxShadow: '0 4px 16px #0001',
        width: '100%',
        padding: '32px 32px',
        border: '1px solid #e5e7eb',
        boxSizing: 'border-box',
      };

  const errorBoxStyle: React.CSSProperties = isMobile
    ? {
        background: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca',
        borderRadius: 10,
        padding: 14,
        margin: '16px auto',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        maxWidth: '96vw',
        width: '96vw',
      }
    : {
        background: '#fef2f2',
        color: '#b91c1c',
        border: '1px solid #fecaca',
        borderRadius: 12,
        padding: 20,
        margin: '32px auto 24px auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        maxWidth: 420,
        width: '100%',
      };

  const notFoundBoxStyle: React.CSSProperties = isMobile
    ? {
        background: '#f1f5f9',
        color: '#334155',
        border: '1px solid #cbd5e1',
        borderRadius: 10,
        padding: 14,
        margin: '16px auto',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        maxWidth: '96vw',
        width: '96vw',
      }
    : {
        background: '#f1f5f9',
        color: '#334155',
        border: '1px solid #cbd5e1',
        borderRadius: 12,
        padding: 20,
        margin: '32px auto 24px auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        maxWidth: 420,
        width: '100%',
      };
  const iconSize = isMobile ? 28 : 36;
  const fontTitle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: isMobile ? 13 : 16,
    color: '#3730a3',
    textAlign: 'center',
    lineHeight: 1.3,
  };
  const fontDesc: React.CSSProperties = {
    fontSize: isMobile ? 10 : 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 1.5,
  };

  if (loading)
    return (
      <div style={boxStyle}>
        <svg
          width={iconSize}
          height={iconSize}
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
        <div style={fontTitle}>블록체인에서 블로그 글을 꺼내오는 중...</div>
        <div style={fontDesc}>
          분산 저장소와 스마트컨트랙트에서 안전하게 글을 불러오고 있습니다.
        </div>
      </div>
    );
  if (error)
    return (
      <div style={errorBoxStyle}>
        <svg width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
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
          <div style={{ ...fontTitle, color: '#b91c1c' }}>
            블록체인에서 글을 불러오지 못했습니다.
          </div>
          <div style={{ ...fontDesc, color: '#b91c1c' }}>
            계속 이렇게 뜨신다면{' '}
            <a
              href="mailto:donghyeun02@gmail.com"
              style={{ color: '#2563eb', textDecoration: 'underline' }}
            >
              donghyeun02@gmail.com
            </a>{' '}
            로 메일 남겨주세요 !
          </div>
        </div>
      </div>
    );
  if (!mdxUrl)
    return (
      <div style={notFoundBoxStyle}>
        <svg width={iconSize} height={iconSize} fill="none" viewBox="0 0 24 24">
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
          <div style={fontTitle}>온체인에서 CID를 찾을 수 없습니다.</div>
          <div style={fontDesc}>
            이 글의 CID가 스마트컨트랙트에 등록되어 있는지 확인해 주세요.
          </div>
        </div>
      </div>
    );
  return <DynamicMdxViewer initialUrl={mdxUrl} />;
}
