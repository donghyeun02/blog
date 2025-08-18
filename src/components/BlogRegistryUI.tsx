'use client';

import React, { useState, useEffect } from 'react';
import {
  createWeb3Provider,
  createContractWithProvider,
  createContractWithSigner,
  handleBlockchainError,
} from '@/utils/blockchain';
import { ethers } from 'ethers';
import { postsMeta } from './postsMeta';
import { commonStyles } from '@/utils/styles';

interface Transaction {
  hash: string;
  type: 'register' | 'update';
  status: 'pending' | 'success' | 'failed';
  timestamp: number;
  gasUsed?: string;
  gasPrice?: string;
  blockNumber?: number;
  from?: string;
  to?: string;
  value?: string;
  oldCid?: string;
  newCid?: string;
}

export default function BlogRegistryUI() {
  const [cid, setCid] = useState('');
  const [cids, setCids] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 수정 기능을 위한 상태
  const [editIndex, setEditIndex] = useState('');
  const [newCid, setNewCid] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  // 블록체인 정보
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [gasPrice, setGasPrice] = useState<string>('0');

  // 블록체인 정보 가져오기
  useEffect(() => {
    async function fetchBlockchainInfo() {
      try {
        const provider = createWeb3Provider();
        const blockNumber = await provider.getBlockNumber();
        const gasPrice = await provider.getGasPrice();

        setCurrentBlock(blockNumber);
        setGasPrice(ethers.utils.formatUnits(gasPrice, 'gwei'));
      } catch (error) {
        console.log('블록체인 정보 가져오기 실패:', error);
      }
    }

    fetchBlockchainInfo();
    const interval = setInterval(fetchBlockchainInfo, 10000);
    return () => clearInterval(interval);
  }, []);

  async function registerPost() {
    setError(null);
    setLoading(true);

    const txHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newTx: Transaction = {
      hash: txHash,
      type: 'register',
      status: 'pending',
      timestamp: Date.now(),
    };

    setTransactions((prev) => [newTx, ...prev]);

    try {
      const provider = createWeb3Provider();
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = await createContractWithSigner(signer);
      const tx = await contract.registerPost(cid);

      // 트랜잭션 정보 업데이트
      const receipt = await tx.wait();
      const fromAddress = await signer.getAddress();

      setTransactions((prev) =>
        prev.map((t) =>
          t.hash === txHash
            ? {
                ...t,
                status: 'success',
                gasUsed: receipt.gasUsed.toString(),
                gasPrice: receipt.effectiveGasPrice?.toString() || '0',
                blockNumber: receipt.blockNumber,
                from: fromAddress,
                to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
                value: '0',
                newCid: cid,
              }
            : t
        )
      );

      setCid('');
      await fetchCids();
    } catch (e: unknown) {
      const blockchainError = handleBlockchainError(e);
      setError(blockchainError.message);

      setTransactions((prev) =>
        prev.map((t) => (t.hash === txHash ? { ...t, status: 'failed' } : t))
      );
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

  async function updatePost() {
    setError(null);
    setEditLoading(true);

    const txHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newTx: Transaction = {
      hash: txHash,
      type: 'update',
      status: 'pending',
      timestamp: Date.now(),
    };

    setTransactions((prev) => [newTx, ...prev]);

    try {
      const index = parseInt(editIndex);
      if (isNaN(index) || index < 0 || index >= cids.length) {
        throw new Error('유효하지 않은 인덱스입니다.');
      }

      const oldCid = cids[index];
      if (!oldCid || oldCid === '') {
        throw new Error('기존 CID가 존재하지 않습니다.');
      }

      const provider = createWeb3Provider();
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const contract = await createContractWithSigner(signer);

      const tx = await contract.updatePost(oldCid, newCid);

      const receipt = await tx.wait();
      const fromAddress = await signer.getAddress();

      setTransactions((prev) =>
        prev.map((t) =>
          t.hash === txHash
            ? {
                ...t,
                status: 'success',
                gasUsed: receipt.gasUsed.toString(),
                gasPrice: receipt.effectiveGasPrice?.toString() || '0',
                blockNumber: receipt.blockNumber,
                from: fromAddress,
                to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
                value: '0',
                oldCid,
                newCid,
              }
            : t
        )
      );

      setEditIndex('');
      setNewCid('');
      await fetchCids();
    } catch (e: unknown) {
      const blockchainError = handleBlockchainError(e);
      setError(blockchainError.message);

      setTransactions((prev) =>
        prev.map((t) => (t.hash === txHash ? { ...t, status: 'failed' } : t))
      );
    } finally {
      setEditLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '✅ Success';
      case 'pending':
        return '⏳ Pending';
      case 'failed':
        return '❌ Failed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* 블록체인 정보 카드 */}
      <div className={commonStyles.card}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          블록체인 현황
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Current Block
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentBlock.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Gas Price
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {gasPrice} Gwei
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Total Posts
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {cids.length}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Register Post Card */}
          <div className={commonStyles.card}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              글 등록하기
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  IPFS CID
                </label>
                <input
                  type="text"
                  value={cid}
                  onChange={(e) => setCid(e.target.value)}
                  placeholder="Cid Here..."
                  className={commonStyles.input}
                />
              </div>
              <button
                onClick={registerPost}
                disabled={loading || !cid}
                className={`w-full ${commonStyles.button.primary}`}
              >
                {loading ? '처리 중...' : '글 등록하기'}
              </button>
            </div>
          </div>

          {/* Update Post Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              글 수정하기
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  글 인덱스
                </label>
                <input
                  type="number"
                  value={editIndex}
                  onChange={(e) => setEditIndex(e.target.value)}
                  placeholder="0, 1, 2..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  새로운 CID
                </label>
                <input
                  type="text"
                  value={newCid}
                  onChange={(e) => setNewCid(e.target.value)}
                  placeholder="New Cid Here..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <button
                onClick={updatePost}
                disabled={editLoading || !editIndex || !newCid}
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {editLoading ? '처리 중...' : '글 수정하기'}
              </button>
            </div>
          </div>

          {/* Query Posts Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              글 목록 조회
            </h3>
            <button
              onClick={fetchCids}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '로딩 중...' : '모든 글 가져오기'}
            </button>
          </div>
        </div>

        {/* 오른쪽: 트랜잭션 히스토리 */}
        <div className="space-y-6">
          {/* 트랜잭션 히스토리 */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              트랜잭션 기록
            </h3>
            <div className="space-y-3 max-h-[28rem] overflow-y-auto">
              {transactions.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                  아직 트랜잭션이 없습니다
                </div>
              ) : (
                transactions.map((tx, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold`}
                          style={{
                            backgroundColor: getStatusColor(tx.status) + '20',
                            color: getStatusColor(tx.status),
                          }}
                        >
                          {getStatusText(tx.status)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {tx.type === 'register' ? '등록' : '수정'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(tx.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-2">
                      {tx.hash.substring(0, 10)}...
                      {tx.hash.substring(tx.hash.length - 8)}
                    </div>

                    {/* 블록 정보 */}
                    {tx.blockNumber && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        블록: {tx.blockNumber.toLocaleString()}
                      </div>
                    )}

                    {/* 가스 정보 */}
                    {tx.gasUsed && tx.gasPrice && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        가스: {tx.gasUsed} ×{' '}
                        {ethers.utils.formatUnits(tx.gasPrice, 'gwei')} Gwei
                      </div>
                    )}

                    {/* 주소 정보 */}
                    {tx.from && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        보낸 주소: {tx.from.substring(0, 6)}...
                        {tx.from.substring(tx.from.length - 4)}
                      </div>
                    )}

                    {tx.to && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        받는 주소: {tx.to.substring(0, 6)}...
                        {tx.to.substring(tx.to.length - 4)}
                      </div>
                    )}

                    {/* 값 정보 */}
                    {tx.value && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        값: {ethers.utils.formatEther(tx.value)} MATIC
                      </div>
                    )}

                    {/* CID 변경 정보 */}
                    {tx.oldCid && tx.newCid && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <div className="font-semibold mb-1 text-gray-700 dark:text-gray-300">
                          CID 변경:
                        </div>
                        <div>이전: {tx.oldCid.substring(0, 10)}...</div>
                        <div>새로운: {tx.newCid.substring(0, 10)}...</div>
                      </div>
                    )}

                    {/* 새 CID 등록 정보 */}
                    {tx.newCid && !tx.oldCid && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 p-2 bg-green-50 dark:bg-green-900/50 rounded">
                        <div className="font-semibold mb-1 text-green-700 dark:text-green-400">
                          새로운 CID:
                        </div>
                        <div>{tx.newCid.substring(0, 10)}...</div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 등록된 CID 목록 */}
          {cids.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                등록된 글 목록
              </h3>
              <div className="space-y-2 max-h-[24rem] overflow-y-auto">
                {cids.map((cid, index) => {
                  // postsMeta에서 해당 인덱스의 글 정보 찾기
                  const postInfo = postsMeta[index];
                  const hasLocalPost = postInfo && postInfo.slug;

                  return (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            #{index}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              hasLocalPost
                                ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700'
                                : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-700'
                            }`}
                          >
                            {hasLocalPost ? '로컬' : '온체인만'}
                          </span>
                        </div>
                      </div>

                      {/* CID 정보 */}
                      <div className="mb-2">
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                          CID: {cid || '(비어있음)'}
                        </div>
                      </div>

                      {/* 로컬 글 정보 */}
                      {hasLocalPost && (
                        <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 p-3 rounded-lg">
                          <div className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">
                            {postInfo.title}
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-300 mb-1">
                            {postInfo.date} | {postInfo.category}
                          </div>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            {postInfo.summary}
                          </div>
                        </div>
                      )}

                      {/* 온체인 전용 글 */}
                      {!hasLocalPost && cid && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-700 p-3 rounded-lg">
                          <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                            온체인에만 등록된 글
                          </div>
                          <div className="text-xs text-yellow-600 dark:text-yellow-300">
                            로컬에 해당 글 정보가 없습니다.
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-6 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 dark:text-red-400 mr-2">❌</span>
            <span className="text-red-800 dark:text-red-200 font-medium">
              트랜잭션 오류:
            </span>
          </div>
          <div className="text-red-700 dark:text-red-300 mt-1">{error}</div>
        </div>
      )}
    </div>
  );
}
