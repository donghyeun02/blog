'use client';
import React, { useState } from 'react';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/todos/1';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function HttpFlowDemo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Todo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0); // 0:대기, 1:요청중, 2:서버처리, 3:응답완료

  const handleRequest = async () => {
    setStep(1); // 요청중
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // 요청 애니메이션
      await new Promise((r) => setTimeout(r, 500));
      setStep(2); // 서버 처리중
      const res = await fetch(SERVER_URL);
      await new Promise((r) => setTimeout(r, 400));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: Todo = await res.json();
      setData(json);
      setStep(3); // 응답 완료
    } catch (e) {
      if (e instanceof Error) setError(e.message);
      else setError('에러 발생');
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-8 pt-0 max-w-4xl mx-auto shadow-md ">
      <h3 className="text-xl font-bold mb-2 text-neutral-900">
        HTTP 요청 흐름
      </h3>
      <p className="text-neutral-500 text-sm mb-4">
        버튼을 클릭하면 실제로 어떤 일이 일어나는지 실시간으로 확인해보세요.
      </p>
      {/* 흐름 시각화 */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 mb-6 w-full">
        {/* 클라이언트 */}
        <div className="flex flex-col items-center w-1/2 sm:w-1/3 mb-0">
          <div
            className={`rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 ${
              step === 1
                ? 'border-blue-500 bg-blue-50'
                : 'border-neutral-300 bg-neutral-100'
            }`}
          >
            🖥️
          </div>
          <span className="mt-2 text-xs sm:text-xs text-neutral-700">
            클라이언트
          </span>
        </div>
        {/* 화살표 */}
        <div className="flex flex-col items-center w-1/4 sm:w-1/3 my-0">
          <div className="h-2 flex items-center">
            <div
              className={`w-16 h-1 rounded-full ${
                step === 1 ? 'bg-blue-500 animate-pulse' : 'bg-neutral-200'
              }`}
            ></div>
          </div>
          <span className="text-xs sm:text-xs text-neutral-400 mt-1">요청</span>
          <div className="h-2 flex items-center mt-2">
            <div
              className={`w-16 h-1 rounded-full ${
                step === 3 ? 'bg-green-500 animate-pulse' : 'bg-neutral-200'
              }`}
            ></div>
          </div>
          <span className="text-xs sm:text-xs text-neutral-400 mt-1">응답</span>
        </div>
        {/* 서버 */}
        <div className="flex flex-col items-center w-1/2 sm:w-1/3 mt-0">
          <div
            className={`rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold border-2 ${
              step === 2
                ? 'border-green-500 bg-green-50'
                : 'border-neutral-300 bg-neutral-100'
            }`}
          >
            🗄️
          </div>
          <span className="mt-2 text-xs sm:text-xs text-neutral-700">서버</span>
        </div>
      </div>
      {/* 버튼 및 상태 */}
      <button
        onClick={handleRequest}
        className="px-5 py-2 bg-blue-600 text-white rounded font-mono font-semibold mb-4 w-full text-base hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? '요청 중...' : 'API 요청 보내기'}
      </button>
      {/* 상태 메시지 */}
      <div className="min-h-[24px] mb-2 text-center">
        {step === 1 && (
          <span className="text-blue-600 font-mono">
            클라이언트 → 서버로 요청 전송 중...
          </span>
        )}
        {step === 2 && (
          <span className="text-green-600 font-mono">
            서버에서 응답 생성 중...
          </span>
        )}
        {step === 3 && !error && (
          <span className="text-green-700 font-mono">응답 수신 완료!</span>
        )}
        {error && <span className="text-red-500 font-mono">에러: {error}</span>}
      </div>
      {/* 응답 JSON */}
      {data && (
        <pre className="bg-neutral-100 rounded-lg p-4 text-sm font-mono overflow-x-auto border border-neutral-200 text-neutral-800 mt-2 shadow-inner">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
