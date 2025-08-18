'use client';

import React, { useState } from 'react';

type TransactionStatus = 'idle' | 'processing' | 'success' | 'failed';
type SystemStatus = 'normal' | 'down' | 'attacked';
type SystemType = 'centralized' | 'decentralized';

const CentralizedVsDecentralized: React.FC = () => {
  const [currentSystem, setCurrentSystem] = useState<SystemType>('centralized');
  const [centralizedStatus, setCentralizedStatus] =
    useState<TransactionStatus>('idle');
  const [decentralizedStatus, setDecentralizedStatus] =
    useState<TransactionStatus>('idle');
  const [bankStatus, setBankStatus] = useState<SystemStatus>('normal');
  const [nodesStatus, setNodesStatus] = useState<SystemStatus>('normal');
  const [animationStep, setAnimationStep] = useState(0);

  // 중앙화 거래 시뮬레이션
  const simulateCentralizedTransaction = async () => {
    if (bankStatus === 'down') {
      setCentralizedStatus('failed');
      return;
    }

    setCentralizedStatus('processing');
    setAnimationStep(1);

    // 유저 1 → Bank
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAnimationStep(2);

    // Bank 처리
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAnimationStep(3);

    // Bank → 유저 2
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCentralizedStatus('success');
    setAnimationStep(0);

    setTimeout(() => setCentralizedStatus('idle'), 2000);
  };

  // 탈중앙화 거래 시뮬레이션
  const simulateDecentralizedTransaction = async () => {
    setDecentralizedStatus('processing');
    setAnimationStep(1);

    // 분산 처리 (여러 노드들이 동시에 처리)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setAnimationStep(2);

    // 합의 완료
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setDecentralizedStatus('success');
    setAnimationStep(0);

    setTimeout(() => setDecentralizedStatus('idle'), 2000);
  };

  const toggleBankStatus = () => {
    setBankStatus(bankStatus === 'normal' ? 'down' : 'normal');
  };

  const simulateNodeAttack = () => {
    setNodesStatus('attacked');
    setTimeout(() => setNodesStatus('normal'), 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-1 md:p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* 탭 선택 */}
      <div className="flex mb-1 md:mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setCurrentSystem('centralized')}
          className={`flex-1 py-1 md:py-1.5 px-2 md:px-3 text-xs md:text-sm rounded-md transition-all duration-300 ${
            currentSystem === 'centralized'
              ? 'bg-blue-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          🏦 중앙화 시스템
        </button>
        <button
          onClick={() => setCurrentSystem('decentralized')}
          className={`flex-1 py-1 md:py-1.5 px-2 md:px-3 text-xs md:text-sm rounded-md transition-all duration-300 ${
            currentSystem === 'decentralized'
              ? 'bg-purple-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          🔗 탈중앙화 시스템
        </button>
      </div>

      {/* 중앙화 시스템 */}
      {currentSystem === 'centralized' && (
        <div className="border-2 border-blue-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3 text-blue-700 text-center mt-2">
            🏦 중앙화 시스템 (은행)
          </h4>

          <div className="flex items-center justify-center h-16 md:h-32 lg:h-48 mb-1 md:mb-4 lg:mb-6">
            {/* 유저 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-16 md:h-16 rounded-full bg-pink-300 flex items-center justify-center text-lg md:text-2xl transition-all duration-300 ${
                  centralizedStatus === 'processing' && animationStep >= 1
                    ? 'animate-pulse ring-2 md:ring-4 ring-blue-300'
                    : ''
                }`}
              >
                👤
              </div>
              <span className="text-xs md:text-sm mt-1 md:mt-2 font-medium">
                유저 1
              </span>
            </div>

            {/* Arrow 1 */}
            <div
              className={`mx-2 md:mx-6 transition-all duration-500 text-xl md:text-4xl ${
                centralizedStatus === 'processing' && animationStep >= 1
                  ? 'text-blue-500'
                  : 'text-gray-300'
              }`}
            >
              →
            </div>

            {/* Bank */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-8 md:w-20 md:h-16 rounded-lg flex items-center justify-center text-lg md:text-3xl transition-all duration-300 ${
                  bankStatus === 'down'
                    ? 'bg-red-500 text-white animate-pulse'
                    : centralizedStatus === 'processing' && animationStep >= 2
                      ? 'bg-blue-500 text-white animate-pulse ring-2 md:ring-4 ring-blue-300'
                      : 'bg-blue-300'
                }`}
              >
                🏦
              </div>
              <span className="text-xs md:text-sm mt-1 md:mt-2 font-medium">
                {bankStatus === 'down' ? '서버 다운' : '은행'}
              </span>
            </div>

            {/* Arrow 2 */}
            <div
              className={`mx-2 md:mx-6 transition-all duration-500 text-xl md:text-4xl ${
                centralizedStatus === 'processing' && animationStep >= 3
                  ? 'text-blue-500'
                  : 'text-gray-300'
              }`}
            >
              →
            </div>

            {/* 유저 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-16 md:h-16 rounded-full bg-green-300 flex items-center justify-center text-lg md:text-2xl transition-all duration-300 ${
                  centralizedStatus === 'success'
                    ? 'animate-bounce ring-2 md:ring-4 ring-green-300'
                    : ''
                }`}
              >
                👤
              </div>
              <span className="text-xs md:text-sm mt-1 md:mt-2 font-medium">
                유저 2
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="text-center mb-4">
            <div className="font-medium">
              {centralizedStatus === 'idle' && (
                <span className="text-gray-500">대기 중</span>
              )}
              {centralizedStatus === 'processing' && (
                <span className="text-blue-500">거래 처리 중...</span>
              )}
              {centralizedStatus === 'success' && (
                <span className="text-green-500">✅ 거래 완료!</span>
              )}
              {centralizedStatus === 'failed' && (
                <span className="text-red-500">❌ 거래 실패!</span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-1 md:gap-2 justify-center">
            <button
              onClick={simulateCentralizedTransaction}
              disabled={centralizedStatus === 'processing'}
              className="px-3 md:px-6 py-2 md:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors text-xs md:text-sm"
            >
              송금하기
            </button>
            <button
              onClick={toggleBankStatus}
              className={`px-3 md:px-6 py-2 md:py-3 rounded-lg text-white transition-colors text-xs md:text-sm ${
                bankStatus === 'down'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {bankStatus === 'down' ? '서버 복구' : '서버 다운'}
            </button>
          </div>

          {/* 설명 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-semibold mb-2 text-blue-800">
              🏦 중앙화 시스템 특징
            </h5>
            <ul className="text-sm space-y-1 text-blue-700">
              <li>은행이 모든 거래를 관리</li>
              <li>서버 다운되면 거래 불가</li>
              <li>빠르지만 단일 실패점 존재</li>
            </ul>
          </div>
        </div>
      )}

      {/* 탈중앙화 시스템 */}
      {currentSystem === 'decentralized' && (
        <div className="border-2 border-purple-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-3 text-purple-700 text-center mt-2">
            🔗 탈중앙화 시스템 (블록체인)
          </h4>

          <div className="flex items-center justify-center h-16 md:h-32 lg:h-48 mb-1 md:mb-4 lg:mb-6">
            {/* 유저 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-16 md:h-16 rounded-full bg-pink-300 flex items-center justify-center text-lg md:text-2xl transition-all duration-300 ${
                  decentralizedStatus === 'processing' && animationStep >= 1
                    ? 'animate-pulse ring-2 md:ring-4 ring-purple-300'
                    : ''
                }`}
              >
                👤
              </div>
              <span className="text-xs md:text-sm mt-1 md:mt-2 font-medium">
                유저 1
              </span>
            </div>

            {/* Arrow 1 */}
            <div
              className={`mx-2 md:mx-6 transition-all duration-500 text-xl md:text-4xl ${
                decentralizedStatus === 'processing' && animationStep >= 1
                  ? 'text-purple-500'
                  : 'text-gray-300'
              }`}
            >
              →
            </div>

            {/* Network */}
            <div className="mx-4 flex flex-col items-center">
              <div className="grid grid-cols-3 gap-1 md:gap-2 mb-3">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 md:w-5 md:h-5 lg:w-7 lg:h-7 rounded-full flex items-center justify-center text-xs md:text-sm transition-all duration-300 ${
                      nodesStatus === 'attacked' && [2, 5, 7].includes(i)
                        ? 'bg-red-400 text-white animate-pulse'
                        : decentralizedStatus === 'processing'
                          ? 'bg-purple-500 text-white animate-pulse'
                          : 'bg-purple-300'
                    }`}
                  >
                    🔗
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-xs md:text-sm font-medium block">
                  블록체인 네트워크
                </span>
              </div>
            </div>

            {/* Arrow 2 */}
            <div
              className={`mx-2 md:mx-6 transition-all duration-500 text-xl md:text-4xl ${
                decentralizedStatus === 'processing' && animationStep >= 2
                  ? 'text-purple-500'
                  : 'text-gray-300'
              }`}
            >
              →
            </div>

            {/* 유저 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 md:w-16 md:h-16 rounded-full bg-green-300 flex items-center justify-center text-lg md:text-2xl transition-all duration-300 ${
                  decentralizedStatus === 'success'
                    ? 'animate-bounce ring-2 md:ring-4 ring-green-300'
                    : ''
                }`}
              >
                👤
              </div>
              <span className="text-xs md:text-sm mt-1 md:mt-2 font-medium">
                유저 2
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="text-center mb-4">
            <div className="font-medium">
              {nodesStatus === 'attacked' ? (
                <span className="text-orange-500">
                  ⚠️ 일부 노드 공격받음 (거래는 계속 진행됨)
                </span>
              ) : decentralizedStatus === 'idle' ? (
                <span className="text-gray-500">대기 중</span>
              ) : decentralizedStatus === 'processing' ? (
                <span className="text-purple-500">네트워크 검증 중...</span>
              ) : decentralizedStatus === 'success' ? (
                <span className="text-green-500">✅ 거래 완료!</span>
              ) : null}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-1 md:gap-2 justify-center">
            <button
              onClick={simulateDecentralizedTransaction}
              disabled={decentralizedStatus === 'processing'}
              className="px-3 md:px-6 py-2 md:py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors text-xs md:text-sm"
            >
              송금하기
            </button>
            <button
              onClick={simulateNodeAttack}
              className="px-3 md:px-6 py-2 md:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs md:text-sm"
            >
              노드 공격
            </button>
          </div>

          {/* 설명 */}
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h5 className="font-semibold mb-2 text-purple-800">
              🔗 탈중앙화 시스템 특징
            </h5>
            <ul className="text-sm space-y-1 text-purple-700">
              <li>여러 노드가 분산 처리</li>
              <li>일부 노드 공격받아도 계속 작동</li>
              <li>느리지만 매우 안전함</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralizedVsDecentralized;
