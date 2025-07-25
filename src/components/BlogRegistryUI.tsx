'use client';

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { getBlogRegistryContract } from '@/contracts/blogRegistry';

// 타입 선언 추가
interface EthereumProvider {
  request: (args: { method: string }) => Promise<unknown>;
}
interface EthereumWindow extends Window {
  ethereum?: EthereumProvider;
}

export default function BlogRegistryUI() {
  const [cid, setCid] = useState('');
  const [cids, setCids] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function registerPost() {
    setError(null);
    setLoading(true);

    try {
      const ethWindow = window as EthereumWindow;
      if (!ethWindow.ethereum)
        throw new Error('MetaMask가 설치되어 있지 않습니다.');

      await ethWindow.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const provider = new ethers.providers.Web3Provider(ethWindow.ethereum);
      const signer = await provider.getSigner();
      const contract = getBlogRegistryContract(signer);
      const tx = await contract.registerPost(cid);

      await tx.wait();
      setCid('');

      await fetchCids();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '등록 실패');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchCids() {
    setError(null);
    setLoading(true);

    try {
      const ethWindow = window as EthereumWindow;
      if (!ethWindow.ethereum)
        throw new Error('MetaMask가 설치되어 있지 않습니다.');

      const provider = new ethers.providers.Web3Provider(ethWindow.ethereum);
      const contract = getBlogRegistryContract(provider);
      const result = await contract.getAllPosts();

      setCids(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || '조회 실패');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '2rem auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 12,
      }}
    >
      <h2>BlogRegistry (온체인 CID 등록/조회)</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
          placeholder="IPFS CID 입력"
          style={{ width: '70%', marginRight: 8 }}
        />
        <button onClick={registerPost} disabled={loading || !cid}>
          {loading ? '등록 중...' : 'CID 등록 (MetaMask)'}
        </button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={fetchCids} disabled={loading}>
          {loading ? '불러오는 중...' : '온체인 CID 목록 조회'}
        </button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <div>
        <h4>온체인에 등록된 CID 목록</h4>
        <ul>
          {cids.map((c, i) => (
            <li key={i} style={{ wordBreak: 'break-all' }}>
              <a
                href={`https://emerald-urban-anglerfish-862.mypinata.cloud/ipfs/${c}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
