'use client';

import React, { useState } from 'react';
import {
  createWeb3Provider,
  createContractWithProvider,
  createContractWithSigner,
  handleBlockchainError,
} from '@/utils/blockchain';

export default function BlogRegistryUI() {
  const [cid, setCid] = useState('');
  const [cids, setCids] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function registerPost() {
    setError(null);
    setLoading(true);

    try {
      const provider = createWeb3Provider();
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = await createContractWithSigner(signer);
      const tx = await contract.registerPost(cid);

      await tx.wait();
      setCid('');

      await fetchCids();
    } catch (e: unknown) {
      const blockchainError = handleBlockchainError(e);
      setError(blockchainError.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCids() {
    setError(null);
    setLoading(true);

    try {
      const provider = createWeb3Provider();
      const contract = createContractWithProvider(provider);
      const result = await contract.getAllPosts();

      setCids(result);
    } catch (e: unknown) {
      const blockchainError = handleBlockchainError(e);
      setError(blockchainError.message);
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
          {loading ? '조회 중...' : 'CID 목록 조회'}
        </button>
      </div>
      {error && (
        <div style={{ color: 'red', marginBottom: 16 }}>오류: {error}</div>
      )}
      {cids.length > 0 && (
        <div>
          <h3>등록된 CID 목록:</h3>
          <ul>
            {cids.map((cid, index) => (
              <li key={index} style={{ marginBottom: 8 }}>
                {cid}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
