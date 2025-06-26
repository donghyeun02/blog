'use client';
import React, { useState, useRef, useEffect } from 'react';

interface Session {
  id: string;
  userId: string;
  data: { [key: string]: unknown };
  createdAt: string;
}

interface StepDetail {
  title: string;
  story: string;
  http: string;
  action: (
    setSessions: React.Dispatch<React.SetStateAction<Record<string, Session>>>,
    setCurrentSessionId: React.Dispatch<React.SetStateAction<string | null>>,
    setLog: React.Dispatch<React.SetStateAction<string[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    sessions: Record<string, Session>,
    currentSessionId?: string | null
  ) => void;
  description: string;
}

const stepDetails: StepDetail[] = [
  {
    title: '1. 로그인 시 세션 생성',
    story: '“놀이공원에 입장할 때 손목 밴드를 받는 거야.”',
    http: 'Set-Cookie: sessionId=abc123; Path=/; HttpOnly',
    action: (
      setSessions: React.Dispatch<
        React.SetStateAction<Record<string, Session>>
      >,
      setCurrentSessionId: React.Dispatch<React.SetStateAction<string | null>>,
      setLog: React.Dispatch<React.SetStateAction<string[]>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      sessions: Record<string, Session>,
      currentSessionId: string | null
    ) => {
      if (currentSessionId) return;
      setLoading(true);
      const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      const session: Session = {
        id: sessionId,
        userId: 'User01',
        data: { isLoggedIn: true, lastLogin: new Date().toISOString() },
        createdAt: new Date().toISOString(),
      };
      setLog((prev: string[]) => [
        ...prev,
        '[로그인] 사용자 로그인 요청',
        '[서버] 서버: 세션 생성',
        '[ID] 세션 ID: ' + sessionId,
      ]);
      setTimeout(() => {
        setSessions((prev: any) => ({ ...prev, [sessionId]: session }));
        setCurrentSessionId(sessionId);
        setLog((prev: string[]) => [
          ...prev,
          '[쿠키] Set-Cookie: sessionId=' + sessionId,
          '[성공] 세션 생성 완료',
        ]);
        setLoading(false);
      }, 800);
    },
    description:
      '사용자가 로그인하면 서버는 고유한 세션 ID를 생성하고 서버 메모리나 DB에 저장합니다.',
  },
  {
    title: '2. 세션 데이터 저장',
    story: '“세션에는 사용자 정보, 로그인 상태, 사용자 설정 등이 저장됩니다.”',
    http: '세션 데이터: { isLoggedIn: true, username: "사용자01" }',
    action: (
      setSessions: React.Dispatch<
        React.SetStateAction<Record<string, Session>>
      >,
      setCurrentSessionId: React.Dispatch<React.SetStateAction<string | null>>,
      setLog: React.Dispatch<React.SetStateAction<string[]>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      sessions: Record<string, Session>
    ) => {
      setLoading(true);
      setLog((prev: string[]) => [
        ...prev,
        '[저장] 세션에 사용자 데이터 저장',
        '[데이터] 저장 데이터: 로그인 상태, 사용자 정보 등',
      ]);
      setTimeout(() => {
        setSessions((prev: any) => ({
          ...prev,
          [setCurrentSessionId]: {
            ...prev[setCurrentSessionId],
            data: {
              ...prev[setCurrentSessionId].data,
              username: '사용자01',
              role: 'user',
              preferences: { theme: 'dark', language: 'ko' },
            },
          },
        }));
        setLog((prev: string[]) => [...prev, '[성공] 세션 데이터 저장 완료']);
        setLoading(false);
      }, 600);
    },
    description:
      '세션에는 사용자 정보, 로그인 상태, 사용자 설정 등이 저장됩니다.',
  },
  {
    title: '3. 요청 시 세션 확인',
    story:
      '“클라이언트가 요청할 때마다 서버는 세션 ID를 확인하고 해당 세션 데이터를 조회합니다.”',
    http: 'Cookie: sessionId=abc123',
    action: (
      setSessions: React.Dispatch<
        React.SetStateAction<Record<string, Session>>
      >,
      setCurrentSessionId: React.Dispatch<React.SetStateAction<string | null>>,
      setLog: React.Dispatch<React.SetStateAction<string[]>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      sessions: Record<string, Session>
    ) => {
      setLoading(true);
      setLog((prev: string[]) => [
        ...prev,
        '[요청] 클라이언트: 요청 (쿠키 포함)',
        '[쿠키] Cookie: sessionId=' + setCurrentSessionId,
      ]);
      setTimeout(() => {
        const session = sessions[setCurrentSessionId];
        setLog((prev: string[]) => [
          ...prev,
          '[서버] 서버: 세션 ID 확인',
          '[데이터] 세션 데이터: ' + JSON.stringify(session.data, null, 2),
          '[성공] 인증 성공 - 세션 유효',
        ]);
        setLoading(false);
      }, 800);
    },
    description:
      '클라이언트가 요청할 때마다 서버는 세션 ID를 확인하고 해당 세션 데이터를 조회합니다.',
  },
  {
    title: '4. 세션 만료/삭제',
    story:
      '“로그아웃하거나 세션이 만료되면 서버에서 세션을 삭제하고 쿠키도 만료시킵니다.”',
    http: 'Set-Cookie: sessionId=; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    action: (
      setSessions: React.Dispatch<
        React.SetStateAction<Record<string, Session>>
      >,
      setCurrentSessionId: React.Dispatch<React.SetStateAction<string | null>>,
      setLog: React.Dispatch<React.SetStateAction<string[]>>,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>,
      sessions: Record<string, Session>
    ) => {
      setLoading(true);
      setLog((prev: string[]) => [
        ...prev,
        '[로그아웃] 로그아웃 요청',
        '[삭제] 서버: 세션 삭제',
      ]);
      setTimeout(() => {
        const newSessions = { ...sessions };
        delete newSessions[setCurrentSessionId];
        setSessions(newSessions);
        setLog((prev: string[]) => [
          ...prev,
          '[쿠키] Set-Cookie: sessionId=; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
          '[성공] 세션 삭제 완료',
        ]);
        setLoading(false);
      }, 600);
    },
    description:
      '로그아웃하거나 세션이 만료되면 서버에서 세션을 삭제하고 쿠키도 만료시킵니다.',
  },
];

export default function SessionSimulator() {
  const [sessions, setSessions] = useState<{ [key: string]: Session }>({});
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [log]);

  const handleStep = (i: number) => {
    if (i === stepDetails.length - 1) {
      setCompleted(true);
    } else {
      setStep(i + 1);
    }
    setShowTip(false);
    if (i === 0) {
      stepDetails[i].action(
        setSessions,
        setCurrentSessionId,
        setLog,
        setLoading,
        sessions,
        currentSessionId
      );
    } else {
      if (!currentSessionId) return;
      stepDetails[i].action(
        setSessions,
        currentSessionId,
        setLog,
        setLoading,
        sessions,
        null
      );
    }
  };

  const reset = () => {
    setSessions({});
    setCurrentSessionId(null);
    setLog([]);
    setStep(0);
    setShowTip(false);
    setCompleted(false);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 w-full max-w-none mx-auto shadow-md">
      <h3
        className="text-xl font-bold mb-0 mt-0 pb-0 pt-0"
        style={{
          marginBottom: 12,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        🗄️ 세션 동작 과정 진행
      </h3>
      <div className="mt-0 mb-2 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4
          className="font-semibold text-green-900 mb-0 mt-0 pb-0 pt-0"
          style={{
            marginBottom: 6,
            marginTop: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          🗄️ 서버 세션 저장소
        </h4>
        <div className="bg-white rounded p-3 border border-green-300 min-h-[80px]">
          {Object.keys(sessions).length === 0 ? (
            <span className="text-neutral-400 text-sm">(저장된 세션 없음)</span>
          ) : (
            Object.entries(sessions).map(([id, session]) => (
              <div
                key={id}
                className="mb-3 p-2 bg-green-50 rounded border border-green-200"
              >
                <div className="text-sm font-mono text-green-800 mb-1">
                  <span className="font-bold">ID:</span> {session.id}
                </div>
                <div className="text-sm font-mono text-green-700 mb-1">
                  <span className="font-bold">User:</span> {session.userId}
                </div>
                <div className="text-xs text-green-600">
                  <span className="font-bold">Data:</span>{' '}
                  {JSON.stringify(session.data)}
                </div>
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
                ? 'bg-green-700 text-white'
                : 'bg-green-600 text-white hover:bg-green-700'
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
            className="text-green-600 cursor-pointer underline text-xs"
            onClick={() => setShowTip((v) => !v)}
          >
            {showTip ? '비유/예시 닫기' : '이게 무슨 뜻이야? (비유/예시)'}
          </span>
        </div>
        {showTip && (
          <div className="bg-green-100 rounded p-2 text-xs text-green-900 mb-2">
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
                {l.replace(/사용자01/g, '사용자').replace(/^\[.*?\]\s*/, '')}
              </div>
            );
          })
        )}
      </div>
      {completed && (
        <div className="mt-4 mb-2 text-center text-green-700 font-bold text-green-900">
          다시 진행하려면 아래 &quot;초기화&quot; 버튼을 눌러주세요.
        </div>
      )}
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 bg-neutral-500 text-white rounded text-sm hover:bg-neutral-600 transition-colors"
      >
        🔄 초기화
      </button>
    </div>
  );
}
