'use client';
import React, { useState, useRef, useEffect } from 'react';

const stepDetails = [
  {
    title: '1. 서버가 쿠키를 준다',
    story: '“카페에 처음 가면 스탬프 카드 하나 받는 거야.”',
    http: 'Set-Cookie: userId=User01; Path=/; HttpOnly',
    action: (setCookies: any, setLog: any, setLoading: any) => {
      setLoading(true);
      setLog((prev: any[]) => [
        ...prev,
        '[쿠키] 서버: Set-Cookie 헤더로 쿠키 설정',
        '[쿠키] Set-Cookie: userId=User01; Path=/; HttpOnly',
      ]);
      setTimeout(() => {
        setCookies({ userId: 'User01' });
        setLog((prev: any[]) => [
          ...prev,
          '[저장] 브라우저: 쿠키 저장 완료',
          '[성공] 쿠키 저장 완료',
        ]);
        setLoading(false);
      }, 800);
    },
    description:
      '서버가 응답 시 Set-Cookie 헤더로 쿠키를 브라우저에 전달합니다.',
  },
  {
    title: '2. 브라우저가 쿠키를 저장',
    story: '“카페에서 받은 스탬프 카드를 주머니에 넣는 거야.”',
    http: '쿠키 저장: userId=User01',
    action: (setCookies: any, setLog: any, setLoading: any) => {
      setLoading(true);
      setLog((prev: any[]) => [
        ...prev,
        '[확인] 브라우저: 쿠키 저장소 확인',
        '[저장소] 저장된 쿠키: userId=User01',
      ]);
      setTimeout(() => {
        setLog((prev: any[]) => [...prev, '[성공] 쿠키 저장 완료']);
        setLoading(false);
      }, 600);
    },
    description:
      '브라우저는 쿠키를 로컬 저장소에 저장하고, 이후 요청에 자동으로 포함시킵니다.',
  },
  {
    title: '3. 요청 시 쿠키 자동 전송',
    story: '“카페에서 주머니에서 스탬프 카드를 꺼내는 거야.”',
    http: 'Cookie: userId=User01',
    action: (setCookies: any, setLog: any, setLoading: any) => {
      setLoading(true);
      setLog((prev: any[]) => [
        ...prev,
        '[요청] 브라우저: 요청 전송 (쿠키 자동 포함)',
        '[쿠키] Cookie: userId=User01 (자동 포함)',
      ]);
      setTimeout(() => {
        setLog((prev: any[]) => [
          ...prev,
          '[서버] 서버: 쿠키 수신 및 사용자 식별',
          '[성공] 인증 성공!',
        ]);
        setLoading(false);
      }, 600);
    },
    description:
      '브라우저는 같은 도메인으로 요청할 때마다 쿠키를 자동으로 헤더에 포함시킵니다.',
  },
  {
    title: '4. 쿠키 만료/삭제',
    story: '“스탬프 카드를 주머니에서 버리는 거야.”',
    http: '쿠키 삭제: userId=User01',
    action: (setCookies: any, setLog: any, setLoading: any) => {
      setLoading(true);
      setLog((prev: any[]) => [
        ...prev,
        '[삭제] 브라우저: 쿠키 삭제 요청',
        '[만료] 또는 쿠키 만료 시간 도달',
      ]);
      setTimeout(() => {
        setCookies({});
        setLog((prev: any[]) => [...prev, '[성공] 쿠키 삭제 완료']);
        setLoading(false);
      }, 600);
    },
    description:
      '쿠키는 만료 시간이 되거나 사용자가 삭제하면 브라우저에서 제거됩니다.',
  },
];

export default function CookieSimulator() {
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const [completed, setCompleted] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const handleStep = (i: number) => {
    setShowTip(false);
    stepDetails[i].action(setCookies, setLog, setLoading);
    if (i === stepDetails.length - 1) {
      setCompleted(true);
    } else {
      setStep(i + 1);
    }
  };

  const reset = () => {
    setCookies({});
    setLog([]);
    setStep(0);
    setShowTip(false);
    setCompleted(false);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-4 w-full max-w-none mx-auto shadow-md">
      <h3
        className="text-xl font-bold mb-0 mt-0 pb-0 pt-0"
        style={{
          marginBottom: 12,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        🍪 쿠키 동작 과정 진행
      </h3>
      <div className="mt-0 mb-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4
          className="font-semibold text-blue-900 mb-0 mt-0 pb-0 pt-0"
          style={{
            marginBottom: 6,
            marginTop: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          📁 브라우저 쿠키 저장소
        </h4>
        <div className="bg-white rounded p-3 border border-blue-300 min-h-[60px]">
          {Object.keys(cookies).length === 0 ? (
            <span className="text-neutral-400 text-sm">(저장된 쿠키 없음)</span>
          ) : (
            Object.entries(cookies).map(([key, value]) => (
              <div key={key} className="text-sm font-mono text-green-700 mb-1">
                <span className="font-bold">{key}</span>: {value}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {stepDetails.map((s, i) => (
          <button
            key={i}
            onClick={() => handleStep(i)}
            disabled={loading || completed || i !== step}
            className={`px-3 py-2 rounded text-xs font-mono disabled:opacity-60 transition-colors ${
              step === i && !completed
                ? 'bg-blue-700 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="mb-4 p-3 bg-neutral-50 rounded border border-neutral-200">
        <h4 className="font-semibold text-neutral-900 mb-1">
          {stepDetails[step].title}
        </h4>
        <p className="text-sm text-neutral-700 mb-2">
          {stepDetails[step].description}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-blue-600 cursor-pointer underline text-xs"
            onClick={() => setShowTip((v) => !v)}
          >
            {showTip ? '비유/예시 닫기' : '이게 무슨 뜻이야? (비유/예시)'}
          </span>
        </div>
        {showTip && (
          <div className="bg-blue-100 rounded p-2 text-xs text-blue-900 mb-2">
            <b>비유:</b> {stepDetails[step].story}
            <br />
            <b>실제 메시지:</b> <code>{stepDetails[step].http}</code>
          </div>
        )}
      </div>
      <div
        ref={logRef}
        className="bg-neutral-50 rounded p-3 text-xs font-mono min-h-[80px] max-h-40 overflow-y-auto border border-neutral-200"
      >
        {log.length === 0 ? (
          <span className="text-neutral-400">
            (동작 로그가 여기에 표시됩니다)
          </span>
        ) : (
          log.map((l, i, arr) => {
            let icon = '';
            if (l.startsWith('[쿠키]')) icon = '🍪';
            else if (l.startsWith('[저장]')) icon = '💾';
            else if (l.startsWith('[성공]')) icon = '✅';
            else if (l.startsWith('[실패]')) icon = '❌';
            else if (l.startsWith('[삭제]')) icon = '🗑️';
            else if (l.startsWith('[요청]')) icon = '📤';
            else if (l.startsWith('[안내]')) icon = 'ℹ️';
            else if (l.startsWith('[서버]')) icon = '🖥️';
            else if (l.startsWith('[확인]')) icon = '🔍';
            else if (l.startsWith('[저장소]')) icon = '📁';
            else if (l.startsWith('[만료]')) icon = '⏰';
            const isLast = i === arr.length - 1;
            return (
              <div
                key={i}
                className={
                  isLast
                    ? 'mb-1 px-2 py-1 bg-green-100 text-green-800 font-bold rounded'
                    : 'mb-1 px-2 py-1'
                }
              >
                {icon && <span className="mr-1">{icon}</span>}
                {l.replace(/홍길동/g, '사용자').replace(/^\[.*?\]\s*/, '')}
              </div>
            );
          })
        )}
      </div>
      {completed && (
        <div className="mt-4 mb-2 text-center text-green-700 font-bold text-green-900">
          다시 진행하려면 아래 "초기화" 버튼을 눌러주세요.
        </div>
      )}
      <button
        onClick={reset}
        className="mt-2 px-4 py-2 bg-neutral-500 text-white rounded text-sm hover:bg-neutral-600 transition-colors"
      >
        🔄 초기화
      </button>
    </div>
  );
}
